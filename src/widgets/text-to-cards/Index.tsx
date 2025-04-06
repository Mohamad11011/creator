import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ModelOption } from "@/lib/services/huggingface-service";
import { GeneratedIdea } from "@/types/GeneratedIdea";
import { SparkleIcon, WandSparkles } from "lucide-react";

const tones = [
  "Funny",
  "Professional",
  "Friendly",
  "Promotional",
  "Casual",
  "Realistic",
];

interface WidgetProps {
  selectedModel?: ModelOption | null;
  setSelectedModel?: (model: ModelOption | null) => void;
}

export const TextToCardsWidget = ({ selectedModel }: WidgetProps) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [url, setUrl] = useState("");
  const [hooks, setHooks] = useState<any>();
  const [explore, setExplore] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState("");
  const [targetAudience, setTargetAudience] = useState(
    "Business Owners, Content Creators"
  );

  const [keywords, setKeywords] = useState("Seamless, Effortless");
  const [generatedIdeas, setGeneratedIdeas] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState("Instagram");
  const [isGenerating, setIsGenerating] = useState(false);

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
          modelId: selectedModel?.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate ideas");

      const data = await response.json();
      const formattedIdeas: GeneratedIdea[] = data.hooks.map(
        (hook: string, index: number) => ({
          id: index + 1,
          title: hook.split("\n")[0] || hook,
          description: hook.split("\n").slice(1).join("\n") || hook,
          category: selectedCategory,
          type: index % 2 === 0 ? "Tips" : "Announcements",
        })
      );

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
    <div className="mx-auto space-y-8">
      {/* Welcome Section */}
      <section className="">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-base text-muted-foreground mt-2">
          Here's where your content generation is ease to be done.
        </p>
      </section>

      {/* AI Prompt Section */}
      <section className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-3 bg-purple-700 rounded-md">
              <WandSparkles className="stroke-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium text-purple-600 dark:text-purple-400">
                AI Generator
              </span>
              <span className="text-muted-foreground text-sm">
                Create engaging content with AI assistance
              </span>
            </div>
          </div>
          <Input
            className="w-full min-h-[120px] rounded-lg border bg-background p-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Describe what you want to create... (e.g., Write a post about sustainable living tips)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        {/* Tone Selection */}
        <div className="py-8">
          <h2 className="font-medium mb-2">Select Tone</h2>
          <div className="grid grid-cols-6 gap-4">
            {tones.map((toneOption) => (
              <div
                key={toneOption}
                onClick={() => setTone(toneOption)}
                className={cn(
                  "cursor-pointer text-center py-1.5 border hover:bg-primary/10",
                  tone === toneOption && "bg-accent"
                )}
              >
                {toneOption}
              </div>
            ))}
          </div>
        </div>

        {/* Generate Ideas Button */}
        <div className="">
          <Button
            onClick={handleGenerateIdeas}
            disabled={isGenerating}
            className={cn(
              "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
              "text-white text-lg font-medium px-8 w-full h-fit",
              "transition-all duration-200 ease-in-out",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Generating...
              </div>
            ) : (
              <>
                <SparkleIcon />
                "Generate Ideas"
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Generated Ideas Section */}
      <section className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
        <h2 className="text-lg font-medium mb-6">Generated Ideas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                </div>
              </Card>
            ))
          ) : generatedIdeas.length > 0 ? (
            generatedIdeas.map((idea: GeneratedIdea) => (
              <Card
                key={idea.id}
                className="overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-semibold">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {idea.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSaveIdea(idea)}
                    >
                      Save Idea
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUseIdea(idea)}
                    >
                      Use Idea
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-muted-foreground">
              <p>
                No ideas generated yet. Enter a prompt and click "Generate
                Ideas" to get started.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
