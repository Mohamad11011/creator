import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaShare, FaLightbulb } from "react-icons/fa";
import { toast } from "sonner";

export interface HookCardProps {
  hook: string;
  onExplore: () => void;
}

export function HookCard({ hook, onExplore }: HookCardProps) {
  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(hook);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors">
      <CardContent className="p-6">
        <p className="text-lg text-white/90 mb-4">{hook}</p>
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white/90"
            onClick={handleShare}
          >
            <FaShare className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white/90"
            onClick={onExplore}
          >
            <FaLightbulb className="mr-2 h-4 w-4" />
            Explore More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 