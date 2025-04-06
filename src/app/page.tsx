"use client";
import { useState } from "react";
import { toast } from "sonner";
import { type ModelOption } from "@/lib/services/huggingface-service";
import { type TrendingTopic } from "@/components/trending-drawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { TextToCardsWidget } from "@/widgets/text-to-cards/Index";

export default function Home() {
  const [selectedModel, setSelectedModel] = useState<ModelOption | null>(null);

  // useEffect(() => {
  //   const fetchTrends = async () => {
  //     setLoadingTrends(true);
  //     try {
  //       const response = await fetch("/api/trends");
  //       if (!response.ok) throw new Error("Failed to fetch trends");
  //       const data = await response.json();
  //       setTrendingData(data);
  //     } catch (error) {
  //       console.error("Error fetching trends:", error);
  //       toast.error("Failed to fetch trending topics");
  //     } finally {
  //       setLoadingTrends(false);
  //     }
  //   };

  //   fetchTrends();
  //   // Refresh trends every hour
  //   const interval = setInterval(fetchTrends, 3600000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="min-h-screen w-full flex bg-background">
      <AppSidebar />
      <SidebarInset>
        <Header
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
        <main className="w-full container py-8 px-8">
          <TextToCardsWidget selectedModel={selectedModel} />
        </main>
        <Footer />
      </SidebarInset>
    </div>
  );
}
