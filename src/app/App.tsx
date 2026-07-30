import { useState, useEffect } from "react";
import {
  MapPin, Phone, Mail, Menu, X, ArrowRight, Star,
  Calendar, Clock, Users, Shield, Plane, Globe,
  ChevronDown, ChevronRight, Bus, Train, Hotel,
  CreditCard, FileText, Car, Smartphone, Gift,
  Facebook, Youtube, Instagram, Search,
} from "lucide-react";

type Page = "home" | "tours" | "tour-detail" | "services" | "about" | "contact";
type FilterType = "all" | "domestic" | "international" | "weekend";

interface Tour {
  id: string;
  name: string;
  destination: string;
  category: "domestic" | "international" | "weekend";
  duration: string;
  image: string;
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
    destination: "Sri Lanka",
    category: "international",
    duration: "6 Nights / 7 Days",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=800&h=500&fit=crop&auto=format",
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
    image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=800&h=500&fit=crop&auto=format",
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

const SERVICES = [
  { icon: Plane, name: "Air Ticketing", description: "Domestic and international flight bookings at competitive fares. All major airlines covered — IndiGo, Air India, Emirates, and more." },
  { icon: Bus, name: "Bus Reservation", description: "Volvo, sleeper, and luxury bus bookings across India. AC and non-AC options available for all routes." },
  { icon: Train, name: "Railway Reservation", description: "Indian Railways booking assistance for all classes and categories including tatkal and premium tatkal." },
  { icon: Hotel, name: "Hotel Booking", description: "Budget guesthouses to 5-star luxury resorts — domestic and international hotel reservations at best available rates." },
  { icon: FileText, name: "Passport Assistance", description: "Fresh passport applications and renewal guidance. Complete document checklist, form filling, and appointment support." },
  { icon: Globe, name: "Visa Assistance", description: "Tourist, business, and transit visas for UK, Schengen, Dubai, Thailand, Sri Lanka, and 50+ countries." },
  { icon: CreditCard, name: "Forex Assistance", description: "Foreign currency exchange and prepaid travel cards at competitive rates. All major currencies available." },
  { icon: Shield, name: "Travel Insurance", description: "Comprehensive single-trip and annual multi-trip insurance covering medical emergencies, trip cancellation, and baggage loss." },
  { icon: Car, name: "Car Rental", description: "Self-drive and chauffeur-driven vehicles for airport transfers, outstation trips, and local sightseeing across India." },
  { icon: Smartphone, name: "International SIM", description: "Pre-activated international SIM cards for 100+ countries — affordable data and calling plans for hassle-free connectivity abroad." },
  { icon: Gift, name: "Event Management", description: "Corporate team outings, family tours, school excursions, honeymoon packages, and MICE events." },
];

const TESTIMONIALS = [
  { name: "Priya Deshmukh", location: "Pune", tour: "Kashmir Valley Escape", rating: 5, text: "Ellora Tours made our Kashmir trip absolutely magical. The houseboat experience on Dal Lake was beyond our expectations. Every detail — from transfers to meals — was perfectly arranged. Will travel with them again." },
  { name: "Rahul Patil", location: "Aurangabad", tour: "Best of Ladakh", rating: 5, text: "A life-changing trip. The Pangong Lake sunrise was something I will carry with me forever. The team handled oxygen cylinders, permits, and all logistics without a single hiccup. Highly recommended!" },
  { name: "Sunita Kulkarni & Family", location: "Nashik", tour: "Kerala Backwaters", rating: 5, text: "Our family trip to Kerala was perfectly planned. The houseboat day was the highlight — even my elderly parents loved it. Ellora Tours handled everything so seamlessly. Worth every rupee." },
];

const STATS = [
  { value: "15+", label: "Years of Experience" },
  { value: "50+", label: "Destinations Covered" },
  { value: "10,000+", label: "Happy Travellers" },
  { value: "500+", label: "Tours Completed" },
];

const FIXED_DEPARTURES = [
  { destination: "Sri Lanka Pilgrimage", date: "15 Aug 2025", duration: "6N / 7D", seats: 8, price: "₹55,000" },
  { destination: "Singapore – Malaysia – Thailand", date: "01 Sep 2025", duration: "8N / 9D", seats: 12, price: "₹75,000" },
  { destination: "European Discovery", date: "10 Sep 2025", duration: "10N / 11D", seats: 6, price: "₹1,85,000" },
  { destination: "Dubai Delight", date: "25 Sep 2025", duration: "4N / 5D", seats: 15, price: "₹62,000" },
  { destination: "Leh – Ladakh", date: "05 Jun 2025", duration: "7N / 8D", seats: 10, price: "₹32,000" },
  { destination: "Shimla – Manali – Delhi", date: "20 May 2025", duration: "6N / 7D", seats: 20, price: "₹19,500" },
];

// shared style tokens
const card = "bg-white border border-amber-200/70 shadow-sm";
const cardHover = "hover:border-amber-400/50 hover:shadow-md";
const inputCls = "w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-950 placeholder-amber-400/60 outline-none focus:border-amber-400 transition-colors";
const sectionAlt = "bg-amber-50";
const labelTxt = "text-amber-600 text-xs font-bold tracking-widest uppercase";
const bodyTxt = "text-amber-900/60 text-sm leading-relaxed";
const mutedTxt = "text-amber-800/50";

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
    setPage(p);
    if (tour) setSelectedTour(tour);
  };

  const navLinks = [
    { label: "Home", p: "home" },
    { label: "Tours", p: "tours" },
    { label: "Services", p: "services" },
    { label: "About", p: "about" },
    { label: "Contact", p: "contact" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#fffbf0] text-amber-950" style={{ fontFamily: "'Nunito Sans', sans-serif" }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || page !== "home"
          ? "bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => navigate("home")} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm shadow">
              ET
            </div>
            <div>
              <div className="text-base font-bold text-amber-700 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Ellora Tours
              </div>
              <div className="text-[9px] text-amber-500/70 tracking-widest uppercase leading-tight">
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
                    ? "bg-amber-500 text-white shadow"
                    : "text-amber-800 hover:text-amber-600 hover:bg-amber-100"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("contact")}
              className="ml-3 px-5 py-2 bg-amber-500 text-white font-bold rounded-full text-sm hover:bg-amber-600 transition-all shadow"
            >
              Book Now
            </button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-amber-700 p-2" aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-amber-100 px-6 py-4 flex flex-col gap-2 shadow-md">
            {navLinks.map(({ label, p }) => (
              <button
                key={p}
                onClick={() => navigate(p)}
                className={`text-left py-2.5 text-sm font-semibold transition-colors ${
                  page === p ? "text-amber-600" : "text-amber-800 hover:text-amber-600"
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => navigate("contact")}
              className="mt-2 w-full py-3 bg-amber-500 text-white font-bold rounded-xl text-sm"
            >
              Book Now
            </button>
          </div>
        )}
      </nav>

      {/* PAGES */}
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "tours" && <ToursPage filter={tourFilter} setFilter={setTourFilter} navigate={navigate} />}
      {page === "tour-detail" && selectedTour && (
        <TourDetailPage tour={selectedTour} expandedDay={expandedDay} setExpandedDay={setExpandedDay} navigate={navigate} />
      )}
      {page === "services" && <ServicesPage navigate={navigate} />}
      {page === "about" && <AboutPage navigate={navigate} />}
      {page === "contact" && <ContactPage formData={formData} setFormData={setFormData} />}

      {/* FOOTER */}
      <footer className="bg-amber-900 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-amber-400 flex items-center justify-center text-amber-900 font-bold text-sm">ET</div>
              <div>
                <div className="text-base font-bold text-amber-200" style={{ fontFamily: "'Playfair Display', serif" }}>Ellora Tours</div>
                <div className="text-[9px] text-amber-400/60 tracking-widest uppercase">&amp; Travels · Aurangabad</div>
              </div>
            </div>
            <p className="text-amber-200/50 text-xs leading-relaxed mb-5">
              Turning your travel dreams into unforgettable memories since 2009. Your journey is our passion.
            </p>
            <div className="flex gap-2">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-amber-400/15 border border-amber-400/20 flex items-center justify-center text-amber-300 hover:bg-amber-400/25 transition-colors">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-amber-400 font-bold text-xs mb-4 tracking-widest uppercase">Domestic Tours</h4>
            <ul className="space-y-2">
              {["Kashmir", "Leh-Ladakh", "Kerala", "Himachal Pradesh", "Goa", "Andaman", "Uttarakhand", "Pilgrimage"].map(d => (
                <li key={d}>
                  <button onClick={() => navigate("tours")} className="text-amber-200/50 text-xs hover:text-amber-300 transition-colors">{d}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-amber-400 font-bold text-xs mb-4 tracking-widest uppercase">International Tours</h4>
            <ul className="space-y-2">
              {["Sri Lanka", "Thailand", "Dubai", "Europe", "Singapore–Malaysia", "Bali", "Myanmar", "Nepal"].map(d => (
                <li key={d}>
                  <button onClick={() => navigate("tours")} className="text-amber-200/50 text-xs hover:text-amber-300 transition-colors">{d}</button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-amber-400 font-bold text-xs mb-4 tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5">
                <Phone size={13} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="text-amber-200/60 text-xs">+91 9422203584<br />+91 8275076777</span>
              </li>
              <li className="flex gap-2.5">
                <Mail size={13} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="text-amber-200/60 text-xs">elloratours@gmail.com</span>
              </li>
              <li className="flex gap-2.5">
                <MapPin size={13} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="text-amber-200/60 text-xs">Shop No.2, Shangrilla Complex, CBS Road, Samarth Nagar, Aurangabad - 431001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-amber-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-amber-300/30 text-xs">© 2025 Ellora Tours & Travels. All rights reserved.</p>
          <p className="text-amber-300/30 text-xs">Explore Happiness · Aurangabad, Maharashtra</p>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (p: Page, t?: Tour) => void }) {
  const featured = TOURS.slice(0, 6);

  return (
    <div>
      {/* HERO — photo stays, overlay warmed */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1621232082074-1a7750ecc557?w=1920&h=1080&fit=crop&auto=format"
          alt="Kashmir valley green mountains"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/55 via-amber-900/25 to-[#fffbf0]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/40 rounded-full px-4 py-1.5 mb-7 text-amber-100 text-[11px] tracking-widest uppercase font-bold backdrop-blur-sm">
            <MapPin size={11} /> Based in Aurangabad · Serving All of India
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-5 drop-shadow-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            Explore<br /><span className="text-amber-300">Happiness</span>
          </h1>
          <p className="text-lg md:text-xl text-amber-50/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            From the snow-capped Himalayas to the shores of the Indian Ocean — crafted journeys for every dream.
          </p>

          <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-amber-200 rounded-2xl p-2 max-w-2xl mx-auto mb-5 shadow-lg">
            <Search size={17} className="text-amber-500 ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Where do you want to go? Kashmir, Goa, Dubai..."
              className="flex-1 bg-transparent text-amber-900 placeholder-amber-400/70 outline-none text-sm py-2 px-2"
            />
            <button
              onClick={() => navigate("tours")}
              className="bg-amber-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-amber-600 transition-colors shrink-0 shadow"
            >
              Explore
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-amber-100/70 text-xs">
            {["Kashmir", "Leh-Ladakh", "Kerala", "Dubai", "Europe", "Sri Lanka"].map(d => (
              <button key={d} onClick={() => navigate("tours")} className="hover:text-amber-300 transition-colors underline underline-offset-4 decoration-amber-300/40">
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-600/60 animate-bounce">
          <ChevronDown size={22} />
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-amber-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-white/70 text-sm font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED TOURS */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className={labelTxt + " mb-2"}>Handpicked Journeys</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>Featured Tours</h2>
          </div>
          <button onClick={() => navigate("tours")} className="flex items-center gap-2 text-amber-600 text-sm font-semibold hover:text-amber-700 transition-colors group">
            View all tours <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(tour => <TourCard key={tour.id} tour={tour} navigate={navigate} />)}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={`py-20 ${sectionAlt}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className={labelTxt + " mb-2"}>Why Travel With Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>Your Journey, Our Passion</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "15+ Years of Trust", body: "Established in Aurangabad in 2009, we have built a reputation for reliability and warmth across thousands of journeys and families served." },
              { icon: Globe, title: "50+ Destinations", body: "From Ladakh's high passes to Bali's rice terraces — our curated portfolio spans domestic pilgrimages and international adventures." },
              { icon: Users, title: "Personalised Care", body: "Every itinerary is tailored to your preferences, budget, and travel style. We are your co-travellers, not just a booking desk." },
            ].map(f => (
              <div key={f.title} className={`${card} ${cardHover} rounded-2xl p-8 transition-all group`}>
                <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
                  <f.icon size={22} className="text-amber-600" />
                </div>
                <h3 className="text-amber-950 font-bold text-lg mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
                <p className={bodyTxt}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIXED DEPARTURES */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className={labelTxt + " mb-2"}>Upcoming</p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>Fixed Departures</h2>
          <p className={mutedTxt + " mt-3 max-w-xl mx-auto text-sm"}>
            Guaranteed departure tours — book your seat and travel with like-minded explorers.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-amber-50 border-b border-amber-200">
                  {["Destination", "Departure Date", "Duration", "Seats Left", "Price / Person", ""].map(h => (
                    <th key={h} className="text-left px-5 py-4 text-amber-600/70 text-[10px] font-bold tracking-widest uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {FIXED_DEPARTURES.map((dep, i) => (
                  <tr key={i} className="border-b border-amber-100 hover:bg-amber-50/80 transition-colors">
                    <td className="px-5 py-4 text-amber-950 font-semibold text-sm">{dep.destination}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-amber-800/60 text-sm">
                        <Calendar size={12} className="text-amber-500" />{dep.date}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-amber-800/60 text-sm">
                        <Clock size={12} className="text-amber-500" />{dep.duration}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${dep.seats <= 6 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}>
                        {dep.seats} left
                      </span>
                    </td>
                    <td className="px-5 py-4 text-amber-600 font-bold text-sm">{dep.price}</td>
                    <td className="px-5 py-4">
                      <button onClick={() => navigate("contact")} className="text-[11px] bg-amber-100 border border-amber-300 text-amber-700 px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors font-bold">
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
      <section className={`py-16 ${sectionAlt} border-y border-amber-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className={labelTxt + " mb-2"}>One-Stop Travel Shop</p>
            <h2 className="text-3xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>All Services Under One Roof</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {SERVICES.slice(0, 6).map(s => (
              <button key={s.name} onClick={() => navigate("services")} className="flex flex-col items-center gap-3 p-5 bg-white border border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all group text-center shadow-sm">
                <s.icon size={20} className="text-amber-500 group-hover:text-amber-600 transition-colors" />
                <span className="text-amber-800 text-[11px] font-semibold group-hover:text-amber-900 transition-colors leading-tight">{s.name}</span>
              </button>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate("services")} className="text-amber-600 text-xs hover:text-amber-700 transition-colors underline underline-offset-4 decoration-amber-400/40 font-bold">
              View all 11 services →
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className={labelTxt + " mb-2"}>Happy Travellers</p>
          <h2 className="text-3xl md:text-4xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>What Our Guests Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className={`${card} rounded-2xl p-7 flex flex-col gap-4`}>
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-amber-800/65 text-sm leading-relaxed italic">"{t.text}"</p>
              <div className="mt-auto pt-4 border-t border-amber-100">
                <div className="font-bold text-amber-950 text-sm">{t.name}</div>
                <div className="text-amber-600/60 text-xs mt-0.5">{t.location} · {t.tour}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="mx-4 sm:mx-6 mb-20 rounded-3xl overflow-hidden relative shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1566323124805-757e5c41d37c?w=1400&h=420&fit=crop&auto=format"
          alt="Ladakh river valley"
          className="w-full h-64 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-amber-900/65 to-transparent flex items-center">
          <div className="px-8 md:px-16 max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Start Your Journey?
            </h2>
            <p className="text-amber-100/70 text-sm mb-6 leading-relaxed">
              Call us at +91 9422203584 or send an enquiry — our team will craft the perfect itinerary within 24 hours.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate("contact")} className="bg-amber-400 text-amber-950 font-bold px-6 py-2.5 rounded-full text-sm hover:bg-amber-300 transition-colors shadow">
                Get a Free Quote
              </button>
              <button onClick={() => navigate("tours")} className="border border-amber-300/50 text-amber-200 px-6 py-2.5 rounded-full text-sm hover:border-amber-300 hover:text-white transition-colors font-semibold">
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
    <div
      className={`group ${card} ${cardHover} rounded-2xl overflow-hidden transition-all cursor-pointer`}
      onClick={() => navigate("tour-detail", tour)}
    >
      <div className="relative overflow-hidden h-52 bg-amber-100">
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3">
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full capitalize shadow">
            {tour.category === "weekend" ? "Weekend" : tour.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 bg-white/85 backdrop-blur-sm text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full shadow">
          {tour.price}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-amber-500 text-[11px] mb-1.5 font-semibold">
          <MapPin size={10} />{tour.destination}
        </div>
        <h3 className="text-amber-950 font-bold text-base mb-1.5 group-hover:text-amber-700 transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
          {tour.name}
        </h3>
        <div className="flex items-center gap-1.5 text-amber-700/50 text-[11px] mb-3.5 font-semibold">
          <Clock size={10} />{tour.duration}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tour.highlights.slice(0, 3).map(h => (
            <span key={h} className="bg-amber-100 border border-amber-200 text-amber-700 text-[10px] px-2 py-0.5 rounded-full">{h}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-amber-100">
          <div>
            <span className="text-amber-600 font-bold text-sm">{tour.price}</span>
            <span className="text-amber-700/40 text-xs ml-1">/ person</span>
          </div>
          <div className="flex items-center gap-1 text-amber-600 text-xs font-bold group-hover:gap-2 transition-all">
            Details <ChevronRight size={13} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOURS PAGE
// ─────────────────────────────────────────────────────────────────────────────

function ToursPage({ filter, setFilter, navigate }: { filter: FilterType; setFilter: (f: FilterType) => void; navigate: (p: Page, t?: Tour) => void }) {
  const filtered = filter === "all" ? TOURS : TOURS.filter(t => t.category === filter);
  const countOf = (f: FilterType) => f === "all" ? TOURS.length : TOURS.filter(t => t.category === f).length;

  return (
    <div className="pt-24 pb-20">
      <div className="relative h-56 overflow-hidden bg-amber-200">
        <img src="https://images.unsplash.com/photo-1627894485200-b92fb4353967?w=1400&h=450&fit=crop&auto=format" alt="Motorcycle in Kashmir mountains" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-950/55 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>All Tours</h1>
            <p className="text-amber-100/60 mt-2 text-sm">Domestic · International · Weekend Getaways</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="flex flex-wrap gap-2 mb-10">
          {([
            { f: "all", label: "All Tours" },
            { f: "domestic", label: "Domestic Tours" },
            { f: "international", label: "International Tours" },
            { f: "weekend", label: "Weekend Getaways" },
          ] as const).map(({ f, label }) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f
                  ? "bg-amber-500 text-white shadow"
                  : "bg-white border border-amber-200 text-amber-800 hover:border-amber-400 hover:bg-amber-50 shadow-sm"
              }`}
            >
              {label} <span className={`text-[10px] ml-1 ${filter === f ? "opacity-70" : "opacity-50"}`}>({countOf(f)})</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(tour => <TourCard key={tour.id} tour={tour} navigate={navigate} />)}
        </div>
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

  return (
    <div className="pt-20">
      <div className="relative h-[55vh] min-h-80 overflow-hidden bg-amber-200">
        <img src={tour.image} alt={tour.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fffbf0] via-amber-950/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 pb-10 max-w-7xl mx-auto">
          <button onClick={() => navigate("tours")} className="flex items-center gap-1.5 text-amber-200/80 text-xs mb-3 hover:text-white transition-colors font-semibold">
            ← Back to all tours
          </button>
          <span className="bg-amber-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full capitalize mb-3 inline-block shadow">
            {tour.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-amber-950 mt-2" style={{ fontFamily: "'Playfair Display', serif" }}>{tour.name}</h1>
          <div className="flex flex-wrap items-center gap-5 mt-3">
            <div className="flex items-center gap-1.5 text-amber-800/70 text-sm"><MapPin size={13} className="text-amber-500" />{tour.destination}</div>
            <div className="flex items-center gap-1.5 text-amber-800/70 text-sm"><Clock size={13} className="text-amber-500" />{tour.duration}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>About This Tour</h2>
            <p className={bodyTxt}>{tour.description}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tour.highlights.map(h => (
                <div key={h} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-amber-800/80 text-sm">{h}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Day-by-Day Itinerary</h2>
            <div className="space-y-2">
              {tour.itinerary.map(item => (
                <div key={item.day} className="border border-amber-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                    className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-amber-50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-amber-500 text-xs font-bold">{item.day}</span>
                      <span className="text-amber-950 text-sm font-semibold">{item.title}</span>
                    </div>
                    <ChevronDown size={15} className={`text-amber-500 transition-transform shrink-0 ${expandedDay === item.day ? "rotate-180" : ""}`} />
                  </button>
                  {expandedDay === item.day && (
                    <div className="px-5 py-4 bg-amber-50 text-amber-800/65 text-sm leading-relaxed">
                      {item.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>What's Included</h3>
              <ul className="space-y-2.5">
                {tour.includes.map(i => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-amber-800/65">
                    <span className="text-green-600 mt-0.5 shrink-0 font-bold">✓</span>{i}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>What's Excluded</h3>
              <ul className="space-y-2.5">
                {tour.excludes.map(e => (
                  <li key={e} className="flex items-start gap-2.5 text-sm text-amber-800/65">
                    <span className="text-red-500/70 mt-0.5 shrink-0 font-bold">✗</span>{e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-amber-200 rounded-2xl p-6 shadow-md">
            <div className="text-3xl font-bold text-amber-600 mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>{tour.price}</div>
            <div className="text-amber-700/45 text-xs mb-6">{tour.priceNote}</div>

            {enquirySent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-100 border border-green-300 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-xl font-bold">✓</span>
                </div>
                <p className="text-amber-950 font-bold text-sm mb-1">Enquiry Sent!</p>
                <p className="text-amber-700/50 text-xs">We'll contact you within 24 hours.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {[
                  { key: "name", placeholder: "Your Name", type: "text" },
                  { key: "phone", placeholder: "Phone Number", type: "tel" },
                  { key: "email", placeholder: "Email Address", type: "email" },
                  { key: "travellers", placeholder: "No. of Travellers", type: "number" },
                ].map(({ key, placeholder, type }) => (
                  <input key={key} type={type} placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className={inputCls}
                  />
                ))}
                <select value={form.month} onChange={e => setForm({ ...form, month: e.target.value })}
                  className={inputCls + " appearance-none"}>
                  <option value="">Preferred Travel Month</option>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map(m => (
                    <option key={m} value={m}>{m} 2025</option>
                  ))}
                </select>
                <button onClick={() => setEnquirySent(true)}
                  className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors text-sm mt-1 shadow">
                  Send Enquiry
                </button>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-amber-100 text-center">
              <p className="text-amber-700/40 text-xs mb-1">or call us directly</p>
              <a href="tel:+919422203584" className="text-amber-600 font-bold text-sm">+91 9422203584</a>
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
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Our Services</h1>
          <p className={mutedTxt + " max-w-2xl mx-auto text-sm leading-relaxed"}>
            Everything you need for a seamless journey — from the moment you enquire to the day you return home.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <div key={s.name} className={`${card} ${cardHover} rounded-2xl p-7 transition-all group`}>
              <div className="w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition-colors">
                <s.icon size={22} className="text-amber-600" />
              </div>
              <h3 className="text-amber-950 font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{s.name}</h3>
              <p className={bodyTxt}>{s.description}</p>
            </div>
          ))}
        </div>
        <div className={`mt-14 text-center ${sectionAlt} border border-amber-200 rounded-3xl p-12 shadow-sm`}>
          <h2 className="text-2xl font-bold text-amber-950 mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>Need Something Specific?</h2>
          <p className={mutedTxt + " text-sm mb-7 max-w-md mx-auto leading-relaxed"}>
            We handle custom requests, group bookings, corporate travel, and special occasions.
          </p>
          <button onClick={() => navigate("contact")} className="bg-amber-500 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-600 transition-colors text-sm shadow">
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
      <div className="relative h-56 overflow-hidden bg-amber-200">
        <img src="https://images.unsplash.com/photo-1631774934803-554afa7371c9?w=1400&h=450&fit=crop&auto=format" alt="Ellora caves stone architecture" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-950/60 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Our Story</h1>
            <p className="text-amber-100/60 mt-2 text-sm">15+ years of crafting unforgettable journeys</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-20">
          <div>
            <p className={labelTxt + " mb-3"}>Who We Are</p>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-950 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
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
            <div className="absolute -bottom-4 -left-4 bg-amber-500 text-white font-bold rounded-2xl px-6 py-4 shadow-xl">
              <div className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>2009</div>
              <div className="text-xs font-bold opacity-80">Founded in Aurangabad</div>
            </div>
          </div>
        </div>

        <div className="bg-amber-500 rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 shadow-lg">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{s.value}</div>
              <div className="text-white/70 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className={labelTxt + " mb-2"}>Why Ellora Tours</p>
          <h2 className="text-3xl font-bold text-amber-950" style={{ fontFamily: "'Playfair Display', serif" }}>The Ellora Difference</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {[
            { title: "Local Expertise", body: "Deeply rooted in Aurangabad, we know India's travel landscape intimately — the hidden gems, seasonal nuances, and the best local guides." },
            { title: "Transparent Pricing", body: "No hidden charges. No last-minute surprises. What you see in the quote is exactly what you pay." },
            { title: "24/7 Support", body: "Our team is reachable during your trip for any emergency or change in plans. We treat you like family, not a booking reference number." },
            { title: "Customised Itineraries", body: "Every itinerary is tailored to your budget, interests, travel pace, dietary preferences, and mobility requirements." },
          ].map(f => (
            <div key={f.title} className={`${card} rounded-xl p-6`}>
              <h3 className="text-amber-950 font-bold text-base mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>{f.title}</h3>
              <p className={bodyTxt}>{f.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button onClick={() => navigate("contact")} className="bg-amber-500 text-white font-bold px-8 py-3 rounded-full hover:bg-amber-600 transition-colors shadow">
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
          <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h1>
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
                <div className="w-10 h-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                  <c.icon size={17} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-amber-500 text-[10px] font-bold uppercase tracking-wider mb-1">{c.label}</div>
                  <div className="text-amber-900/70 text-sm whitespace-pre-line leading-relaxed">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`lg:col-span-3 ${card} rounded-2xl p-8`}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 border border-green-300 flex items-center justify-center">
                  <span className="text-green-600 text-2xl font-bold">✓</span>
                </div>
                <h3 className="text-amber-950 font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Enquiry Sent!</h3>
                <p className="text-amber-700/55 text-sm max-w-xs leading-relaxed">Thank you! Our team will reach out within 24 hours to help plan your journey.</p>
                <button onClick={() => setSent(false)} className="mt-2 text-amber-600 text-sm hover:text-amber-700 underline underline-offset-4 font-semibold">
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4">
                <h2 className="text-xl font-bold text-amber-950 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Send an Enquiry</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputCls} />
                  <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={inputCls} />
                </div>
                <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputCls} />
                <input type="text" placeholder="Destination of Interest (e.g. Kashmir, Dubai, Europe...)" value={formData.destination} onChange={e => setFormData({ ...formData, destination: e.target.value })} className={inputCls} />
                <textarea rows={4} placeholder="Tell us about your travel plans — travel dates, group size, budget, special requests..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className={inputCls + " resize-none"} />
                <button type="submit" className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors text-sm shadow">
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
