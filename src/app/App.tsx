import { useState, useEffect } from "react";
import {
  MapPin, Phone, Mail, Menu, X, ArrowRight, Star,
  Calendar, Clock, Shield, Plane, Globe,
  ChevronDown, ChevronRight, Bus, Train, Hotel,
  CreditCard, FileText, Car, Smartphone, Gift,
  Facebook, Youtube, Instagram, Search,
} from "lucide-react";
import { DestinationImage, type GalleryImage } from "./components/ImageSlider";
import { MovingStrip } from "./components/MovingStrip";
import bodhgayaImage from "../assets/destinations/bodhgaya-mahabodhi.jpg";
import bhutanImage from "../assets/destinations/bhutan-tigers-nest.jpg";
import baliImage from "../assets/destinations/bali-ulun-danu.jpg";
import sriLankaImage from "../assets/destinations/sri-lanka-sigiriya.jpg";
import mahabaleshwarImage from "../assets/destinations/mahabaleshwar-elephants-head.jpg";
import fontLicense from "../assets/fonts/OFL.txt?url";

type Page = "home" | "tours" | "tour-detail" | "services" | "about" | "contact";
type Experience = "wild-safari" | "strangers" | "adventure" | "meditate-discover";
type FilterType = "all" | "domestic" | "international" | "weekend" | Experience;

interface Tour {
  id: string;
  name: string;
  destination: string;
  category: "domestic" | "international" | "weekend";
  duration: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  banner?: GalleryImage;
  experiences?: Experience[];
  highlights: string[];
  price: string;
  priceNote: string;
  description: string;
  itinerary: { day: string; title: string; description: string }[];
  includes: string[];
  excludes: string[];
}

const TOURS: Tour[] = [
  {
    id: "kashmir",
    name: "Kashmir Valley Escape",
    destination: "Kashmir, India",
    category: "domestic",
    duration: "6 Nights / 7 Days",
    image: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=800&h=500&fit=crop&auto=format",
    imageAlt: "A traveller resting in Kashmir's green mountain valley",
    banner: { src: "https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=1600&h=900&fit=crop&auto=format", alt: "A traveller resting below Kashmir's mountain peaks", position: "50% 45%" },
    highlights: ["Dal Lake Shikara Ride", "Gulmarg Gondola", "Pahalgam Valley", "Srinagar Houseboats"],
    price: "₹28,500",
    priceNote: "per person (twin sharing)",
    description: "Experience the paradise on Earth with its lush valleys, pristine lakes, and snow-capped peaks. Kashmir is a dream destination that stays with you forever — from the scent of saffron in the air to the gentle ripple of a shikara on Dal Lake.",
    itinerary: [
      { day: "Day 1", title: "Arrival in Srinagar", description: "Arrive at Sheikh ul Alam International Airport. Transfer to houseboat on Dal Lake. Gentle shikara ride to settle in. Evening at leisure on the lake. Overnight on houseboat." },
      { day: "Day 2", title: "Srinagar Sightseeing", description: "Visit the famous Mughal Gardens — Shalimar Bagh, Nishat Bagh, and Chashme Shahi. Afternoon stroll through local handicraft markets. Dal Lake sunset cruise." },
      { day: "Day 3", title: "Gulmarg Day Trip", description: "Drive to Gulmarg (56 km). Board the world's highest gondola to Apharwat Peak (4,200m). Snow activities and panoramic Himalayan views. Return to Srinagar by evening." },
      { day: "Day 4", title: "Pahalgam Excursion", description: "Drive to Pahalgam — the Valley of Shepherds (96 km). Visit Betaab Valley and Chandanwari. Walk along the Lidder River. Return to Srinagar." },
      { day: "Day 5", title: "Sonamarg Day Trip", description: "Drive to Sonamarg — Meadow of Gold (87 km). Visit Thajiwas Glacier. Pony rides available. Picturesque Sindh River valley on the return route." },
      { day: "Day 6", title: "Local Srinagar & Shopping", description: "Visit Shankaracharya Temple. Explore handicraft emporiums — pashmina shawls, paper maché artwork, walnut wood carvings, and dried fruits." },
      { day: "Day 7", title: "Departure", description: "Transfer to Srinagar Airport. Farewell to Kashmir — the paradise on Earth." },
    ],
    includes: ["Accommodation (6 nights)", "Daily breakfast & dinner", "All transfers by private vehicle", "Shikara ride on Dal Lake", "Gulmarg gondola (Phase 1)", "Sightseeing as per itinerary", "All toll & parking charges"],
    excludes: ["Airfare / train fare", "Lunch", "Personal expenses", "Gondola Phase 2", "Pony & sledge rides", "Travel insurance", "GST (5%)"],
  },
  {
    id: "ladakh",
    name: "Best of Ladakh",
    experiences: ["adventure"],
    destination: "Leh-Ladakh, India",
    category: "domestic",
    duration: "7 Nights / 8 Days",
    image: "https://images.unsplash.com/photo-1643368214091-6af1a029aee0?w=800&h=500&fit=crop&auto=format",
    highlights: ["Pangong Tso Lake", "Nubra Valley Dunes", "Khardung La Pass", "Hemis Monastery"],
    price: "₹32,000",
    priceNote: "per person (twin sharing)",
    description: "The Land of High Passes — Ladakh's raw, otherworldly landscapes, ancient monasteries, and impossibly blue lakes make it the ultimate adventure destination in India. At 3,500m above sea level, every breath here feels earned.",
    itinerary: [
      { day: "Day 1", title: "Arrival Leh — Acclimatization", description: "Arrive at Kushok Bakula Rimpochee Airport (3,524m). Rest and acclimatization are critical. Short walk around Leh market. Overnight Leh." },
      { day: "Day 2", title: "Leh Local Sightseeing", description: "Leh Palace, Shanti Stupa, Namgyal Tsemo Gompa, Spituk Monastery. Evening at leisure at the market." },
      { day: "Day 3", title: "Leh – Nubra Valley via Khardung La", description: "Drive over Khardung La — world's highest motorable pass (5,359m). Descend to Nubra Valley. Diskit Monastery and Maitreya Buddha. Bactrian double-humped camel safari at Hunder sand dunes." },
      { day: "Day 4", title: "Nubra – Pangong Lake", description: "Drive to Pangong Tso via Shyok Valley (140 km). Arrive at the spectacular high-altitude lake that shifts from turquoise to blue to silver. Overnight in lakeside camps." },
      { day: "Day 5", title: "Pangong – Leh via Chang La", description: "Early morning sunrise over Pangong. Drive back to Leh via Chang La Pass (5,360m). En route visit Hemis Monastery — Ladakh's largest." },
      { day: "Day 6", title: "Alchi – Lamayuru – Magnetic Hill", description: "Drive through Magnetic Hill, Gurudwara Pathar Sahib. Visit Alchi Monastery (11th century) and the lunar Lamayuru landscape." },
      { day: "Day 7", title: "Tsomoriri / Leisure", description: "Day at leisure or optional excursion to Tsomoriri Lake. Sunset walk in Leh old town. Final evening dinner." },
      { day: "Day 8", title: "Departure", description: "Transfer to Leh Airport. Farewell to the Land of High Passes." },
    ],
    includes: ["Accommodation (7 nights)", "All meals (breakfast + dinner)", "Private vehicle with driver", "Inner Line Permits", "Camel safari at Nubra", "All sightseeing", "Oxygen cylinder (emergency)"],
    excludes: ["Airfare", "Lunch", "Rafting / ATV activities", "Personal expenses", "Travel insurance", "Alcoholic beverages"],
  },
  {
    id: "kerala",
    name: "God's Own Country — Kerala",
    destination: "Kerala, India",
    category: "domestic",
    duration: "5 Nights / 6 Days",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&h=500&fit=crop&auto=format",
    highlights: ["Alleppey Houseboat", "Munnar Tea Estates", "Fort Kochi Heritage", "Kovalam Beach"],
    price: "₹22,000",
    priceNote: "per person (twin sharing)",
    description: "Drift through emerald backwaters on a traditional kettuvallam houseboat, walk through misty cardamom-scented tea gardens, and unwind on pristine beaches. Kerala is India's most tranquil and diverse state.",
    itinerary: [
      { day: "Day 1", title: "Arrival Kochi", description: "Arrive at Cochin International Airport. Evening visit to Fort Kochi — Chinese fishing nets, St. Francis Church, Mattancherry Palace." },
      { day: "Day 2", title: "Kochi – Munnar", description: "Drive to Munnar (130 km). Lush tea estates line the route. Arrive evening. Check-in to hill resort." },
      { day: "Day 3", title: "Munnar Sightseeing", description: "Eravikulam National Park (home to endangered Nilgiri Tahr), Tea Museum, Echo Point, Mattupetty Dam, Blossom Hydel Park." },
      { day: "Day 4", title: "Munnar – Alleppey Houseboat", description: "Drive to Alleppey (170 km). Board your premium houseboat. Cruise through the tranquil backwaters of Vembanad Lake. Full board on houseboat." },
      { day: "Day 5", title: "Alleppey – Kovalam Beach", description: "Morning backwater cruise. Disembark and drive to Kovalam (170 km). Check-in to beach resort. Visit the iconic lighthouse." },
      { day: "Day 6", title: "Kovalam – Departure", description: "Morning swim or Ayurvedic session (optional). Transfer to Trivandrum Airport for onward journey." },
    ],
    includes: ["Accommodation (5 nights incl. houseboat)", "Daily breakfast + dinner", "Houseboat full board (lunch included)", "All transfers by AC vehicle", "Eravikulam National Park entry", "Tea Museum entry", "Lighthouse entry fee"],
    excludes: ["Airfare", "Lunch except houseboat day", "Ayurvedic treatments", "Water sports", "Personal expenses", "GST"],
  },
  {
    id: "goa",
    name: "Goa — Sun, Sand & Spice",
    destination: "Goa, India",
    category: "domestic",
    duration: "3 Nights / 4 Days",
    image: "https://images.unsplash.com/photo-1623815616454-f4de13de2634?w=800&h=500&fit=crop&auto=format",
    highlights: ["North & South Goa Beaches", "Old Goa Churches", "Dudhsagar Falls", "Sunset at Vagator"],
    price: "₹14,500",
    priceNote: "per person (twin sharing)",
    description: "Sun, sand, Portuguese spires and fresh seafood — Goa delivers a vibrant mix of beach life, heritage, and flavour that's hard to resist, whether you're here for the first time or the fifteenth.",
    itinerary: [
      { day: "Day 1", title: "Arrival Goa", description: "Arrive at Goa International Airport. Transfer to hotel. Evening at Calangute or Baga Beach. Sunset and seafood dinner by the shore." },
      { day: "Day 2", title: "North Goa Sightseeing", description: "Fort Aguada, Anjuna Flea Market, Chapora Fort, Vagator Beach. Evening at Anjuna's beachside cafes." },
      { day: "Day 3", title: "Old Goa + South Goa", description: "Se Cathedral, Basilica of Bom Jesus, Colva Beach, Benaulim Village. Dudhsagar Falls day trip (seasonal, June–October)." },
      { day: "Day 4", title: "Leisure + Departure", description: "Morning at leisure. Shopping at Panaji's Municipal Market. Transfer to airport." },
    ],
    includes: ["Hotel (3 nights, AC room)", "Daily breakfast", "Airport transfers", "North + South Goa sightseeing by vehicle", "Old Goa church entry fees"],
    excludes: ["Airfare", "Lunch & dinner", "Water sports", "Dudhsagar jeep safari", "Personal expenses"],
  },
  {
    id: "golden-triangle",
    name: "The Golden Triangle",
    destination: "Delhi – Agra – Jaipur",
    category: "domestic",
    duration: "5 Nights / 6 Days",
    image: "https://images.unsplash.com/photo-1523980077198-60824a7b2148?w=800&h=500&fit=crop&auto=format",
    highlights: ["Taj Mahal at Sunrise", "Amber Fort Jaipur", "Qutub Minar Delhi", "Fatehpur Sikri"],
    price: "₹18,500",
    priceNote: "per person (twin sharing)",
    description: "India's most iconic circuit — Mughal grandeur at Agra, Delhi's layered millennia, and the Pink City's Rajput heritage. The three most photographed sights in India in one seamless journey.",
    itinerary: [
      { day: "Day 1", title: "Arrive Delhi", description: "Arrive at Delhi Airport. Transfer to hotel. Evening at Connaught Place." },
      { day: "Day 2", title: "Delhi Sightseeing", description: "India Gate, Humayun's Tomb, Qutub Minar, Lotus Temple, Red Fort, Chandni Chowk. Street food walk in Old Delhi." },
      { day: "Day 3", title: "Delhi – Agra", description: "Drive to Agra (230 km). Agra Fort in the afternoon. Evening at Mehtab Bagh — moonlight view of the Taj Mahal." },
      { day: "Day 4", title: "Taj Mahal + Fatehpur Sikri", description: "Taj Mahal at sunrise — the most breathtaking hour of the trip. Drive to Jaipur via Fatehpur Sikri, Akbar's abandoned red sandstone capital (UNESCO)." },
      { day: "Day 5", title: "Jaipur Sightseeing", description: "Amber Fort, Jaigarh Fort, City Palace, Jantar Mantar (UNESCO), Hawa Mahal, local bazaars." },
      { day: "Day 6", title: "Jaipur – Departure", description: "Morning shopping at Johari Bazaar. Transfer to Jaipur Airport or Jaipur Junction." },
    ],
    includes: ["5 nights hotel accommodation", "Daily breakfast", "AC vehicle throughout", "Taj Mahal entry", "All sightseeing as per itinerary", "Driver bata & toll"],
    excludes: ["Airfare / train fare", "Lunch & dinner", "Elephant ride at Amber Fort", "Personal expenses", "Camera fees at monuments"],
  },
  {
    id: "sri-lanka",
    name: "Sri Lanka Pilgrimage",
    experiences: ["meditate-discover"],
    destination: "Sri Lanka",
    category: "international",
    duration: "6 Nights / 7 Days",
    image: sriLankaImage,
    imageAlt: "Sigiriya rock fortress rising above its ancient gardens in Sri Lanka",
    imagePosition: "50% 25%",
    highlights: ["Adam's Peak Sunrise Climb", "Temple of the Tooth Kandy", "Sigiriya Rock Fortress", "Kelaniya Temple"],
    price: "₹55,000",
    priceNote: "per person (twin sharing, includes visa)",
    description: "A sacred and scenic journey through the Resplendent Isle — visiting ancient Buddhist stupas, jungle-clad rock fortresses, and colonial highlands. Sri Lanka rewards the soul as much as the eye.",
    itinerary: [
      { day: "Day 1", title: "Arrive Colombo", description: "Arrive at Bandaranaike International Airport. Transfer to hotel. Visit Kelaniya Raja Maha Viharaya, one of the most venerated Buddhist temples in Sri Lanka." },
      { day: "Day 2", title: "Colombo – Anuradhapura", description: "Drive to the ancient capital Anuradhapura (200 km). Sri Maha Bodhi, Ruwanwelisaya Stupa, Jethavanaramaya." },
      { day: "Day 3", title: "Anuradhapura – Sigiriya – Kandy", description: "Sigiriya Rock Fortress (UNESCO). Dambulla Cave Temples. Drive to Kandy through the hill country." },
      { day: "Day 4", title: "Kandy", description: "Temple of the Sacred Tooth Relic, Kandy Cultural Show, Peradeniya Royal Botanical Gardens. Evening Kandy Lake walk." },
      { day: "Day 5", title: "Nuwara Eliya – Adam's Peak", description: "Scenic train journey through tea country. Horton Plains World's End viewpoint. Overnight near Adam's Peak base." },
      { day: "Day 6", title: "Adam's Peak Pilgrimage Climb", description: "Pre-dawn ascent of Sri Pada (2,243m). Sunrise from the summit is extraordinary. Return to hotel, drive to Colombo." },
      { day: "Day 7", title: "Colombo – Departure", description: "Last-minute shopping at Pettah Market. Transfer to airport for return flight." },
    ],
    includes: ["6 nights accommodation", "Daily breakfast + dinner", "AC vehicle throughout", "Visa assistance", "All entry fees", "English-speaking guide", "Airport transfers"],
    excludes: ["International airfare", "Lunch", "Personal expenses", "Travel insurance", "Tips for guide & driver"],
  },
  {
    id: "dubai",
    name: "Dazzling Dubai",
    destination: "Dubai, UAE",
    category: "international",
    duration: "4 Nights / 5 Days",
    image: "https://images.unsplash.com/flagged/photo-1559717201-fbb671ff56b7?w=800&h=500&fit=crop&auto=format",
    highlights: ["Burj Khalifa At the Top", "Desert Safari & BBQ", "Dubai Mall Fountain", "Dhow Cruise Marina"],
    price: "₹62,000",
    priceNote: "per person (twin sharing, includes visa)",
    description: "From the world's tallest building to golden desert dunes, Dubai blends audacious architecture with ancient Bedouin traditions. A city of superlatives that consistently exceeds expectations.",
    itinerary: [
      { day: "Day 1", title: "Arrive Dubai", description: "Arrive at Dubai International Airport. Visa assistance. Transfer to hotel. Evening exploration of Dubai Marina." },
      { day: "Day 2", title: "Dubai City Tour", description: "Gold Souk, Spice Souk, Deira, Burj Al Arab exterior, Jumeirah Mosque, Al Fahidi Historical District, Abra water taxi ride across Dubai Creek." },
      { day: "Day 3", title: "Burj Khalifa + Dubai Mall", description: "Burj Khalifa At the Top (124th floor, 828m). Dubai Mall. Aquarium & Underwater Zoo. Evening Dubai Fountain Show." },
      { day: "Day 4", title: "Desert Safari", description: "Morning at leisure. Afternoon desert safari — dune bashing in 4WD, camel riding, sandboarding, belly dance, fire show. BBQ buffet dinner under the stars." },
      { day: "Day 5", title: "Dhow Cruise + Departure", description: "Morning at leisure. Evening traditional Dhow Cruise along Dubai Creek (if flight permits). Transfer to airport." },
    ],
    includes: ["4 nights hotel (4-star)", "Daily breakfast", "Airport transfers", "City tour", "Burj Khalifa (124th floor)", "Desert safari with BBQ dinner", "Dhow Cruise", "Visa assistance"],
    excludes: ["International airfare", "Lunch & non-buffet dinners", "Personal shopping", "Travel insurance", "Dubai Frame / Global Village entry"],
  },
  {
    id: "mahabaleshwar",
    name: "Mahabaleshwar Weekend",
    destination: "Mahabaleshwar, Maharashtra",
    category: "weekend",
    duration: "1 Night / 2 Days",
    image: mahabaleshwarImage,
    imageAlt: "Elephant's Head rock formation at Needle Hole Point in Mahabaleshwar, Maharashtra",
    imagePosition: "45% 45%",
    highlights: ["Venna Lake Boating", "Mapro Garden", "Wilson Point Sunrise", "Elephant Head Viewpoint"],
    price: "₹5,500",
    priceNote: "per person (twin sharing)",
    description: "Maharashtra's favourite hill station — famous for strawberries, panoramic viewpoints, and cool misty air. Just a few hours from Pune and Mumbai, perfect for a rejuvenating weekend escape.",
    itinerary: [
      { day: "Day 1", title: "Arrive + Explore", description: "Arrive Mahabaleshwar. Check-in to hotel. Afternoon — Wilson Point (highest point, 1,438m), Bombay Point for sunset, Venna Lake boating. Evening strawberry shopping." },
      { day: "Day 2", title: "Viewpoints + Departure", description: "Morning — Elephant Head Point, Lodwick Point, Elphinstone Point. Visit Mapro Garden. Lunch at a local restaurant. Depart." },
    ],
    includes: ["Hotel (1 night, AC room)", "Breakfast", "Local sightseeing by vehicle", "Venna Lake boating entry"],
    excludes: ["Transport from your city", "Lunch & dinner", "Personal expenses", "Horse riding"],
  },
];

const FEATURED_DESTINATIONS = [
  { id: "kerala", name: "Kerala", category: "domestic" },
  { id: "kashmir", name: "Kashmir", category: "domestic" },
  { id: "bodhgaya", name: "Bodhgaya", location: "Bihar, India", category: "domestic", image: bodhgayaImage, imageAlt: "Mahabodhi Temple and its gardens in Bodhgaya, Bihar, India", imagePosition: "50% 0%" },
  { id: "bhutan", name: "Bhutan", location: "Eastern Himalayas", category: "international", image: bhutanImage, imageAlt: "Tiger's Nest monastery perched on a cliff above Paro Valley, Bhutan", imagePosition: "45% 55%" },
  { id: "bali", name: "Bali", location: "Bali, Indonesia", category: "international", image: baliImage, imageAlt: "Ulun Danu Beratan temple beside Lake Beratan in Bali, Indonesia", imagePosition: "62% 45%" },
  { id: "sri-lanka", name: "Sri Lanka", category: "international" },
] as const;

const HERO_IMAGE: GalleryImage = {
  src: "https://images.unsplash.com/photo-1621232082074-1a7750ecc557?w=1920&h=1080&fit=crop&auto=format",
  alt: "Forested green valley in Kashmir",
  position: "50% 40%",
};

const PHOTO_CREDITS = [
  { title: "Mahabodhi Temple, Bodhgaya", creator: "WeeKeeEditor / Kavit", source: "https://commons.wikimedia.org/wiki/File:Mahabodhi_Temple_-_Bodh_Gaya.jpg", license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/" },
  { title: "Tiger's Nest, Bhutan", creator: "Nina R; edit by UnpetitproleX", source: "https://commons.wikimedia.org/wiki/File:Paro_Taktsang,_Bhutan_(edited).jpg", license: "CC BY 2.0", licenseUrl: "https://creativecommons.org/licenses/by/2.0/" },
  { title: "Ulun Danu Beratan, Bali", creator: "Unsplash", source: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62", license: "Unsplash License", licenseUrl: "https://unsplash.com/license" },
  { title: "Sigiriya, Sri Lanka", creator: "Bernard Gagnon", source: "https://commons.wikimedia.org/wiki/File:Sigiriya.jpg", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
  { title: "Needle Hole Point, Mahabaleshwar", creator: "Rishabh Tatiraju", source: "https://commons.wikimedia.org/wiki/File:Needle_Hole_Point_Mahabaleshwar.JPG", license: "CC BY-SA 3.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/" },
];

function HelicopterIcon({ size = 24, className }: { size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="M5 3h14M12 3v5M8 8h7a5 5 0 0 1 5 5v2H9l-4-5H2V6M12 8v7M9 15v5m8-5v5M6 20h15" />
  </svg>;
}

const SERVICES = [
  { id: "air", icon: Plane, name: "Air Ticket", description: "Domestic and international flight bookings at competitive fares. All major airlines covered — IndiGo, Air India, Emirates, and more." },
  { id: "bus", icon: Bus, name: "Bus Reservation", description: "Volvo, sleeper, and luxury bus bookings across India. AC and non-AC options available for all routes." },
  { id: "train", icon: Train, name: "Train Ticket", description: "Indian Railways booking assistance for all classes and categories including tatkal and premium tatkal." },
  { id: "hotel", icon: Hotel, name: "Hotel Booking", description: "Budget guesthouses to 5-star luxury resorts — domestic and international hotel reservations at best available rates." },
  { id: "passport", icon: FileText, name: "Passport Assistance", description: "Fresh passport applications and renewal guidance. Complete document checklist, form filling, and appointment support." },
  { id: "visa", icon: Globe, name: "Visa Assistance", description: "Tourist, business, and transit visas for UK, Schengen, Dubai, Thailand, Sri Lanka, and 50+ countries." },
  { id: "forex", icon: CreditCard, name: "Forex Assistance", description: "Foreign currency exchange and prepaid travel cards at competitive rates. All major currencies available." },
  { id: "insurance", icon: Shield, name: "Travel Insurance", description: "Comprehensive single-trip and annual multi-trip insurance covering medical emergencies, trip cancellation, and baggage loss." },
  { id: "car", icon: Car, name: "Car Rental", description: "Self-drive and chauffeur-driven vehicles for airport transfers, outstation trips, and local sightseeing across India." },
  { id: "sim", icon: Smartphone, name: "International SIM", description: "Pre-activated international SIM cards for 100+ countries — affordable data and calling plans for hassle-free connectivity abroad." },
  { id: "event", icon: Gift, name: "Event Management", description: "Corporate team outings, family tours, school excursions, honeymoon packages, and MICE events." },
  { id: "visa-passport", icon: FileText, name: "Visa & Passport Club", description: "Visa and passport guidance in one place, from document checklists to application and renewal assistance. This is a combined assistance service, not a membership programme." },
  { id: "helicopter", icon: HelicopterIcon, name: "Helicopter Ride", description: "Enquire about helicopter travel for your destination. Routes, operator availability, permissions, weather conditions, and fares must be confirmed before booking." },
];

const HOME_SERVICE_IDS = ["visa-passport", "air", "train", "helicopter", "hotel", "event"];
const HOME_SERVICES = HOME_SERVICE_IDS.map(id => SERVICES.find(service => service.id === id)!);

// Publish only approved affiliations and offers. Empty collections intentionally show honest states.
const ASSOCIATIONS: { name: string; logo: string }[] = [];
const OFFERS: { id: string; title: string; benefit: string; tourId: string; validUntil: string; terms: string; announcement: string }[] = [];

const TESTIMONIALS = [
  { name: "Priya Deshmukh", location: "Pune", tour: "Kashmir Valley Escape", rating: 5, text: "Ellora Tours made our Kashmir trip absolutely magical. The houseboat experience on Dal Lake was beyond our expectations. Every detail — from transfers to meals — was perfectly arranged. Will travel with them again." },
  { name: "Rahul Patil", location: "Aurangabad", tour: "Best of Ladakh", rating: 5, text: "A life-changing trip. The Pangong Lake sunrise was something I will carry with me forever. The team handled oxygen cylinders, permits, and all logistics without a single hiccup. Highly recommended!" },
  { name: "Sunita Kulkarni & Family", location: "Nashik", tour: "Kerala Backwaters", rating: 5, text: "Our family trip to Kerala was perfectly planned. The houseboat day was the highlight — even my elderly parents loved it. Ellora Tours handled everything so seamlessly. Worth every rupee." },
];

const STATS = [
  { value: "25", label: "Years of Experience" },
  { value: "50+", label: "Destinations" },
  { value: "10,000+", label: "Happy Clients" },
  { value: "500+", label: "Tours" },
];

const FIXED_DEPARTURES = ["Rajasthan", "Himachal", "Andaman", "Dubai", "Thailand", "Vietnam"].map(destination => ({
  destination, date: "Dates to be announced", duration: "On enquiry", availability: "Unconfirmed", price: "On enquiry",
}));

const TOUR_FILTERS: { f: FilterType; label: string }[] = [
  { f: "all", label: "All Tours" },
  { f: "domestic", label: "Domestic" },
  { f: "international", label: "International" },
  { f: "weekend", label: "Weekend Getaways" },
  { f: "wild-safari", label: "Wild Safari" },
  { f: "strangers", label: "Strangers Package" },
  { f: "adventure", label: "Adventure Packages" },
  { f: "meditate-discover", label: "Meditate & Discover" },
];

function matchesTourFilter(tour: Tour, filter: FilterType) {
  return filter === "all" || tour.category === filter || tour.experiences?.some(experience => experience === filter) === true;
}

// shared style tokens
const card = "bg-white border border-border shadow-sm";
const cardHover = "hover:border-primary hover:shadow-md";
const inputCls = "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary transition-colors";
const sectionAlt = "bg-background";
const labelTxt = "text-primary text-xs font-bold tracking-widest uppercase";
const bodyTxt = "text-muted-foreground text-sm leading-relaxed";
const mutedTxt = "text-muted-foreground";

// ─────────────────────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [tourFilter, setTourFilter] = useState<FilterType>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", destination: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setExpandedDay(null);
  }, [page, selectedTour]);

  const navigate = (p: Page, tour?: Tour) => {
    setMenuOpen(false);
    setPage(p);
    if (tour) setSelectedTour(tour);
  };

  const enquire = (destination: string) => {
    setFormData(current => ({ ...current, destination }));
    navigate("contact");
  };

  const navLinks = [
    { label: "Home", p: "home" },
    { label: "Tours", p: "tours" },
    { label: "Services", p: "services" },
    { label: "About", p: "about" },
    { label: "Contact", p: "contact" },
  ] as const;

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "var(--font-body)" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || page !== "home"
          ? "bg-background backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => navigate("home")} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow">
              ET
            </div>
            <div>
              <div className={`text-base font-bold leading-tight ${scrolled || page !== "home" ? "text-primary" : "text-white"}`} style={{ fontFamily: "var(--font-display)" }}>
                Ellora Tours
              </div>
              <div className={`text-[9px] tracking-widest uppercase leading-tight ${scrolled || page !== "home" ? "text-muted-foreground" : "text-white"}`}>
                &amp; Travels
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, p }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  page === p
                    ? "bg-primary text-white shadow"
                    : scrolled || page !== "home"
                      ? "text-primary hover:text-primary-hover hover:bg-muted"
                      : "text-white hover:text-white hover:bg-primary"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("contact")}
              className="ml-3 px-5 py-2 bg-primary text-white font-bold rounded-full text-sm hover:bg-primary-hover transition-all shadow"
            >
              Book Now
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className={`md:hidden p-2 ${scrolled || page !== "home" ? "text-primary" : "text-white"}`} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-2 shadow-md">
            {navLinks.map(({ label, p }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`text-left py-2.5 text-sm font-semibold transition-colors ${
                  page === p ? "text-primary" : "text-foreground hover:text-primary-hover"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("contact")}
              className="mt-2 w-full py-3 bg-primary text-white font-bold rounded-xl text-sm"
            >
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* PAGES */}
      <main>
      {page === "home" && <HomePage navigate={navigate} enquire={enquire} />}
      {page === "tours" && <ToursPage filter={tourFilter} setFilter={setTourFilter} navigate={navigate} />}
      {page === "tour-detail" && selectedTour && (
        <TourDetailPage tour={selectedTour} expandedDay={expandedDay} setExpandedDay={setExpandedDay} navigate={navigate} />
      )}
      {page === "services" && <ServicesPage navigate={navigate} />}
      {page === "about" && <AboutPage navigate={navigate} />}
      {page === "contact" && <ContactPage formData={formData} setFormData={setFormData} />}
      </main>

      {/* FOOTER */}
      <footer className="bg-primary pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-sm">ET</div>
              <div>
                <div className="text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Ellora Tours</div>
                <div className="text-[9px] text-white tracking-widest uppercase">&amp; Travels · Aurangabad</div>
              </div>
            </div>
            <p className="text-white text-xs leading-relaxed mb-5">
              Turning your travel dreams into unforgettable memories since 2009. Your journey is our passion.
            </p>
            <div className="flex gap-2">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" aria-label={["Facebook", "YouTube", "Instagram"][i]} className="w-8 h-8 rounded-full bg-primary border border-white flex items-center justify-center text-white hover:bg-primary-hover transition-colors">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">Domestic Tours</h4>
            <ul className="space-y-2">
              {["Kashmir", "Leh-Ladakh", "Kerala", "Himachal Pradesh", "Goa", "Andaman", "Darjeeling - Sikkim", "Bangalore - Mysore - Ooty"].map(d => (
                <li key={d}>
                  <button onClick={() => navigate("tours")} className="text-white text-xs hover:underline decoration-accent underline-offset-4 transition-colors">{d}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">International Tours</h4>
            <ul className="space-y-2">
              {["Sri Lanka", "Thailand", "Dubai", "Europe", "Singapore - Malaysia", "Bali", "Maldives"].map(d => (
                <li key={d}>
                  <button onClick={() => navigate("tours")} className="text-white text-xs hover:underline decoration-accent underline-offset-4 transition-colors">{d}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs mb-4 tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <Phone size={13} className="text-white mt-0.5 shrink-0" />
                <span className="text-white text-xs leading-relaxed">
                  <a href="tel:+919422203584" className="hover:underline">+91 9422203584</a><br />
                  <a href="tel:+918275076777" className="hover:underline">+91 8275076777</a><br />
                  <a href="tel:+918208014677" className="hover:underline">+91 8208014677</a>
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail size={13} className="text-white mt-0.5 shrink-0" />
                <span className="text-white text-xs">elloratours@gmail.com</span>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={13} className="text-white mt-0.5 shrink-0" />
                <span className="text-white text-xs">Shop No.2, Shangrilla Complex, CBS Road, Samarth Nagar, Aurangabad - 431001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white text-xs">© 2025 Ellora Tours & Travels. All rights reserved.</p>
          <p className="text-white text-xs">Explore Happiness · Aurangabad, Maharashtra</p>
        </div>
        <details className="max-w-7xl mx-auto px-4 sm:px-6 mt-5 text-white text-xs leading-relaxed">
          <summary className="cursor-pointer w-fit underline underline-offset-4">Photo &amp; font credits</summary>
          <p className="mt-4 mb-3">Destination photos are resized and compressed, with crops applied for display. Adapted photos retain their original licenses.</p>
          <ul className="space-y-2">
            {PHOTO_CREDITS.map(photo => <li key={photo.title}>
              <a href={photo.source} target="_blank" rel="noreferrer" className="underline underline-offset-4">{photo.title}</a>{" by "}{photo.creator}{". "}
              <a href={photo.licenseUrl} target="_blank" rel="noreferrer" className="underline underline-offset-4">{photo.license}</a>.
            </li>)}
          </ul>
          <p className="mt-3">Manrope and DM Sans by their respective project authors, under the <a href={fontLicense} target="_blank" rel="noreferrer" className="underline underline-offset-4">SIL Open Font License 1.1</a>.</p>
        </details>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────

function HomePage({ navigate, enquire }: { navigate: (p: Page, t?: Tour) => void; enquire: (destination: string) => void }) {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32">
        <DestinationImage {...HERO_IMAGE} priority className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/20 pointer-events-none" />

        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-accent border border-accent rounded-full px-4 py-1.5 mb-7 text-accent-foreground text-[11px] tracking-widest uppercase font-bold backdrop-blur-sm">
            <MapPin size={11} /> Based in Aurangabad · Serving All of India
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-5 drop-shadow-lg" style={{ fontFamily: "var(--font-display)" }}>
            Explore<br /><span className="text-white decoration-accent underline underline-offset-8 decoration-4">Happiness</span>
          </h1>
          <p className="text-lg md:text-xl text-white mb-10 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            From the snow-capped Himalayas to the shores of the Indian Ocean — crafted journeys for every dream.
          </p>

          <div className="flex items-center gap-2 bg-background backdrop-blur-md border border-border rounded-2xl p-2 max-w-2xl mx-auto mb-5 shadow-lg">
            <Search size={17} className="text-primary ml-3 shrink-0" />
            <input
              type="text"
              aria-label="Search destinations"
              placeholder="Where do you want to go? Kashmir, Goa, Dubai..."
              className="flex-1 min-w-0 bg-transparent text-foreground placeholder:text-muted-foreground text-sm py-2 px-2"
            />
            <button
              onClick={() => navigate("tours")}
              className="bg-primary text-white font-bold px-4 sm:px-6 py-2.5 rounded-xl text-sm hover:bg-primary-hover transition-colors shrink-0 shadow"
            >
              Explore
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-white text-xs">
            {["Kashmir", "Leh-Ladakh", "Kerala", "Dubai", "Europe", "Sri Lanka"].map(d => (
              <button key={d} onClick={() => navigate("tours")} className="hover:text-white transition-colors underline underline-offset-4 decoration-accent">
                {d}
              </button>
            ))}
          </div>
        </div>

      </section>

      {/* STATS BAR */}
      <section className="bg-background py-8 border-b-4 border-accent" aria-label="Ellora Tours in numbers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
              <div className="text-muted-foreground text-sm font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className={labelTxt + " mb-2"}>Handpicked Journeys</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>Featured Tours</h2>
          </div>
          <button onClick={() => navigate("tours")} className="flex items-center gap-2 text-primary text-sm font-semibold hover:text-primary-hover transition-colors group">
            View all tours <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_DESTINATIONS.map(destination => {
            const tour = TOURS.find(tour => tour.id === destination.id);
            return tour ? <TourCard key={tour.id} tour={tour} navigate={navigate} /> : (
              <article key={destination.id} className={`${card} rounded-2xl overflow-hidden flex flex-col`}>
                <div className="relative h-52">
                  <DestinationImage src={"image" in destination ? destination.image : ""} alt={"imageAlt" in destination ? destination.imageAlt : destination.name} position={"imagePosition" in destination ? destination.imagePosition : undefined} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">{destination.category}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2"><MapPin size={14} aria-hidden="true" />{"location" in destination ? destination.location : destination.name}</p>
                  <h3 className="text-primary font-bold text-xl leading-snug mb-3" style={{ fontFamily: "var(--font-display)" }}>{destination.name}</h3>
                  <p className="text-muted-foreground text-sm leading-7 mb-6">Itinerary, dates and pricing will be shared once confirmed.</p>
                  <div className="border-t border-border pt-4 mt-auto">
                    <p className="flex items-center gap-2 text-primary text-sm font-semibold mb-1"><Clock size={15} aria-hidden="true" />Package coming soon</p>
                    <p className="text-xs text-muted-foreground">Not yet available for booking</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ASSOCIATIONS */}
      <section className={`py-20 ${sectionAlt}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className={labelTxt + " mb-2"}>Our Travel Network</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>Associated With</h2>
          </div>
          {ASSOCIATIONS.length ? (
            <MovingStrip label="Association logos" direction="left" duration={40}>
              {ASSOCIATIONS.map(association => (
                <div key={association.name} className={`${card} w-56 rounded-xl p-6 text-center`}>
                  <DestinationImage src={association.logo} alt={association.name} className="w-full h-20 object-contain mb-3" />
                  <p className="text-sm text-primary font-semibold">{association.name}</p>
                </div>
              ))}
            </MovingStrip>
          ) : <p className={`${card} rounded-2xl p-8 text-center text-muted-foreground text-sm`}>Association details will be shared here once confirmed.</p>}
        </div>
      </section>

      {/* OFFERS */}
      <section className="py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <p className={labelTxt + " mb-2"}>Travel Updates</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>Offers</h2>
        </div>
        {OFFERS.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {OFFERS.map(offer => {
              const tour = TOURS.find(tour => tour.id === offer.tourId);
              return <article key={offer.id} className={`${card} rounded-2xl p-7`}>
                <h3 className="text-primary font-bold text-lg mb-2">{offer.title}</h3>
                <p className={bodyTxt}>{offer.benefit}</p>
                <p className={bodyTxt + " mt-3"}>Applicable tour: {tour?.name ?? offer.tourId}</p>
                <p className={bodyTxt}>Valid until: {offer.validUntil}</p>
                <p className={bodyTxt + " mb-5"}>{offer.terms}</p>
                <button onClick={() => tour ? navigate("tour-detail", tour) : enquire(offer.tourId)} className="bg-primary text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-primary-hover">{tour ? "View tour" : "Enquire about this offer"}</button>
              </article>;
            })}
          </div>
        ) : (
          <div className={`${card} rounded-2xl p-8 text-center mb-6`}>
            <p className="text-primary font-semibold mb-2">No offers are currently confirmed.</p>
            <p className={bodyTxt + " mb-5"}>Approved offers and their terms will appear here. Contact our team for current travel options.</p>
            <button onClick={() => navigate("contact")} className="bg-primary text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-primary-hover">Enquire about travel options</button>
          </div>
        )}
        <MovingStrip label="Travel announcements" direction="left" duration={40}>
          {(OFFERS.length ? OFFERS.map(offer => offer.announcement) : ["No offers are currently confirmed. Contact our team for current travel options."]).map(announcement => (
            <p key={announcement} className="whitespace-nowrap py-4 px-6 border-y-2 border-accent text-primary text-sm font-semibold">{announcement}</p>
          ))}
        </MovingStrip>
      </section>

      {/* FIXED DEPARTURES */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className={labelTxt + " mb-2"}>Plan Ahead</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>Fixed Departures</h2>
          <p className={mutedTxt + " mt-3 max-w-xl mx-auto text-sm"}>
            Departure schedules are awaiting confirmation. Enquire for dates, duration, fares, and availability.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto" role="region" aria-label="Fixed departure schedules" tabIndex={0}>
            <table className="w-full min-w-[640px]">
              <caption className="sr-only">Fixed departures. All schedules, fares, and availability are unconfirmed.</caption>
              <thead>
                <tr className="bg-background border-b border-border">
                  {["Destination", "Departure Date", "Duration", "Availability", "Price / Person", "Enquiry"].map(h => (
                    <th key={h} scope="col" className="text-left px-5 py-4 text-muted-foreground text-[10px] font-bold tracking-widest uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {FIXED_DEPARTURES.map((dep, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted transition-colors">
                    <td className="px-5 py-4 text-primary font-semibold text-sm">{dep.destination}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar size={12} className="text-primary" />{dep.date}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Clock size={12} className="text-primary" />{dep.duration}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                        {dep.availability}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-primary font-bold text-sm">{dep.price}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => enquire(dep.destination)} className="text-[11px] bg-primary border border-primary text-white px-3 py-1.5 rounded-full hover:bg-primary-hover transition-colors font-bold">
                        Enquire
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className={`py-16 ${sectionAlt} border-y border-border`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className={labelTxt + " mb-2"}>One Stop Travel Solution</p>
            <h2 className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>All Services Under One Roof</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {HOME_SERVICES.map(s => (
              <button key={s.id} onClick={() => navigate("services")} className="flex flex-col items-center gap-3 p-5 bg-white border border-border rounded-xl hover:border-primary hover:bg-muted transition-all group text-center shadow-sm">
                <s.icon size={20} className="text-primary group-hover:text-primary-hover transition-colors" />
                <span className="text-foreground text-[11px] font-semibold group-hover:text-primary-hover transition-colors leading-tight">{s.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate("services")} className="text-primary text-xs hover:text-primary-hover transition-colors underline underline-offset-4 decoration-accent font-bold">
              View all {SERVICES.length} services →
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className={labelTxt + " mb-2"}>Happy Travellers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>What Our Guests Say</h2>
        </div>
        <MovingStrip label="Guest reviews" direction="right" duration={55}>
          {TESTIMONIALS.map(t => (
            <article key={t.name} className={`${card} w-[min(320px,80vw)] md:w-96 rounded-2xl p-7 flex flex-col gap-4`}>
              <div className="flex gap-1" role="img" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} className="text-accent fill-accent" />)}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed italic">"{t.text}"</p>
              <div className="mt-auto pt-4 border-t border-border">
                <div className="font-bold text-primary text-sm">{t.name}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{t.location} · {t.tour}</div>
              </div>
            </article>
          ))}
        </MovingStrip>
      </section>

      {/* CTA BANNER */}
      <section className="mx-4 sm:mx-6 mb-20 rounded-3xl overflow-hidden relative shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1566323124805-757e5c41d37c?w=1400&h=420&fit=crop&auto=format"
          alt="Ladakh river valley"
          className="w-full h-64 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-primary/80 flex items-center">
          <div className="px-8 md:px-16 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-white text-sm mb-6 leading-relaxed">
              Call us at +91 9422203584 or send an enquiry — our team will craft the perfect itinerary within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("contact")} className="bg-accent text-accent-foreground font-bold px-6 py-2.5 rounded-full text-sm hover:bg-white hover:text-primary-hover transition-colors shadow">
                Get a Free Quote
              </button>
              <button onClick={() => navigate("tours")} className="border border-white text-white px-6 py-2.5 rounded-full text-sm hover:bg-primary-hover hover:text-white transition-colors font-semibold">
                Browse All Tours
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUR CARD
// ─────────────────────────────────────────────────────────────────────────────

function TourCard({ tour, navigate }: { tour: Tour; navigate: (p: Page, t?: Tour) => void }) {
  return (
    <article className={`group relative ${card} ${cardHover} rounded-2xl overflow-hidden transition-all flex flex-col`}>
      <div className="relative overflow-hidden h-52 shrink-0 bg-background">
        <DestinationImage src={tour.image} alt={tour.imageAlt ?? tour.destination} position={tour.imagePosition} className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full capitalize shadow">
            {tour.category === "weekend" ? "Weekend" : tour.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-background backdrop-blur-sm text-primary text-sm font-bold px-3 py-1.5 rounded-full shadow">
          {tour.price}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-2">
          <MapPin size={14} aria-hidden="true" />{tour.destination}
        </div>
        <h3 className="text-primary font-bold text-xl mb-3 group-hover:text-primary-hover transition-colors leading-snug" style={{ fontFamily: "var(--font-display)" }}>
          {tour.name}
        </h3>
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <Clock size={14} aria-hidden="true" />{tour.duration}
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {tour.highlights.slice(0, 3).map(h => (
            <span key={h} className="bg-muted text-foreground text-xs px-2.5 py-1 rounded-full">{h}</span>
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 pt-4 mt-auto border-t border-border">
          <div>
            <span className="text-primary font-bold text-lg tabular-nums">{tour.price}</span>
            <span className="text-muted-foreground text-xs ml-1">/ person</span>
          </div>
          <button onClick={() => navigate("tour-detail", tour)} aria-label={`View details for ${tour.name}`} className="flex items-center gap-1 text-primary text-sm font-bold group-hover:gap-2 transition-all after:absolute after:inset-0 after:content-['']">
            Details <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOURS PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ToursPage({ filter, setFilter, navigate }: { filter: FilterType; setFilter: (f: FilterType) => void; navigate: (p: Page, t?: Tour) => void }) {
  const filtered = TOURS.filter(tour => matchesTourFilter(tour, filter));
  const countOf = (f: FilterType) => TOURS.filter(tour => matchesTourFilter(tour, f)).length;

  return (
    <div className="pt-24 pb-20">
      <div className="relative h-56 overflow-hidden bg-background">
        <DestinationImage src="https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=1400&h=450&fit=crop&auto=format" alt="A traveller resting in the Kashmir mountains" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>All Tours</h1>
            <p className="text-white mt-2 text-sm">Domestic · International · Weekend Getaways</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter tours">
          {TOUR_FILTERS.map(({ f, label }) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              aria-controls="tour-results"
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f
                  ? "bg-primary text-white shadow"
                  : "bg-white border border-border text-foreground hover:border-primary hover:bg-muted shadow-sm"
              }`}
            >
              {label} <span className={`text-[10px] ml-1 ${filter === f ? "text-white" : "text-muted-foreground"}`}>({countOf(f)})</span>
            </button>
          ))}
        </div>
        <p className="sr-only" role="status">{filtered.length} tours in {TOUR_FILTERS.find(option => option.f === filter)?.label}</p>
        <div id="tour-results" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(tour => <TourCard key={tour.id} tour={tour} navigate={navigate} />)}
        </div>
        {filtered.length === 0 && (
          <div className={`${card} rounded-2xl p-10 text-center`}>
            <h2 className="text-primary text-xl font-bold mb-3">No tours in this collection yet.</h2>
            <p className={bodyTxt + " mb-5"}>Confirmed packages will be listed here when available. Explore our other journeys in the meantime.</p>
            <button onClick={() => setFilter("all")} className="bg-primary text-white rounded-full px-6 py-2 text-sm font-bold hover:bg-primary-hover">Browse all tours</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOUR DETAIL
// ─────────────────────────────────────────────────────────────────────────────

function TourDetailPage({ tour, expandedDay, setExpandedDay, navigate }: {
  tour: Tour; expandedDay: string | null; setExpandedDay: (d: string | null) => void; navigate: (p: Page) => void;
}) {
  const [enquirySent, setEnquirySent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", month: "", travellers: "" });
  const image = tour.banner ?? { src: tour.image, alt: tour.imageAlt ?? tour.destination, position: tour.imagePosition };

  return (
    <div className="pt-20">
      <div className="relative h-[55vh] min-h-80 overflow-hidden bg-background">
        <DestinationImage key={tour.id} {...image} priority className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/5 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
          <button onClick={() => navigate("tours")} className="flex items-center gap-1.5 text-white text-xs mb-3 hover:text-white transition-colors font-semibold">
            ← Back to all tours
          </button>
          <span className="bg-primary text-white text-[11px] font-bold px-2.5 py-1 rounded-full capitalize mb-3 inline-block shadow">
            {tour.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-2" style={{ fontFamily: "var(--font-display)" }}>{tour.name}</h1>
          <div className="flex flex-wrap items-center gap-5 mt-3">
            <div className="flex items-center gap-1.5 text-white text-sm"><MapPin size={13} className="text-white" />{tour.destination}</div>
            <div className="flex items-center gap-1.5 text-white text-sm"><Clock size={13} className="text-white" />{tour.duration}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>About This Tour</h2>
            <p className={bodyTxt}>{tour.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tour.highlights.map(h => (
                <div key={h} className="flex items-center gap-3 bg-background border border-border rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <span className="text-muted-foreground text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Day-by-Day Itinerary</h2>
            <div className="space-y-2">
              {tour.itinerary.map(item => (
                <div key={item.day} className="border border-border rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                    aria-expanded={expandedDay === item.day}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-muted transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-primary text-xs font-bold">{item.day}</span>
                      <span className="text-primary text-sm font-semibold">{item.title}</span>
                    </div>
                    <ChevronDown size={15} className={`text-primary transition-transform shrink-0 ${expandedDay === item.day ? "rotate-180" : ""}`} />
                  </button>
                  {expandedDay === item.day && (
                    <div className="px-5 py-4 bg-background text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>What's Included</h3>
              <ul className="space-y-2.5">
                {tour.includes.map(i => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="text-green-700 mt-0.5 shrink-0 font-bold">✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>What's Excluded</h3>
              <ul className="space-y-2.5">
                {tour.excludes.map(e => (
                  <li key={e} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="text-red-700 mt-0.5 shrink-0 font-bold">✗</span>{e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-border rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-primary mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{tour.price}</div>
            <div className="text-muted-foreground text-xs mb-6">{tour.priceNote}</div>

            {enquirySent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-700 text-xl font-bold">✓</span>
                </div>
                <p className="text-primary font-bold text-sm mb-1">Enquiry Sent!</p>
                <p className="text-muted-foreground text-xs">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { key: "name", placeholder: "Your Name", type: "text" },
                  { key: "phone", placeholder: "Phone Number", type: "tel" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                  { key: "travellers", placeholder: "No. of Travellers", type: "number" },
                ].map(({ key, placeholder, type }) => (
                  <input key={key} type={type} placeholder={placeholder} aria-label={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className={inputCls}
                  />
                ))}
                <select aria-label="Preferred Travel Month" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })}
                  className={inputCls + " appearance-none"}>
                  <option value="">Preferred Travel Month</option>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                    <option key={m} value={m}>{m} 2025</option>
                  ))}
                </select>
                <button onClick={() => setEnquirySent(true)}
                  className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors text-sm mt-1 shadow">
                  Send Enquiry
                </button>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-border text-center">
              <p className="text-muted-foreground text-xs mb-1">or call us directly</p>
              <a href="tel:+919422203584" className="text-primary font-bold text-sm">+91 9422203584</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className={labelTxt + " mb-2"}>What We Offer</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Our Services</h1>
          <p className={mutedTxt + " max-w-2xl mx-auto text-sm leading-relaxed"}>
            Everything you need for a seamless journey — from the moment you enquire to the day you return home.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <div key={s.name} className={`${card} ${cardHover} rounded-2xl p-7 transition-all group`}>
              <div className="w-12 h-12 rounded-xl bg-accent border border-accent flex items-center justify-center mb-5 group-hover:border-foreground transition-colors">
                <s.icon size={22} className="text-accent-foreground" />
              </div>
              <h3 className="text-primary font-bold text-lg mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.name}</h3>
              <p className={bodyTxt}>{s.description}</p>
            </div>
          ))}
        </div>
        <div className={`mt-14 text-center ${sectionAlt} border border-border rounded-3xl p-12 shadow-sm`}>
          <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>Need Something Specific?</h2>
          <p className={mutedTxt + " text-sm mb-7 max-w-md mx-auto leading-relaxed"}>
            We handle custom requests, group bookings, corporate travel, and special occasions.
          </p>
          <button onClick={() => navigate("contact")} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-hover transition-colors text-sm shadow">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────────────

function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <div className="pt-24 pb-20">
      <div className="relative h-56 overflow-hidden bg-background">
        <img src="https://images.unsplash.com/photo-1631774934803-554afa7371c9?w=1400&h=450&fit=crop&auto=format" alt="Ellora caves stone architecture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>Our Story</h1>
            <p className="text-white mt-2 text-sm">15+ years of crafting unforgettable journeys</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <p className={labelTxt + " mb-3"}>Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>
              Born in Aurangabad,<br />Rooted in India
            </h2>
            <div className="space-y-4">
              <p className={bodyTxt}>Ellora Tours & Travels was founded in Aurangabad — the city of the legendary Ellora and Ajanta caves — with a simple belief: every person deserves to experience the wonder of travel.</p>
              <p className={bodyTxt}>Over 15 years, we have grown from a small travel desk on CBS Road into one of Aurangabad's most trusted travel agencies, sending thousands of families, couples, and solo travellers to destinations across India and the world.</p>
              <p className={bodyTxt}>We are your travel partners — from crafting personalised itineraries to standing by your side when plans change unexpectedly.</p>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1631774933370-d596a344e851?w=700&h=520&fit=crop&auto=format" alt="Ellora caves visitors" className="rounded-2xl w-full object-cover h-80 shadow-lg" />
            <div className="absolute -bottom-4 -left-4 bg-primary text-white font-bold rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-2xl" style={{ fontFamily: "var(--font-display)" }}>2009</div>
              <div className="text-xs font-bold text-white">Founded in Aurangabad</div>
            </div>
          </div>
        </div>

        <div className="bg-background rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 shadow-lg">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>{s.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className={labelTxt + " mb-2"}>Why Ellora Tours</p>
          <h2 className="text-3xl font-bold text-primary" style={{ fontFamily: "var(--font-display)" }}>The Ellora Difference</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {[
            { title: "Local Expertise", body: "Deeply rooted in Aurangabad, we know India's travel landscape intimately — the hidden gems, seasonal nuances, and the best local guides." },
            { title: "Transparent Pricing", body: "No hidden charges. No last-minute surprises. What you see in the quote is exactly what you pay." },
            { title: "24/7 Support", body: "Our team is reachable during your trip for any emergency or change in plans. We treat you like family, not a booking reference number." },
            { title: "Customised Itineraries", body: "Every itinerary is tailored to your budget, interests, travel pace, dietary preferences, and mobility requirements." },
          ].map(f => (
            <div key={f.title} className={`${card} rounded-xl p-6`}>
              <h3 className="text-primary font-bold text-base mb-2" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
              <p className={bodyTxt}>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate("contact")} className="bg-primary text-white font-bold px-8 py-3 rounded-full hover:bg-primary-hover transition-colors shadow">
            Plan Your Journey With Us
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ContactPage({ formData, setFormData }: {
  formData: { name: string; email: string; phone: string; destination: string; message: string };
  setFormData: (d: any) => void;
}) {
  const [sent, setSent] = useState(false);

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className={labelTxt + " mb-2"}>Reach Out</p>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Get in Touch</h1>
          <p className={mutedTxt + " max-w-xl mx-auto text-sm leading-relaxed"}>
            Tell us where you want to go and we'll craft the perfect itinerary. No obligation — just a conversation about your dream trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, label: "Phone", value: "+91 9422203584\n+91 8275076777" },
              { icon: Mail, label: "Email", value: "elloratours@gmail.com" },
              { icon: MapPin, label: "Office", value: "Shop No.2, Shangrilla Complex, Near Kartiki Hotel, CBS Road, Samarth Nagar, Aurangabad - 431001" },
              { icon: Clock, label: "Working Hours", value: "Mon – Sat: 9:30 AM – 7:00 PM\nSunday: 10:00 AM – 2:00 PM" },
            ].map(c => (
              <div key={c.label} className={`flex gap-4 ${card} rounded-xl p-5`}>
                <div className="w-10 h-10 rounded-xl bg-accent border border-accent flex items-center justify-center shrink-0">
                  <c.icon size={17} className="text-accent-foreground" />
                </div>
                <div>
                  <div className="text-primary text-[10px] font-bold uppercase tracking-wider mb-1">{c.label}</div>
                  <div className="text-muted-foreground text-sm whitespace-pre-line leading-relaxed">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`lg:col-span-3 ${card} rounded-2xl p-8`}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                  <span className="text-green-700 text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-primary font-bold text-xl" style={{ fontFamily: "var(--font-display)" }}>Enquiry Sent!</h3>
                <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">Thank you! Our team will reach out within 24 hours to help plan your journey.</p>
                <button onClick={() => setSent(false)} className="mt-2 text-primary text-sm hover:text-primary-hover underline underline-offset-4 font-semibold">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h2 className="text-xl font-bold text-primary mb-6" style={{ fontFamily: "var(--font-display)" }}>Send an Enquiry</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" aria-label="Full Name" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  <input required type="email" aria-label="Email Address" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                </div>
                <input type="tel" aria-label="Phone Number" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
                <input type="text" aria-label="Destination of Interest" placeholder="Destination of Interest (e.g. Kashmir, Dubai, Europe...)" value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} className={inputCls} />
                <textarea rows={4} aria-label="Travel plans" placeholder="Tell us about your travel plans — travel dates, group size, budget, special requests..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={inputCls + " resize-none"} />
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors text-sm shadow">
                  Send Enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
