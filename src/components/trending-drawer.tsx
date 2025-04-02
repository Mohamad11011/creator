"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FaLinkedin, FaTiktok } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export interface TrendingTopic {
  id: string;
  title: string;
  source: 'tiktok' | 'linkedin';
  engagement: number;
}

export interface TrendingData {
  tiktok: TrendingTopic[];
  linkedin: TrendingTopic[];
}

interface TrendingDrawerProps {
  data: TrendingData;
  onSelect: (topic: TrendingTopic) => void;
  loading?: boolean;
}

const SourceIcon = {
  tiktok: FaTiktok,
  linkedin: FaLinkedin,
};

const SourceColor = {
  tiktok: 'text-pink-500',
  linkedin: 'text-blue-500',
};

export function TrendingDrawer({ data, onSelect, loading = false }: TrendingDrawerProps) {
  const handleCopy = async (topic: string) => {
    try {
      await navigator.clipboard.writeText(topic);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const renderTopics = (topics: TrendingTopic[]) => (
    <ScrollArea className="h-[500px] w-full pr-4">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-white/60" />
        </div>
      ) : (
        <div className="space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-white/90">{topic.title}</h3>
                <span className="text-sm text-white/60">
                  {topic.engagement.toLocaleString()} {topic.source === 'tiktok' ? 'views' : 'shares'}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white/90"
                  onClick={() => handleCopy(topic.title)}
                >
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white/60 hover:text-white/90"
                  onClick={() => onSelect(topic)}
                >
                  Use Topic
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ScrollArea>
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-white/10 bg-white/5 text-white">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Trends...
            </>
          ) : (
            "Trending Topics"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] bg-[#1A1A1A] border-white/10">
        <SheetHeader>
          <SheetTitle className="text-white">Trending Topics</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue="tiktok" className="mt-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="tiktok" className="data-[state=active]:bg-white/10">
              <FaTiktok className="mr-2" />
              TikTok
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="data-[state=active]:bg-white/10">
              <FaLinkedin className="mr-2" />
              LinkedIn
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tiktok" className="mt-4">
            {renderTopics(data.tiktok)}
          </TabsContent>
          <TabsContent value="linkedin" className="mt-4">
            {renderTopics(data.linkedin)}
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
} 