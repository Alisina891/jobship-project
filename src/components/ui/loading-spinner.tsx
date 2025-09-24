// components/ui/loading-spinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="flex min-h-screen w-full bg-background items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading verification...</p>
      </div>
    </div>
  );
}