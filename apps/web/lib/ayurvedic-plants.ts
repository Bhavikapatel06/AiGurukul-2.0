export interface AyurvedicPlant {
  id: string;
  name: string;
  sanskritName: string;
  botanicalName: string;
  category: string;
  categoryKey: 'vitality' | 'brain' | 'immunity' | 'digestion' | 'skin' | 'joints' | 'heart';
  icon: string;
  doshaMatrix: {
    vata: 'reduces' | 'increases' | 'neutral';
    pitta: 'reduces' | 'increases' | 'neutral';
    kapha: 'reduces' | 'increases' | 'neutral';
    summary: string;
  };
  rasaGuna: {
    rasa: string; // Taste
    virya: string; // Potency / Thermal
    vipaka: string; // Post-digestive
  };
  benefits: string[];
  howToUse: {
    form: string;
    dosage: string;
    anupana: string;
    instructions: string;
  };
  whereAndWhen: {
    whenToUse: string;
    whereToUse: string;
    seasonalRitucharya: string;
    symptomsAddressed: string[];
  };
  classicalCitation: {
    verse: string;
    source: string;
    translation: string;
  };
  preparationRecipe: {
    title: string;
    steps: string[];
    precautions: string;
  };
}

export const AYURVEDIC_PLANTS: AyurvedicPlant[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    sanskritName: 'अश्वगन्धा (Ashwagandha)',
    botanicalName: 'Withania somnifera',
    category: 'Rasayana (Vitality & Stress Relief)',
    categoryKey: 'vitality',
    icon: '🌿',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'neutral',
      kapha: 'reduces',
      summary: 'Balances Vata & Kapha; neutral on moderate Pitta',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)',
      virya: 'Ushna (Warm Potency)',
      vipaka: 'Madhura (Nourishing Sweet)',
    },
    benefits: [
      'Lowers serum cortisol and dissolves chronic stress & adrenal fatigue',
      'Rebuilds deep Ojas, physical stamina, and muscular vitality',
      'Promotes restorative, uninterrupted non-drowsy sleep',
      'Tonifies the central nervous system (Majja Dhatu) against burnout',
    ],
    howToUse: {
      form: 'Fine root powder (Churna) or Ashwagandharishta tonic',
      dosage: '1/2 to 1 teaspoon (3–5 grams) once or twice daily',
      anupana: 'Warm cow’s milk (or warm almond milk) with 1/2 tsp pure A2 ghee and a pinch of nutmeg',
      instructions:
        'Stir powder into gently warmed milk with ghee. The healthy fats act as Yogavahi (cellular carrier), transporting adaptogenic withanolides across cell membranes.',
    },
    whereAndWhen: {
      whenToUse: 'At night, 30–45 minutes before bedtime on a light or empty stomach',
      whereToUse: 'Nervous system (Majja Dhatu), adrenal cortex, muscle tissue (Mamsa), and reproductive vitality (Shukra)',
      seasonalRitucharya: 'Ideal during Autumn and Winter (Hemanta & Shishira) when dry Vata causes depletion',
      symptomsAddressed: [
        'Anxiety & restless racing mind',
        'Insomnia & light broken sleep',
        'Physical weakness & chronic fatigue',
        'Joint stiffness & muscle depletion',
      ],
    },
    classicalCitation: {
      verse: 'गन्धर्ववत् पुष्टिबलप्रदात्री रसायनवरा प्रोक्ता वातकफप्रशमनी।',
      source: 'Charaka Samhita Chikitsasthana 1.2',
      translation:
        'Ashwagandha is celebrated as the foremost Rasayana that bestows the vigor and endurance of a noble steed while pacifying agitated Vata and Kapha.',
    },
    preparationRecipe: {
      title: 'Traditional Ashwagandha Ksheerapaka (Herbal Milk)',
      steps: [
        'Pour 1 cup of whole organic milk (or almond milk) and 1/2 cup of water into a small saucepan.',
        'Add 1 teaspoon of organic Ashwagandha churna and a small pinch of freshly grated nutmeg and cardamom.',
        'Simmer on gentle low flame until the water evaporates and 1 cup of rich infused milk remains.',
        'Pour into a cup, stir in 1/2 tsp of pure A2 ghee, and drink warm 40 minutes before sleep.',
      ],
      precautions:
        'Avoid during acute high fever, severe Pitta hyperacidity, or hyperthyroidism without qualified Vaidya guidance.',
    },
  },
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    sanskritName: 'तुलसी • सुरसा (Surasa)',
    botanicalName: 'Ocimum sanctum',
    category: 'Pranavaha (Respiratory & Immune Shield)',
    categoryKey: 'immunity',
    icon: '🍃',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'neutral',
      kapha: 'reduces',
      summary: 'Strongly reduces Kapha & Vata; mild on Pitta in moderation',
    },
    rasaGuna: {
      rasa: 'Katu (Pungent), Tikta (Bitter)',
      virya: 'Ushna (Warm Potency)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Fortifies the respiratory tract, clearing chest and sinus mucus',
      'Potent antimicrobial adaptogen that shields against seasonal viruses',
      'Purifies subtle vital breath (Prana) and clears mental fog',
      'Supports healthy blood glucose regulation and metabolic Agni',
    ],
    howToUse: {
      form: 'Fresh leaves infusion (Phanta), dry leaf powder, or Tulsi herbal tea',
      dosage: '5–10 fresh leaves chewed, or 1/2 to 1 tsp dry powder steeped in 1 cup hot water',
      anupana: 'Lukewarm water with 1 teaspoon raw unprocessed honey (add honey only after liquid cools below 40°C)',
      instructions:
        'Steep fresh or crushed dry leaves in freshly boiled water for 5–7 minutes. Never boil raw honey in hot water as classical Ayurveda cautions against heated honey (Ama formation).',
    },
    whereAndWhen: {
      whenToUse: 'First thing in the morning at dawn (Brahma Muhurta) on an empty stomach',
      whereToUse: 'Respiratory channels (Pranavaha Srotas), throat, lungs, and immune biofield',
      seasonalRitucharya: 'Essential during seasonal shifts (Ritu Sandhi), rainy monsoon (Varsha), and damp winter',
      symptomsAddressed: [
        'Cough, cold, and wet chest congestion',
        'Sinus pressure and morning heaviness',
        'Seasonal allergic sensitivity',
        'Low immune resistance',
      ],
    },
    classicalCitation: {
      verse: 'तुलसी कटुका तिक्ता हृद्योष्णा दाहपित्तकृत्। दीपनी कुष्ठकृच्छ्रास्रपार्श्वरुक्वातकफप्रणुत्॥',
      source: 'Bhavaprakasha Nighantu Pushpa Varga 62',
      translation:
        'Tulsi is pungent, bitter, warming, and heart-pleasing; it kindles digestive fire, purifies blood channels, and relieves cough, side pains, and disorders of Vata and Kapha.',
    },
    preparationRecipe: {
      title: 'Sacred Tulsi & Ginger Morning Immunity Brew',
      steps: [
        'Crush 7–10 fresh Tulsi leaves (or 1 tsp dried Tulsi) with a 1/2-inch coin of crushed fresh ginger root.',
        'Add to 250ml of boiling water and steep covered for 6 minutes.',
        'Strain into a cup. Let cool until comfortable to sip.',
        'Stir in 1 tsp of raw organic honey and a drop of fresh lemon juice.',
      ],
      precautions:
        'May slightly thin the blood; monitor if on anticoagulant pharmaceuticals. Avoid excessive quantities during active internal bleeding.',
    },
  },
  {
    id: 'brahmi',
    name: 'Brahmi (Gotu Kola / Water Hyssop)',
    sanskritName: 'ब्राह्मी • मण्डूकपर्णी (Brahmi)',
    botanicalName: 'Bacopa monnieri',
    category: 'Medhya Rasayana (Cognitive Clarity & Mind)',
    categoryKey: 'brain',
    icon: '🧠',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'neutral',
      summary: 'Supreme Pitta & Vata pacifier; cools mental heat and anxiety',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Supercharges the three intellect faculties: Dhi (acquisition), Dhriti (retention), and Smriti (recall)',
      'Cools an overstimulated, irritable, or perfectionist mind',
      'Promotes calm concentration without caffeine jitters or nervous fatigue',
      'Nourishes hair roots and prevents heat-induced premature greying',
    ],
    howToUse: {
      form: 'Churna (powder), Brahmi Ghrita (medicated ghee), or Saraswatarishta',
      dosage: '1/4 to 1/2 teaspoon (1.5–3 grams) once daily in the morning',
      anupana: 'Warm water with 1 tsp melted A2 cow’s ghee or a spoonful of pure honey',
      instructions:
        'Taking Brahmi with ghee is celebrated in the Charaka Samhita because pure ghee crosses the blood-brain barrier directly nourishing Majja Dhatu (brain and nervous tissue).',
    },
    whereAndWhen: {
      whenToUse: 'Morning on an empty stomach prior to meditation, study, or intensive creative work',
      whereToUse: 'Brain tissue, central nervous system, sensory organs (eyes and crown), and hair follicles',
      seasonalRitucharya: 'Year-round; particularly invaluable during intense summer heat (Grishma) and high cognitive workload',
      symptomsAddressed: [
        'Brain fog & short-term memory lapses',
        'Academic or professional mental burnout',
        'Irritability, anger, and heat-induced headaches',
        'Restless overactive thinking before bed',
      ],
    },
    classicalCitation: {
      verse: 'ब्राह्मी हिमा सरा तिक्ता मेध्यायुष्या रसायनी। स्वर्या स्मृतिप्रदा हन्ति कुष्ठशोथविषज्वरान्॥',
      source: 'Charaka Samhita Chikitsasthana 1.3',
      translation:
        'Brahmi is cooling, intellect-sharpening (Medhya), life-extending (Ayushya), and rejuvenating. It purifies speech, bestows memory, and removes inflammation, poisons, and fevers.',
    },
    preparationRecipe: {
      title: 'Brahmi Medhya Ghee Morning Elixir',
      steps: [
        'Take 1/2 teaspoon of organic Brahmi leaf powder.',
        'Mix into 1 teaspoon of gently melted pure warm A2 cow’s ghee until smooth paste forms.',
        'Consume slowly on an empty stomach 20 minutes before breakfast.',
        'Follow with half a cup of warm water.',
      ],
      precautions:
        'Very high doses on an empty stomach without ghee may cause mild nausea in very sensitive digestive tracts.',
    },
  },
  {
    id: 'shatavari',
    name: 'Shatavari',
    sanskritName: 'शतावरी • बहुसुता (Shatavari)',
    botanicalName: 'Asparagus racemosus',
    category: 'Rasayana & Stanya (Hormones & Cooling)',
    categoryKey: 'vitality',
    icon: '🌸',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'neutral',
      summary: 'Deeply cools Pitta and nourishes Vata; may increase Kapha if taken in excess',
    },
    rasaGuna: {
      rasa: 'Madhura (Sweet), Tikta (Bitter)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Madhura (Nourishing Sweet)',
    },
    benefits: [
      'Master hormonal harmonizer for both women and men across all life cycles',
      'Cools stomach acid and coats the gastric mucosal lining against ulcers',
      'Nourishes reproductive fluids (Shukra & Artava Dhatus) and vitality',
      'Provides sweet, calming hydration to parched mucous membranes and skin',
    ],
    howToUse: {
      form: 'Fine root powder (Churna), Shatavari Gulam, or herbal milk infusion',
      dosage: '1/2 to 1 teaspoon (3–5 grams) once or twice daily',
      anupana: 'Warm whole milk with a pinch of cardamom and rock sugar (mishri) or ghee',
      instructions:
        'Whisk root powder into warm milk with crushed green cardamom. Cardamom enhances digestion of rich cooling herbs.',
    },
    whereAndWhen: {
      whenToUse: 'Mid-morning between meals, or in the evening before dinner',
      whereToUse: 'Reproductive channels (Shukravaha/Artavavaha), stomach mucosal lining, lungs, and heart',
      seasonalRitucharya: 'Superb during hot summer months (Grishma Ritu) and post-monsoon autumn heat (Sharad Ritu)',
      symptomsAddressed: [
        'Acid reflux, heartburn & gastric burning',
        'Hormonal mood swings & menstrual discomfort',
        'Dry skin, vaginal dryness & tissue depletion',
        'Hot flashes and night sweats',
      ],
    },
    classicalCitation: {
      verse: 'शतावरी गुरुः शीता तिक्ता स्वादु रसायनी। मेध्याग्निपुष्टिदा स्निग्धा नेत्र्या शुक्रस्तन्यकरी॥',
      source: 'Sushruta Samhita Sutrasthana 38',
      translation:
        'Shatavari is heavy, cooling, sweet, and rejuvenating; it nourishes intellect, kindle digestive fire gently, enhances vision, and builds reproductive tissues and healthy vitality.',
    },
    preparationRecipe: {
      title: 'Cooling Shatavari Cardamom Tonic',
      steps: [
        'Warm 1 cup of whole milk (or oat milk) with 1/4 cup of water.',
        'Add 1 teaspoon of Shatavari root powder and 2 cracked green cardamom pods.',
        'Simmer for 4 minutes until warm and fragrant.',
        'Sweeten with 1/2 tsp of raw unrefined cane sugar or rock sugar (mishri). Drink lukewarm.',
      ],
      precautions:
        'Avoid in individuals with heavy Kapha fluid stagnation, severe sinus congestion, or acute lung edema.',
    },
  },
  {
    id: 'neem',
    name: 'Neem (Sacred Bitter)',
    sanskritName: 'निम्ब • अरिष्ट (Nimba)',
    botanicalName: 'Azadirachta indica',
    category: 'Raktashodhaka (Blood Purifier & Skin)',
    categoryKey: 'skin',
    icon: '🌿',
    doshaMatrix: {
      vata: 'increases',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Supremely cools Pitta and purges Kapha; may aggravate dry Vata in long use',
    },
    rasaGuna: {
      rasa: 'Tikta (Intensely Bitter), Kashaya (Astringent)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Chief blood-cleansing herb (Raktashodhaka) in classical Ayurvedic dermatology',
      'Purges stubborn acne, eczema, psoriasis, and inflamed dermal eruptions',
      'Detoxifies sluggish liver channels, gall bladder, and spleen',
      'Maintains healthy oral microbiome and strengthens gums',
    ],
    howToUse: {
      form: 'Leaf powder, Neem oil (external), or fresh leaf paste',
      dosage: 'Internal: 1/4 teaspoon (1–2 grams) maximum; External: paste or diluted oil',
      anupana: 'Warm water or aloe vera juice on an empty stomach',
      instructions:
        'Take in short cycles (2 to 4 weeks at a time), then pause. For skin application, blend leaf powder with rosewater into a soothing face mask.',
    },
    whereAndWhen: {
      whenToUse: 'Early morning on an empty stomach; apply external pastes in the evening',
      whereToUse: 'Blood tissue (Rakta Dhatu), liver, skin epidermis, and oral cavity',
      seasonalRitucharya: 'Best taken during Spring (Vasanta Ritu) when winter toxins liquefy, and early Autumn heat',
      symptomsAddressed: [
        'Inflammatory cystic acne & facial redness',
        'Eczema, rashes, and itching (Kandu)',
        'Sluggish toxic liver congestion',
        'Bleeding gums & dental plaque',
      ],
    },
    classicalCitation: {
      verse: 'निम्बः शीतो लघुग्राही कटुपाकोऽग्निवातकृत्। हृद्यः श्रमतृषाकासज्वरारुचिकृमिप्रणुत्॥',
      source: 'Bhavaprakasha Nighantu Guduchyadi Varga',
      translation:
        'Neem is cooling, light, and absorbent. It relieves fatigue, thirst, cough, fevers, loss of appetite, and skin parasites while cleansing inflammatory blood heat.',
    },
    preparationRecipe: {
      title: 'Neem & Turmeric Clarifying Herbal Face Mask',
      steps: [
        'Mix 1/2 teaspoon of organic Neem powder with 1/4 teaspoon of Kasturi Turmeric.',
        'Add 1 tablespoon of pure organic rosewater and 1/2 teaspoon of raw honey.',
        'Mix into a smooth spreadable paste.',
        'Apply to clean face, avoiding the immediate eye area. Leave for 12 minutes and rinse with cool water.',
      ],
      precautions:
        'Contraindicated for individuals actively trying to conceive, during pregnancy, and in states of extreme emaciation or high Vata dryness.',
    },
  },
  {
    id: 'triphala',
    name: 'Triphala (Three Sacred Fruits)',
    sanskritName: 'त्रिफला (हरीतकी + बिभीतक + आमलकी)',
    botanicalName: 'Terminalia chebula, Terminalia bellirica, Phyllanthus emblica',
    category: 'Deepana, Pachana & Rasayana (Digestive Cleanser)',
    categoryKey: 'digestion',
    icon: '🥣',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Tridoshic: masterfully harmonizes Vata, Pitta, and Kapha equally',
    },
    rasaGuna: {
      rasa: 'Contains 5 of 6 tastes (all except Lavana / Salty)',
      virya: 'Anushnasheeta (Balanced, slightly neutral)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Gently tonifies and cleanses the entire gastrointestinal tract without dependency',
      'Purges toxic metabolic waste (Ama) from intestinal villi and colon',
      'Supreme antioxidant source that enhances nutrient assimilation (Agni)',
      'Improves ocular health and vision acuity (Chakshushya rasayana)',
    ],
    howToUse: {
      form: 'Coarse to fine powder (Churna) or tablets (Vati)',
      dosage: '1/2 to 1 teaspoon (3–5 grams) stirred into warm water',
      anupana: 'Warm water (for detox/constipation) or pure ghee and honey (for cellular rejuvenation)',
      instructions:
        'Stir 1/2 tsp powder in warm water, let sit for 10 minutes, and drink the tea including the sediment at the bottom before sleep.',
    },
    whereAndWhen: {
      whenToUse: 'Every evening 30–45 minutes before sleep; or early morning for Rasayana tonification',
      whereToUse: 'Entire gastrointestinal tract, colon (Pakvashaya), liver, and eyes',
      seasonalRitucharya: 'Safe and beneficial year-round for all ages and body constitutions',
      symptomsAddressed: [
        'Sluggish, irregular, or incomplete bowel movements',
        'Abdominal bloating & toxic Ama coating on tongue',
        'Eye strain, dryness & fatigue',
        'Dull skin and sluggish morning energy',
      ],
    },
    classicalCitation: {
      verse: 'त्रिफला सर्वरोगघ्नी दीपनी कफपित्तहा। कुष्ठहन्त्री सरा चक्षुष्या मेध्याग्निप्रदा परा॥',
      source: 'Charaka Samhita Chikitsasthana 1.1',
      translation:
        'Triphala destroys all diseases, kindles digestive fire, removes excess Kapha and Pitta, cleanses skin afflictions, improves eyesight, and enhances intellect and life energy.',
    },
    preparationRecipe: {
      title: 'Nightly Triphala Colon Tonic',
      steps: [
        'Add 1/2 teaspoon of authentic organic Triphala powder to a mug.',
        'Pour 200ml of hot (not boiling) purified water over the powder.',
        'Let steep for 8 to 10 minutes, stirring occasionally.',
        'Drink comfortably warm right before retiring to bed.',
      ],
      precautions:
        'Avoid in acute watery diarrhea or extreme intestinal ulcerations until gut inflammation is healed.',
    },
  },
  {
    id: 'haridra',
    name: 'Haridra (Golden Turmeric)',
    sanskritName: 'हरिद्रा • काञ्चनी (Haridra)',
    botanicalName: 'Curcuma longa',
    category: 'Vishaghna & Sandhaniya (Anti-inflammatory & Joints)',
    categoryKey: 'joints',
    icon: '✨',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'neutral',
      kapha: 'reduces',
      summary: 'Balances Kapha & Vata; neutral to mildly warming on Pitta when combined with milk/ghee',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Katu (Pungent)',
      virya: 'Ushna (Warm Potency)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Profound systemic anti-inflammatory for joint tissues, cartilage, and tendons',
      'Purifies lymph channels and destroys accumulated toxic mucus',
      'Accelerates healing of internal and external wounds (Vranaropana)',
      'Enhances digestive metabolic fire (Agni) without aggravating acidity when cooked',
    ],
    howToUse: {
      form: 'Fine rhizome powder, fresh grated root, or Haridra Khanda compound',
      dosage: '1/2 to 1 teaspoon (2–4 grams) cooked into foods or beverages',
      anupana: 'Warm cow’s milk (or plant milk) with 1/2 tsp ghee and a pinch of black pepper (Piperine)',
      instructions:
        'Always combine with black pepper and healthy dietary fat. Ayurvedic classics noted that pepper and ghee amplify turmeric assimilation by over 2000% into peripheral tissues.',
    },
    whereAndWhen: {
      whenToUse: 'Evening before bed, or immediately following joint strain, intense workouts, or cold drafts',
      whereToUse: 'Synovial joints, blood plasma (Rasa), circulatory vessels, and skin complexion',
      seasonalRitucharya: 'Indispensable during cold rainy (Varsha) and damp winter months (Shishira)',
      symptomsAddressed: [
        'Joint inflammation, stiffness, and arthritis pain',
        'Muscular soreness after physical exertion',
        'Dull, blemished skin complexion',
        'Sluggish lymphatic drainage and throat tickles',
      ],
    },
    classicalCitation: {
      verse: 'हरिद्रा कटुतिक्तोष्णा व्रणदोषविशोधनी। त्वग्रोगमेहनुद्वर्ण्या कफपित्तविनाशिनी॥',
      source: 'Charaka Samhita Sutrasthana 4',
      translation:
        'Haridra is pungent, bitter, and warming; it purifies wounds, dispels stubborn skin disorders, imparts golden radiance to the skin, and conquers excess Kapha and toxic Pitta.',
    },
    preparationRecipe: {
      title: 'Sacred Ayurvedic Golden Milk (Haldi Doodh)',
      steps: [
        'In a small pan, combine 1 cup whole milk, 1/2 cup water, 1/2 tsp organic turmeric powder.',
        'Add a pinch of crushed black peppercorns, 1 bruised green cardamom, and 1/4 tsp crushed ginger.',
        'Simmer gently for 5 minutes until deeply golden.',
        'Strain into your favorite mug, stir in 1/2 tsp pure A2 ghee, and add 1/2 tsp honey once warm.',
      ],
      precautions:
        'Use cautiously in acute bile duct obstruction, gallstones, or when taking strong blood thinners.',
    },
  },
  {
    id: 'amalaki',
    name: 'Amalaki (Amla / Indian Gooseberry)',
    sanskritName: 'आमलकी • धात्री (Dhatri / The Mother)',
    botanicalName: 'Phyllanthus emblica',
    category: 'Supreme Rasayana (Cellular Longevity & Immunity)',
    categoryKey: 'vitality',
    icon: '🍏',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Tridoshic: supreme pacifier of Pitta, also gently balances Vata and Kapha',
    },
    rasaGuna: {
      rasa: 'Amla (Sour), Kashaya (Astringent), Madhura (Sweet), Tikta (Bitter), Katu (Pungent)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Nature’s densest, thermostable natural source of Vitamin C and polyphenols',
      'Rejuvenates all seven tissue layers (Dhatus) from plasma to reproductive fluids',
      'Protects liver cells, stabilizes blood glucose, and supports cardiovascular health',
      'Nourishes healthy hair follicles, prevents grey hair, and enhances eyesight',
    ],
    howToUse: {
      form: 'Fresh juice, dry fruit powder (Churna), or classical Chyawanprash jam',
      dosage: '1/2 to 1 teaspoon powder, 15–20ml fresh juice, or 1 tablespoon Chyawanprash',
      anupana: 'Warm water, raw honey, or warm milk in the morning',
      instructions:
        'Take Chyawanprash with a glass of warm milk on an empty stomach. Amla’s natural cooling nature tempers the warming spices in classical jams.',
    },
    whereAndWhen: {
      whenToUse: 'Morning on an empty stomach daily for lifelong vitality and cellular defense',
      whereToUse: 'All seven body tissues (Sapta Dhatus), liver, eyes, heart, and hair roots',
      seasonalRitucharya: 'Cherished in late Autumn, Winter, and Spring to fortify against viral seasons',
      symptomsAddressed: [
        'Premature aging & cellular exhaustion',
        'Hair loss, thinning, and premature greying',
        'Digestive acidity accompanied by sluggish liver',
        'Frequent colds, infections & low stamina',
      ],
    },
    classicalCitation: {
      verse: 'धात्रीफलं त्रिदोषघ्नं वयःस्थापनमुत्तमम्। चक्षुष्यं दीपनं रुच्यं रसायनवरं परम्॥',
      source: 'Charaka Samhita Chikitsasthana 1.1',
      translation:
        'Amalaki fruit balances all three doshas and is the supreme age-sustaining Rasayana. It sharpens vision, ignites appetite, bestows relish for food, and grants lasting youthfulness.',
    },
    preparationRecipe: {
      title: 'Morning Amla & Honey Ojas Nectar',
      steps: [
        'Take 15ml of fresh organic Amla juice (or 1/2 tsp pure Amla fruit powder in 1/2 cup warm water).',
        'Stir in 1 teaspoon of raw unprocessed local honey.',
        'Sip slowly upon waking after your morning glass of warm water.',
        'Wait 20 minutes before consuming breakfast.',
      ],
      precautions:
        'Generally extremely safe for long-term daily intake; avoid cold Amla drinks late at night if prone to wet phlegm coughs.',
    },
  },
  {
    id: 'guduchi',
    name: 'Guduchi (Giloy / Amrita)',
    sanskritName: 'गुडूची • अमृता (Nectar of Immortality)',
    botanicalName: 'Tinospora cordifolia',
    category: 'Jvaraghna & Rasayana (Fever & Immune Modulator)',
    categoryKey: 'immunity',
    icon: '🌱',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Tridoshic: destroys chronic internal fever, balances all three doshas without heat',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Kashaya (Astringent)',
      virya: 'Ushna (Mildly Warm Potency - unique for a bitter herb)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Celebrated as "Amrita" (Nectar of Immortality) for its profound immune modulation',
      'Breaks stubborn low-grade chronic fevers and inflammatory fatigue (Jvara)',
      'Detoxifies the liver, cleanses uric acid from joints, and clears gout flare-ups',
      'Balances blood glucose and guards pancreatic tissue against oxidative damage',
    ],
    howToUse: {
      form: 'Decoction (Kwatha), dry stem powder, or concentrated Guduchi Ghanavati tablet',
      dosage: '1/2 teaspoon powder boiled in water, or 1–2 tablets twice daily',
      anupana: 'Warm water, raw honey, or melted ghee depending on target dosha',
      instructions:
        'Boil 1/2 tsp Guduchi stem powder in 200ml water until reduced to 100ml. Strain and drink warm before meals.',
    },
    whereAndWhen: {
      whenToUse: 'Morning and late afternoon during times of seasonal infections or joint inflammation',
      whereToUse: 'Immune system, blood tissue, liver, kidneys, and joint synovial fluid',
      seasonalRitucharya: 'Crucial during monsoon (Varsha) and season changes when viral fevers strike',
      symptomsAddressed: [
        'Chronic lingering fatigue after illness',
        'Intermittent low-grade fevers and body aches',
        'Elevated uric acid and gout in big toes/joints',
        'Autoimmune flare-ups and liver sluggishness',
      ],
    },
    classicalCitation: {
      verse: 'गुडूची कटुका तिक्ता स्वादुपाका रसायनी। सङ्ग्राहिणी कषायोष्णा लघ्वी बल्याग्निदीपनी॥',
      source: 'Charaka Samhita Sutrasthana 4.14',
      translation:
        'Guduchi is bitter, astringent, warming, and sweet in post-digestion. It is an unexcelled Rasayana that kindles digestive fire, builds biological strength, and conquers fevers.',
    },
    preparationRecipe: {
      title: 'Classical Guduchi Kwatha (Detox Decoction)',
      steps: [
        'Place 1 teaspoon of coarse Guduchi stem powder into 300ml of pure water.',
        'Bring to a boil on medium flame, then reduce heat and simmer uncovered.',
        'Boil down until the liquid reduces by half (to approximately 150ml).',
        'Strain into a cup and sip warm 20 minutes before meals.',
      ],
      precautions:
        'Monitor blood glucose closely if already taking pharmaceutical insulin or diabetic medication.',
    },
  },
  {
    id: 'bhringraj',
    name: 'Bhringraj (King of Hair & Mind)',
    sanskritName: 'भृङ्गराज • केशराज (Kesharaja)',
    botanicalName: 'Eclipta alba',
    category: 'Keshya & Medhya (Hair & Neurological Calm)',
    categoryKey: 'brain',
    icon: '👑',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Deeply cools Pitta heat in the head and calms turbulent Vata',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Katu (Pungent)',
      virya: 'Ushna (Mildly warming in seed, cooling in herbal oil preparation)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Revered as "Kesharaja" (Ruler of Hair) for preventing premature hair loss and baldness',
      'Draws excess Pitta heat out of the head, soothing tension headaches and eye strain',
      'Calms an agitated mind, dissipating insomnia and emotional anger',
      'Supports healthy liver function and clarifies complexion',
    ],
    howToUse: {
      form: 'Warm herb-infused oil (Bhringraj Taila) for Shiro Abhyanga, or leaf powder',
      dosage: 'External: 1–2 tablespoons oil for scalp massage; Internal: 1/4 tsp powder with ghee',
      anupana: 'External: warm sesame or coconut oil carrier; Internal: warm water or ghee',
      instructions:
        'Warm the oil slightly by placing the bottle in a warm water bath. Part hair and massage gently into scalp roots with fingertips using slow circular motions.',
    },
    whereAndWhen: {
      whenToUse: 'External scalp massage in the evening 1 hour before sleep or before showering',
      whereToUse: 'Scalp, crown chakra (Adhipati Marma), temples, eyes, and liver channels',
      seasonalRitucharya: 'Especially soothing in hot summer months and during periods of heavy screen work',
      symptomsAddressed: [
        'Hair fall, thinning, and premature grey streaks',
        'Tension headaches and heat behind the eyes',
        'Insomnia due to racing thoughts and head heat',
        'Scalp dryness and dandruff flare-ups',
      ],
    },
    classicalCitation: {
      verse: 'भृङ्गराजः कटुस्तिक्तस्तीक्ष्णोष्णः कफवातहा। केश्यस्त्वच्यो कृमिश्वासकासशोथामपाण्डुनुत्॥',
      source: 'Charaka Samhita Siddhisthana 12',
      translation:
        'Bhringraj is bitter, pungent, and master of hair health (Keshya). It improves skin luster, calms breathing, and pacifies toxic heat and congestion.',
    },
    preparationRecipe: {
      title: 'Soothing Evening Shiro Abhyanga (Scalp Ritual)',
      steps: [
        'Warm 2 tablespoons of authentic Bhringraj taila in a small dish over hot water.',
        'Dip fingertips and apply oil directly to the crown of your head (Adhipati Marma).',
        'Massage in slow, rhythmic circular motions moving outward to the temples and neck base.',
        'Leave for 30 to 60 minutes (or overnight with a towel on your pillow) before washing.',
      ],
      precautions:
        'If you have a cold or sinus congestion, avoid keeping wet oil on the scalp overnight; rinse off after 30 minutes with warm water.',
    },
  },
  {
    id: 'guggulu',
    name: 'Guggulu (Sacred Indian Myrrh)',
    sanskritName: 'गुग्गुलु (Guggulu)',
    botanicalName: 'Commiphora mukul',
    category: 'Lekhana & Sandhaniya (Joint Scraping & Lipids)',
    categoryKey: 'joints',
    icon: '🪵',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'neutral',
      kapha: 'reduces',
      summary: 'Powerfully scrapes Kapha and soothes painful Vata joint stiffness',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Katu (Pungent), Kashaya (Astringent), Madhura (Sweet)',
      virya: 'Ushna (Warm Potency)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Master "Lekhana" (scraping) herb that purges deep stubborn metabolic Ama from joints and arteries',
      'Supports healthy cholesterol levels and optimal cardiovascular lipid ratios',
      'Restores ease and flexibility to stiff, cracking, or inflamed joints',
      'Stimulates sluggish thyroid metabolism and aids healthy weight balance',
    ],
    howToUse: {
      form: 'Classical purified resin tablets (Yogaraj Guggulu, Kaishore Guggulu, Triphala Guggulu)',
      dosage: '1 to 2 tablets (500mg - 1000mg) twice daily after meals',
      anupana: 'Warm water, ginger tea, or warm decoction of Dashamoola',
      instructions:
        'Always consume with warm water after meals. The warmth enhances Guggulu’s penetrating ability into deep dense tissues (Asthi & Majja Dhatus).',
    },
    whereAndWhen: {
      whenToUse: 'Morning and evening after meals; especially during damp, freezing weather',
      whereToUse: 'Bones (Asthi Dhatu), joints, arterial linings, adipose tissue (Meda), and thyroid gland',
      seasonalRitucharya: 'Invaluable during late Winter and early Spring when heavy Kapha-Vata stiffness accumulates',
      symptomsAddressed: [
        'Stiff, aching joints upon waking in the morning',
        'Sluggish metabolism and stubborn weight plateau',
        'Elevated LDL cholesterol & arterial sluggishness',
        'Chronic backache and sciatic stiffness',
      ],
    },
    classicalCitation: {
      verse: 'गुग्गुलुः कटुस्तिक्तः स्निग्धः सोष्णः कफवातहा। भग्नसन्धानकृद्वृष्यः सूक्ष्मः स्वर्यो रसायनः॥',
      source: 'Sushruta Samhita Sutrasthana 38.30',
      translation:
        'Guggulu is pungent, bitter, warming, and subtle. It heals bone fractures, rebuilds joint cartilage, stimulates deep metabolism, and serves as an unexcelled rejuvenator.',
    },
    preparationRecipe: {
      title: 'Warm Joint Ease Infusion with Guggulu',
      steps: [
        'Boil 1 cup of water with 1/4 teaspoon of crushed dry ginger (Shunti).',
        'Pour the warm ginger tea into a cup.',
        'Swallow 1 tablet of Yogaraj Guggulu (or classical Guggulu compound) accompanied by the tea.',
        'Perform gentle joint mobilizations or gentle walking 15 minutes after.',
      ],
      precautions:
        'Contraindicated in acute inflammatory kidney disease, active stomach ulcers, and pregnancy.',
    },
  },
  {
    id: 'yashtimadhu',
    name: 'Yashtimadhu (Licorice Root)',
    sanskritName: 'यष्टिमधु • मधुक (Madhuka)',
    botanicalName: 'Glycyrrhiza glabra',
    category: 'Kanthya & Vranaropana (Throat & Gastric Balm)',
    categoryKey: 'digestion',
    icon: '🍯',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'increases',
      summary: 'Supremely soothing to Pitta and Vata; sweet nature may raise Kapha in excess',
    },
    rasaGuna: {
      rasa: 'Madhura (Deeply Sweet), Tikta (Slightly Bitter)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Coats and protects irritated vocal cords, throat lining, and bronchial passages',
      'Forms a natural protective soothing mucus barrier against gastric stomach ulcers',
      'Supports depleted adrenal glands and buffers the body against physical fatigue',
      'Promotes vocal resonance and clarity for speakers, teachers, and chanters',
    ],
    howToUse: {
      form: 'Fine root powder (Churna), herbal throat lozenges, or decoction',
      dosage: '1/4 to 1/2 teaspoon (1.5–3 grams) up to twice daily',
      anupana: 'Warm water, raw honey, or warm milk with ghee',
      instructions:
        'For throat tickles and hoarseness, mix 1/4 tsp powder with 1 tsp raw honey and lick slowly throughout the day.',
    },
    whereAndWhen: {
      whenToUse: '20 minutes before meals for acid reflux; or sipped throughout the day for voice strain',
      whereToUse: 'Throat (Kanthya), vocal cords, stomach lining, esophagus, and adrenals',
      seasonalRitucharya: 'Excellent in dry autumn weather and during peak voice use in winter',
      symptomsAddressed: [
        'Dry, scratchy throat & hoarse voice',
        'Acid reflux, stomach burn, and gastric sensitivity',
        'Adrenal exhaustion and cortisol crashes',
        'Dry irritated bronchial coughs',
      ],
    },
    classicalCitation: {
      verse: 'यष्टी हिमा गुरुः स्वाद्वी चक्षुष्या बलवर्णकृत्। सुस्निग्धा शुक्रला केश्या स्वर्या पित्तानिलापहृत्॥',
      source: 'Charaka Samhita Sutrasthana 4.9',
      translation:
        'Yashtimadhu is cooling, sweet, and life-enhancing. It clarifies vision, imparts golden complexion, soothes the vocal cords, and gently pacifies Pitta and Vata disorders.',
    },
    preparationRecipe: {
      title: 'Soothing Yashtimadhu Throat & Ulcer Tea',
      steps: [
        'Add 1/2 teaspoon of organic Yashtimadhu powder to 250ml hot water.',
        'Simmer gently for 3 minutes to extract the soothing glycyrrhizin saponins.',
        'Let cool until comfortably warm.',
        'Sip slowly, holding each sip in the back of the throat for 5 seconds before swallowing.',
      ],
      precautions:
        'Those with chronic hypertension (high blood pressure) should avoid prolonged daily use exceeding 4 weeks without medical consultation.',
    },
  },
  {
    id: 'shankhpushpi',
    name: 'Shankhpushpi',
    sanskritName: 'शङ्खपुष्पी (Shankhpushpi)',
    botanicalName: 'Convolvulus pluricaulis',
    category: 'Medhya Rasayana (Deep Sleep & Anti-Anxiety)',
    categoryKey: 'brain',
    icon: '🐚',
    doshaMatrix: {
      vata: 'reduces',
      pitta: 'reduces',
      kapha: 'neutral',
      summary: 'Supreme tranquilizer for hyperactive Vata and overheated Pitta intellect',
    },
    rasaGuna: {
      rasa: 'Tikta (Bitter), Kashaya (Astringent)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Madhura (Sweet post-digestive)',
    },
    benefits: [
      'Premier classical tranquilizer that melts away chronic mental tension and anxiety',
      'Induces profound, peaceful sleep without next-morning grogginess or lethargy',
      'Sharpens focus, memory retention, and mental stamina in students and thinkers',
      'Normalizes elevated blood pressure linked to chronic emotional distress',
    ],
    howToUse: {
      form: 'Whole plant powder (Churna), syrup, or fresh decoction',
      dosage: '1/2 to 1 teaspoon (3–5 grams) once or twice daily',
      anupana: 'Warm cow’s milk, pure ghee, or lukewarm water before bedtime',
      instructions:
        'Mix 1/2 teaspoon into warm milk with a pinch of cardamom 45 minutes before bedtime for deep restorative rest.',
    },
    whereAndWhen: {
      whenToUse: 'Evening before bed, or morning on an empty stomach during periods of high mental stress',
      whereToUse: 'Brain synapses, nervous system (Majja Dhatu), heart emotional seat (Hridaya)',
      seasonalRitucharya: 'Beneficial in hot summer evenings and during demanding examination or work deadlines',
      symptomsAddressed: [
        'Anxious racing thoughts when trying to sleep',
        'Exam stress and cognitive fatigue',
        'Stress-related hypertension and palpitating restlessness',
        'Depleted mental stamina',
      ],
    },
    classicalCitation: {
      verse: 'शङ्खपुष्पी सरा मेध्या वृष्या मङ्गलकारिणी। मानसदोषहन्त्री च स्मृतिबुद्धिप्रदा शुभा॥',
      source: 'Charaka Samhita Chikitsasthana 1.3',
      translation:
        'Shankhpushpi is the supreme promoter of intellect (Medhya) and auspicious tranquility. It dispels psychological distress (Manasa Doshas) and grants clear memory and deep wisdom.',
    },
    preparationRecipe: {
      title: 'Restful Sleep Shankhpushpi Nightcup',
      steps: [
        'Gently warm 1 cup of whole milk or oat milk with 1/4 cup of water.',
        'Stir in 1/2 teaspoon of pure Shankhpushpi powder and 1/4 tsp of ground cardamom.',
        'Simmer for 3 minutes.',
        'Drink comfortably warm 40 minutes before turning off the lights.',
      ],
      precautions:
        'Very safe and gentle; if taking prescription sedatives or anti-anxiety medications, coordinate with your physician.',
    },
  },
  {
    id: 'arjuna',
    name: 'Arjuna (Sacred Cardiac Protector)',
    sanskritName: 'अर्जुन • ककुभ (Kakubha)',
    botanicalName: 'Terminalia arjuna',
    category: 'Hridya & Sandhaniya (Heart & Circulation)',
    categoryKey: 'heart',
    icon: '🫀',
    doshaMatrix: {
      vata: 'neutral',
      pitta: 'reduces',
      kapha: 'reduces',
      summary: 'Balances Pitta & Kapha; tonifies cardiac muscle without provoking Vata',
    },
    rasaGuna: {
      rasa: 'Kashaya (Astringent), Tikta (Bitter)',
      virya: 'Sheeta (Cooling Potency)',
      vipaka: 'Katu (Pungent)',
    },
    benefits: [
      'Premier Ayurvedic cardiotonic (Hridya) that strengthens the physical heart muscle',
      'Helps maintain healthy blood pressure and robust arterial elasticity',
      'Supports emotional courage and resilience in the heart center (Anahata Chakra)',
      'Rich in natural CoQ10, flavonoids, and proanthocyanidins for vascular defense',
    ],
    howToUse: {
      form: 'Tree bark powder (Tvaka Churna), Arjuna Ksheerapaka (milk decoction), or Arishta',
      dosage: '1/2 to 1 teaspoon (3–5 grams) once or twice daily',
      anupana: 'Warm cow’s milk with a drop of ghee, or warm water',
      instructions:
        'Classical texts strongly recommend boiling Arjuna bark in milk (Ksheerapaka). The milk lipids bond with cardioprotective glycosides ensuring deep cardiac delivery.',
    },
    whereAndWhen: {
      whenToUse: 'Morning with breakfast or in late afternoon before dinner',
      whereToUse: 'Heart muscle (Hridaya), circulatory blood vessels, and arterial walls',
      seasonalRitucharya: 'Ideal year-round, especially in high-stress seasons and during intense physical training',
      symptomsAddressed: [
        'Cardiac fatigue and poor stamina upon climbing stairs',
        'Elevated blood pressure tied to emotional tension',
        'Vascular stiffness and circulation sluggishness',
        'Emotional grief or heartache in the chest',
      ],
    },
    classicalCitation: {
      verse: 'ककुभः शीतलः कषायो हृद्यः क्षतक्षयविषास्रजित्। मेदोमेहकफं हन्ति व्रणान् संरोपयत्यपि॥',
      source: 'Charaka Samhita Chikitsasthana 28',
      translation:
        'Arjuna is cooling, astringent, and the supreme protector of the heart (Hridya). It heals internal tissue wounds, destroys excess cholesterol and Kapha, and restores cardiovascular harmony.',
    },
    preparationRecipe: {
      title: 'Traditional Arjuna Ksheerapaka (Cardiac Milk Tonic)',
      steps: [
        'Take 1 teaspoon of Arjuna tree bark powder.',
        'Combine with 1/2 cup whole milk and 2 cups of water in a saucepan.',
        'Boil on medium-low flame until the liquid reduces down to 1/2 cup (only the infused milk remains).',
        'Strain into a cup and sip warm once daily in the morning.',
      ],
      precautions:
        'Safe for ongoing use; individuals on prescription cardiac beta-blockers or blood pressure medications should monitor vitals.',
    },
  },
];
