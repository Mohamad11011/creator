"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaLinkedin, FaChartLine } from "react-icons/fa";
import { toast } from "sonner";

interface TrendingTopic {
  id: string;
  title: string;
  source: 'twitter' | 'linkedin' | 'google';
  engagement: string;
}

interface TrendingTopicsProps {
  source: 'twitter' | 'linkedin' | 'google';
  topics: TrendingTopic[];
  onSelect: (topic: string) => void;
}

const SourceIcon = {
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  google: FaChartLine,
};

const SourceColor = {
  twitter: 'text-twitter',
  linkedin: 'text-linkedin',
  google: 'text-google',
};

const SourceTitle = {
  twitter: 'Twitter Trends',
  linkedin: 'LinkedIn Insights',
  google: 'Google Trends',
};

export function TrendingTopics({ source, topics, onSelect }: TrendingTopicsProps) {
  const Icon = SourceIcon[source];
  const colorClass = SourceColor[source];
  const title = SourceTitle[source];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Card className="bg-[#1A1A1A] border-white/10">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Icon className={`h-5 w-5 ${colorClass}`} />
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
            >
              <div className="flex-1">
                <p className="text-white font-medium">{topic.title}</p>
                <p className="text-sm text-gray-400">{topic.engagement}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => copyToClipboard(topic.title)}
                >
                  Copy
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white"
                  onClick={() => onSelect(topic.title)}
                >
                  Use
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 