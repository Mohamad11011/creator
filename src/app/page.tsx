"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FaTwitter,
  FaReddit,
  FaLinkedin,
  FaChartLine,
  FaHeart,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  AVAILABLE_MODELS,
  type ModelOption,
} from "@/lib/services/huggingface-service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { HookCard } from "@/components/hook-card";
import { TrendingTopics } from "@/components/trending-topics";
import { TrendingDrawer, type TrendingTopic, type TrendingData } from "@/components/trending-drawer";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelSelect } from "@/components/model-select";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface GeneratedIdea {
  id: number;
  title: string;
  description: string;
  category: string;
  type: string;
}

const TRENDING_DATA: TrendingData = {
  tiktok: [
    { id: "1", title: "#TikTokMadeMeBuyIt", source: 'tiktok', engagement: 2500000 },
    { id: "2", title: "#DayInMyLife", source: 'tiktok', engagement: 1800000 },
    { id: "3", title: "#ProductivityHacks", source: 'tiktok', engagement: 1500000 },
    { id: "4", title: "#SmallBusiness", source: 'tiktok', engagement: 1200000 },
    { id: "5", title: "#LearnOnTikTok", source: 'tiktok', engagement: 1000000 },
    { id: "6", title: "#SelfImprovement", source: 'tiktok', engagement: 900000 },
    { id: "7", title: "#CareerAdvice", source: 'tiktok', engagement: 850000 },
    { id: "8", title: "#LifeHacks", source: 'tiktok', engagement: 800000 },
    { id: "9", title: "#BusinessTips", source: 'tiktok', engagement: 750000 },
    { id: "10", title: "#Entrepreneurship", source: 'tiktok', engagement: 700000 },
  ],
  linkedin: [
    { id: "1", title: "Remote Work Best Practices", source: 'linkedin', engagement: 30000 },
    { id: "2", title: "Digital Transformation Strategies", source: 'linkedin', engagement: 28000 },
    { id: "3", title: "Leadership in Tech", source: 'linkedin', engagement: 25000 },
    { id: "4", title: "Future of Work", source: 'linkedin', engagement: 22000 },
    { id: "5", title: "AI in Business", source: 'linkedin', engagement: 20000 },
    { id: "6", title: "Professional Development", source: 'linkedin', engagement: 18000 },
    { id: "7", title: "Workplace Culture", source: 'linkedin', engagement: 16000 },
    { id: "8", title: "Industry Innovation", source: 'linkedin', engagement: 15000 },
    { id: "9", title: "Career Growth", source: 'linkedin', engagement: 14000 },
    { id: "10", title: "Business Strategy", source: 'linkedin', engagement: 13000 },
  ],
};

export default function Home() {
  const [topic, setTopic] = useState("");
  const [hooks, setHooks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null);
  const [exploredContent, setExploredContent] = useState<string[]>([]);
  const [trendingData, setTrendingData] = useState<TrendingData>(TRENDING_DATA);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [url, setUrl] = useState("");
  const [scrapedContent, setScrapedContent] = useState("");
  const [scraping, setScraping] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [targetAudience, setTargetAudience] = useState("Business Owners, Content Creators");
  const [keywords, setKeywords] = useState("Seamless, Effortless");
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Instagram");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoadingTrends(true);
      try {
        const response = await fetch('/api/trends');
        if (!response.ok) throw new Error('Failed to fetch trends');
        const data = await response.json();
        setTrendingData(data);
      } catch (error) {
        console.error('Error fetching trends:', error);
        toast.error('Failed to fetch trending topics');
      } finally {
        setLoadingTrends(false);
      }
    };

    fetchTrends();
    // Refresh trends every hour
    const interval = setInterval(fetchTrends, 3600000);
    return () => clearInterval(interval);
  }, []);

  const handleTopicSelect = (selectedTopic: TrendingTopic) => {
    setTopic(selectedTopic.title);
  };

  const handleSubmit = async () => {
    if (!topic) {
      toast.error("Please enter a topic");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, modelId: selectedModel?.id }),
      });

      if (!response.ok) throw new Error("Failed to generate hooks");

      const data = await response.json();
      setHooks(data.hooks);
    } catch (error) {
      toast.error("Failed to generate hooks");
    } finally {
      setLoading(false);
    }
  };

  const handleExploreMore = async (hook: string) => {
    try {
      const response = await fetch("/api/hooks/explore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: hook, modelId: selectedModel?.id }),
      });

      if (!response.ok) throw new Error("Failed to explore more content");

      const data = await response.json();
      setExploredContent(data.hooks);
    } catch (error) {
      toast.error("Failed to explore more content");
    }
  };

  const handleScrape = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    setScraping(true);
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.error) {
          setScrapedContent(data.error);
          toast.error("Unable to scrape content");
        } else {
          throw new Error("Failed to scrape webpage");
        }
        return;
      }

      setScrapedContent(data.content);
      toast.success("Content scraped successfully!");
    } catch (error) {
      setScrapedContent(
        "Failed to scrape webpage. This might be due to:\n" +
        "1. The website blocks scraping\n" +
        "2. The URL is invalid\n" +
        "3. The website requires authentication\n" +
        "4. The website uses reCAPTCHA or other protection"
      );
      toast.error("Failed to scrape webpage");
    } finally {
      setScraping(false);
    }
  };

  const handleGenerateIdeas = async () => {
    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          topic: prompt,
          tone,
          targetAudience,
          keywords,
          modelId: selectedModel?.id 
        }),
      });

      if (!response.ok) throw new Error("Failed to generate ideas");

      const data = await response.json();
      const formattedIdeas: GeneratedIdea[] = data.hooks.map((hook: string, index: number) => ({
        id: index + 1,
        title: hook.split('\n')[0] || hook,
        description: hook.split('\n').slice(1).join('\n') || hook,
        category: selectedCategory,
        type: index % 2 === 0 ? "Tips" : "Announcements"
      }));
      
      setGeneratedIdeas(formattedIdeas);
      toast.success("Ideas generated successfully!");
    } catch (error) {
      toast.error("Failed to generate ideas");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveIdea = async (idea: GeneratedIdea) => {
    // TODO: Implement save to Supabase
    console.log("Saving idea:", idea);
  };

  const handleUseIdea = async (idea: GeneratedIdea) => {
    // TODO: Implement explore more functionality
    console.log("Using idea:", idea);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <span className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            HookAI
          </span>
          <div className="flex items-center gap-4">
            <TrendingDrawer 
              data={trendingData} 
              onSelect={handleTopicSelect}
              loading={loadingTrends}
            />
            <Select
              value={selectedModel?.id || "openai"}
              onValueChange={(value: string) => {
                if (value === "openai") {
                  setSelectedModel(null);
                } else {
                  const model = AVAILABLE_MODELS.find((m) => m.id === value);
                  setSelectedModel(model || null);
                }
              }}
            >
              <SelectTrigger className="w-[200px] border-input bg-background">
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openai">OpenAI GPT-4 (Default)</SelectItem>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-8">
        <div className="mx-auto max-w-5xl space-y-8">
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generate">Generate Ideas</TabsTrigger>
              <TabsTrigger value="scrape">Web Scraper</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-8">
              {/* AI Prompt Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-purple-600 dark:text-purple-400">🤖 AI Prompt</span>
                </div>
                <textarea
                  className="w-full min-h-[100px] rounded-lg border bg-background p-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Create a catchy post for Trenzy.ai that highlights its AI-powered content creation, blending speed, creativity, and precision..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </section>

              {/* Settings Section */}
              <section className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Tone of Voice
                    </label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Casual">Casual</SelectItem>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Target Audience
                    </label>
                    <Input
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder="Business Owners, Content Creators"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Keywords
                    </label>
                    <Input
                      value={keywords}
                      onChange={(e) => setKeywords(e.target.value)}
                      placeholder="Seamless, Effortless"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <Button
                    onClick={handleGenerateIdeas}
                    disabled={isGenerating}
                    className={cn(
                      "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
                      "text-white font-medium px-8",
                      "transition-all duration-200 ease-in-out",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                  >
                    {isGenerating ? "Generating..." : "Generate Ideas"}
                  </Button>
                </div>
              </section>

              {/* Categories */}
              <section className="flex items-center gap-2">
                <div className="flex gap-2">
                  <Badge
                    variant={selectedCategory === "Instagram" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("Instagram")}
                    className="cursor-pointer hover:bg-accent"
                  >
                    Instagram
                  </Badge>
                </div>
              </section>

              {/* Generated Ideas */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isGenerating ? (
                  // Loading cards
                  [...Array(3)].map((_, index) => (
                    <Card key={`loading-${index}`} className="overflow-hidden">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
                          <div className="h-6 w-20 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="space-y-2">
                          <div className="h-4 w-full animate-pulse rounded bg-muted" />
                          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                          <div className="h-4 w-4/6 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                          <div className="h-8 w-24 animate-pulse rounded bg-muted" />
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  generatedIdeas.map((idea) => (
                    <Card key={idea.id} className="overflow-hidden transition-all hover:shadow-lg">
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{idea.type}</Badge>
                          <Badge variant="outline">{idea.category}</Badge>
                        </div>
                        <h3 className="text-lg font-semibold">{idea.title}</h3>
                        <p className="text-sm text-muted-foreground">{idea.description}</p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSaveIdea(idea)}
                            className="hover:bg-accent"
                          >
                            Save Idea
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUseIdea(idea)}
                            className="hover:bg-accent"
                          >
                            Use Idea
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </section>
            </TabsContent>

            <TabsContent value="scrape" className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-center">Web Scraper</h2>
                <p className="text-center text-muted-foreground">
                  Enter a URL to extract content from any webpage
                </p>
                <div className="flex gap-2">
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL to scrape..."
                  />
                  <Button
                    onClick={handleScrape}
                    disabled={scraping}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {scraping ? "Scraping..." : "Scrape Content"}
                  </Button>
                </div>
                <Textarea
                  value={scrapedContent}
                  readOnly
                  placeholder="Scraped content will appear here..."
                  className="min-h-[300px]"
                />
                {scrapedContent && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setTopic(scrapedContent);
                        const tabsList = document.querySelector('[role="tablist"]');
                        const generateTab = tabsList?.querySelector('[value="generate"]');
                        if (generateTab instanceof HTMLElement) {
                          generateTab.click();
                        }
                      }}
                    >
                      Use as Topic
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
