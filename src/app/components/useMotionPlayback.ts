import { useEffect, useRef, useState } from "react";

export function useMotionPlayback(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [inView, setInView] = useState(false);
  const [tabVisible, setTabVisible] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [resumeHover, setResumeHover] = useState(false);
  const [resumeFocus, setResumeFocus] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setTabVisible(document.visibilityState !== "hidden");
    updatePreference();
    updateVisibility();
    preference.addEventListener("change", updatePreference);
    document.addEventListener("visibilitychange", updateVisibility);

    const observer = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
      : null;
    if (observer && ref.current) observer.observe(ref.current);
    else setInView(true);

    return () => {
      preference.removeEventListener("change", updatePreference);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer?.disconnect();
    };
  }, []);

  function togglePlayback() {
    setPaused(!paused);
    // Explicit resume must work while its button still has focus or hover.
    setResumeHover(paused && hovered);
    setResumeFocus(paused && focused);
  }

  useEffect(() => {
    const boundary = ref.current;
    if (!boundary) return;

    function onPointerEnter(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      setHovered(true);
      setResumeHover(false);
    }
    function onPointerLeave() {
      setHovered(false);
      setResumeHover(false);
    }
    function onFocus() {
      setFocused(true);
      setResumeFocus(false);
    }
    function onBlur(event: FocusEvent) {
      if (!boundary?.contains(event.relatedTarget as Node | null)) {
        setFocused(false);
        setResumeFocus(false);
      }
    }

    setFocused(boundary.contains(document.activeElement));
    boundary.addEventListener("pointerenter", onPointerEnter);
    boundary.addEventListener("pointerleave", onPointerLeave);
    boundary.addEventListener("focusin", onFocus);
    boundary.addEventListener("focusout", onBlur);
    return () => {
      boundary.removeEventListener("pointerenter", onPointerEnter);
      boundary.removeEventListener("pointerleave", onPointerLeave);
      boundary.removeEventListener("focusin", onFocus);
      boundary.removeEventListener("focusout", onBlur);
    };
  }, []);

  return {
    ref,
    reducedMotion,
    paused,
    togglePlayback,
    running: enabled && !reducedMotion && inView && tabVisible && !paused
      && (!hovered || resumeHover) && (!focused || resumeFocus),
  };
}
