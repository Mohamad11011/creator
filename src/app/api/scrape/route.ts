import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

async function scrapeTikTok(url: string) {
  try {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.CHROME_PATH || undefined,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-infobars",
        "--window-position=0,0",
        "--ignore-certifcate-errors",
        "--ignore-certifcate-errors-spki-list",
        "--disable-web-security",
        "--disable-features=IsolateOrigins,site-per-process",
        "--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      ],
    });

    try {
      console.log("Creating new page...");
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setExtraHTTPHeaders({
        "accept-language": "en-US,en;q=0.9",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      });
      await page.setJavaScriptEnabled(true);

      console.log("Navigating to TikTok URL...");
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      await page
        .waitForSelector("[class*=CommonDataList_listWrap]", {
          timeout: 10000,
        })
        .catch(() =>
          console.log("Could not find CommonDataList_listWrap, continuing...")
        );

      const data = await page.evaluate(() => {
        const cards = document.querySelectorAll(
          "[class*=CommonDataList_listWrap] [class*=CommonDataList_cardWrapper]"
        );
        const results: any[] = [];
        cards.forEach((card) => {
          const trendItem = card.querySelector(
            '[data-testid^="cc_commonCom-trend_hashtag_item-"]'
          );
          const titleText = card.querySelector(".CardPc_titleText__RYOWo");

          if (trendItem && titleText) {
            const match = trendItem
              .getAttribute("data-testid")
              ?.match(/item-(\d+)/);
            const number = match ? match[1] : null;
            const title = titleText.textContent?.trim() || "";

            if (number && title) {
              results.push({ number, title });
            }
          }
        });
        return results;
      });

      if (!data.length) {
        throw new Error("Could not extract TikTok trending content");
      }

      return data;
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Error in scrapeTikTok:", error);
    throw error;
  }
}


export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let content;

    if (url.includes("tiktok.com")) {
      content = await scrapeTikTok(url);
      if (!content) {
        return NextResponse.json(
          {
            error:
              "Failed to scrape TikTok content. Possible reasons:\n" +
              "1. TikTok blocked access\n" +
              "2. Video is private\n" +
              "3. You need a login to view this video",
          },
          { status: 400 }
        );
      }
    } else if (url.includes("x.com/explore")) {
      // content = await scrapeXTrends(url);
    } else {
      // Regular website scraping
      const response = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.5",
          Referer: "https://www.google.com/",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch webpage: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove unwanted elements
      $("script, style, nav, header, footer, iframe").remove();

      content = $("body").text().trim();
      if (!content) {
        content =
          $("body").text().trim() ||
          $("main").text().trim() ||
          $("article").text().trim();
      }
    }

    // Clean text output
    const cleanText = JSON.stringify(content, null, 2);

    return NextResponse.json({ content: cleanText, source: url });
  } catch (error) {
    console.error("Error scraping webpage:", error);
    return NextResponse.json(
      {
        error:
          "Failed to scrape webpage. Possible reasons:\n" +
          "1. The website blocks scraping\n" +
          "2. The URL is invalid\n" +
          "3. The website requires authentication\n" +
          "4. The website uses reCAPTCHA or other protection",
      },
      { status: 500 }
    );
  }
}
