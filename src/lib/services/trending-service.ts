import { TrendingData, TrendingTopic } from "@/components/trending-drawer";

export async function getTikTokTrends(): Promise<TrendingTopic[]> {
  try {
    // TikTok API endpoint for trending hashtags
    const response = await fetch(
      "https://open.tiktokapis.com/v2/research/hashtag/trending/",
      {
        headers: {
          Authorization: `Bearer ${process.env.TIKTOK_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch TikTok trends");

    const data = await response.json();
    return data.data.trending_hashtags
      .map((hashtag: any, index: number) => ({
        id: index.toString(),
        title: hashtag.display_name,
        source: "tiktok" as const,
        engagement: hashtag.view_count || 0,
      }))
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching TikTok trends:", error);
    // Fallback data for TikTok trends
    return [
      {
        id: "1",
        title: "#TikTokMadeMeBuyIt",
        source: "tiktok",
        engagement: 2500000,
      },
      { id: "2", title: "#DayInMyLife", source: "tiktok", engagement: 1800000 },
      {
        id: "3",
        title: "#ProductivityHacks",
        source: "tiktok",
        engagement: 1500000,
      },
      {
        id: "4",
        title: "#SmallBusiness",
        source: "tiktok",
        engagement: 1200000,
      },
      {
        id: "5",
        title: "#LearnOnTikTok",
        source: "tiktok",
        engagement: 1000000,
      },
      {
        id: "6",
        title: "#SelfImprovement",
        source: "tiktok",
        engagement: 900000,
      },
      { id: "7", title: "#CareerAdvice", source: "tiktok", engagement: 850000 },
      { id: "8", title: "#LifeHacks", source: "tiktok", engagement: 800000 },
      { id: "9", title: "#BusinessTips", source: "tiktok", engagement: 750000 },
      {
        id: "10",
        title: "#Entrepreneurship",
        source: "tiktok",
        engagement: 700000,
      },
    ];
  }
}

export async function getLinkedInTrends(): Promise<TrendingTopic[]> {
  try {
    const response = await fetch(
      "https://api.linkedin.com/v2/trending-content",
      {
        headers: {
          Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch LinkedIn trends");

    const data = await response.json();
    return data.elements
      .map((element: any, index: number) => ({
        id: index.toString(),
        title: element.title,
        source: "linkedin" as const,
        engagement: element.totalShares || 0,
      }))
      .slice(0, 10);
  } catch (error) {
    console.error("Error fetching LinkedIn trends:", error);
    // Fallback data for LinkedIn trends
    return [
      {
        id: "1",
        title: "Remote Work Best Practices",
        source: "linkedin",
        engagement: 30000,
      },
      {
        id: "2",
        title: "Digital Transformation Strategies",
        source: "linkedin",
        engagement: 28000,
      },
      {
        id: "3",
        title: "Leadership in Tech",
        source: "linkedin",
        engagement: 25000,
      },
      {
        id: "4",
        title: "Future of Work",
        source: "linkedin",
        engagement: 22000,
      },
      {
        id: "5",
        title: "AI in Business",
        source: "linkedin",
        engagement: 20000,
      },
      {
        id: "6",
        title: "Professional Development",
        source: "linkedin",
        engagement: 18000,
      },
      {
        id: "7",
        title: "Workplace Culture",
        source: "linkedin",
        engagement: 16000,
      },
      {
        id: "8",
        title: "Industry Innovation",
        source: "linkedin",
        engagement: 15000,
      },
      {
        id: "9",
        title: "Career Growth",
        source: "linkedin",
        engagement: 14000,
      },
      {
        id: "10",
        title: "Business Strategy",
        source: "linkedin",
        engagement: 13000,
      },
    ];
  }
}

export async function getAllTrends(): Promise<TrendingData> {
  const [tiktok, linkedin] = await Promise.all([
    getTikTokTrends(),
    getLinkedInTrends(),
  ]);

  return {
    tiktok,
    linkedin,
  };
}
