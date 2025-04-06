import { Button } from "@/components/ui/button";

export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 bg-card p-4 border-r">
      <div className="flex items-center justify-center mb-6">
        <span className="text-2xl font-bold">Acme Inc</span>
      </div>
      <nav className="flex-1 space-y-4">
        <Button variant="ghost" className="w-full justify-start">Playground</Button>
        <Button variant="ghost" className="w-full justify-start">History</Button>
        <Button variant="ghost" className="w-full justify-start">Starred</Button>
        <Button variant="ghost" className="w-full justify-start">Settings</Button>
        <Button variant="ghost" className="w-full justify-start">Models</Button>
        <Button variant="ghost" className="w-full justify-start">Documentation</Button>
      </nav>
    </aside>
  );
} 