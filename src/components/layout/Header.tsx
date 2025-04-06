import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  AVAILABLE_MODELS,
  type ModelOption,
} from "@/lib/services/huggingface-service";
import { Separator } from "../ui/separator";

import { SidebarTrigger } from "../ui/sidebar";

interface HeaderProps {
  selectedModel: ModelOption | null;
  setSelectedModel: (model: ModelOption | null) => void;
}

export function Header({ selectedModel, setSelectedModel }: HeaderProps) {
  return (
    <header className="bg-sidebar px-4 py-3.5 flex items-center w-full h-fit border-b shrink-0 gap-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <SidebarTrigger className="p-4" variant={"outline"} />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <div className="flex items-center gap-3 0 ml-auto">
        {/* <TrendingDrawer
            data={trendingData}
            onSelect={handleTopicSelect}
            loading={loadingTrends}
          /> */}
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
    </header>
  );
}
