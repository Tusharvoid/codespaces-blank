export interface EnquiryDetails {
  name: string;
  phone: string;
  email: string;
  destination?: string;
  month?: string;
  travellers?: string;
  message?: string;
}

interface EnquiryTour {
  name: string;
  destination: string;
  duration: string;
  price: string;
  priceNote: string;
  highlights: string[];
}

// Ellora's primary contact, in WhatsApp's international digits-only format.
const WHATSAPP_NUMBER = "919422203584";

export function whatsappEnquiryUrl(details: EnquiryDetails, tour?: EnquiryTour): string {
  const lines = ["Hello Ellora Tours & Travels, I'd like to enquire about a trip."];
  const add = (label: string, value?: string) => {
    if (value?.trim()) lines.push(`${label}: ${value.trim()}`);
  };

  lines.push("");
  if (tour) {
    add("Tour", tour.name);
    add("Destination", tour.destination);
    add("Duration", tour.duration);
    add("Listed price", `${tour.price} ${tour.priceNote}`);
    add("Highlights", tour.highlights.join(", "));
  } else {
    add("Destination", details.destination);
  }
  add("Preferred travel month", details.month);
  add("Travellers", details.travellers);
  lines.push("");
  add("Name", details.name);
  add("Phone", details.phone);
  add("Email", details.email);
  add("Message", details.message);
  lines.push("", "Please share availability and a personalised quote. Thank you!");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
