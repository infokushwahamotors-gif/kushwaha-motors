import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import emailjs from '@emailjs/browser';
import NaiveBayesClassifier from '../utils/ml-classifier';
import { useLanguage } from '../context/LanguageContext';

// Initialize EmailJS
emailjs.init('lVQkPWqNEo_WbrR2h');

// ── ML Training Data ──────────────────────────────────────────────────────
const TRAINING_DATA = {
  greetings: {
    samples: ["hello", "hi", "hey", "hii", "helo", "hola", "hai", "namaste", "namaskar", "good morning", "good evening", "good afternoon", "good night", "howdy", "greetings", "are you there", "anybody there", "yo", "sup", "what's up", "whats up", "wassup", "salute", "नमस्ते", "नमस्कार"],
    responses_en: [
      "Hello! 🙏 I'm **KM-AI**, your Kushwaha Motors EV assistant. Are you looking for a vehicle for personal daily commuting or for business? Tell me your use case, and I'll guide you to the perfect EV!",
      "Hi! 😊 Welcome to Kushwaha Motors! I'm KM-AI. What kind of vehicle are you interested in today? Tell me what you need, and I will find the best match for you!"
    ],
    responses_ne: [
      "नमस्ते! 🙏 म **KM-AI** हुँ, तपाईंको Kushwaha Motors को सहायक। के तपाईं दैनिक यात्राको लागि वा व्यापारिक प्रयोजनको लागि गाडी खोज्दै हुनुहुन्छ? तपाईंको आवश्यकता बताउनुहोस्, म उत्तम EV छनौट गर्न मद्दत गर्नेछु!",
      "नमस्ते! 😊 Kushwaha Motors मा स्वागत छ! म KM-AI हुँ। आज तपाईं कस्तो प्रकारको गाडीमा रुचि राख्नुहुन्छ? तपाईंलाई के आवश्यक छ बताउनुहोस्, म तपाईंको लागि उत्कृष्ट विकल्प खोज्नेछु!"
    ]
  },

  how_are_you: {
    samples: ["how are you", "how are you doing", "how do you do", "are you okay", "you doing good", "how is it going", "hows it going", "how's life", "how are things", "feeling good", "you good", "you okay", "you alright", "how you doing", "how r u", "how r you", "kasto cha", "kasto ho", "sanchai"],
    responses_en: [
      "I'm doing great, thank you for asking! 😊⚡ I'm always energized — just like our electric vehicles! I'm here and ready to help you find the perfect EV. What would you like to know?"
    ],
    responses_ne: [
      "मलाई एकदम ठीक छ, सोध्नुभएकोमा धन्यवाद! 😊⚡ म सधैं ऊर्जावान छु — हाम्रा विद्युतीय सवारी साधन जस्तै! म तपाईंलाई उत्कृष्ट EV खोज्न मद्दत गर्न तयार छु। के जान्न चाहनुहुन्छ?"
    ]
  },

  who_are_you: {
    samples: ["who are you", "what are you", "tell me about yourself", "introduce yourself", "what is your name", "whats your name", "your name", "who is this", "are you a bot", "are you human", "are you ai", "are you robot", "who am i talking to", "who made you", "what can you do"],
    responses_en: [
      "I'm **KM-AI** 🤖 — the official AI assistant for **Kushwaha Motors**! I'm here to help you choose the perfect electric vehicle for Nepal's roads!"
    ],
    responses_ne: [
      "म **KM-AI** हुँ 🤖 — **Kushwaha Motors** को आधिकारिक AI सहायक! म तपाईंलाई नेपालको बाटोको लागि उत्तम विद्युतीय सवारी छनौट गर्न मद्दत गर्न यहाँ छु!"
    ]
  },

  where_from: {
    samples: ["where are you from", "where do you come from", "where is kushwaha motors", "which city", "which country", "where located", "which place", "origin", "where is your office", "where is head office", "headquarters location", "timi kata ho", "nepal ma ho", "birgunj"],
    responses_en: [
      "Kushwaha Motors is proudly based in **Birgunj, Nepal** 🇳🇵!\n\n📍 **Head Office:** Trimurti Chowk, Shreepur, Birgunj, Parsa\n\nWe have showrooms across Nepal including Bharatpur, Hetauda, Kalaiya, Tandi and more."
    ],
    responses_ne: [
      "Kushwaha Motors गर्वका साथ **वीरगन्ज, नेपाल** 🇳🇵 मा अवस्थित छ!\n\n📍 **प्रधान कार्यालय:** त्रिमूर्ति चोक, श्रीपुर, वीरगन्ज, पर्सा\n\nहाम्रा शोरुमहरू भरतपुर, हेटौंडा, कलैया, टाँडी लगायत नेपालभर छन्।"
    ]
  },

  thanks: {
    samples: ["thank you", "thanks", "thanks a lot", "thank you so much", "thx", "ty", "great", "awesome", "wonderful", "perfect", "excellent", "amazing", "helpful", "that helped", "nice", "cool", "good job", "well done", "dhanyabad", "shukriya", "bahut acha"],
    responses_en: [
      "You're very welcome! 😊🌿 Happy to help! If you have any more questions about our electric vehicles, pricing, or want to book a test ride, just ask!"
    ],
    responses_ne: [
      "तपाईंलाई स्वागत छ! 😊🌿 सहयोग गर्न पाउँदा खुसी लाग्यो! यदि तपाईंसँग हाम्रा विद्युतीय सवारी, मूल्य, वा टेस्ट राइड बुक गर्ने बारे थप प्रश्नहरू छन् भने, सोध्न नहिचकिचाउनुहोस्!"
    ]
  },

  goodbye: {
    samples: ["bye", "goodbye", "see you", "see ya", "take care", "later", "ciao", "farewell", "ok bye", "good bye", "have a good day", "good day", "talk later", "will come back", "exit", "quit", "close", "bida", "namaste"],
    responses_en: [
      "Goodbye! 👋🌿 It was great chatting with you! Remember, Kushwaha Motors is always here when you're ready to go electric. Drive green, save money, and help Nepal! 🙏"
    ],
    responses_ne: [
      "बिदा! 👋🌿 तपाईंसँग कुरा गर्न पाउँदा खुसी लाग्यो! याद राख्नुहोस्, विद्युतीय सवारीमा जान तयार हुँदा Kushwaha Motors सधैं तपाईंको साथमा छ। हरित यात्रा गर्नुहोस्, पैसा बचत गर्नुहोस्, र नेपाललाई मद्दत गर्नुहोस्! 🙏"
    ]
  },

  joke_fun: {
    samples: ["tell me a joke", "joke", "funny", "make me laugh", "say something funny", "humor", "entertain me", "fun fact", "do you joke"],
    responses_en: [
      "😄 Why do our electric scooters never get tired?\n\nBecause they're always **fully charged**! ⚡\n\nOkay okay, but seriously — our TM007 Pro does 130 KM on a single charge. Want to know more about it?"
    ],
    responses_ne: [
      "😄 हाम्रा विद्युतीय स्कुटरहरू किन कहिल्यै थाक्दैनन्?\n\nकिनभने तिनीहरू सधैं **fully charged** हुन्छन्! ⚡\n\nठिक छ, तर साँच्चै भन्ने हो भने — हाम्रो TM007 Pro ले एक पटक चार्जमा १३० किलोमिटर गुड्छ। यसको बारेमा थप जान्न चाहनुहुन्छ?"
    ]
  },

  help: {
    samples: ["help", "what can you do", "what do you know", "what can i ask", "guide me", "options", "menu", "topics", "capabilities", "features", "what should i ask", "i need help", "assist me", "support", "madat", "sahayoga"],
    responses_en: [
      "I'm here to help! 🤖 Here's what I'm trained on:\n\n🛵 **2-Wheelers** — TM007, V7G specs\n🛺 **3-Wheelers** — KM-E5L, FT-3, STF-3, KM-V3\n📦 **Cargo** — YFKM MAX-60C, JC-48, LM-3\n💰 **Pricing** — NPR ranges\n📍 **Dealers** — Showrooms across Nepal\n\nJust ask!"
    ],
    responses_ne: [
      "म मद्दत गर्न यहाँ छु! 🤖 मलाई यी कुराहरूको जानकारी छ:\n\n🛵 **२-पाङ्ग्रे** — TM007, V7G विशेषताहरू\n🛺 **३-पाङ्ग्रे** — KM-E5L, FT-3, STF-3, KM-V3\n📦 **कार्गो** — YFKM MAX-60C, JC-48, LM-3\n💰 **मूल्य** — मूल्य दायरा\n📍 **डिलरहरू** — नेपालभरिका शोरुमहरू\n\nकेही पनि सोध्न सक्नुहुन्छ!"
    ]
  },

  scooter2w_specs: {
    samples: ["tell me about 2 wheelers", "what scooters do you have", "2 wheeler specs", "details of two wheelers", "show me scooters", "tm007 details", "v7g specs", "best scooter", "two wheeler models", "two wheel range", "electric scooter", "scooter nepal", "best electric scooter", "scooter price nepal", "scooter features", "what scooter", "which scooter", "electric bike", "e-scooter", "motor scooter", "scuti", "skuti"],
    responses_en: [
      "Our 2-Wheelers (TM007, TM008, V7G) are the smartest investment you can make today! 🚀\n\nImagine saving NPR 1 Lakh every year on petrol while riding with premium features:\n⚡ **150 KM per charge** — never worry about range again!\n⚡ **Top Speed: 78 km/h** with a powerful 4200W motor\n⚡ **Cruise Control, Dual Disc Brakes, Reverse Gear & NFC**\n\nThousands of riders have already switched. Why pay for petrol when you can ride the future? Would you like to book a FREE test ride to experience the thrill yourself?"
    ],
    responses_ne: [
      "हाम्रो २-पाङ्ग्रे (TM007, TM008, V7G) आज तपाईंले गर्न सक्ने सबैभन्दा उत्कृष्ट लगानी हो! 🚀\n\nसोच्नुहोस् त, हरेक वर्ष पेट्रोलमा १ लाख रुपैयाँ बचत गर्दै प्रिमियम सुविधाहरूको मज्जा लिँदा कस्तो होला:\n⚡ **१५० किमी प्रति चार्ज** — रेन्जको कुनै चिन्ता छैन!\n⚡ **अधिकतम गति: ७८ किमी/घण्टा** र शक्तिशाली ४२००W मोटर\n⚡ **क्रुज कन्ट्रोल, डुअल डिस्क ब्रेक, रिभर्स गियर र NFC**\n\nहजारौं यात्रुहरूले पहिले नै स्विच गरिसकेका छन्। भविष्यको सवारी गर्न सक्दा पेट्रोलको लागि किन पैसा खर्च गर्ने? के तपाईं यसको अनुभव लिन नि:शुल्क टेस्ट राइड बुक गर्न चाहनुहुन्छ?"
    ]
  },

  threewheeler_specs: {
    samples: ["tell me about 3 wheelers", "what rickshaws do you sell", "passenger auto", "three wheeler details", "km-e5l specs", "show me autos", "tuk tuk", "school bus model", "ft-3 specs", "3 wheeler range", "electric rickshaw", "e-rickshaw nepal", "auto rickshaw electric", "tempo", "electric tempo", "stf3", "kmv3", "passenger vehicle", "rickshaw specs", "how many seats", "तीन पाङ्ग्रे", "तीन पाङ्ग्रे गाडी", "रिक्शा", "इलेक्ट्रिक रिक्शा", "विद्युतीय रिक्शा", "यात्री गाडी", "स्कूल बस", "तीन पाङ्ग्रे विवरण", "ई रिक्शा", "टेम्पो"],
    responses_en: [
      "Looking to boost your daily income? Our 3-Wheeler EVs are profit machines! 🛺💰\n\n🚌 **KM-E5L** (Premium 6+1 Seats) — Massive 200 KM range! Maximum trips, maximum profit.\n🛺 **FT-3** (Standard 4+1 Seats) — Reliable 160 KM range.\n🏫 **KM-V3** (School E-Bus 12+1) — Safe & spacious 160 KM range.\n\nStop losing money on maintenance and fuel. Switch to an EV today and watch your earnings double! Which model suits your business best?"
    ],
    responses_ne: [
      "आफ्नो दैनिक आम्दानी बढाउन चाहनुहुन्छ? हाम्रा ३-पाङ्ग्रे विद्युतीय सवारीहरू नाफा कमाउने मेसिन हुन्! 🛺💰\n\n🚌 **KM-E5L** (प्रिमियम ६+१ सिट) — भारी २०० किमी रेन्ज! धेरै ट्रिप, धेरै नाफा।\n🛺 **FT-3** (मानक ४+१ सिट) — भरपर्दो १६० किमी रेन्ज।\n🏫 **KM-V3** (स्कूल ई-बस १२+१) — सुरक्षित र फराकिलो १६० किमी रेन्ज।\n\nमर्मत र इन्धनमा पैसा गुमाउन छोड्नुहोस्। आजै EV मा स्विच गर्नुहोस् र आफ्नो आम्दानी दोब्बर भएको हेर्नुहोस्! तपाईंको व्यवसायको लागि कुन मोडल उत्तम हुन्छ?"
    ]
  },

  cargo_specs: {
    samples: ["cargo vehicles", "loaders", "freight", "transport goods", "delivery vehicle", "heavy load vehicle", "yfkm max", "lm-3 details", "cargo loader", "goods vehicle", "jc48", "jc-48", "how much load", "payload", "vegetable vehicle", "sabji gaadi", "maal gaadi"],
    responses_en: [
      "Your logistics business needs efficiency, and our Cargo Loaders deliver exactly that! 📈\n\n🏭 **YFKM MAX-60C** — 1 Ton Payload | 180km Range. An absolute beast for heavy lifting.\n🚛 **LM-3** — 800 KG Payload | 160km Range.\n📦 **JC-48** — 600 KG Payload | 150km Range. Perfect for quick city deliveries.\n\nEvery delivery made with petrol is a loss of your profit margin. Upgrade to electric and make every trip more profitable. What kind of goods do you usually transport?"
    ],
    responses_ne: [
      "तपाईंको ढुवानी व्यवसायलाई दक्षता आवश्यक छ, र हाम्रा कार्गो लोडरहरूले ठ्याक्कै त्यही दिन्छन्! 📈\n\n🏭 **YFKM MAX-60C** — १ टन भार क्षमता | १८० किमी रेन्ज। भारी सामानको लागि एक अद्भुत मेसिन।\n🚛 **LM-3** — ८०० KG भार क्षमता | १६० किमी रेन्ज।\n📦 **JC-48** — ६०० KG भार क्षमता | १५० किमी रेन्ज। सहरभित्र छिटो डेलिभरीको लागि उत्तम।\n\nपेट्रोल प्रयोग गरेर गरिएको हरेक डेलिभरीमा तपाईंको नाफा घट्दैछ। विद्युतीयमा अपग्रेड गर्नुहोस् र हरेक ट्रिपलाई अझ लाभदायक बनाउनुहोस्। तपाईं सामान्यतया कस्तो सामान ओसारपसार गर्नुहुन्छ?"
    ]
  },

  comparison: {
    samples: ["compare vehicles", "which is better", "difference between tm007 and v7g", "compare rickshaws", "which scooter should i buy", "help me choose", "comparison of 2 wheelers", "tm007 vs v7g", "km-e5l vs ft3", "which one to buy", "recommend me", "suggest vehicle", "best for me", "which vehicle", "which model", "should i get", "better option"],
    responses_en: [
      "Let me help you compare! 🤝\n\n**2-Wheeler: TM007 vs V7G**\n• Both have 150km range and 78km/h top speed, but differ in design and available colors.\n\n**3-Wheeler: KM-E5L vs FT-3 vs STF-3**\n• Max passengers & range? → **KM-E5L** (6+1, 200km)\n• Standard reliable route? → **FT-3** (4+1, 160km)\n• Budget-friendly start? → **STF-3** (4+1, 130km)\n\nTell me your use case!"
    ],
    responses_ne: [
      "म तुलना गर्न मद्दत गर्छु! 🤝\n\n**२-पाङ्ग्रे: TM007 विरुद्ध V7G**\n• दुवैको रेन्ज १५० किमी र अधिकतम गति ७८ किमी/घण्टा छ, तर डिजाइन र उपलब्ध रङहरू फरक छन्।\n\n**३-पाङ्ग्रे: KM-E5L विरुद्ध FT-3 विरुद्ध STF-3**\n• धेरै यात्रु र लामो रेन्ज? → **KM-E5L** (६+१, २०० किमी)\n• भरपर्दो मानक रुट? → **FT-3** (४+१, १६० किमी)\n• बजेट-मैत्री? → **STF-3** (४+१, १३० किमी)\n\nतपाईंको आवश्यकता बताउनुहोस्!"
    ]
  },

  why_best: {
    samples: ["why are you the best", "why kushwaha", "are your vehicles good", "why should i buy from you", "what makes you better", "quality", "reputation", "why choose kushwaha motors", "best ev in nepal", "is it worth it", "trustworthy", "reliable", "good company", "why electric", "why ev", "benefits of electric", "advantages", "better than petrol"],
    responses_en: [
      "Here's why Kushwaha Motors is Nepal's #1 EV choice! 🏆\n\n1. **Superior Technology:** True Sine Wave Controllers + Auto-Cooling Motors\n2. **Unbeatable Range:** Up to **200 KM** on one charge!\n3. **Nepal Road Ready:** Hill Climb Sensors\n4. **Huge Cost Savings:** 90% fuel savings vs petrol\n5. **Best Warranty:** Up to 36-month Lithium battery warranty\n6. **Free Extras:** Free insurance, servicing, and road tax\n\nNobody else in Nepal comes close! ⚡🌿"
    ],
    responses_ne: [
      "नेपालको #१ EV रोजाइ कुशवाह मोटर्स हुनुको कारण यहाँ छ! 🏆\n\n१. **उत्कृष्ट प्रविधि:** अटो-कुलिङ मोटर र साइन वेभ कन्ट्रोलर\n२. **अतुलनीय रेन्ज:** एक चार्जमा **२०० किमी** सम्म!\n३. **नेपालको बाटो अनुकूल:** हिल क्लाइम्ब सेन्सर\n४. **ठूलो बचत:** पेट्रोलको तुलनामा ९०% इन्धन बचत\n५. **उत्कृष्ट वारेन्टी:** लिथियम ब्याट्रीमा ३६-महिना सम्मको वारेन्टी\n६. **नि:शुल्क सुविधाहरू:** नि:शुल्क बिमा, सर्भिसिङ र सडक कर\n\nनेपालमा हाम्रो विकल्प छैन! ⚡🌿"
    ]
  },

  advice_doubt: {
    samples: [
      "i am not sure", "what do you suggest", "i need your suggestion", "not sure which one", "help me decide", "i am confused", "what is best for me", "suggest me something", "which vehicle is right", "confused between", "i dont know what to buy", "not sure if i should buy", "should i take scooter", "do you think i should buy", "give me advice", "need advice", "what should i take", "please suggest", "i not sure i have to take scooter of this or not what you will suggest"
    ],
    responses_en: [
      "I'd love to help you decide! 🤔 Think about your daily routine. If you travel alone or with one person locally, the **TM007 2-Wheeler** is perfect (zero fuel cost!). But if you want to transport goods or carry multiple passengers for a business, our **3-Wheelers or Cargo Loaders** are what you need. What do you do on a daily basis?"
    ],
    responses_ne: [
      "म तपाईंलाई निर्णय गर्न मद्दत गर्छु! 🤔 तपाईंको दैनिक तालिकाको बारेमा सोच्नुहोस्। यदि तपाईं एक्लै वा एकजना साथीसँग स्थानीय यात्रा गर्नुहुन्छ भने, **TM007 २-पाङ्ग्रे** उत्तम हुन्छ (शून्य इन्धन खर्च!)। तर यदि तपाईं व्यवसायको लागि सामान ओसारपसार गर्न वा धेरै यात्रु बोक्न चाहनुहुन्छ भने, हाम्रा **३-पाङ्ग्रे वा कार्गो लोडर** आवश्यक पर्छ। तपाईं दैनिक रूपमा के गर्नुहुन्छ?"
    ]
  },

  personal_use_recommendation: {
    samples: ["i dont have to travel most", "not much travel", "short distance", "just nearby", "local commute", "grocery shopping", "school drop", "personal use", "for me", "just for home", "office and back", "daily commute", "i dont travel much", "less travel", "near by", "only city"],
    responses_en: [
      "Since you don't travel long distances, our **2-Wheeler EV Scooters (like the TM007)** are your absolute best match! 🛵\n\nIt gives you 150 KM per charge, meaning for short local rides, you might only need to charge it once a week. Plus, zero oil changes and zero petrol costs! Would you like to book a free test ride?"
    ],
    responses_ne: [
      "तपाईं लामो दूरी यात्रा नगर्ने हुनाले, हाम्रो **२-पाङ्ग्रे EV स्कुटर (जस्तै TM007)** तपाईंको लागि उत्तम छ! 🛵\n\nयसले १५० किमी प्रति charge दिन्छ, जसको मतलब छोटो स्थानीय यात्राको लागि तपाईंले हप्तामा एक पटक मात्र चार्ज गरे पुग्छ। साथै, पेट्रोल र सर्भिसिङको खर्च शून्य! के तपाईं नि:शुल्क टेस्ट राइड बुक गर्न चाहनुहुन्छ?"
    ]
  },

  commercial_use_recommendation: {
    samples: ["i transport goods", "for business", "commercial use", "carry heavy load", "carry passengers", "delivery business", "shop to shop", "heavy use", "many people", "school bus", "logistics", "business purpose", "earn money", "make money", "transportation"],
    responses_en: [
      "For business use, you need power and high ROI! 📈 I highly recommend our **3-Wheeler Cargo Loaders (like YFKM MAX-60C)** for goods, or the **KM-E5L Passenger EV** for carrying people.\n\nSwitching your business to EV will cut your daily operating costs by 80%, instantly increasing your daily profit. Do you want to see the price list?"
    ],
    responses_ne: [
      "व्यापारिक प्रयोजनको लागि, तपाईंलाई शक्ति र उच्च नाफा आवश्यक छ! 📈 म सामानको लागि हाम्रो **३-पाङ्ग्रे कार्गो लोडर (जस्तै YFKM MAX-60C)**, वा मानिसहरू बोक्न **KM-E5L Passenger EV** सिफारिस गर्छु।\n\nआफ्नो व्यवसायलाई EV मा स्विच गर्दा तपाईंको दैनिक सञ्चालन खर्च ८०% ले घट्छ, जसले तपाईंको दैनिक नाफा तत्काल बढाउँछ। के तपाईं मूल्य सूची हेर्न चाहनुहुन्छ?"
    ]
  },

  price: {
    samples: ["price", "cost", "how much", "kitni", "rate", "budget", "affordable", "cheap", "expensive", "financing", "loan", "paisa", "rupees", "npr", "payment", "emi", "installment", "kati", "mulya", "how much does it cost", "price list", "pricing", "what is the price", "vehicle cost", "buy price"],
    responses_en: [
      "An electric vehicle isn't a cost—it's a high-return investment! 💡\n\n🛵 **2-Wheelers:** NPR 1.85L – 2.15L (Save ~NPR 1 Lakh/year!)\n🛺 **3-Wheelers:** NPR 2.6L – 4.2L (Double your daily income!)\n📦 **Cargo Loaders:** NPR 3.2L – 4.5L (Cut logistics costs by 80%!)\n\nWe also offer **Easy Bank Financing & EMI** options so you can pay while you earn/save. Don't let upfront costs hold you back from massive long-term savings. Shall I connect you with our sales team for exact EMI details?"
    ],
    responses_ne: [
      "विद्युतीय सवारी साधन खर्च होइन—यो एक उच्च-प्रतिफल दिने लगानी हो! 💡\n\n🛵 **२-पाङ्ग्रे:** NPR १.८५ लाख – २.१५ लाख (वर्षमा ~१ लाख बचत गर्नुहोस्!)\n🛺 **३-पाङ्ग्रे:** NPR २.६ लाख – ४.२ लाख (तपाईंको दैनिक आम्दानी दोब्बर बनाउनुहोस्!)\n📦 **कार्गो लोडर:** NPR ३.२ लाख – ४.५ लाख (ढुवानी खर्च ८०% ले घटाउनुहोस्!)\n\nहामी **सजिलो बैंक फाइनान्सिङ र EMI** विकल्पहरू पनि प्रदान गर्छौं ताकि तपाईं कमाउँदै/बचत गर्दै तिर्न सक्नुहुन्छ। सुरुवातको मूल्यले तपाईंको ठूलो दीर्घकालीन बचतलाई रोक्न नदिनुहोस्। के म तपाईंलाई EMI विवरणहरूको लागि हाम्रो बिक्री टोलीसँग सम्पर्क गराऊँ?"
    ]
  },

  battery_charging: {
    samples: ["battery", "charge", "charging", "range", "mileage", "how far", "how long to charge", "recharge", "charging time", "battery life", "lithium", "lead acid", "battery warranty", "how many km", "distance per charge", "full charge", "charging cost"],
    responses_en: [
      "Our battery tech is top-of-the-line! ⚡🔋\n\n**Lithium Battery:**\n• Charging time: 3–5 hours\n• Range: Up to **200 KM**\n• Warranty: Up to **36 months**\n\n**Lead Acid Battery:**\n• Charging time: 8–10 hours\n• Range: 100–120 KM\n\n💰 **Cost per charge:** ~NPR 60–80 for full charge!\n\nWant to know the range for a specific model?"
    ],
    responses_ne: [
      "हाम्रो ब्याट्री प्रविधि उत्कृष्ट छ! ⚡🔋\n\n**लिथियम ब्याट्री:**\n• चार्ज हुने समय: ३–५ घण्टा\n• रेन्ज: **२०० किमी** सम्म\n• वारेन्टी: **३६ महिना** सम्म\n\n**लेड एसिड ब्याट्री:**\n• चार्ज हुने समय: ८–१० घण्टा\n• रेन्ज: १००–१२० किमी\n\n💰 **प्रति चार्ज लागत:** फुल चार्जको लागि मात्र NPR ६०–८०!\n\nकुनै विशेष गाडीको रेन्ज जान्न चाहनुहुन्छ?"
    ]
  },

  dealers: {
    samples: ["dealer", "showroom", "shop", "location", "nearest", "find", "branch", "where are you", "city", "service center", "workshop", "near me", "kahan", "showroom address", "contact address", "birgunj", "bharatpur", "kalaiya", "hetauda", "tandi", "dealer near"],
    responses_en: [
      "We have premium showrooms across Nepal! 🗺️\n\n📍 **Head Office:** Birgunj — Trimurti Chowk (+977-9821107355)\n📍 Bharatpur — Kshetrapur (+977-9812287436)\n📍 Kalaiya — Gadhimai Road (+977-9802595085)\n📍 Hetauda — Shitalmahal Chowk (+977-9801235567)\n📍 Tandi — Bhanu Chowk (+977-9828020134)\n\nWhich city are you in? I'll give you the exact contact! 😊"
    ],
    responses_ne: [
      "नेपालभर हाम्रा प्रिमियम शोरुमहरू छन्! 🗺️\n\n📍 **प्रधान कार्यालय:** वीरगन्ज — त्रिमूर्ति चोक (+977-9821107355)\n📍 भरतपुर — क्षेत्रपुर (+977-9812287436)\n📍 कलैया — गढीमाई रोड (+977-9802595085)\n📍 हेटौंडा — शितलमहल चोक (+977-9801235567)\n📍 टाँडी — भानु चोक (+977-9828020134)\n\nतपाईं कुन सहरमा हुनुहुन्छ? म तपाईंलाई सही सम्पर्क नम्बर दिनेछु! 😊"
    ]
  },

  testRide: {
    samples: ["test ride", "test drive", "trial", "demo", "book", "appointment", "try out", "can i try", "want to try", "drive it", "test karen", "free ride", "free demo"],
    responses_en: [
      "Yes! Test rides are completely **FREE** 🎉🛵\n\n📞 Book by calling: **+977-9821107355**\n🌐 Or fill the Contact form on our website\n🕘 Hours: Sunday–Friday, 9:00 AM – 6:00 PM\n\nWhich vehicle would you like to test ride first?"
    ],
    responses_ne: [
      "हो! टेस्ट राइड पूर्ण रूपमा **नि:शुल्क** छ 🎉🛵\n\n📞 कल गरेर बुक गर्नुहोस्: **+977-9821107355**\n🌐 वा हाम्रो वेबसाइटमा सम्पर्क फारम भर्नुहोस्\n🕘 समय: आइतबार–शुक्रबार, बिहान ९:०० – बेलुका ६:००\n\nतपाईं कुन गाडीको टेस्ट राइड लिन चाहनुहुन्छ?"
    ]
  },

  warranty_service: {
    samples: ["warranty", "guarantee", "service", "repair", "maintenance", "problem", "issue", "after sale", "spare parts", "breakdown", "support", "free service", "insurance", "road tax", "service center", "how long warranty", "what is covered", "claim"],
    responses_en: [
      "We provide the best after-sales support in Nepal! 🛡️\n\n**Warranty:**\n• Lithium Battery: Up to 36 months\n• Motor & Controller: 6-24 months\n\n**Free with every vehicle:**\n✅ Up to 6 free services\n✅ Free insurance & road tax included (on select models)\n\n**Service Network:**\n• Service centers at all 12+ dealer locations\n\nCall **+977-9821107355** to book a service!"
    ],
    responses_ne: [
      "हामी नेपालमा उत्कृष्ट बिक्रीपछिको सेवा प्रदान गर्छौं! 🛡️\n\n**वारेन्टी:**\n• लिथियम ब्याट्री: ३६ महिना सम्म\n• मोटर र कन्ट्रोलर: ६-२४ महिना\n\n**हरेक गाडीको साथ नि:शुल्क:**\n✅ ६ वटा सम्म नि:शुल्क सर्भिसिङ\n✅ नि:शुल्क बिमा र सडक कर समावेश (केही मोडलहरूमा)\n\n**सर्भिस नेटवर्क:**\n• सबै १२+ डिलर स्थानहरूमा सर्भिस सेन्टरहरू\n\nसर्भिस बुक गर्न **+977-9821107355** मा कल गर्नुहोस्!"
    ]
  },

  contact_info: {
    samples: ["contact", "phone", "call", "number", "email", "address", "reach", "headquarters", "how to contact", "phone number", "call you", "get in touch", "helpline", "customer care", "website", "facebook", "social media", "online", "contact number"],
    responses_en: [
      "Here's how to reach Kushwaha Motors! 📞\n\n**📍 Head Office:**\nTrimurti Chowk, Shreepur, Birgunj, Nepal\n\n**📞 Phone:**\n+977-9821107355\n+977-9801082474\n\n**🌐 Website:**\nwww.kushwahamotors.com.np\n\n**🕘 Open Hours:**\nSunday–Friday: 9:00 AM – 6:00 PM"
    ],
    responses_ne: [
      "कुशवाह मोटर्सलाई सम्पर्क गर्ने तरिका यहाँ छ! 📞\n\n**📍 प्रधान कार्यालय:**\nत्रिमूर्ति चोक, श्रीपुर, वीरगन्ज, नेपाल\n\n**📞 फोन:**\n+977-9821107355\n+977-9801082474\n\n**🌐 वेबसाइट:**\nwww.kushwahamotors.com.np\n\n**🕘 खुल्ने समय:**\nआइतबार–शुक्रबार: बिहान ९:०० – बेलुका ६:००"
    ]
  },

  about_company: {
    samples: ["about", "company", "history", "who are", "kushwaha motors", "established", "founded", "since when", "background", "story", "mission", "vision", "how old", "experience", "years", "tell me about kushwaha", "what is kushwaha motors"],
    responses_en: [
      "About Kushwaha Motors! 🏢🌿\n\n**Founded:** 2015\n**Headquarters:** Birgunj, Parsa, Nepal\n**Mission:** Making sustainable electric transport accessible across all of Nepal\n\n**Our Numbers:**\n• 10+ years of EV experience\n• 12+ dealer showrooms across Nepal\n• 5,000+ happy EV owners\n\nWe believe in a cleaner, smarter, self-reliant Nepal! 🇳🇵⚡"
    ],
    responses_ne: [
      "कुशवाह मोटर्सको बारेमा! 🏢🌿\n\n**स्थापना:** २०१५\n**प्रधान कार्यालय:** वीरगन्ज, पर्सा, नेपाल\n**लक्ष्य:** नेपालभर दिगो विद्युतीय यातायात पहुँचयोग्य बनाउने\n\n**हाम्रो तथ्याङ्क:**\n• EV क्षेत्रमा १०+ वर्षको अनुभव\n• नेपालभर १२+ डिलर शोरुमहरू\n• ५,०००+ सन्तुष्ट ग्राहकहरू\n\nहामी सफा, स्मार्ट, र आत्मनिर्भर नेपालमा विश्वास गर्छौं! 🇳🇵⚡"
    ]
  },

  unknown: {
    samples: [],
    responses_en: [
      "I'm trained specifically on Kushwaha Motors' vehicles, pricing, and services! 🤔 Could you ask me about our 2-wheelers, 3-wheelers, cargo vehicles, dealer locations, battery range, or pricing?",
      "Hmm, I didn't quite get that! 😊 Try asking me things like:\n• 'Compare TM007 vs V7G'\n• 'What is the range of KM-E5L?'\n• 'Where is your nearest showroom?'\n\nOr call us directly: **+977-9821107355**"
    ],
    responses_ne: [
      "मलाई Kushwaha Motors का सवारी, मूल्य, र सेवाहरूको बारेमा मात्र जानकारी छ! 🤔 के तपाईं मलाई २-पाङ्ग्रे, ३-पाङ्ग्रे, कार्गो गाडी, डिलर स्थान, ब्याट्री रेन्ज, वा मूल्यको बारेमा सोध्न सक्नुहुन्छ?",
      "मलाई ठ्याक्कै बुझ्न गाह्रो भयो! 😊 कृपया यस्ता कुराहरू सोध्नुहोस्:\n• 'TM007 र V7G बीच तुलना गर्नुहोस्'\n• 'KM-E5L को रेन्ज कति छ?'\n• 'तपाईंको नजिकको शोरुम कहाँ छ?'\n\nवा हामीलाई सीधै कल गर्नुहोस्: **+977-9821107355**"
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

const getMLResponse = (text, lang) => {
  if (!text.trim() || text.length < 2) return TRAINING_DATA.unknown[`responses_${lang}`][0];

  const predictedIntent = mlModel.predict(text);
  
  if (!predictedIntent) {
    const fallback = TRAINING_DATA.unknown[`responses_${lang}`];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }

  const responses = TRAINING_DATA[predictedIntent][`responses_${lang}`];
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

const TYPING_DELAY = 1200;

// ── AI Persona Generator ──────────────────────────────────────────────────
const generateSalesPersona = (leadData, messages) => {
  const hasEmail = leadData.email && leadData.email !== 'Not provided';
  const vehicleStr = leadData.vehicle.toLowerCase();
  const isCommercial = vehicleStr.includes('cargo') || vehicleStr.includes('rickshaw') || vehicleStr.includes('3-wheeler') || vehicleStr.includes('auto');
  const isUndecided = vehicleStr === 'not fixed' || vehicleStr.includes('not') || vehicleStr.includes('sure') || vehicleStr === '';
  const userMsgCount = messages.filter(m => m.role === 'user').length;
  
  let analysis = "🧠 AI Sales Psychology Summary:\n";
  
  if (!hasEmail) {
    analysis += "• Profile: Likely an everyday buyer who prefers traditional, direct communication. Skip emails and focus heavily on building a friendly, personal connection over the phone.\n";
  } else {
    analysis += "• Profile: Comfortable with digital tools. They might appreciate follow-up WhatsApp messages with brochures or formal EMI breakdowns.\n";
  }

  if (isCommercial) {
    analysis += "• Motivation: Highly motivated by business ROI and daily earnings. Focus your pitch on massive petrol savings, low maintenance, and high load capacity.\n";
  } else if (isUndecided) {
    analysis += "• Motivation: They are undecided and need guidance. Act as a helpful consultant—ask them about their daily travel route and suggest a vehicle that fits their lifestyle.\n";
  } else {
    analysis += "• Motivation: Personal commuter. Sell them on the premium lifestyle, zero fuel costs, and modern smart features.\n";
  }

  if (userMsgCount <= 5) {
    analysis += "• Approach: They were very brief in the chat. They want quick, straightforward action. Don't overwhelm them with specs—just lock in the test ride immediately.";
  } else {
    analysis += "• Approach: They engaged well in the chat, indicating high buying intent. A detailed, warm follow-up call will likely convert this lead easily.";
  }

  return analysis;
};

// ── Main Chatbot Component ───────────────────────────────────────────────
const AIChatbot = () => {
  const { language: globalLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState(null); // 'en' or 'ne'
  const [messages, setMessages] = useState([
    { id: 1, role: 'bot', text: "कुन भाषामा कुरा गर्न चाहनुहुन्छ? / Which language would you like to speak?" }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [leadState, setLeadState] = useState('idle');
  const [leadData, setLeadData] = useState({ name: '', phone: '', email: '', vehicle: '' });
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Sync with global language on open
  useEffect(() => {
    if (open && !language) {
      if (globalLanguage === 'ne') {
        setLanguage('ne');
        setMessages([{ id: Date.now(), role: 'bot', text: "नमस्ते! 🙏 म KM-AI हुँ, Kushwaha Motors को आधिकारिक सहायक। के तपाईं व्यक्तिगत वा व्यापारिक प्रयोजनको लागि गाडी खोज्दै हुनुहुन्छ? तपाईंको आवश्यकता बताउनुहोस्, म उत्कृष्ट विकल्प खोज्न मद्दत गर्नेछु!" }]);
      } else if (globalLanguage === 'en') {
        setLanguage('en');
        setMessages([{ id: Date.now(), role: 'bot', text: "Hello! 🙏 I'm KM-AI, Kushwaha Motors' official assistant. Are you looking for a vehicle for personal use or business? Tell me what you need, and I'll find the perfect match for you!" }]);
      }
    }
  }, [open, globalLanguage, language]);

  const handleLeadFlow = async (msg) => {
    let nextState = 'idle';
    let botReply = '';

    if (leadState === 'name') {
      setLeadData(prev => ({ ...prev, name: msg }));
      nextState = 'phone';
      botReply = language === 'ne' ? "धन्यवाद! अब कृपया तपाईंको **फोन नम्बर** दिनुहोस्।" : "Thanks! What is your **Phone Number**?";
    } else if (leadState === 'phone') {
      setLeadData(prev => ({ ...prev, phone: msg }));
      nextState = 'email';
      botReply = language === 'ne' ? "तपाईंको **इमेल ठेगाना** के हो? (छैन भने 'skip' लेख्नुहोस्)" : "What is your **Email Address**? (Or type 'skip')";
    } else if (leadState === 'email') {
      setLeadData(prev => ({ ...prev, email: msg.toLowerCase() === 'skip' || msg === 'छैन' ? 'Not provided' : msg }));
      nextState = 'vehicle';
      botReply = language === 'ne' ? "तपाईं कुन **सवारी साधन** (जस्तै: स्कुटर, रिक्शा) मा रुचि राख्नुहुन्छ?" : "Which **vehicle model** are you interested in?";
    } else if (leadState === 'vehicle') {
      const finalVehicle = msg;
      setLeadData(prev => ({ ...prev, vehicle: finalVehicle }));
      nextState = 'processing';
      botReply = language === 'ne' ? "तपाईंको विवरण पठाउँदैछ..." : "Sending your details...";
    }

    setTyping(false);
    setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botReply }]);
    setLeadState(nextState);

    if (nextState === 'processing') {
      const finalData = { ...leadData, vehicle: msg };
      const historyStr = messagesRef.current.map(m => `[${m.role.toUpperCase()}]: ${m.text}`).join('\n') + `\n[USER]: ${msg}`;
      const personaSummary = generateSalesPersona(finalData, messagesRef.current);

      const templateParams = {
        from_name: finalData.name,
        from_phone: finalData.phone,
        from_email: finalData.email,
        vehicle: finalData.vehicle,
        message: personaSummary + "\n\n──────────────────────────────\n\n" + "💬 Chat Transcript:\n\n" + historyStr,
        sent_time: new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' })
      };

      try {
        await emailjs.send('service_u0ym8nu', 'template_j9z3uoe', templateParams);
        setMessages(prev => [...prev, { id: Date.now()+1, role: 'bot', text: language === 'ne' ? "✅ सन्देश सफलतापूर्वक पठाइयो! हाम्रो टिमले तपाईंलाई छिट्टै सम्पर्क गर्नेछ।" : "✅ Message sent successfully! Our team will contact you shortly." }]);
      } catch (err) {
        setMessages(prev => [...prev, { id: Date.now()+1, role: 'bot', text: language === 'ne' ? "❌ पठाउन असफल भयो। कृपया हामीलाई सिधै कल गर्नुहोस्: +977-9821107355" : "❌ Failed to send. Please call us directly at +977-9821107355." }]);
      }
      setLeadState('idle');
      setLeadData({ name: '', phone: '', email: '', vehicle: '' });
    }
  };

  const sendMessage = (text) => {
    const msg = text.trim();
    if (!msg) return;
    
    if (!language) {
      if (msg === 'नेपाली') {
        setLanguage('ne');
        setMessages([{ id: Date.now(), role: 'bot', text: "नमस्ते! 🙏 म KM-AI हुँ, Kushwaha Motors को आधिकारिक सहायक। के तपाईं व्यक्तिगत वा व्यापारिक प्रयोजनको लागि गाडी खोज्दै हुनुहुन्छ? तपाईंको आवश्यकता बताउनुहोस्, म उत्कृष्ट विकल्प खोज्न मद्दत गर्नेछु!" }]);
      } else if (msg === 'English') {
        setLanguage('en');
        setMessages([{ id: Date.now(), role: 'bot', text: "Hello! 🙏 I'm KM-AI, Kushwaha Motors' official assistant. Are you looking for a vehicle for personal use or business? Tell me what you need, and I'll find the perfect match for you!" }]);
      }
      return;
    }

    const userMsg = { id: Date.now(), role: 'user', text: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    if (leadState !== 'idle') {
      setTimeout(() => handleLeadFlow(msg), TYPING_DELAY);
      return;
    }
    
    setTimeout(() => {
      const predictedIntent = mlModel.predict(msg);
      let botText = getMLResponse(msg, language);

      if (predictedIntent === 'testRide' || predictedIntent === 'contact_info') {
        setTyping(false);
        setMessages(prev => [
          ...prev, 
          { id: Date.now() + 1, role: 'bot', text: botText },
          { id: Date.now() + 2, role: 'bot', text: language === 'ne' ? "यसको लागि मलाई तपाईंको केही विवरणहरू आवश्यक छ। कृपया तपाईंको **पूरा नाम** बताउनुहोस्।" : "To arrange this, I just need a few details. What is your **Full Name**?" }
        ]);
        setLeadState('name');
      } else {
        setTyping(false);
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'bot', text: botText }]);
      }
    }, TYPING_DELAY);
  };

  const handleSubmit = (e) => { e.preventDefault(); sendMessage(input); };
  const handleQuick = (q) => sendMessage(q);

  const resetChat = () => {
    setLanguage(null);
    setMessages([{ id: 1, role: 'bot', text: "कुन भाषामा कुरा गर्न चाहनुहुन्छ? / Which language would you like to speak?" }]);
    setTyping(false);
    setLeadState('idle');
    setLeadData({ name: '', phone: '', email: '', vehicle: '' });
  };

  const currentQuickReplies = language === null 
    ? ['नेपाली', 'English'] 
    : (language === 'ne' ? ['तपाईंका गाडीहरू किन उत्कृष्ट छन्?', '२-पाङ्ग्रे तुलना गर्नुहोस्', '३-पाङ्ग्रे विवरण', 'मूल्य सूची', 'टेस्ट राइड बुक गर्नुहोस्'] : ['Why are your vehicles the best?', 'Compare 2-Wheelers', 'Details of 3-Wheelers', 'Price list', 'Book test ride']);


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
                    <span style={{ fontSize: '0.58rem', background: 'rgba(19,123,57,0.1)', border: '1px solid rgba(19,123,57,0.2)', color: 'var(--elec)', padding: '2px 7px', borderRadius: 20, letterSpacing: '0.5px', fontWeight: 800 }}>ONLINE</span>
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
                {currentQuickReplies.map(q => (
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
                    placeholder={language === 'ne' ? "सवारी साधन, मूल्य, डिलरहरूको बारेमा सोध्नुहोस्…" : (language === 'en' ? "Ask about vehicles, pricing, dealers…" : "Select a language first")}
                    style={{ flex: 1, padding: '11px 16px', fontSize: '0.875rem', borderRadius: 12, background: '#F3F9F5', border: '1px solid rgba(19,123,57,0.15)', color: 'var(--txt)', outline: 'none', transition: 'border-color 0.2s' }}
                    onFocus={e => e.target.style.borderColor = 'var(--elec)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(19,123,57,0.15)'}
                    disabled={typing || !language}
                  />
                  <button type="submit" disabled={typing || !input.trim() || !language}
                    style={{ width: 44, height: 44, borderRadius: 12, background: (input.trim() && language) ? 'linear-gradient(135deg,var(--elec),var(--nature))' : 'rgba(19,123,57,0.06)', border: 'none', color: (input.trim() && language) ? '#fff' : 'var(--txt-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: (input.trim() && language) ? 'pointer' : 'default', flexShrink: 0, transition: 'all 0.3s', boxShadow: (input.trim() && language) ? '0 4px 14px rgba(19,123,57,0.35)' : 'none' }}>
                    <Send size={16} />
                  </button>
                </form>
                <div style={{ marginTop: 8, fontSize: '0.65rem', color: 'var(--txt-3)', textAlign: 'center' }}>
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
