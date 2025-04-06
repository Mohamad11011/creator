export function Footer() {
  return (
    <footer className="bg-card p-4 border-t">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} HookAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
} 