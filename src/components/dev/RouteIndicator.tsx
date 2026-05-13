import { useLocation } from "react-router-dom";

/**
 * Small fixed badge that displays the current route path.
 * Useful during preview/development to confirm navigation.
 */
const RouteIndicator = () => {
  const location = useLocation();
  const path = location.pathname + location.search + location.hash;

  return (
    <div
      className="fixed bottom-3 left-3 z-[9999] pointer-events-none select-none"
      aria-hidden="true"
    >
      <div className="rounded-md border border-border bg-background/85 backdrop-blur-sm px-2.5 py-1 text-xs font-mono text-foreground shadow-md">
        <span className="text-muted-foreground mr-1">route:</span>
        <span className="font-semibold">{path}</span>
      </div>
    </div>
  );
};

export default RouteIndicator;
