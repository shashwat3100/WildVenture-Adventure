/**
 * WildVenture - Core Data Store, Database Engine & Seed Data
 */

const INITIAL_USERS = [
  {
    id: "usr-admin",
    name: "System Admin",
    email: "admin@wildventure.com",
    password: "admin123",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "usr-contractor",
    name: "Vikram R. Sharma",
    email: "contractor@wildventure.com",
    password: "contractor123",
    role: "contractor",
    company: "Himalayan Wilderness Expeditions",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    id: "usr-camper",
    name: "Rahul Verma",
    email: "camper@wildventure.com",
    password: "camper123",
    role: "camper",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  }
];

const INITIAL_CAMPSITES = [
  {
    id: "camp-101",
    title: "Pine Ridge Mountain Haven",
    tagline: "Eco-friendly glamping surrounded by 100-year-old pine forests",
    category: "glamping",
    location: "Manali, Himachal Pradesh",
    coordinates: "32.2432° N, 77.1892° E",
    pricePerNight: 3499,
    rating: 4.9,
    reviewsCount: 128,
    contractorId: "con-1",
    contractorName: "Himalayan Wilderness Expeditions",
    contractor: {
      id: "con-1",
      name: "Himalayan Wilderness Expeditions",
      leadGuide: "Vikram R. Sharma",
      badge: "Master Alpine Operator",
      phone: "+91 98765 43210"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Campfire Lounge", "Solar Power", "Attached Washrooms", "Stargazing Deck", "Guided Trekking", "Meals Included"],
    difficulty: "Easy",
    maxGuests: 20,
    availableSlots: 15,
    elevation: "2,050 meters",
    altitude: "2,050 m",
    bestSeason: "Apr - Oct (Peak)",
    description: "Nestled deep in the pine valleys of Manali, Pine Ridge offer luxury waterproof geodesic domes equipped with king beds, heated blankets, and private sun decks facing snow-capped peaks.",
    itinerary: [
      { day: 1, title: "Arrival & Sunset Bonfire", detail: "Check-in at 2 PM, welcome herbal drinks, forest walk, evening BBQ and acoustic music around campfire.", desc: "Check-in at 2 PM, welcome herbal drinks, forest walk, evening BBQ and acoustic music around campfire." },
      { day: 2, title: "Pine Trail Trek & Waterfall Swim", detail: "Guided morning hike to Hidden Falls, wild herbal tea session, afternoon at leisure, stargazing workshop.", desc: "Guided morning hike to Hidden Falls, wild herbal tea session, afternoon at leisure, stargazing workshop." },
      { day: 3, title: "Sunrise Yoga & Departure", detail: "Morning yoga overlooking the valley, organic farm breakfast, check-out by 11 AM.", desc: "Morning yoga overlooking the valley, organic farm breakfast, check-out by 11 AM." }
    ],
    featured: true,
    status: "active"
  },
  {
    id: "camp-102",
    title: "Mystic River Rapids Basecamp",
    tagline: "High-adrenaline riverside camping & whitewater rafting",
    category: "riverside",
    location: "Rishikesh, Uttarakhand",
    coordinates: "30.0869° N, 78.2676° E",
    pricePerNight: 2199,
    rating: 4.8,
    reviewsCount: 210,
    contractorId: "con-2",
    contractorName: "Ganga Rapid Adventures",
    contractor: {
      id: "con-2",
      name: "Ganga Rapid Adventures",
      leadGuide: "Ananya Deshmukh",
      badge: "River Safety Expert",
      phone: "+91 98123 76543"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Beach Volleyball", "Rafting Gear Included", "Campfire", "Cliff Jumping", "Organic Meals"],
    difficulty: "Moderate",
    maxGuests: 35,
    availableSlots: 22,
    elevation: "370 meters",
    altitude: "370 m",
    bestSeason: "Sep - Jun",
    description: "Located right on the sandy banks of the roaring Ganges river, surrounded by lush Sal forests. Perfect for thrill-seekers looking for whitewater rafting, cliff jumping, and beach volleyball.",
    itinerary: [
      { day: 1, title: "River Landing & Beach Games", detail: "Check-in at 1 PM, beach volleyball tournament, evening bonfire with live barbecue.", desc: "Check-in at 1 PM, beach volleyball tournament, evening bonfire with live barbecue." },
      { day: 2, title: "16KM Whitewater Rafting & Cliff Jump", detail: "Gear up for Class III+ rapids rafting session from Shivpuri to Rishikesh with certified river guides.", desc: "Gear up for Class III+ rapids rafting session from Shivpuri to Rishikesh with certified river guides." }
    ],
    featured: true,
    status: "active"
  },
  {
    id: "camp-103",
    title: "Sahyadri Stargazer Ridge",
    tagline: "Raw wilderness camping on a high altitude cliff ridge",
    category: "wild",
    location: "Bhandardara, Maharashtra",
    coordinates: "19.5393° N, 73.7681° E",
    pricePerNight: 1499,
    rating: 4.7,
    reviewsCount: 84,
    contractorId: "con-3",
    contractorName: "Western Ghats Trekking Club",
    contractor: {
      id: "con-3",
      name: "Western Ghats Trekking Club",
      leadGuide: "Rohan Kulkarni",
      badge: "Certified Astro Guide",
      phone: "+91 97654 12390"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Telescope Deck", "Barbecue Grill", "Tent Setup Included", "First Aid Station"],
    difficulty: "Challenging",
    maxGuests: 15,
    availableSlots: 8,
    elevation: "1,100 meters",
    altitude: "1,100 m",
    bestSeason: "Oct - May",
    description: "Escape light pollution! Sahyadri Stargazer is an authentic ridge camping site offering unobstructed views of the Milky Way, meteor showers, and Arthur Lake.",
    itinerary: [
      { day: 1, title: "Ridge Ascent & Night Astronomy", detail: "Ascend to base camp by 4 PM. Set up camp, watch the sunset, and use high-powered motorized telescopes with an astronomer guide.", desc: "Ascend to base camp by 4 PM. Set up camp, watch the sunset, and use high-powered motorized telescopes with an astronomer guide." },
      { day: 2, title: "Valley Sunrise Hike", detail: "Early morning hike to sunrise point, traditional Maharashtrian breakfast, descend to base.", desc: "Early morning hike to sunrise point, traditional Maharashtrian breakfast, descend to base." }
    ],
    featured: false,
    status: "active"
  },
  {
    id: "camp-104",
    title: "Thar Desert Dune Safari Camp",
    tagline: "Royal Rajasthani desert tents under a ocean of stars",
    category: "glamping",
    location: "Jaisalmer, Rajasthan",
    coordinates: "26.9157° N, 70.9083° E",
    pricePerNight: 4299,
    rating: 4.95,
    reviewsCount: 340,
    contractorId: "con-1",
    contractorName: "Himalayan Wilderness Expeditions",
    contractor: {
      id: "con-1",
      name: "Himalayan Wilderness Expeditions",
      leadGuide: "Rawal Singh",
      badge: "Desert Safari Lead",
      phone: "+91 98765 43210"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Camel Safari", "Folk Dance & Music", "Attached Bathrooms", "Royal Buffet Dinner", "Dune Bashing"],
    difficulty: "Easy",
    maxGuests: 40,
    availableSlots: 18,
    elevation: "220 meters",
    altitude: "220 m",
    bestSeason: "Oct - Mar",
    description: "Experience the timeless allure of the Thar Desert. Stay in air-conditioned Swiss tents, ride camels across golden sand dunes, and enjoy Kalbeliya folk dances under open night skies.",
    itinerary: [
      { day: 1, title: "Sunset Camel Ride & Cultural Night", detail: "Arrive at 3 PM, sunset camel ride across Sam Sand Dunes, evening Rajasthani folk performance with traditional buffet.", desc: "Arrive at 3 PM, sunset camel ride across Sam Sand Dunes, evening Rajasthani folk performance with traditional buffet." },
      { day: 2, title: "4x4 Quad Dune Bashing & Farewell", detail: "Sunrise Jeep safari across rolling dunes, royal breakfast, check-out.", desc: "Sunrise Jeep safari across rolling dunes, royal breakfast, check-out." }
    ],
    featured: true,
    status: "active"
  },
  {
    id: "camp-105",
    title: "Zanskar Valley Survival Camp",
    tagline: "High-altitude winter wilderness survival training & trek",
    category: "survival",
    location: "Leh Ladakh, UT",
    coordinates: "34.1526° N, 77.5771° E",
    pricePerNight: 5999,
    rating: 4.9,
    reviewsCount: 62,
    contractorId: "con-2",
    contractorName: "Ganga Rapid Adventures",
    contractor: {
      id: "con-2",
      name: "Ganga Rapid Adventures",
      leadGuide: "Capt. Tashi Namgyal",
      badge: "Ex-Army Survival Specialist",
      phone: "+91 98123 76543"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Extreme Cold Sleeping Gear", "Oxygen Cylinders", "Satellite Phone Support", "Wilderness Survival Guide"],
    difficulty: "Extreme",
    maxGuests: 10,
    availableSlots: 4,
    elevation: "3,800 meters",
    altitude: "3,800 m",
    bestSeason: "May - Sep",
    description: "Designed for serious outdoor survival enthusiasts. Learn alpine shelter construction, fire making, knot tying, and sub-zero navigation guided by ex-Army mountaineers.",
    itinerary: [
      { day: 1, title: "Acclimatization & Gear Briefing", detail: "High altitude orientation, medical check, equipment check.", desc: "High altitude orientation, medical check, equipment check." },
      { day: 2, title: "Shelter Construction & Alpine Survival", detail: "Build emergency snow shelters, outdoor campfire cooking, sub-zero tent bivouac.", desc: "Build emergency snow shelters, outdoor campfire cooking, sub-zero tent bivouac." },
      { day: 3, title: "Glacier Navigation & Graduation", detail: "Crampon footwork training, glacier navigation, survival certification handover.", desc: "Crampon footwork training, glacier navigation, survival certification handover." }
    ],
    featured: true,
    status: "active"
  },
  {
    id: "camp-106",
    title: "Wayanad Rainforest Canopy Retreat",
    tagline: "Treehouse & hanging tent adventure in tropical rainforests",
    category: "wild",
    location: "Wayanad, Kerala",
    coordinates: "11.6854° N, 76.1320° E",
    pricePerNight: 2899,
    rating: 4.85,
    reviewsCount: 115,
    contractorId: "con-3",
    contractorName: "Western Ghats Trekking Club",
    contractor: {
      id: "con-3",
      name: "Western Ghats Trekking Club",
      leadGuide: "Madhavan Nair",
      badge: "Rainforest Eco Specialist",
      phone: "+91 97654 12390"
    },
    verifiedContractor: true,
    image: "https://images.unsplash.com/photo-1533873984035-25970ab07461?auto=format&fit=crop&w=1000&q=80",
    amenities: ["Treehouse Stay", "Zipline Adventure", "Spices Plantation Tour", "Natural Stream Bath"],
    difficulty: "Moderate",
    maxGuests: 18,
    availableSlots: 10,
    elevation: "900 meters",
    altitude: "900 m",
    bestSeason: "Sep - May",
    description: "Immerse yourself in lush green rainforests. Stay elevated in eco treehouses or suspended canopy tents, zip across misty valleys, and trek to hidden spice plantations.",
    itinerary: [
      { day: 1, title: "Canopy Check-in & Stream Trek", detail: "Check-in to treehouse, guided river stream trek, organic Kerala Sadhya dinner.", desc: "Check-in to treehouse, guided river stream trek, organic Kerala Sadhya dinner." },
      { day: 2, title: "Valley Ziplining & Spice Walk", detail: "Fly 500m across rainforest zipline, cardamom plantation walk, campfire.", desc: "Fly 500m across rainforest zipline, cardamom plantation walk, campfire." }
    ],
    featured: false,
    status: "active"
  }
];

const INITIAL_GEAR = [
  { id: "gear-1", name: "Ultralight 2-Person Dome Tent", category: "Shelter", pricePerDay: 350, icon: "ph-tent", image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80", stock: 15, contractorName: "Himalayan Wilderness Expeditions", specs: "Waterproof Ripstop Nylon • 2.1kg • Aluminium Poles" },
  { id: "gear-2", name: "Sub-Zero Alpine Sleeping Bag (-10°C)", category: "Sleep", pricePerDay: 200, icon: "ph-bed", image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=400&q=80", stock: 25, contractorName: "Ganga Rapid Adventures", specs: "Sub-zero -10°C Comfort • Mummy Shape • 1.4kg" },
  { id: "gear-3", name: "Portable JetBoil Camp Cooking Stove", category: "Cooking", pricePerDay: 150, icon: "ph-cooking-pot", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80", stock: 12, contractorName: "Western Ghats Trekking Club", specs: "Boils 0.5L in 100s • Piezo Igniter • Fuel Efficient" },
  { id: "gear-4", name: "Anker Solar Power Bank 24,000mAh", category: "Power", pricePerDay: 120, icon: "ph-battery-charging", image: "https://images.unsplash.com/photo-1609592424074-13eb738f6b0f?auto=format&fit=crop&w=400&q=80", stock: 20, contractorName: "Himalayan Wilderness Expeditions", specs: "Dual Solar Panels • IP67 Waterproof • Fast Charge" },
  { id: "gear-5", name: "Carbon Fiber Anti-Shock Trekking Poles", category: "Trekking", pricePerDay: 100, icon: "ph-person-simple-hike", image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=400&q=80", stock: 18, contractorName: "Western Ghats Trekking Club", specs: "Carbon Fiber • Anti-shock Spring • Extended Cork Grip" },
  { id: "gear-6", name: "Black Diamond 500-Lumen Headlamp", category: "Lighting", pricePerDay: 90, icon: "ph-flashlight", image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80", stock: 30, contractorName: "Ganga Rapid Adventures", specs: "500 Lumens • Red Night Vision • Rechargeable" }
];

const INITIAL_CONTRACTORS = [
  {
    id: "con-1",
    name: "Himalayan Wilderness Expeditions",
    owner: "Vikram R. Sharma",
    contactPerson: "Vikram R. Sharma",
    email: "vikram@himalayanwild.com",
    phone: "+91 98765 43210",
    kycStatus: "Verified",
    status: "Verified",
    rating: 4.9,
    activeListingsCount: 2,
    totalBookings: 142,
    totalRevenue: 385000,
    totalPayouts: 385000,
    pendingPayout: 48500,
    licenseNo: "EXP-IND-2024-8849",
    licenseNumber: "EXP-IND-2024-8849",
    serviceRegion: "Manali & Leh Ladakh",
    safetyAudit: "Passed (A+ Grade)",
    joinedDate: "2023-04-12"
  },
  {
    id: "con-2",
    name: "Ganga Rapid Adventures",
    owner: "Ananya Deshmukh",
    contactPerson: "Ananya Deshmukh",
    email: "contact@gangarapids.in",
    phone: "+91 98123 76543",
    kycStatus: "Verified",
    status: "Verified",
    rating: 4.8,
    activeListingsCount: 2,
    totalBookings: 215,
    totalRevenue: 412000,
    totalPayouts: 412000,
    pendingPayout: 32000,
    licenseNo: "EXP-IND-2023-4412",
    licenseNumber: "EXP-IND-2023-4412",
    serviceRegion: "Rishikesh & Uttarakhand",
    safetyAudit: "Passed (A Grade)",
    joinedDate: "2023-01-18"
  },
  {
    id: "con-3",
    name: "Western Ghats Trekking Club",
    owner: "Rohan Kulkarni",
    contactPerson: "Rohan Kulkarni",
    email: "rohan@wgtrekking.org",
    phone: "+91 97654 12390",
    kycStatus: "Verified",
    status: "Verified",
    rating: 4.7,
    activeListingsCount: 2,
    totalBookings: 98,
    totalRevenue: 195000,
    totalPayouts: 195000,
    pendingPayout: 21500,
    licenseNo: "EXP-IND-2024-1190",
    licenseNumber: "EXP-IND-2024-1190",
    serviceRegion: "Maharashtra & Kerala",
    safetyAudit: "Passed (A Grade)",
    joinedDate: "2023-08-05"
  },
  {
    id: "con-4",
    name: "Summit Seekers Trails",
    owner: "Priya Nair",
    contactPerson: "Priya Nair",
    email: "priya@summitseekers.in",
    phone: "+91 99887 66554",
    kycStatus: "Pending",
    status: "Pending",
    rating: 0.0,
    activeListingsCount: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalPayouts: 0,
    pendingPayout: 0,
    licenseNo: "EXP-IND-2026-9021",
    licenseNumber: "EXP-IND-2026-9021",
    serviceRegion: "Himachal Pradesh",
    safetyAudit: "Pending Audit",
    joinedDate: "2026-08-10"
  }
];

const INITIAL_BOOKINGS = [
  {
    id: "WV-89421",
    bookingId: "WV-89421",
    campsiteId: "camp-101",
    campTitle: "Pine Ridge Mountain Haven",
    campsiteTitle: "Pine Ridge Mountain Haven",
    customerName: "Rahul Verma",
    camperName: "Rahul Verma",
    customerEmail: "rahul.v@gmail.com",
    camperEmail: "rahul.v@gmail.com",
    customerPhone: "+91 98201 11223",
    camperPhone: "+91 98201 11223",
    checkIn: "2026-08-20",
    checkInDate: "2026-08-20",
    checkOut: "2026-08-22",
    checkOutDate: "2026-08-22",
    nights: 2,
    campers: 2,
    guestsCount: 2,
    gearAddons: [
      { name: "Sub-Zero Alpine Sleeping Bag (-10°C)", qty: 2, price: 400 },
      { name: "Anker Solar Power Bank 24,000mAh", qty: 1, price: 120 }
    ],
    selectedGear: [
      { name: "Sub-Zero Alpine Sleeping Bag (-10°C)", qty: 2, price: 400 },
      { name: "Anker Solar Power Bank 24,000mAh", qty: 1, price: 120 }
    ],
    totalAmount: 7518,
    contractorPayout: 7142,
    paymentMethod: "Credit Card (Visa **4242)",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    checkInStatus: "Upcoming",
    bookingDate: "2026-08-11",
    qrCodeData: "WV-89421-PINE-RIDGE-2026",
    contractorId: "con-1"
  },
  {
    id: "WV-89405",
    bookingId: "WV-89405",
    campsiteId: "camp-102",
    campTitle: "Mystic River Rapids Basecamp",
    campsiteTitle: "Mystic River Rapids Basecamp",
    customerName: "Sneha Patel",
    camperName: "Sneha Patel",
    customerEmail: "sneha.p@yahoo.com",
    camperEmail: "sneha.p@yahoo.com",
    customerPhone: "+91 99302 44556",
    camperPhone: "+91 99302 44556",
    checkIn: "2026-08-15",
    checkInDate: "2026-08-15",
    checkOut: "2026-08-16",
    checkOutDate: "2026-08-16",
    nights: 1,
    campers: 4,
    guestsCount: 4,
    gearAddons: [
      { name: "Ultralight 2-Person Dome Tent", qty: 2, price: 700 }
    ],
    selectedGear: [
      { name: "Ultralight 2-Person Dome Tent", qty: 2, price: 700 }
    ],
    totalAmount: 5098,
    contractorPayout: 4843,
    paymentMethod: "UPI QR (sneha@upi)",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    checkInStatus: "Checked-In",
    bookingDate: "2026-08-08",
    qrCodeData: "WV-89405-RIVER-RAPIDS-2026",
    contractorId: "con-2"
  }
];

const INITIAL_TRANSACTIONS = [
  {
    txId: "TXN-984210",
    bookingId: "WV-89421",
    customer: "Rahul Verma",
    date: "2026-08-11",
    amount: 7518,
    platformCut: 375,
    gateway: "Razorpay (Visa Card)",
    status: "Success",
    refundable: true
  },
  {
    txId: "TXN-984055",
    bookingId: "WV-89405",
    customer: "Sneha Patel",
    date: "2026-08-08",
    amount: 5098,
    platformCut: 254,
    gateway: "UPI Intent",
    status: "Success",
    refundable: true
  }
];

const INITIAL_COUPONS = {
  "WILD10": 10,
  "ADVENTURE20": 20,
  "GLAMP50": 50
};

// Storage Keys
const KEYS = {
  USERS: "wv_users_v2",
  CURRENT_USER: "wv_current_user_v2",
  CAMPSITES: "wv_campsites_v2",
  GEAR: "wv_gear_v2",
  CONTRACTORS: "wv_contractors_v2",
  BOOKINGS: "wv_bookings_v2",
  TRANSACTIONS: "wv_transactions_v2",
  COUPONS: "wv_coupons_v2",
  CURRENT_ROLE: "wv_role_v2"
};

class DataStore {
  static init() {
    try {
      const existingCamps = localStorage.getItem(KEYS.CAMPSITES);
      if (!existingCamps || existingCamps === "[]" || !existingCamps.includes('"contractor"')) {
        localStorage.setItem(KEYS.CAMPSITES, JSON.stringify(INITIAL_CAMPSITES));
      }
      if (!localStorage.getItem(KEYS.USERS) || localStorage.getItem(KEYS.USERS) === "[]") {
        localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
      }
      if (!localStorage.getItem(KEYS.CURRENT_USER)) {
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[2]));
      }
      if (!localStorage.getItem(KEYS.GEAR) || localStorage.getItem(KEYS.GEAR) === "[]") {
        localStorage.setItem(KEYS.GEAR, JSON.stringify(INITIAL_GEAR));
      }
      if (!localStorage.getItem(KEYS.CONTRACTORS) || localStorage.getItem(KEYS.CONTRACTORS) === "[]") {
        localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(INITIAL_CONTRACTORS));
      }
      if (!localStorage.getItem(KEYS.BOOKINGS)) {
        localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
      }
      if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
        localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
      }
      if (!localStorage.getItem(KEYS.COUPONS)) {
        localStorage.setItem(KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
      }
      if (!localStorage.getItem(KEYS.CURRENT_ROLE)) {
        localStorage.setItem(KEYS.CURRENT_ROLE, "camper");
      }
    } catch (e) {
      console.warn("LocalStorage access warning:", e);
    }
  }

  // --- Auth & Users ---
  static getUsers() {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || "[]");
  }

  static getCurrentUser() {
    return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER) || "null");
  }

  static setCurrentUser(user) {
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    if (user) {
      this.setCurrentRole(user.role);
    }
  }

  static login(email, password) {
    const users = this.getUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (found) {
      this.setCurrentUser(found);
      return { success: true, user: found };
    }
    return { success: false, message: "Invalid email or password" };
  }

  static register(userObj) {
    const users = this.getUsers();
    const exists = users.find(u => u.email.toLowerCase() === userObj.email.toLowerCase());
    if (exists) {
      return { success: false, message: "An account with this email already exists" };
    }
    userObj.id = `usr-${Date.now()}`;
    userObj.avatar = userObj.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";
    users.push(userObj);
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(userObj);
    return { success: true, user: userObj };
  }

  static logout() {
    localStorage.removeItem(KEYS.CURRENT_USER);
    this.setCurrentRole("camper");
  }

  // --- Campsites CRUD ---
  static getCampsites() {
    return JSON.parse(localStorage.getItem(KEYS.CAMPSITES) || "[]");
  }

  static saveCampsites(campsites) {
    localStorage.setItem(KEYS.CAMPSITES, JSON.stringify(campsites));
  }

  static updateCampsite(id, updatedFields) {
    const campsites = this.getCampsites();
    const index = campsites.findIndex(c => c.id === id);
    if (index !== -1) {
      campsites[index] = { ...campsites[index], ...updatedFields };
      this.saveCampsites(campsites);
      return campsites[index];
    }
    return null;
  }

  static deleteCampsite(id) {
    const campsites = this.getCampsites();
    const filtered = campsites.filter(c => c.id !== id);
    this.saveCampsites(filtered);
  }

  // --- Gear CRUD ---
  static getGear() {
    return JSON.parse(localStorage.getItem(KEYS.GEAR) || "[]");
  }

  static saveGear(gear) {
    localStorage.setItem(KEYS.GEAR, JSON.stringify(gear));
  }

  static updateGear(id, updatedFields) {
    const gearList = this.getGear();
    const index = gearList.findIndex(g => g.id === id);
    if (index !== -1) {
      gearList[index] = { ...gearList[index], ...updatedFields };
      this.saveGear(gearList);
      return gearList[index];
    }
    return null;
  }

  // --- Contractors ---
  static getContractors() {
    return JSON.parse(localStorage.getItem(KEYS.CONTRACTORS) || "[]");
  }

  static saveContractors(contractors) {
    localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(contractors));
  }

  // --- Bookings ---
  static getBookings() {
    return JSON.parse(localStorage.getItem(KEYS.BOOKINGS) || "[]");
  }

  static saveBookings(bookings) {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  }

  // --- Coupons ---
  static getCoupons() {
    return JSON.parse(localStorage.getItem(KEYS.COUPONS) || "{}");
  }

  // --- Roles ---
  static getCurrentRole() {
    return localStorage.getItem(KEYS.CURRENT_ROLE) || "camper";
  }

  static setCurrentRole(role) {
    localStorage.setItem(KEYS.CURRENT_ROLE, role);
  }

  // --- Database Export / Import / Reset ---
  static exportDatabase() {
    const backup = {
      timestamp: new Date().toISOString(),
      users: this.getUsers(),
      campsites: this.getCampsites(),
      gear: this.getGear(),
      contractors: this.getContractors(),
      bookings: this.getBookings(),
      coupons: this.getCoupons()
    };
    return JSON.stringify(backup, null, 2);
  }

  static importDatabase(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.campsites) localStorage.setItem(KEYS.CAMPSITES, JSON.stringify(data.campsites));
      if (data.users) localStorage.setItem(KEYS.USERS, JSON.stringify(data.users));
      if (data.gear) localStorage.setItem(KEYS.GEAR, JSON.stringify(data.gear));
      if (data.contractors) localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(data.contractors));
      if (data.bookings) localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(data.bookings));
      if (data.coupons) localStorage.setItem(KEYS.COUPONS, JSON.stringify(data.coupons));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  static resetDatabase() {
    localStorage.setItem(KEYS.USERS, JSON.stringify(INITIAL_USERS));
    localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(INITIAL_USERS[0]));
    localStorage.setItem(KEYS.CAMPSITES, JSON.stringify(INITIAL_CAMPSITES));
    localStorage.setItem(KEYS.GEAR, JSON.stringify(INITIAL_GEAR));
    localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(INITIAL_CONTRACTORS));
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    localStorage.setItem(KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
    localStorage.setItem(KEYS.COUPONS, JSON.stringify(INITIAL_COUPONS));
    localStorage.setItem(KEYS.CURRENT_ROLE, "admin");
  }
}

// Global Database API Interface wrapper
const DB = {
  get: function(key) {
    if (!key) return [];
    const norm = key.toLowerCase();
    let result = [];
    try {
      if (norm === "campsites") {
        const val = localStorage.getItem(KEYS.CAMPSITES);
        result = val ? JSON.parse(val) : [];
        if (!Array.isArray(result) || result.length === 0) {
          result = INITIAL_CAMPSITES;
          try { localStorage.setItem(KEYS.CAMPSITES, JSON.stringify(INITIAL_CAMPSITES)); } catch(e){}
        }
        return result;
      }
      if (norm === "gearcatalog" || norm === "gear") {
        const val = localStorage.getItem(KEYS.GEAR);
        result = val ? JSON.parse(val) : [];
        if (!Array.isArray(result) || result.length === 0) {
          result = INITIAL_GEAR;
          try { localStorage.setItem(KEYS.GEAR, JSON.stringify(INITIAL_GEAR)); } catch(e){}
        }
        return result;
      }
      if (norm === "contractors") {
        const val = localStorage.getItem(KEYS.CONTRACTORS);
        result = val ? JSON.parse(val) : [];
        if (!Array.isArray(result) || result.length === 0) {
          result = INITIAL_CONTRACTORS;
          try { localStorage.setItem(KEYS.CONTRACTORS, JSON.stringify(INITIAL_CONTRACTORS)); } catch(e){}
        }
        return result;
      }
      if (norm === "bookings") {
        const val = localStorage.getItem(KEYS.BOOKINGS);
        return val ? JSON.parse(val) : INITIAL_BOOKINGS;
      }
      if (norm === "transactions") {
        const val = localStorage.getItem(KEYS.TRANSACTIONS);
        return val ? JSON.parse(val) : INITIAL_TRANSACTIONS;
      }
      if (norm === "users") {
        const val = localStorage.getItem(KEYS.USERS);
        return val ? JSON.parse(val) : INITIAL_USERS;
      }
      if (norm === "coupons") {
        const val = localStorage.getItem(KEYS.COUPONS);
        return val ? JSON.parse(val) : INITIAL_COUPONS;
      }
      const val = localStorage.getItem(`wv_${norm}_v2`);
      return val ? JSON.parse(val) : [];
    } catch(err) {
      console.warn("DB.get storage error:", err);
      if (norm === "campsites") return INITIAL_CAMPSITES;
      if (norm === "gearcatalog" || norm === "gear") return INITIAL_GEAR;
      if (norm === "contractors") return INITIAL_CONTRACTORS;
      if (norm === "bookings") return INITIAL_BOOKINGS;
      if (norm === "users") return INITIAL_USERS;
      return [];
    }
  },

  set: function(key, data) {
    if (!key) return;
    const norm = key.toLowerCase();
    let storageKey = `wv_${norm}_v2`;
    if (norm === "campsites") storageKey = KEYS.CAMPSITES;
    else if (norm === "gearcatalog" || norm === "gear") storageKey = KEYS.GEAR;
    else if (norm === "contractors") storageKey = KEYS.CONTRACTORS;
    else if (norm === "bookings") storageKey = KEYS.BOOKINGS;
    else if (norm === "transactions") storageKey = KEYS.TRANSACTIONS;
    else if (norm === "users") storageKey = KEYS.USERS;
    else if (norm === "coupons") storageKey = KEYS.COUPONS;
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch(e) {
      console.warn("DB.set storage error:", e);
    }
  },

  reset: function() {
    DataStore.resetDatabase();
  }
};

// Auto init data store
DataStore.init();

// Expose globally
window.DataStore = DataStore;
window.DB = DB;
