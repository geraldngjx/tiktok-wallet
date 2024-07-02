import { cn } from "@/lib/utils";
import React, { CSSProperties } from "react";

// Modify these
const MAIN_CIRCLE_SIZE = 210;
const MAIN_CIRCLE_OPACITY = 0.24;
const NUM_CIRCLES = 7;

const Ripple = React.memo(({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed z-0 left-1/2 top-0 right-0 h-full w-full overflow-visible",
        className,
      )}
    >
      {Array.from({ length: NUM_CIRCLES }, (_, i) => (
        <div
          key={i}
          className={`absolute -translate-x-1/2 -translate-y-1/2 animate-ripple rounded-full bg-neutral-600`}
          style={
            {
              width: MAIN_CIRCLE_SIZE + i * 70,
              height: MAIN_CIRCLE_SIZE + i * 70,
              opacity: MAIN_CIRCLE_OPACITY - i * 0.03,
              animationDelay: `${i * 0.06}s`,
            } as CSSProperties
          }
        ></div>
      ))}
    </div>
  );
});

Ripple.displayName = "Ripple";

export default Ripple;
