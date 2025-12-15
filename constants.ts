import { SlideType, SlideData, QuestionTF, QuestionMC, GrammarItem, DrillItem, MatchingPair, Vocabulary, ChecklistItem, QAItem, ScrambleItem, DebriefItem, ImperativeSign, MissionLogStep, GrammarQuizItem, KeyPoint } from './types';

// ==========================================
// 📂 DOSYA KURULUM REHBERİ (MEDIA ASSETS)
// ==========================================
// Projenin ana dizininde (index.html'in yanında) 'public' klasörü oluşturun.
// Onun içine 'media' klasörü oluşturun.
// Aşağıdaki dosyaları oraya atın:
//
// 1. uludag_spring.jpg   (Arka plan)
// 2. hiker_advice.jpg    (Tavsiye veren kişi)
// 3. snow_trees.jpg      (Ekstra görsel)
// 4. background_snow.mp4 (Kar yağış videosu)
// 5. uludag_part1.mp3    (Ses dosyası 1)
// 6. uludag_part2.mp3    (Ses dosyası 2)
// ==========================================

const uludagSpring = '/media/uludag_spring.jpg';
const hikerAdvice = '/media/hiker_advice.jpg';
const snowTrees = '/media/snow_trees.jpg'; 

export const LESSON_TITLE = "Unit 4D – Uludağ Springwatch";

// Combined text for reference during activities
const FULL_READING_TEXT = `PART 1: THE CHANGING SEASON
Uludağ has four seasons, but many people think the best time to visit is early spring. In spring, the weather changes a lot. Some mornings are cold and cloudy, and some afternoons are sunny and warm. Sometimes it rains, and sometimes there is a small storm, so you should always check the weather before you travel. You should also bring warm clothes because the mountain can be very cool in the evenings, even on a sunny day.

When the snow starts to melt, small white blossoms appear on the trees. People in Türkiye call this time “Bahar Dalgası”, because a soft wave of colour moves down the mountain. Many visitors come to Uludağ to enjoy this short season. People walk on the mountain paths, take photos of the trees, drink hot tea, and enjoy the fresh air. You should go early if you want a quiet place. If you arrive late, it becomes crowded, and you shouldn’t expect to find a good spot to sit.

During this week, some families make small picnics when the weather is dry and warm. Others buy simple local food from small shops. But visitors shouldn’t leave rubbish on the ground—please use the bins. Uludağ is beautiful, and everyone should help keep it clean.

The blossoms stay for only about one week, and then they begin to fall. It is a short time, but many people say it is the most beautiful week of the year. If you enjoy nature, fresh air, and changing weather, you should visit Uludağ in early spring. Just remember: check the weather, go early, and bring a warm jacket.`;

export const SLIDES: SlideData[] = [
  // 1. COVER
  {
    id: 0,
    type: SlideType.COVER,
    title: "ULUDAĞ SPRINGWATCH",
    subtitle: "Weather, Seasons & Advice",
    content: {
      backgroundImage: uludagSpring
    }
  },

  // 2. LEARNING OBJECTIVES
  {
    id: 1,
    type: SlideType.OBJECTIVES,
    title: "Mission Briefing",
    subtitle: "Objectives & Intel",
    content: {
        objectives: [
            "Talk about weather and seasons using simple adjectives",
            "Understand and use should / shouldn’t to give basic advice",
            "Use imperatives to give simple instructions and rules",
            "Describe what people do in a famous place in Türkiye during a special season",
            "Answer simple comprehension questions about a short reading text"
        ],
        grammar: [
            "should / shouldn’t + infinitive",
            "Imperatives (Go / Don't go)"
        ],
        vocabulary: [
            "Weather: windy, rainy, snowing, cloudy, sunny, stormy",
            "Adjectives: hot, cold, warm, cool, dry, wet",
            "Seasons: spring, summer, autumn, winter"
        ],
        context: "We will learn English through a short text about Uludağ during early spring, when the snow begins to melt, the weather changes quickly, and people enjoy outdoor activities.",
        importance: "In everyday life and travel, we often need to describe the weather, make plans, and give advice. Understanding simple weather words and using should / shouldn’t helps us communicate clearly."
    }
  },

  // 3. ICE BREAKER 1 - Getting Permission
  {
    id: 2,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 1",
    subtitle: "Getting Permission",
    content: {
        backgroundImage: uludagSpring,
        question: "You want a weekend pass for Uludağ Springwatch. You have two difficult options. Which one SHOULD you choose?",
        type: "poll",
        options: [
            { icon: "🌧️", text: "Stand at Muster* for 2 hours in the rain." },
            { icon: "💤", text: "Listen to a 2-hour lecture but you CANNOT sleep." }
        ],
        prompt: "'Is the rain better than staying awake? Why?'",
        footnote: "*Muster: İçtima / Tabur"
    }
  },

  // 4. ICE BREAKER 2 - Menu Dilemma
  {
    id: 3,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 2",
    subtitle: "The Menu Dilemma",
    content: {
        backgroundImage: uludagSpring,
        question: "Before going to Uludağ for a springwatch, you are hungry. You SHOULD choose one:",
        type: "poll",
        options: [
            { icon: "🥬", text: "Eat cold Kapuska for dinner." },
            { icon: "🥦", text: "Drink warm Broccoli Soup for breakfast." }
        ],
        prompt: "'Which gives you more energy for the mountain?'"
    }
  },

  // 5. ICE BREAKER 3 - Duty Roster (UPDATED CONTEXT)
  {
    id: 4,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 3",
    subtitle: "Earning the Permit",
    content: {
        backgroundImage: uludagSpring,
        question: "To get permission for the trip, your commander at the Naval Petty Officer Vocational School gives you a choice. You SHOULD pick:",
        type: "poll",
        options: [
            { icon: "🧹", text: "Clean Building 540 completely alone." },
            { icon: "🥔", text: "Peel 100kg of potatoes in the galley*." }
        ],
        prompt: "'Which makes you less tired?'",
        footnote: "*Galley: Dining Hall Kitchen"
    }
  },

  // 6. ICE BREAKER 4 - Equipment Failure
  {
    id: 5,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 4",
    subtitle: "Equipment Failure",
    content: {
        backgroundImage: uludagSpring,
        question: "You are on the mountain now. Which disaster do you choose?",
        type: "poll",
        options: [
            { icon: "🩴", text: "There is 1 meter of snow, but you only have slippers." },
            { icon: "☕", text: "You have boots, but a cup of tea costs 500 TL (You have no money)." }
        ],
        prompt: "'Is it better to be cold or broke?'"
    }
  },

  // 7. ICE BREAKER 5 - Protocol Emergency
  {
    id: 6,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 5",
    subtitle: "Mountain Protocol",
    content: {
        backgroundImage: uludagSpring,
        question: "You are on the chairlift*. You see your Commander passing in the opposite chair. You SHOULD:",
        type: "poll",
        options: [
            { icon: "🫡", text: "Stand to attention and salute (Risk falling 20 meters)." },
            { icon: "⛄", text: "Pretend to be a frozen snowman (Safety First)." }
        ],
        prompt: "'Is discipline more important than gravity?'",
        footnote: "*Chairlift: Teleferik / Telesiyej"
    }
  },

  // 8. ICE BREAKER 6 - Video Intel
  {
    id: 7,
    type: SlideType.ICE_BREAKER,
    title: "PRE-MISSION CHECK 6",
    subtitle: "Video Intelligence",
    content: {
        backgroundImage: uludagSpring,
        question: "External Mission: Watch the video and answer the question.",
        type: "external_link",
        linkUrl: "https://en.islcollective.com/english-esl-video-lessons/listening-comprehension/deep-listening-focus-on-meaning/spring-what-happens-in-spring/414105",
        buttonText: "LAUNCH VIDEO MISSION",
        prompt: "Click the button to open the activity. Come back when finished."
    }
  },

  // 9. READING (PART 1 + 2 Combined)
  {
    id: 8,
    type: SlideType.READING,
    title: "Springwatch in Uludağ",
    subtitle: "The Changing Season & Protection",
    content: {
      backgroundVideo: "/media/background_snow.mp4",
      audioSrc: "/media/uludag_part1.mp3", 
      vocabulary: [
        { word: "seasons", definition: "Spring, Summer, Autumn, Winter." },
        { word: "visit", definition: "To go and see a place." },
        { word: "early", definition: "Near the beginning (not late)." },
        { word: "spring", definition: "The season after winter. Flowers grow." },
        { word: "weather", definition: "Sun, rain, wind, hot or cold." },
        { word: "cloudy", definition: "No sun; white/grey sky." },
        { word: "mornings", definition: "The first part of the day." },
        { word: "afternoons", definition: "The time after 12:00 PM." },
        { word: "sunny", definition: "Bright sun in the sky." },
        { word: "warm", definition: "A little hot; nice temperature." },
        { word: "storm", definition: "Bad weather with strong wind and rain." },
        { word: "check", definition: "To look and see if something is okay." },
        { word: "travel", definition: "To go to a different place." },
        { word: "clothes", definition: "Things you wear (jacket, pants, hat)." },
        { word: "cool", definition: "A little cold." },
        { word: "evenings", definition: "The end of the day, before sleep." },
        { word: "melt", definition: "To change from ice/snow to water." },
        { word: "blossoms", definition: "Flowers on trees." },
        { word: "appear", definition: "To start to be seen." },
        { word: "wave", definition: "Movement like water (Dalga)." },
        { word: "visitors", definition: "People who come to visit." },
        { word: "enjoy", definition: "To like doing something; have fun." },
        { word: "fresh", definition: "Clean and cool (air)." },
        { word: "quiet", definition: "No noise; silence." },
        { word: "crowded", definition: "Full of many people." },
        { word: "spot", definition: "A specific place." },
        { word: "picnics", definition: "Eating food outside on the ground." },
        { word: "rubbish", definition: "Trash; garbage." },
        { word: "bins", definition: "Containers for rubbish." }
      ] as Vocabulary[],
      keyPoints: [
        { title: "Altitude Data", content: "Uludağ is the highest mountain in the Marmara region (2,543 meters). It is very high!", position: 'right' },
        { title: "Ancient Code", content: "In ancient history, its name was 'Olympos Mysios'.", position: 'left' }
      ] as KeyPoint[],
      text: `Uludağ has four seasons, but many people think the best time to visit is early spring. In spring, the weather changes a lot. Some mornings are cold and cloudy, and some afternoons are sunny and warm. Sometimes it rains, and sometimes there is a small storm, so you should always check the weather before you travel. You should also bring warm clothes because the mountain can be very cool in the evenings, even on a sunny day.

When the snow starts to melt, small white blossoms appear on the trees. People in Türkiye call this time “Bahar Dalgası”, because a soft wave of colour moves down the mountain. Many visitors come to Uludağ to enjoy this short season. People walk on the mountain paths, take photos of the trees, drink hot tea, and enjoy the fresh air. You should go early if you want a quiet place. If you arrive late, it becomes crowded, and you shouldn’t expect to find a good spot to sit.`
    }
  },

  // 10. READING (PART 2 Focused)
  {
    id: 9,
    type: SlideType.READING,
    title: "Detailed Intel: Protection",
    subtitle: "Picnics & Rules",
    content: {
      backgroundVideo: "/media/background_snow.mp4",
      backgroundImage: hikerAdvice,
      footerImage: uludagSpring, 
      audioSrc: "/media/uludag_part2.mp3",
      vocabulary: [
        { word: "picnics", definition: "Eating food outside on the ground." },
        { word: "dry", definition: "Not wet; no rain." },
        { word: "local", definition: "From this place/city." },
        { word: "shops", definition: "Stores; places to buy things." },
        { word: "rubbish", definition: "Trash; garbage; waste." },
        { word: "ground", definition: "The floor outside." },
        { word: "bins", definition: "Containers for rubbish (Çöp kutusu)." },
        { word: "beautiful", definition: "Very pretty; good to look at." },
        { word: "clean", definition: "Not dirty." },
        { word: "stay", definition: "To remain; not go." },
        { word: "fall", definition: "To go down." },
        { word: "short", definition: "Not long." },
        { word: "nature", definition: "Trees, animals, mountains, etc." },
        { word: "remember", definition: "Do not forget." },
        { word: "jacket", definition: "A short coat for cold weather." }
      ] as Vocabulary[],
      keyPoints: [
        { title: "Transport System", content: "The 'Teleferik' (Cable Car) to Uludağ is the longest in Türkiye (9 km).", position: 'right' },
        { title: "Restricted Zone", content: "Uludağ is a National Park (Milli Park). You must follow the rules.", position: 'left' }
      ] as KeyPoint[],
      text: `During this week, some families make small picnics when the weather is dry and warm. Others buy simple local food from small shops. But visitors shouldn’t leave rubbish on the ground—please use the bins. Uludağ is beautiful, and everyone should help keep it clean.

The blossoms stay for only about one week, and then they begin to fall. It is a short time, but many people say it is the most beautiful week of the year. If you enjoy nature, fresh air, and changing weather, you should visit Uludağ in early spring. Just remember: check the weather, go early, and bring a warm jacket.`
    }
  },

  // 11. ACT 1: TRUE / FALSE
  {
    id: 10,
    type: SlideType.COMPREHENSION_TF,
    title: "Intel Verification",
    subtitle: "True or False? (If False, FIX IT!)",
    content: {
      referenceText: FULL_READING_TEXT,
      questions: [
        { 
            id: 1, 
            statement: "Uludağ is most beautiful in early spring.", 
            isTrue: true, 
            explanation: "Correct. Many people think it is the best time.",
            contextHighlight: "Uludağ has four seasons, but many people think the best time to visit is early spring."
        },
        { 
            id: 2, 
            statement: "The weather is always sunny in early spring.", 
            isTrue: false, 
            explanation: "FALSE! It changes a lot (cloudy, cold, warm).",
            contextHighlight: "In spring, the weather changes a lot. Some mornings are cold and cloudy, and some afternoons are sunny and warm."
        },
        { 
            id: 3, 
            statement: "People drink hot tea in Uludağ.", 
            isTrue: true, 
            explanation: "Correct. They drink tea and enjoy fresh air.",
            contextHighlight: "People walk on the mountain paths, take photos of the trees, drink hot tea, and enjoy the fresh air."
        },
        { 
            id: 4, 
            statement: "You should arrive late if you want a quiet place.", 
            isTrue: false, 
            explanation: "FALSE! You should go early. Late = crowded.",
            contextHighlight: "You should go early if you want a quiet place. If you arrive late, it becomes crowded"
        },
        { 
            id: 5, 
            statement: "Visitors should keep the mountain clean.", 
            isTrue: true, 
            explanation: "Correct. Use the bins!",
            contextHighlight: "But visitors shouldn’t leave rubbish on the ground—please use the bins. Uludağ is beautiful, and everyone should help keep it clean."
        },
        { 
            id: 6, 
            statement: "The blossoms stay for about one month.", 
            isTrue: false, 
            explanation: "FALSE! They stay for only about one week.",
            contextHighlight: "The blossoms stay for only about one week, and then they begin to fall."
        }
      ] as QuestionTF[]
    }
  },

  // 12. ACT 2: QA
  {
    id: 11,
    type: SlideType.QA,
    title: "Debriefing: The 'Why'",
    subtitle: "Find the Reason (Causality Check)",
    content: {
      referenceText: FULL_READING_TEXT, 
      questions: [
        { 
            id: 1, 
            question: "Why should you check the weather before you travel?", 
            answer: "Because it changes a lot. It can be sunny, cloudy, or stormy.",
            contextHighlight: "Sometimes it rains, and sometimes there is a small storm, so you should always check the weather before you travel."
        },
        { 
            id: 2, 
            question: "Why should you bring warm clothes?", 
            answer: "Because it is cool in the evenings (even on sunny days).",
            contextHighlight: "You should also bring warm clothes because the mountain can be very cool in the evenings, even on a sunny day."
        },
        { 
            id: 3, 
            question: "Why should you go early?", 
            answer: "Because if you arrive late, it becomes crowded.",
            contextHighlight: "If you arrive late, it becomes crowded, and you shouldn’t expect to find a good spot to sit."
        },
        { 
            id: 4, 
            question: "Why shouldn't you leave rubbish on the mountain?", 
            answer: "Because Uludağ is beautiful and we should keep it clean.",
            contextHighlight: "Uludağ is beautiful, and everyone should help keep it clean."
        },
        { 
            id: 5, 
            question: "Why do many visitors come in early spring?", 
            answer: "To see the 'Bahar Dalgası' (blossoms) and enjoy the fresh air.",
            contextHighlight: "People in Türkiye call this time “Bahar Dalgası”, because a soft wave of colour moves down the mountain. Many visitors come to Uludağ to enjoy this short season."
        }
      ] as QAItem[]
    }
  },

  // 13. ACT 4: MATCHING
  {
    id: 12,
    type: SlideType.MATCHING,
    title: "Weather Report Decoding",
    subtitle: "Match the sentence to the weather word.",
    content: {
      referenceText: FULL_READING_TEXT, 
      pairs: [
        { id: 1, left: "The mountain is sometimes very ___ in the evenings.", right: "Cool", contextHighlight: "the mountain can be very cool in the evenings" },
        { id: 2, left: "People make picnics when the weather is ___ and dry.", right: "Warm", contextHighlight: "some families make small picnics when the weather is dry and warm" },
        { id: 3, left: "Some mornings are ___ in early spring.", right: "Cloudy", contextHighlight: "Some mornings are cold and cloudy" },
        { id: 4, left: "Sometimes it ___ a lot in Uludağ.", right: "Rains", contextHighlight: "Sometimes it rains, and sometimes there is a small storm" },
        { id: 5, left: "On some days, the weather is ___ and people take photos.", right: "Sunny", contextHighlight: "some afternoons are sunny and warm" }
      ] as MatchingPair[]
    }
  },

  // 14. ACT 3: TICK THE ACTIVITIES
  {
    id: 13,
    type: SlideType.CHECKLIST,
    title: "Activity Log",
    subtitle: "Tick the activities mentioned in the text.",
    content: {
      referenceText: FULL_READING_TEXT,
      extensionQuestion: "Which activity is your favorite? Why?",
      items: [
        { id: "1", text: "walk on mountain paths", isCorrect: true, contextHighlight: "People walk on the mountain paths" },
        { id: "2", text: "drink hot tea", isCorrect: true, contextHighlight: "drink hot tea" },
        { id: "3", text: "take photos", isCorrect: true, contextHighlight: "take photos of the trees" },
        { id: "4", text: "go swimming", isCorrect: false },
        { id: "5", text: "ride bicycles", isCorrect: false },
        { id: "6", text: "make picnics", isCorrect: true, contextHighlight: "During this week, some families make small picnics" },
        { id: "7", text: "watch football", isCorrect: false },
        { id: "8", text: "enjoy the fresh air", isCorrect: true, contextHighlight: "enjoy the fresh air" }
      ] as ChecklistItem[]
    }
  },

  // 15. SPEAKING: GRAMMAR EXPLANATION
  {
    id: 14,
    type: SlideType.SPEAKING, 
    title: "Tactical Briefing",
    subtitle: "Rules of Engagement: Advice",
    content: {
        grammarFormula: {
            title: "OPERATIONAL FORMULA",
            structure: "SUBJECT + SHOULD + VERB (Base Form)"
        },
        grammarBox: {
            lines: [
                "SHOULD (Good idea / Advice)",
                "• It is cold. You should wear a jacket. (+)",
                "• You should check the weather. (+)",
                " ",
                "SHOULDN'T (Bad idea / Advice)",
                "• It is late. You shouldn't go there. (-)",
                "• You shouldn't leave rubbish. (-)",
                " ",
                "WRONG EXAMPLES (DO NOT USE):",
                "• You should to go. (WRONG - No 'to')",
                "• He shoulds go. (WRONG - No 's')",
                "• We should going. (WRONG - No 'ing')"
            ]
        },
        tips: [
            { 
                title: "⚠️ NO 'TO'", 
                text: "Never use 'to' after should.\nCORRECT: You should go.\nWRONG: You should to go." 
            },
            { 
                title: "⚠️ NO 'S'", 
                text: "Never add -s, -ed, or -ing.\nCORRECT: He should stay.\nWRONG: He shoulds stay." 
            },
            { 
                title: "🔊 SILENT 'L'", 
                text: "The 'L' in Should is silent.\nSay it like: /ʃʊd/ (Şud)." 
            }
        ]
    }
  },

  // 16. ACT 6: BEST ADVICE (MC) + MILITARY BONUS
  {
    id: 15,
    type: SlideType.COMPREHENSION_MC,
    title: "Command Decisions",
    subtitle: "Choose the Best Advice",
    content: {
        referenceText: FULL_READING_TEXT,
        questions: [
            { 
                id: 1, 
                question: "Situation: The weather changes a lot.", 
                options: ["You should check the weather.", "You should sleep."], 
                correctIndex: 0, 
                explanation: "Always check intel before a mission!", 
                iconType: "general",
                contextHighlight: "so you should always check the weather before you travel"
            },
            { 
                id: 2, 
                question: "Situation: It gets crowded late.", 
                options: ["You shouldn't go early.", "You should go early."], 
                correctIndex: 1, 
                explanation: "Beat the crowd. Go early.", 
                iconType: "general",
                contextHighlight: "You should go early if you want a quiet place."
            },
            { 
                id: 3, 
                question: "Situation: The mountain is cool in the evening.", 
                options: ["You shouldn't bring warm clothes.", "You should bring a warm jacket."], 
                correctIndex: 1, 
                explanation: "Thermal protection is required.", 
                iconType: "general",
                contextHighlight: "You should also bring warm clothes because the mountain can be very cool in the evenings"
            },
            { 
                id: 4, 
                question: "Situation: Uludağ is beautiful.", 
                options: ["You shouldn't keep it clean.", "You should keep it clean."], 
                correctIndex: 1, 
                explanation: "Leave no trace!", 
                iconType: "general",
                contextHighlight: "Uludağ is beautiful, and everyone should help keep it clean."
            },
            // MILITARY BONUS QUESTIONS
            {
                id: 5,
                question: "BONUS: You look very tired.",
                options: ["You shouldn't rest.", "You should rest."],
                correctIndex: 1,
                explanation: "Recovery is essential for soldier efficiency.",
                iconType: "military"
            },
            {
                id: 6,
                question: "BONUS: Tomorrow is the inspection.",
                options: ["You should polish your boots.", "You shouldn't clean your room."],
                correctIndex: 0,
                explanation: "Standards must be high. Clean everything.",
                iconType: "military"
            },
            {
                id: 7,
                question: "BONUS: It is 06:00 AM (Roll Call).",
                options: ["You should be late.", "You should be on time."],
                correctIndex: 1,
                explanation: "Punctuality is discipline.",
                iconType: "military"
            },
            {
                id: 8,
                question: "BONUS: Your boots are wet.",
                options: ["You shouldn't change your socks.", "You should change your socks."],
                correctIndex: 1,
                explanation: "Wet feet cause injury. Change socks immediately.",
                iconType: "military"
            }
        ] as QuestionMC[]
    }
  },

  // 17. ACT 7: IMPERATIVES THEORY + QUIZ
  {
    id: 16,
    type: SlideType.IMPERATIVES,
    title: "Orders & Rules",
    subtitle: "Grammar Briefing & Drill",
    content: {
        // No 'signs' property means it renders as theory
        explanation: "Simple explanation mode.",
        quiz: [
            { id: 1, question: "_____ open your books to page 10.", options: ["Please", "Does"], correctIndex: 0 },
            { id: 2, question: "_____ be late for the meeting.", options: ["Don't", "Not"], correctIndex: 0 },
            { id: 3, question: "_____ this letter to the office.", options: ["Take", "Taking"], correctIndex: 0 },
            { id: 4, question: "_____ touch the wet paint.", options: ["Don't", "Doesn't"], correctIndex: 0 },
            { id: 5, question: "Please _____ your name on the form.", options: ["write", "writes"], correctIndex: 0 },
            { id: 6, question: "_____ careful when crossing the street.", options: ["Be", "Are"], correctIndex: 0 },
            { id: 7, question: "_____ down. You look tired.", options: ["Sit", "Sitting"], correctIndex: 0 },
            { id: 8, question: "_____ be afraid to ask questions.", options: ["Don't", "Isn't"], correctIndex: 0 },
            { id: 9, question: "_____ the trash before leaving.", options: ["Take out", "Takes out"], correctIndex: 0 },
            { id: 10, question: "_____ forget your lunch!", options: ["Don't", "Not"], correctIndex: 0 }
        ] as GrammarQuizItem[]
    }
  },

  // 18. ACT 8: IMPERATIVES PRACTICE
  {
    id: 17,
    type: SlideType.IMPERATIVES,
    title: "Sign Decoding",
    subtitle: "Fix the Broken Code",
    content: {
        // Word Bank: Incorrect/Broken English
        wordBank: [
            "No walk on the grass", 
            "Not pick the flowers", 
            "Please rubbish in the bin", 
            "In storms, use not mobile phones", 
            "Walking this way", 
            "Dangerous hills! No climb", 
            "You go right", 
            "Please no feed the monkey"
        ],
        // Signs: Reveal correct English when clicked
        signs: [
            { icon: "🚷", rule: "Don't walk on the grass.", correct: true },
            { icon: "🚫🌻", rule: "Don't pick the flowers.", correct: true },
            { icon: "🗑️", rule: "Put rubbish in the bin.", correct: true },
            { icon: "📵", rule: "Don't use mobile phones in storms.", correct: true },
            { icon: "👣", rule: "Walk this way.", correct: true },
            { icon: "🧗", rule: "Don't climb the dangerous hills.", correct: true },
            { icon: "➡️", rule: "Go right.", correct: true },
            { icon: "🐒", rule: "Please don't feed the monkeys.", correct: true }
        ] as ImperativeSign[]
    }
  },

  // 19. ACT 9: BRITISH COUNCIL GAME
  {
    id: 18,
    type: SlideType.MEDIA,
    title: "Field Operation: Style a Hero",
    subtitle: "Interactive Training Module",
    content: {
        url: "https://gamedata.britishcouncil.org/lep25/MjIxNTg=/kids",
        // Updated to an anchor image
        thumbnail: "https://img.freepik.com/free-vector/nautical-anchor-symbol-design_23-2147506979.jpg"
    }
  },

  // 20. ACT 10: DEBRIEF
  {
    id: 19,
    type: SlideType.DEBRIEF,
    title: "OFFICIAL MISSION REPORT",
    subtitle: "WEEKEND PASS APPLICATION",
    content: {
        checklist: [
            { text: "METEOROLOGICAL INTEL", reflection: "Weather words identified (Cloudy, Stormy, Cool)." },
            { text: "TACTICAL ADVICE (POSITIVE)", reflection: "Proper use of 'Should' for gear & timing." },
            { text: "RESTRICTED ACTIONS (NEGATIVE)", reflection: "Proper use of 'Shouldn't' for rules." },
            { text: "TERRAIN ANALYSIS", reflection: "Identified 'Bahar Dalgası' & Spring conditions." },
            { text: "OPERATIONAL READINESS", reflection: "Mission Success. Sailor is ready for leave." }
        ] as DebriefItem[]
    }
  }
];
