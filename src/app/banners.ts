import type { GalleryImage } from "./components/ImageSlider";

const bannerModules = import.meta.glob("../../elloraimages/*.jpeg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

// Explicit destinations keep image assignments stable as the folder grows.
const files = {
  ladakh: "12.55.06", dubai: "12.55.07", malaysia: "12.55.08 (1)",
  maldives: "12.55.08", ooty: "12.55.09 (1)", singapore: "12.55.09",
  mysore: "12.55.10", bangalore: "12.55.11", darjeeling: "12.55.12",
  vietnam: "12.55.13 (1)", goa: "12.55.13", thailand: "12.55.14",
  andaman: "12.55.15", rajasthan: "12.55.16 (1)", himachal: "12.55.16",
  bali: "12.55.17", bhutan: "12.55.18", bodhgaya: "12.55.19",
  sriLanka: "12.55.20", kerala: "12.55.21 (1)", europe: "12.55.21",
} as const;

const names: Record<keyof typeof files, string> = {
  ladakh: "Leh-Ladakh", dubai: "Dubai", malaysia: "Malaysia", maldives: "Maldives",
  ooty: "Ooty", singapore: "Singapore", mysore: "Mysore", bangalore: "Bangalore",
  darjeeling: "Darjeeling–Sikkim", vietnam: "Vietnam", goa: "Goa", thailand: "Thailand",
  andaman: "Andaman", rajasthan: "Rajasthan", himachal: "Himachal", bali: "Bali",
  bhutan: "Bhutan", bodhgaya: "Bodhgaya", sriLanka: "Sri Lanka", kerala: "Kerala", europe: "Europe",
};

export const BANNERS = Object.fromEntries(
  Object.entries(files).map(([destination, time]) => {
    const src = bannerModules[`../../elloraimages/WhatsApp Image 2026-10-21 at ${time}.jpeg`];
    if (!src) throw new Error(`Missing Ellora banner: ${destination}`);
    return [destination, {
      src, alt: `${names[destination as keyof typeof files]} — Ellora Tours destination banner`, position: "50% 50%",
    }];
  }),
) as Record<keyof typeof files, GalleryImage>;

export const BANNER_IMAGES: GalleryImage[] = Object.values(BANNERS);
