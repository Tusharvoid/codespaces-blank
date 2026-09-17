import { useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "./ui/utils";
import { useMotionPlayback } from "./useMotionPlayback";
import "./motion-components.css";

type MovingStripProps = {
  children: ReactNode;
  label: string;
  direction: "left" | "right";
  duration?: number;
  className?: string;
};

export function MovingStrip({ children, label, direction, duration = 55, className }: MovingStripProps) {
  const motion = useMotionPlayback(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [contentFocused, setContentFocused] = useState(false);
  const stripId = useId();

  return (
    <div
      ref={motion.ref}
      className={cn("ellora-moving-strip", className)}
      role="region"
      aria-label={label}
      data-static={motion.reducedMotion || contentFocused}
      onFocusCapture={(event) => {
        // Keep the original content visible and reachable when it contains links.
        setContentFocused(viewportRef.current?.contains(event.target) ?? false);
      }}
      onBlurCapture={(event) => {
        if (!viewportRef.current?.contains(event.relatedTarget as Node | null)) setContentFocused(false);
      }}
    >
      {!motion.reducedMotion && (
        <div className="ellora-moving-strip__controls">
          <button type="button" className="ellora-motion-button ellora-motion-button--label" aria-controls={stripId} aria-label={`${motion.paused ? "Resume" : "Pause"} ${label}`} onClick={motion.togglePlayback}>
            {motion.paused ? <Play aria-hidden="true" size={16} /> : <Pause aria-hidden="true" size={16} />}
            {motion.paused ? "Resume" : "Pause"}
          </button>
        </div>
      )}
      <div ref={viewportRef} id={stripId} className="ellora-moving-strip__viewport" aria-live="off">
        <div
          className="ellora-moving-strip__track"
          data-direction={direction}
          style={{
            "--ellora-strip-duration": `${Number.isFinite(duration) && duration > 0 ? duration : 55}s`,
            animationPlayState: motion.running ? "running" : "paused",
          } as CSSProperties}
        >
          <div className="ellora-moving-strip__group">{children}</div>
          <div className="ellora-moving-strip__group" aria-hidden="true" ref={(node) => { node?.setAttribute("inert", ""); }}>{children}</div>
        </div>
      </div>
    </div>
  );
}
