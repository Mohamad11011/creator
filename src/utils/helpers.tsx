export const handleScrape = async (
  setData: any,
  isLoading: any,
  toast: any,
  url: string
) => {
  if (!url) {
    toast.error("Please enter a URL");
    return;
  }

  isLoading(true);
  try {
    const response = await fetch("/api/scrape", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.error) {
        setData(data.error);
        toast.error("Unable to scrape content");
      } else {
        throw new Error("Failed to scrape webpage");
      }
      return;
    }

    setData(data.content);
    toast.success("Content scraped successfully!");
  } catch (error) {
    setData(
      "Failed to scrape webpage. This might be due to:\n" +
        "1. The website blocks scraping\n" +
        "2. The URL is invalid\n" +
        "3. The website requires authentication\n" +
        "4. The website uses reCAPTCHA or other protection"
    );
    toast.error("Failed to scrape webpage");
  } finally {
    isLoading(false);
  }
};

export const handleExploreMore = async (
  hook: string,
  setExplore: any,
  selectedModel: any,
  toast: any
) => {
  try {
    const response = await fetch("/api/hooks/explore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: hook, modelId: selectedModel?.id }),
    });

    if (!response.ok) throw new Error("Failed to explore more content");

    const data = await response.json();
    setExplore(data.hooks);
  } catch (error) {
    toast.error("Failed to explore more content");
  }
};
