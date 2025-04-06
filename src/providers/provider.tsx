import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider className="w-full">{children}</SidebarProvider>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
};
