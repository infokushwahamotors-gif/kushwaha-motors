import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import NaiveBayesClassifier from '../utils/ml-classifier';

// ── ML Training Data ──────────────────────────────────────────────────────
const TRAINING_DATA = {

  // ── Conversational / Personality ──
  greetings: {
    samples: [
      "hello", "hi", "hey", "hii", "helo", "hola", "hai", "namaste", "namaskar",
      "good morning", "good evening", "good afternoon", "good night",
      "howdy", "greetings", "are you there", "anybody there", "yo", "sup", "what's up",
      "whats up", "wassup", "salute", "नमस्ते", "नमस्कार"
    ],
    responses: [
      "नमस्ते! 🙏 Hello there! I'm **KM-AI**, your Kushwaha Motors EV assistant. I'm fully trained on all our vehicle specs, pricing, and dealer info. How can I help you today?",
      "Hi! 😊 Welcome to Kushwaha Motors! I'm KM-AI. Ask me anything about our electric scooters, rickshaws, cargo vehicles, pricing, or dealers across Nepal!"
    ]
  },

  how_are_you: {
    samples: [
      "how are you", "how are you doing", "how do you do", "are you okay", "you doing good",
      "how is it going", "hows it going", "how's life", "how are things", "feeling good",
      "you good", "you okay", "you alright", "how you doing", "how r u", "how r you",
      "kasto cha", "kasto ho"
    ],
    responses: [
      "I'm doing great, thank you for asking! 😊⚡ I'm always energized — just like our electric vehicles! I'm here and ready to help you find the perfect EV. What would you like to know?",
      "Fully charged and ready to go! 🔋💚 As an AI assistant for Kushwaha Motors, I'm always at 100%! What can I help you with today — vehicles, pricing, or dealers?"
    ]
  },

  who_are_you: {
    samples: [
      "who are you", "what are you", "tell me about yourself", "introduce yourself",
      "what is your name", "whats your name", "your name", "who is this",
      "are you a bot", "are you human", "are you ai", "are you robot",
      "who am i talking to", "who made you", "who created you", "what can you do"
    ],
    responses: [
      "I'm **KM-AI** 🤖 — the official AI assistant for **Kushwaha Motors**! I've been trained using a Naive Bayes ML algorithm on all of our vehicle specs, pricing, dealer locations, and company details. I'm here to help you choose the perfect electric vehicle for Nepal's roads!",
      "Great question! I'm **KM-AI**, a locally-trained machine learning chatbot built specifically for Kushwaha Motors. I know everything about our 2-wheelers, 3-wheelers, cargo vehicles, battery ranges, and more. I was created to make your EV buying journey easy! 🌿"
    ]
  },

  where_from: {
    samples: [
      "where are you from", "where do you come from", "where is kushwaha motors",
      "which city", "which country", "where located", "which place", "origin",
      "where is your office", "where is head office", "headquarters location",
      "timi kata ho", "nepal ma ho", "birgunj"
    ],
    responses: [
      "Kushwaha Motors is proudly based in **Birgunj, Nepal** 🇳🇵!\n\n📍 **Head Office:** Trimurti Chowk, Shreepur, Birgunj, Parsa\n\nWe have showrooms across Nepal including Bharatpur, Hetauda, Kalaiya, Tandi and more. We were founded with the mission of making sustainable electric transport accessible to every Nepali family!",
      "I'm from **Nepal** 🇳🇵 — just like our vehicles! Kushwaha Motors' headquarters is at **Trimurti Chowk, Birgunj, Parsa**. We've been serving Nepal since 2015 with quality electric vehicles. Where are you located? I can find your nearest showroom!"
    ]
  },

  thanks: {
    samples: [
      "thank you", "thanks", "thanks a lot", "thank you so much", "thx", "ty",
      "great", "awesome", "wonderful", "perfect", "excellent", "amazing",
      "helpful", "that helped", "nice", "cool", "good job", "well done",
      "dhanyabad", "shukriya", "bahut acha"
    ],
    responses: [
      "You're very welcome! 😊🌿 Happy to help! If you have any more questions about our electric vehicles, pricing, or want to book a test ride, just ask! I'm always here.",
      "धन्यवाद! 🙏 It's my pleasure! Remember, if you'd like to experience any of our vehicles in person, test rides are completely FREE at any of our showrooms. Is there anything else I can help you with?"
    ]
  },

  goodbye: {
    samples: [
      "bye", "goodbye", "see you", "see ya", "take care", "later", "ciao",
      "farewell", "ok bye", "good bye", "have a good day", "good day",
      "talk later", "will come back", "exit", "quit", "close"
    ],
    responses: [
      "Goodbye! 👋🌿 It was great chatting with you! Remember, Kushwaha Motors is always here when you're ready to go electric. Drive green, save money, and help Nepal! नमस्ते! 🙏",
      "See you soon! 🙏 Don't forget — our test rides are FREE and our team is always ready to help. Visit our nearest showroom or call **+977-9821107355** anytime!"
    ]
  },

  joke_fun: {
    samples: [
      "tell me a joke", "joke", "funny", "make me laugh", "say something funny",
      "humor", "entertain me", "fun fact", "do you joke"
    ],
    responses: [
      "😄 Why do our electric scooters never get tired?\n\nBecause they're always **fully charged**! ⚡\n\nOkay okay, but seriously — our TM007 Pro does 130 KM on a single charge. That's not a joke, that's impressive! Want to know more about it?",
      "Here's a fun EV fact! 🌿 Did you know riding our KM-E5L for a year saves enough money to buy a brand new smartphone? That's the power of going electric with Kushwaha Motors! 😄"
    ]
  },

  help: {
    samples: [
      "help", "what can you do", "what do you know", "what can i ask",
      "guide me", "options", "menu", "topics", "capabilities", "features",
      "what should i ask", "i need help", "assist me", "support"
    ],
    responses: [
      "I'm here to help! 🤖 Here's what I'm trained on:\n\n🛵 **2-Wheeler Scooters** — TM007 Pro, V7G Urban specs\n🛺 **3-Wheeler Rickshaws** — KM-E5L, FT-3, STF-3, KM-V3\n📦 **Cargo Vehicles** — YFKM MAX-60C, JC-48, LM-3\n💰 **Pricing & Financing** — NPR ranges & payment options\n📍 **Dealer Locations** — Showrooms across Nepal\n🔋 **Battery & Range** — Charging times & mileage\n🏆 **Why Choose Us** — Our advantages over competitors\n🧪 **Book Test Ride** — Free demo at any showroom\n\nJust type your question naturally and I'll understand!"
    ]
  },

  // ── Vehicle Specs ──
  scooter2w_specs: {
    samples: [
      "tell me about 2 wheelers", "what scooters do you have", "2 wheeler specs", "details of two wheelers",
      "show me scooters", "tm007 details", "v7g specs", "best scooter", "two wheeler models", "two wheel range",
      "electric scooter", "scooter nepal", "best electric scooter", "scooter price nepal", "scooter features",
      "what scooter", "which scooter", "electric bike", "e-scooter", "motor scooter"
    ],
    responses: [
      "Our 2-Wheeler lineup is engineered for high performance in Nepal:\n\n⚡ **TM007 Pro** (Performance Series)\n• Motor: Heavy-duty 2000W\n• Range: Massive 130 KM per charge\n• Battery: 72V 60Ah Lithium\n• Top Speed: 62 km/h\n• Features: Cruise Control, Dual Disc Brake, LCD Display, Anti-Theft\n\n🌿 **V7G Urban** (Commuter Series)\n• Motor: 2000W\n• Range: 120 KM per charge\n• Battery: 72V 45Ah\n• Top Speed: 58 km/h\n• Features: Anti-Theft Lock, Touch Start, Reverse Gear for easy parking\n\nBoth come with **1-year motor & controller warranty**. Which one suits you?"
    ]
  },

  threewheeler_specs: {
    samples: [
      "tell me about 3 wheelers", "what rickshaws do you sell", "passenger auto", "three wheeler details",
      "km-e5l specs", "show me autos", "tuk tuk", "school bus model", "ft-3 specs", "3 wheeler range",
      "electric rickshaw", "e-rickshaw nepal", "auto rickshaw electric", "tempo", "electric tempo",
      "stf3", "kmv3", "passenger vehicle", "rickshaw specs", "how many seats",
      "तीन पाङ्ग्रे", "तीन पाङ्ग्रे गाडी", "रिक्शा", "इलेक्ट्रिक रिक्शा", "विद्युतीय रिक्शा",
      "यात्री गाडी", "स्कूल बस", "तीन पाङ्ग्रे विवरण", "ई रिक्शा", "टेम्पो"
    ],
    responses: [
      "हाम्रो तीन पाङ्ग्रे विद्युतीय सवारी साधनहरू नेपालमा सर्वोत्तम छन्! 🛺\n\n🚌 **KM-E5L** (प्रिमियम यात्री — ६+१ सिट)\n  • दूरी: २०० किमी प्रति चार्ज\n  • मोटर: ३०००W | ब्याट्री: लिथियम ७२V २३०Ah\n  • विशेषता: एन्ड्रोइड म्युजिक प्लेयर, रियर क्यामेरा, २२०V-२०A स्वचालित चार्जर, हाई-लो गियर, हिल क्लाइम्ब सेन्सर\n\n🛺 **FT-3** (मानक यात्री रिक्शा — ४+१ सिट)\n  • दूरी: १६० किमी | मोटर: १५००W\n  • ब्याट्री: लेड एसिड वा लिथियम विकल्प\n  • विशेषता: हिल क्लाइम्ब सेन्सर, डिजिटल डिस्प्ले, डुअल ब्रेक\n\n🛺 **STF-3** (स्मार्ट सिटी रिक्शा — ४+१ सिट)\n  • दूरी: १३० किमी | मोटर: १२००W\n  • विशेषता: हाई-लो गियर, म्युजिक प्लेयर, डिस्क ब्रेक\n\n🏫 **KM-V3** (स्कूल इ-बस — १२+१ सिट!)\n  • दूरी: १६० किमी | मोटर: २२००W\n  • विशेषता: विद्यार्थीका लागि अत्यन्त सुरक्षित, म्युजिक प्लेयर, रियर क्यामेरा\n\n✅ सबै गाडीमा वारेन्टी, निःशुल्क सर्भिस र बिमा समावेश!\n\nकुन मार्गका लागि गाडी चाहिन्छ?"
    ]
  },


  cargo_specs: {
    samples: [
      "cargo vehicles", "loaders", "freight", "transport goods", "delivery vehicle", "heavy load vehicle",
      "yfkm max", "lm-3 details", "cargo loader", "goods vehicle", "jc48", "jc-48",
      "how much load", "payload", "vegetable vehicle", "sabji gaadi", "maal gaadi"
    ],
    responses: [
      "For heavy lifting, our Cargo Loaders are unmatched in Nepal:\n\n🏭 **YFKM MAX-60C** (Industrial — 1 Ton!)\n  • Payload: 1000 KG | Motor: 3500W auto-cooling\n  • Range: 180km | Body: 6×4 ft\n  • Special: Free insurance + 6 free services + 1-year road tax!\n\n🚛 **LM-3** (Medium — 800 KG)\n  • Motor: 2200W | Range: 160km | Hi-Lo gear\n  • Perfect for vegetables, fruits & hardware\n\n📦 **JC-48** (City Delivery — 600 KG)\n  • Motor: 1200W | Range: 150km | Compact for city lanes\n\nWhich load capacity do you need?"
    ]
  },

  comparison: {
    samples: [
      "compare vehicles", "which is better", "difference between tm007 and v7g", "compare rickshaws",
      "which scooter should i buy", "help me choose", "comparison of 2 wheelers",
      "tm007 vs v7g", "km-e5l vs ft3", "which one to buy", "recommend me", "suggest vehicle",
      "best for me", "which vehicle", "which model", "should i get", "better option"
    ],
    responses: [
      "Let me help you compare! 🤝\n\n**2-Wheeler: TM007 Pro vs V7G Urban**\n• Speed lover? → **TM007 Pro** (62km/h, 130km range, Cruise Control)\n• City commuter? → **V7G Urban** (58km/h, 120km range, Reverse Gear)\n\n**3-Wheeler: KM-E5L vs FT-3 vs STF-3**\n• Max passengers & range? → **KM-E5L** (6+1, 200km)\n• Standard reliable route? → **FT-3** (4+1, 160km)\n• Budget-friendly start? → **STF-3** (4+1, 130km)\n\n**Cargo: YFKM vs LM-3 vs JC-48**\n• Heavy industrial? → **YFKM MAX** (1000kg)\n• Medium loads? → **LM-3** (800kg)\n• City delivery? → **JC-48** (600kg)\n\nTell me your use case and I'll give a precise recommendation!"
    ]
  },

  why_best: {
    samples: [
      "why are you the best", "why kushwaha", "are your vehicles good", "why should i buy from you",
      "what makes you better", "quality", "reputation", "why choose kushwaha motors", "best ev in nepal",
      "is it worth it", "trustworthy", "reliable", "good company", "why electric", "why ev",
      "benefits of electric", "advantages", "better than petrol"
    ],
    responses: [
      "Here's exactly why Kushwaha Motors is Nepal's #1 EV choice! 🏆\n\n1. **Superior Technology:** True Sine Wave IoT Controllers + Auto-Cooling Motors outlast all competitors\n2. **Unbeatable Range:** Our KM-E5L delivers an incredible **200 KM** on one charge — no range anxiety!\n3. **Nepal Road Ready:** Hill Climb Sensors & tuned suspension for mountain roads\n4. **Huge Cost Savings:** NPR 0.50/km vs NPR 6.00/km for petrol = **90% fuel savings**!\n5. **Best Warranty:** 36-month Lithium battery warranty — industry's best!\n6. **Free Extras:** Free insurance, free servicing (6 times), 1-year road tax included!\n7. **Nationwide Service:** 12+ showrooms & service centers across Nepal\n\nNobody else in Nepal comes close! ⚡🌿"
    ]
  },

  price: {
    samples: [
      "price", "cost", "how much", "kitni", "rate", "budget", "affordable", "cheap", "expensive", "financing", "loan",
      "paisa", "rupees", "npr", "payment", "emi", "installment", "kati", "mulya", "how much does it cost",
      "price list", "pricing", "what is the price", "vehicle cost", "buy price"
    ],
    responses: [
      "Great value for Nepal! 💡\n\n🛵 **2-Wheelers (Scooters):** NPR 1.8L – 2.5L\n🛺 **3-Wheelers (Passenger):** NPR 2.8L – 4.5L\n📦 **Cargo Loaders:** NPR 3L – 6L (600kg to 1000kg)\n\n✅ **Annual savings vs petrol:** ~NPR 1 Lakh+ saved per year!\n✅ Easy **Bank Financing & EMI** available\n✅ Government EV subsidies apply\n\n📞 For exact on-road price, call: **+977-9821107355**"
    ]
  },

  battery_charging: {
    samples: [
      "battery", "charge", "charging", "range", "mileage", "how far", "how long to charge",
      "recharge", "charging time", "battery life", "lithium", "lead acid", "battery warranty",
      "how many km", "distance per charge", "full charge", "charging cost"
    ],
    responses: [
      "Our battery tech is top-of-the-line! ⚡🔋\n\n**Lithium Battery (Best option):**\n• Charging time: 4–5 hours\n• Range: Up to **200 KM** (KM-E5L)\n• Warranty: Up to **36 months**\n• Smart charger: 220V – 20 Amp auto\n\n**Lead Acid Battery:**\n• Charging time: 8–10 hours\n• Range: 100–120 KM\n• Warranty: 6 months\n\n💰 **Cost per charge:** ~NPR 60–80 for 180km\nVs. ~NPR 1,200 in petrol for same distance!\n\nWe always recommend **Lithium** for long-term value. Want to know the range for a specific model?"
    ]
  },

  dealers: {
    samples: [
      "dealer", "showroom", "shop", "location", "nearest", "find", "branch", "where are you", "city",
      "service center", "workshop", "near me", "kahan", "showroom address", "contact address",
      "birgunj", "bharatpur", "kalaiya", "hetauda", "tandi", "dealer near"
    ],
    responses: [
      "We have premium showrooms across Nepal! 🗺️\n\n📍 **Head Office:** Birgunj — Trimurti Chowk (+977-9821107355)\n📍 Bharatpur — Kshetrapur (+977-9812287436)\n📍 Kalaiya — Gadhimai Road (+977-9802595085)\n📍 Hetauda — Shitalmahal Chowk (+977-9801235567)\n📍 Tandi — Bhanu Chowk (+977-9828020134)\n📍 Birgunj — Tree Murti Chowk (+977-9866388988)\n\nWhich city are you in? I'll give you the exact contact! 😊"
    ]
  },

  testRide: {
    samples: [
      "test ride", "test drive", "trial", "demo", "book", "appointment", "try out",
      "can i try", "want to try", "drive it", "test karen", "free ride", "free demo"
    ],
    responses: [
      "Yes! Test rides are completely **FREE** 🎉🛵\n\nOnce you feel our 2000W to 3500W electric power, you won't look back!\n\n📞 Book by calling: **+977-9821107355** or **+977-9801082474**\n🌐 Or fill the Contact form on our website\n🕘 Hours: Sunday–Friday, 9:00 AM – 6:00 PM\n\nWhich vehicle would you like to test ride first?"
    ]
  },

  warranty_service: {
    samples: [
      "warranty", "guarantee", "service", "repair", "maintenance", "problem", "issue", "after sale",
      "spare parts", "breakdown", "support", "free service", "insurance", "road tax",
      "service center", "how long warranty", "what is covered", "claim"
    ],
    responses: [
      "We provide the best after-sales support in Nepal! 🛡️\n\n**Warranty:**\n• Motor & Controller: 6 months\n• Lead Acid Battery: 6 months\n• Lithium Battery: 24–36 months (best in Nepal!)\n\n**Free with every vehicle:**\n✅ 6 free services\n✅ Free insurance\n✅ 1-year road tax included (on select models)\n✅ Free vehicle registration assistance\n\n**Service Network:**\n• Service centers at all 12+ dealer locations\n• Genuine spare parts stocked\n• On-call roadside assistance\n\nCall **+977-9821107355** to book a service!"
    ]
  },

  contact_info: {
    samples: [
      "contact", "phone", "call", "number", "email", "address", "reach", "headquarters",
      "how to contact", "phone number", "call you", "get in touch", "helpline", "customer care",
      "website", "facebook", "social media", "online", "contact number"
    ],
    responses: [
      "Here's how to reach Kushwaha Motors! 📞\n\n**📍 Head Office:**\nTrimurti Chowk, Shreepur, Birgunj, Parsa, Nepal\n\n**📞 Phone:**\n+977-9821107355\n+977-9801082474\n+977-9861580964\n\n**🌐 Website:**\nwww.kushwahamotors.com.np\n\n**🕘 Open Hours:**\nSunday–Friday: 9:00 AM – 6:00 PM\n\nOr fill the Contact form on this website and we'll respond within 24 hours! 😊"
    ]
  },

  about_company: {
    samples: [
      "about", "company", "history", "who are", "kushwaha motors", "established", "founded", "since when",
      "background", "story", "mission", "vision", "how old", "experience", "years",
      "tell me about kushwaha", "what is kushwaha motors"
    ],
    responses: [
      "About Kushwaha Motors! 🏢🌿\n\n**Founded:** 2015\n**Headquarters:** Birgunj, Parsa, Nepal\n**Mission:** Making sustainable electric transport accessible across all of Nepal\n\n**What we do:**\n• Import & distribute high-quality electric vehicles\n• Provide nationwide after-sales service\n• Offer easy Bank Financing\n• Promote green, eco-friendly transport\n\n**Our Numbers:**\n• 10+ years of EV experience\n• 12+ dealer showrooms across Nepal\n• 5,000+ happy EV owners\n• 100% focused on electric vehicles\n\nWe believe in a cleaner, smarter, self-reliant Nepal! 🇳🇵⚡"
    ]
  },

  unknown: {
    samples: [],
    responses: [
      "I'm trained specifically on Kushwaha Motors' vehicles, pricing, and services! 🤔 Could you ask me about our 2-wheelers, 3-wheelers, cargo vehicles, dealer locations, battery range, or pricing? I'm happy to help!",
      "Hmm, I didn't quite get that! 😊 Try asking me things like:\n• 'Compare TM007 vs V7G'\n• 'What is the range of KM-E5L?'\n• 'Where is your nearest showroom?'\n• 'Why should I buy from Kushwaha?'\n\nOr call us directly: **+977-9821107355**"
    ]
  }
};


// ── Instantiate and Train Local ML Model ──────────────────────────────────
const mlModel = new NaiveBayesClassifier();

// Train the model on load
Object.keys(TRAINING_DATA).forEach(intent => {
  if (intent === 'unknown') return;
  TRAINING_DATA[intent].samples.forEach(sample => {
    mlModel.train(sample, intent);
  });
});

const getMLResponse = (text) => {
  // If text is very short/empty, handle gracefully
  if (!text.trim() || text.length < 2) return TRAINING_DATA.unknown.responses[0];

  const predictedIntent = mlModel.predict(text);
  
  // If prediction confidence is essentially zero (unseen words), predict returns null
  if (!predictedIntent) {
    const fallback = TRAINING_DATA.unknown.responses;
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  const responses = TRAINING_DATA[predictedIntent].responses;
  return responses[Math.floor(Math.random() * responses.length)];
};

// ── Format markdown-like response ───────────────────────────────────────
const formatMsg = (text) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <div key={i} style={{ fontWeight: 800, color: 'var(--elec)', marginTop: i > 0 ? 8 : 0 }}>{line.replace(/\*\*/g, '')}</div>;
    }
    const parts = line.split(/\*\*(.*?)\*\*/g);
    return (
      <div key={i} style={{ marginTop: i > 0 && line === '' ? 6 : 0 }}>
        {parts.map((p, j) => j % 2 === 1 ? <strong key={j} style={{ color: 'var(--elec)' }}>{p}</strong> : p)}
      </div>
    );
  });
};

const QUICK_REPLIES = ['Why are your vehicles the best?', 'Compare 2-Wheelers', 'Details of 3-Wheelers', 'Price list', 'Book test ride'];
const TYPING_DELAY = 1200;

// ── Main Chatbot Component ───────────────────────────────────────────────
const AIChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "नमस्ते! 🙏 I'm **KM-AI**. I've been ML-trained to help you choose the best electric vehicle in Nepal. Ask me to compare models or why we are the best choice!" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = (text) => {
    const msg = text.trim();
    if (!msg) return;
    const userMsg = { id: Date.now(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    // Quick replies stay visible always — do NOT hide them
    setTimeout(() => {
      const botText = getMLResponse(msg);
      setTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: botText }]);
    }, TYPING_DELAY);
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input); };
  const handleQuick = (q) => sendMessage(q);

  const resetChat = () => {
    setMessages([{ id: 1, role: 'bot', text: "Chat reset! What else can I help you discover about Kushwaha Motors today?" }]);
    setShowQuick(true);
    setTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', bottom: 90, right: 20, width: 380, zIndex: 9000,
              display: 'flex', flexDirection: 'column',
              maxHeight: 'calc(100vh - 120px)',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {/* Main Panel — White & Green */}
            <div style={{
              background: '#FFFFFF',
              border: '1px solid rgba(19,123,57,0.15)',
              borderRadius: 20, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(19,123,57,0.12), 0 4px 16px rgba(0,0,0,0.06)',
            }}>

              {/* Top accent bar */}
              <div style={{ height: 3, background: 'linear-gradient(90deg, var(--elec), var(--nature), var(--elec))', backgroundSize: '200% 100%' }} />

              {/* Header */}
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(19,123,57,0.08)', display: 'flex', alignItems: 'center', gap: 12, background: 'linear-gradient(135deg, rgba(19,123,57,0.04) 0%, rgba(66,169,46,0.03) 100%)' }}>
                {/* Bot avatar */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--elec), var(--nature))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(19,123,57,0.3)' }}>
                    <Bot size={22} color="#fff" />
                  </div>
                  <div style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 10, borderRadius: '50%', background: '#42A92E', border: '2px solid #fff', boxShadow: '0 0 4px rgba(66,169,46,0.5)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--txt)', letterSpacing: '-0.3px', display: 'flex', alignItems: 'center', gap: 8 }}>
                    KM-AI Assistant
                    <span style={{ fontSize: '0.58rem', fontFamily: "'Space Mono',monospace", background: 'rgba(19,123,57,0.1)', border: '1px solid rgba(19,123,57,0.2)', color: 'var(--elec)', padding: '2px 7px', borderRadius: 20, letterSpacing: '1px', fontWeight: 800 }}>ONLINE</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--nature)', fontWeight: 600 }}>Kushwaha Motors · EV Expert</div>
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={resetChat} title="Reset" style={{ background: 'rgba(19,123,57,0.06)', border: '1px solid rgba(19,123,57,0.12)', color: 'var(--txt-2)', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(19,123,57,0.12)'; e.currentTarget.style.color = 'var(--elec)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(19,123,57,0.06)'; e.currentTarget.style.color = 'var(--txt-2)'; }}>
                    <RefreshCw size={14} />
                  </button>
                  <button onClick={() => setOpen(false)} style={{ background: 'rgba(220,53,69,0.06)', border: '1px solid rgba(220,53,69,0.15)', color: 'var(--txt-2)', width: 32, height: 32, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(220,53,69,0.12)'; e.currentTarget.style.color = '#dc3545'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(220,53,69,0.06)'; e.currentTarget.style.color = 'var(--txt-2)'; }}>
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 400, background: '#F3F9F5', scrollbarWidth: 'thin', scrollbarColor: 'rgba(19,123,57,0.2) transparent' }}>
                {messages.map(msg => (
                  <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', gap: 10, flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}
                  >
                    {/* Avatar */}
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: msg.role === 'bot' ? 'linear-gradient(135deg,var(--elec),var(--nature))' : 'linear-gradient(135deg,var(--power),#f5a623)',
                      boxShadow: msg.role === 'bot' ? '0 2px 8px rgba(19,123,57,0.3)' : '0 2px 8px rgba(230,138,0,0.3)',
                    }}>
                      {msg.role === 'bot' ? <Bot size={16} color="#fff" /> : <User size={16} color="#fff" />}
                    </div>

                    {/* Bubble */}
                    <div style={{
                      maxWidth: '82%',
                      background: msg.role === 'bot' ? '#FFFFFF' : 'linear-gradient(135deg, var(--elec), var(--nature))',
                      border: msg.role === 'bot' ? '1px solid rgba(19,123,57,0.1)' : 'none',
                      borderRadius: msg.role === 'bot' ? '0 14px 14px 14px' : '14px 0 14px 14px',
                      padding: '11px 15px',
                      fontSize: '0.875rem', lineHeight: 1.7,
                      color: msg.role === 'bot' ? 'var(--txt)' : '#fff',
                      boxShadow: msg.role === 'bot' ? '0 2px 8px rgba(0,0,0,0.05)' : '0 4px 14px rgba(19,123,57,0.3)',
                    }}>
                      {formatMsg(msg.text)}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,var(--elec),var(--nature))', boxShadow: '0 2px 8px rgba(19,123,57,0.3)' }}>
                      <Bot size={16} color="#fff" />
                    </div>
                    <div style={{ background: '#fff', border: '1px solid rgba(19,123,57,0.1)', borderRadius: '0 14px 14px 14px', padding: '13px 18px', display: 'flex', gap: 5, alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.span key={i} animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }}
                          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--nature)', display: 'block' }} />
                      ))}
                    </div>
                  </motion.div>
                )}


                <div ref={endRef} />
              </div>

              {/* Quick replies — always visible above input */}
              <div style={{ padding: '10px 16px 0', background: '#fff', borderTop: '1px solid rgba(19,123,57,0.07)', display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {QUICK_REPLIES.map(q => (
                  <button key={q} onClick={() => handleQuick(q)} disabled={typing}
                    style={{ background: '#F3F9F5', border: '1px solid rgba(19,123,57,0.2)', color: 'var(--elec)', borderRadius: 20, padding: '5px 13px', fontSize: '0.72rem', fontWeight: 700, cursor: typing ? 'default' : 'pointer', transition: 'all 0.2s', opacity: typing ? 0.5 : 1 }}
                    onMouseOver={e => { if (!typing) { e.currentTarget.style.background = 'var(--elec)'; e.currentTarget.style.color = '#fff'; } }}
                    onMouseOut={e => { e.currentTarget.style.background = '#F3F9F5'; e.currentTarget.style.color = 'var(--elec)'; }}
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input bar */}
              <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(19,123,57,0.08)', background: '#fff' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10 }}>
                  <input
                    ref={inputRef} value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about vehicles, pricing, dealers…"
                    style={{ flex: 1, padding: '11px 16px', fontSize: '0.875rem', borderRadius: 12, background: '#F3F9F5', border: '1px solid rgba(19,123,57,0.15)', color: 'var(--txt)', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = 'var(--elec)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(19,123,57,0.15)'}
                    disabled={typing}
                  />
                  <button type="submit" disabled={typing || !input.trim()}
                    style={{ width: 44, height: 44, borderRadius: 12, background: input.trim() ? 'linear-gradient(135deg,var(--elec),var(--nature))' : 'rgba(19,123,57,0.06)', border: 'none', color: input.trim() ? '#fff' : 'var(--txt-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.3s', boxShadow: input.trim() ? '0 4px 14px rgba(19,123,57,0.35)' : 'none' }}>
                    <Send size={16} />
                  </button>
                </form>
                <div style={{ marginTop: 8, fontSize: '0.65rem', color: 'var(--txt-3)', textAlign: 'center', fontFamily: "'Space Mono',monospace" }}>
                  KM-AI · Powered by Kushwaha Motors Intelligence
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button onClick={() => setOpen(o => !o)} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: 24, right: 20, width: 58, height: 58, borderRadius: '50%', zIndex: 9001, cursor: 'pointer', border: 'none', background: open ? '#fff' : 'linear-gradient(135deg,var(--elec),var(--nature))', border: open ? '2px solid rgba(220,53,69,0.3)' : 'none', boxShadow: open ? '0 4px 20px rgba(0,0,0,0.1)' : '0 6px 24px rgba(19,123,57,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
        {/* Pulse ring when closed */}
        {!open && (
          <motion.div style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: '2px solid rgba(19,123,57,0.3)' }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        )}
        <AnimatePresence mode="wait">
          <motion.div key={open ? 'x' : 'm'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
            {open ? <X size={22} color="#dc3545" /> : <MessageCircle size={24} color="#fff" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default AIChatbot;


