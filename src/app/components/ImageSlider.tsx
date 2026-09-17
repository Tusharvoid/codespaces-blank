import { useEffect, useId, useState } from "react";
import { ChevronLeft, ChevronRight, ImageOff, Pause, Play } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "./ui/carousel";
import { cn } from "./ui/utils";
import { useMotionPlayback } from "./useMotionPlayback";
import "./motion-components.css";

export type GalleryImage = { src: string; alt: string; position?: string };

type DestinationImageProps = GalleryImage & {
  className?: string;
  priority?: boolean;
};

export function DestinationImage({ src, alt, position, className, priority = false }: DestinationImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src.trim() || src === failedSrc) {
    return (
      <div
        className={cn("ellora-destination-fallback", className)}
        role={alt ? "img" : undefined}
        aria-label={alt ? `${alt}. Image unavailable.` : undefined}
        aria-hidden={!alt || undefined}
      >
        <ImageOff aria-hidden="true" />
        <span aria-hidden="true">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectPosition: position }}
      loading={priority ? "eager" : "lazy"}
      {...{ fetchpriority: priority ? "high" : "auto" }}
      decoding="async"
      draggable={false}
      onError={() => setFailedSrc(src)}
    />
  );
}

type ImageSliderProps = {
  images: GalleryImage[];
  label: string;
  autoplay?: boolean;
  interactionPaused?: boolean;
  className?: string;
  controlsClassName?: string;
  priority?: boolean;
};

export function ImageSlider({
  images,
  label,
  autoplay = false,
  interactionPaused = false,
  className,
  controlsClassName,
  priority = false,
}: ImageSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [dragging, setDragging] = useState(false);
  const multiple = images.length > 1;
  const motion = useMotionPlayback(autoplay && multiple);
  const running = motion.running && !interactionPaused;
  const galleryId = useId();

  useEffect(() => {
    if (!api) return;
    setDragging(false);
    const update = () => setSelected(api.selectedScrollSnap());
    const startDrag = () => setDragging(true);
    const endDrag = () => setDragging(false);
    update();
    api.on("select", update);
    api.on("reInit", update);
    api.on("pointerDown", startDrag);
    api.on("pointerUp", endDrag);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
      api.off("pointerDown", startDrag);
      api.off("pointerUp", endDrag);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !running || dragging) return;
    const timer = window.setTimeout(() => {
      if (api.canScrollNext()) api.scrollNext();
      else api.scrollTo(0);
    }, 6000);
    return () => window.clearTimeout(timer);
  }, [api, running, dragging, selected, images.length]);

  return (
    <div ref={motion.ref} className={cn("relative ellora-image-slider", className)}>
      {multiple ? (
        <Carousel
          className="ellora-image-slider__carousel"
          aria-label={label}
          tabIndex={0}
          opts={{ loop: true, duration: motion.reducedMotion ? 0 : 45 }}
          setApi={setApi}
        >
          <CarouselContent id={galleryId} className="ellora-image-slider__track ml-0" aria-live={running ? "off" : "polite"}>
            {images.map((image, index) => (
              <CarouselItem
                key={`${image.src}-${index}`}
                className="ellora-image-slider__slide pl-0"
                aria-label={`${index + 1} of ${images.length}`}
                aria-hidden={index !== selected}
              >
                <DestinationImage {...image} className="ellora-image-slider__image" priority={priority && index === 0} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className={cn("ellora-image-slider__controls", controlsClassName)} role="group" aria-label={`${label} controls`}>
            <button type="button" className="ellora-motion-button" aria-label="Previous image" aria-controls={galleryId} disabled={!api} onClick={() => api?.scrollPrev()}>
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <div className="ellora-image-slider__indicators" role="group" aria-label="Choose an image">
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  className="ellora-image-slider__indicator"
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  aria-controls={galleryId}
                  aria-current={index === selected ? "true" : undefined}
                  disabled={!api}
                  onClick={() => api?.scrollTo(index)}
                ><span /></button>
              ))}
            </div>
            <button type="button" className="ellora-motion-button" aria-label="Next image" aria-controls={galleryId} disabled={!api} onClick={() => api?.scrollNext()}>
              <ChevronRight aria-hidden="true" size={20} />
            </button>
            {autoplay && !motion.reducedMotion && (
              <button
                type="button"
                className="ellora-motion-button"
                aria-label={motion.paused ? "Resume slideshow" : "Pause slideshow"}
                aria-controls={galleryId}
                onClick={motion.togglePlayback}
              >
                {motion.paused ? <Play aria-hidden="true" size={18} /> : <Pause aria-hidden="true" size={18} />}
              </button>
            )}
          </div>
        </Carousel>
      ) : (
        <DestinationImage
          {...(images[0] ?? { src: "", alt: label })}
          className="ellora-image-slider__image"
          priority={priority}
        />
      )}
    </div>
  );
}
