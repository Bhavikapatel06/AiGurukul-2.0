import { CreateQuizDTO } from '@ai-gurukul/types';

export const CANONICAL_SEED_QUIZZES: CreateQuizDTO[] = [
  {
    title: 'Bhagavad Gita: Fundamentals of Karma Yoga & Equanimity',
    description:
      'Explore core philosophical verses from the Bhagavad Gita on selfless action (Nishkama Karma), mastery of the senses, and cultivating peace of mind.',
    domain: 'gita',
    difficulty: 'beginner',
    tags: ['gita', 'karma-yoga', 'krishna', 'mind-control', 'dharma'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'According to Bhagavad Gita 2.47 ("Karmanye vadhikaraste..."), what does Lord Krishna state that an individual has a rightful claim to?',
        options: [
          'The ultimate results and rewards of their action',
          'Only the execution of one’s duty or action, never the fruits',
          'Complete renunciation and inaction',
          'The praise and recognition of society',
        ],
        correctIndex: 1,
        explanation:
          'BG 2.47 establishes Nishkama Karma: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of results, nor let yourself be attached to inaction."',
        sourceRef: 'Bhagavad Gita 2.47',
      },
      {
        questionText:
          'In Bhagavad Gita Chapter 2, verse 56, what is the term used for a person of steady, poised intellect who remains undisturbed by misery and free from craving?',
        options: ['Sthitaprajna', 'Brahmachari', 'Karmayogi', 'Tapasvi'],
        correctIndex: 0,
        explanation:
          'A "Sthitaprajna" (स्थितप्रज्ञ) is one whose intellect is steadfast, who is unaffected in adversity, free from attachment, fear, and anger (BG 2.56).',
        sourceRef: 'Bhagavad Gita 2.56',
      },
      {
        questionText:
          'According to Bhagavad Gita 6.5, how should a seeker uplift themselves, and what is described as both one’s greatest friend and greatest enemy?',
        options: [
          'Wealth and fortune',
          'One’s own disciplined or undisciplined mind',
          'External gurus alone',
          'Planetary alignments',
        ],
        correctIndex: 1,
        explanation:
          'BG 6.5 states: "One must elevate oneself by one’s own mind, not degrade oneself. For the mind is the friend of the conditioned soul, and the mind is also the enemy."',
        sourceRef: 'Bhagavad Gita 6.5',
      },
      {
        questionText:
          'What are the three Gunas (qualities of nature) expounded by Lord Krishna in Bhagavad Gita Chapter 14?',
        options: [
          'Vata, Pitta, and Kapha',
          'Sattva, Rajas, and Tamas',
          'Prana, Tejas, and Ojas',
          'Dharma, Artha, and Kama',
        ],
        correctIndex: 1,
        explanation:
          'The three fundamental Gunas are Sattva (illumination, harmony), Rajas (passion, activity), and Tamas (inertia, darkness).',
        sourceRef: 'Bhagavad Gita 14.5',
      },
      {
        questionText:
          'In BG 18.66 ("Sarva-dharman parityajya..."), what is Sri Krishna’s culminating instruction to Arjuna?',
        options: [
          'Retreat to the forest and cease all warfare',
          'Abandon all subordinate dogmas and surrender fully unto the Supreme Divine',
          'Rule Hastinapura with absolute ruthlessness',
          'Fast for forty days in solitary meditation',
        ],
        correctIndex: 1,
        explanation:
          'BG 18.66 represents the Charama Shloka: "Abandon all varieties of dharmas and simply surrender unto Me alone. I shall liberate you from all sinful reactions; do not grieve."',
        sourceRef: 'Bhagavad Gita 18.66',
      },
    ],
  },
  {
    title: 'Chanakya Niti: Strategic Leadership, Prudence & Statecraft',
    description:
      'Test your comprehension of Acharya Chanakya’s pragmatic wisdom from Arthashastra and Chanakya Neeti regarding friendship, vigilance, and statecraft.',
    domain: 'chanakya',
    difficulty: 'intermediate',
    tags: ['chanakya', 'neeti', 'arthashastra', 'leadership', 'strategy'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'According to Chanakya Neeti, who should be tested during times of adversity and distress?',
        options: [
          'Only public officials',
          'Friends, servants, and relatives',
          'Enemies exclusively',
          'Astrologers',
        ],
        correctIndex: 1,
        explanation:
          'Chanakya notes: "Test a servant in the performance of duty, a relative in difficulty, a friend in adversity, and a wife in misfortune."',
        sourceRef: 'Chanakya Neeti 1.12',
      },
      {
        questionText:
          'In the Saptanga theory of statecraft in Arthashastra, which element represents the king or sovereign ruler as the focal head of state?',
        options: ['Amatya', 'Swami', 'Janapada', 'Danda'],
        correctIndex: 1,
        explanation:
          'The Swami (the king/leader) is the first and apex organ of the Saptanga (seven limbs) state model expounded by Kautilya.',
        sourceRef: 'Kautilya Arthashastra 6.1.1',
      },
      {
        questionText:
          'What warning does Chanakya give about excessive straightforwardness and honesty in a deceptive world?',
        options: [
          'Straight trees in a forest are cut down first, while crooked trees survive',
          'Honesty is always universally rewarded by foes',
          'Silence is worse than deceit',
          'Only wealthy individuals should speak truth',
        ],
        correctIndex: 0,
        explanation:
          'Chanakya remarks: "Do not be too straightforward. Go and see the forest; straight trees are felled first, while crooked ones remain standing."',
        sourceRef: 'Chanakya Neeti 7.12',
      },
      {
        questionText:
          'According to Chanakya, what is considered the greatest treasure that thieves cannot steal and fire cannot burn?',
        options: [
          'Gold and diamonds',
          'Fortified land',
          'Vidya (Knowledge/Learning)',
          'A mighty army',
        ],
        correctIndex: 2,
        explanation:
          'Vidya (knowledge) is heralded as the imperishable ornament and supreme wealth that increases by sharing and can never be plundered.',
        sourceRef: 'Chanakya Neeti 4.3',
      },
    ],
  },
  {
    title: 'Ayurveda Fundamentals: Tridosha, Dincharya & Agni',
    description:
      'Assess your knowledge of ancient classical healing from Charaka and Sushruta Samhitas, covering biological energies, digestive fire, and seasonal balance.',
    domain: 'ayurveda',
    difficulty: 'beginner',
    tags: ['ayurveda', 'dosha', 'charaka', 'agni', 'wellness'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'Which Mahabhutas (great cosmic elements) primarily constitute the Vata dosha?',
        options: [
          'Earth (Prithvi) and Water (Jala)',
          'Air (Vayu) and Ether/Space (Akasha)',
          'Fire (Agni) and Water (Jala)',
          'Earth (Prithvi) and Fire (Agni)',
        ],
        correctIndex: 1,
        explanation:
          'Vata is formed from the combination of Air (Vayu) and Ether (Akasha), governing mobility, nervous impulses, and respiration.',
        sourceRef: 'Charaka Samhita Sutrasthana 1.59',
      },
      {
        questionText:
          'In Ayurveda, what is Jatharagni and why is its balance deemed crucial for life (Ayus)?',
        options: [
          'A type of herbal massage oil',
          'The central digestive and metabolic fire responsible for assimilation and vitality',
          'A seasonal breathing technique',
          'A pulse diagnosis pressure point',
        ],
        correctIndex: 1,
        explanation:
          'Charaka Samhita asserts "Rogah sarve api mande agnau" — all diseases stem from deranged or weak Agni (digestive fire), which leads to Ama (toxic residue).',
        sourceRef: 'Charaka Samhita Chikitsasthana 15.3',
      },
      {
        questionText:
          'What is "Brahma Muhurta", recommended in classical Dincharya (daily regimen) for optimal awakening and meditation?',
        options: [
          'High noon during solar zenith',
          'Approximately 1.5 hours before sunrise',
          'Midnight during lunar peak',
          'Immediately after sunset',
        ],
        correctIndex: 1,
        explanation:
          'Ashtanga Hridaya advises awakening in Brahma Muhurta (around 48 to 96 minutes before sunrise) when Sattva guna dominates the atmosphere.',
        sourceRef: 'Ashtanga Hridaya Sutrasthana 2.1',
      },
      {
        questionText:
          'Which of the following is an unctuous, cooling, and sweet herb revered in Ayurveda as a premier Rasayana for Pitta pacification and longevity?',
        options: ['Shatavari', 'Black Pepper (Maricha)', 'Dry Ginger (Shunti)', 'Mustard seeds'],
        correctIndex: 0,
        explanation:
          'Shatavari (Asparagus racemosus) is cooling (Sheeta virya), nourishing (Rasayana), and sweet (Madhura), exceptionally suited for soothing Pitta and Vata.',
        sourceRef: 'Charaka Samhita Sutrasthana 4.18',
      },
    ],
  },
  {
    title: 'Upanishadic Dialogues: The Immortal Atman & Ultimate Reality',
    description:
      'Ponder the profound metaphysical teachings of the Katha, Mandukya, and Chandogya Upanishads on consciousness, death, and Brahman.',
    domain: 'upanishads',
    difficulty: 'advanced',
    tags: ['upanishads', 'vedanta', 'atman', 'brahman', 'nachiketa'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'In the Katha Upanishad, who is the young seeker who travels to the abode of Yama (the Lord of Death) to ask the third boon regarding life after death?',
        options: ['Svetaketu', 'Nachiketa', 'Satyakama Jabala', 'Yajnavalkya'],
        correctIndex: 1,
        explanation:
          'Nachiketa asks Yama to reveal the secret of the Self that transcends mortality, refusing worldly riches, kingdoms, and pleasures.',
        sourceRef: 'Katha Upanishad 1.1.20',
      },
      {
        questionText:
          'In the Mandukya Upanishad, the sacred syllable AUM (OM) is mapped onto three states of consciousness. What is the fourth, transcendent state beyond dualities?',
        options: [
          'Jagrat (Waking)',
          'Svapna (Dreaming)',
          'Sushupti (Deep Sleep)',
          'Turiya (The Fourth)',
        ],
        correctIndex: 3,
        explanation:
          'Turiya (तूरीय) is the silent fourth state: pure consciousness, non-dual, peaceful, auspicious (Shantam Shivam Advaitam).',
        sourceRef: 'Mandukya Upanishad 7',
      },
      {
        questionText:
          'Which renowned Mahavakya (great declaration) from the Chandogya Upanishad does Sage Uddalaka repeatedly teach his son Svetaketu?',
        options: [
          'Tat Tvam Asi ("Thou Art That")',
          'Aham Brahmasmi ("I am Brahman")',
          'Prajnanam Brahma ("Consciousness is Brahman")',
          'Ayam Atma Brahma ("This Self is Brahman")',
        ],
        correctIndex: 0,
        explanation:
          '"Tat Tvam Asi" (तत्त्वमसि) occurs in Chandogya Upanishad 6.8.7 as Uddalaka reveals the identity between the individual Self and the universal Ground of Being.',
        sourceRef: 'Chandogya Upanishad 6.8.7',
      },
      {
        questionText:
          'In the Brihadaranyaka Upanishad, which great philosopher sage engages in profound intellectual debate at King Janaka’s court against Gargi Vachaknavi?',
        options: ['Yajnavalkya', 'Vyasa', 'Kapila', 'Valmiki'],
        correctIndex: 0,
        explanation:
          'Sage Yajnavalkya eloquently responds to Gargi’s challenging questions regarding the warp and woof on which space itself is woven: the Imperishable (Akshara).',
        sourceRef: 'Brihadaranyaka Upanishad 3.8',
      },
    ],
  },
  {
    title: 'Mahabharata: Dharma, Ethical Dilemmas & The Great Epic',
    description:
      'Explore the monumental epic of Vyasa, testing understanding of Dharma in crisis, Vidura Niti, Yaksha Prashna, and righteous duty.',
    domain: 'mahabharata',
    difficulty: 'intermediate',
    tags: ['mahabharata', 'dharma', 'vyasa', 'vidura', 'yaksha-prashna'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'In Mahabharata Shanti Parva 109.11, what is the etymological root and essential function of Dharma?',
        options: [
          'It is derived from "dharana" (to uphold and sustain), because it preserves and nurtures all living beings and human society',
          'It represents arbitrary commands issued by victorious monarchs',
          'It denotes complete withdrawal from all social engagement into seclusion',
          'It refers exclusively to temple ceremonies and sacrificial fires',
        ],
        correctIndex: 0,
        explanation:
          'Vyasa explains: "Dharanad dharmam ity ahur dharmo dharayate prajah" — Dharma is that which upholds, preserves, and integrates creation.',
        sourceRef: 'Mahabharata Shanti Parva 109.11',
      },
      {
        questionText:
          'According to Vidura Niti (Mahabharata 33.16), how do wise individuals (pandita-buddhaya) respond when acute adversity strikes?',
        options: [
          'They panic and blame fate for their plight',
          'They do not become bewildered or paralyzed; they remain actively diligent, steadfast in duty, and anchored in truth',
          'They immediately abandon their moral vows to secure temporary relief',
          'They surrender to fatalism and cease all constructive effort',
        ],
        correctIndex: 1,
        explanation:
          'Vidura teaches that true wisdom is tested in adversity: wise leaders do not succumb to confusion; they remain persevering, dutiful, and truthful.',
        sourceRef: 'Mahabharata Vidura Niti 33.16',
      },
      {
        questionText:
          'In the Yaksha Prashna (Vana Parva 313.116), when asked what is the greatest wonder in the world, what does Yudhishthira answer?',
        options: [
          'The rising of the sun and the vastness of the oceans',
          'That day after day mortals depart for the abode of death, yet those who remain believe they will live forever',
          'The accumulation of inexhaustible wealth by kings',
          'The ability of birds to navigate without maps',
        ],
        correctIndex: 1,
        explanation:
          'Yudhishthira observes the ultimate human delusion: witnessing countless beings die daily, yet living as though one is immortal.',
        sourceRef: 'Mahabharata Vana Parva 313.116',
      },
      {
        questionText:
          'Who was granted divine vision (Divya Drishti) by Sage Vyasa to narrate the battlefield events of Kurukshetra to King Dhritarashtra?',
        options: ['Vidura', 'Sanjaya', 'Kripacharya', 'Dronacharya'],
        correctIndex: 1,
        explanation:
          'Sanjaya was blessed with Divya Drishti by Vyasa to witness and report everything transpiring across the battlefield.',
        sourceRef: 'Mahabharata Bhishma Parva',
      },
      {
        questionText:
          'According to Vidura Niti (33.40), what is the difference between Preyas and Shreyas?',
        options: [
          'Preyas is divine grace, while Shreyas is physical courage',
          'Preyas is the immediately pleasant/gratifying, while Shreyas is the enduringly good and righteous',
          'Preyas is sacrificial wealth, while Shreyas is royal punishment',
          'Both denote identical hedonistic pursuits',
        ],
        correctIndex: 1,
        explanation:
          'Preyas represents short-term sensory gratification, while Shreyas represents the enduringly virtuous and spiritually elevating path.',
        sourceRef: 'Mahabharata Vidura Niti 33.40',
      },
    ],
  },
  {
    title: 'Ramayana: Maryada Purushottama & Righteous Conduct',
    description:
      'Test your insight into Valmiki Ramayana, the exemplification of Maryada (righteous boundaries), filial duty, loyalty, and the triumph of truth.',
    domain: 'ramayana',
    difficulty: 'beginner',
    tags: ['ramayana', 'rama', 'dharma', 'maryada', 'valmiki'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'Why is Sri Rama revered as "Maryada Purushottama" throughout the ancient Indian literary tradition?',
        options: [
          'Because he conquered all kingdoms with unconditional imperial might',
          'Because he represents the Supreme Ideal of righteous boundaries, upholding Dharma without compromising ethics even under extreme suffering',
          'Because he lived strictly as a wandering ascetic throughout his entire life',
          'Because he invented archery tactics unknown to other warrior clans',
        ],
        correctIndex: 1,
        explanation:
          'Maryada Purushottama signifies the supreme human who embodies adherence to noble boundaries, duty (Kartavya), truth (Satya), and compassion.',
        sourceRef: 'Valmiki Ramayana Ayodhya Kanda',
      },
      {
        questionText:
          'In Valmiki Ramayana, which devoted brother places Rama’s wooden sandals (Padukas) on the throne of Ayodhya, ruling only as his servant-regent?',
        options: ['Lakshmana', 'Bharata', 'Shatrughna', 'Sugriva'],
        correctIndex: 1,
        explanation:
          'Bharata refuses the crown of Ayodhya, placing Rama’s padukas on the throne at Nandigrama and administering the kingdom in Rama’s name.',
        sourceRef: 'Valmiki Ramayana Ayodhya Kanda 115',
      },
      {
        questionText:
          'In the Kishkindha Kanda, what pledge does Sri Rama make to Sugriva at the sacred fire witnessed by Hanuman?',
        options: [
          'A pledge of mutual alliance, friendship, and protection in times of distress (Mitra-Dharma)',
          'A contract for commercial trade between Ayodhya and Kishkindha',
          'An oath to build temples across the Southern forests',
          'A promise to crown Angada the supreme emperor of Bharata',
        ],
        correctIndex: 0,
        explanation:
          'Rama and Sugriva consummate an unbreakable bond of sacred friendship (Sakhya) before Agni, pledging mutual aid.',
        sourceRef: 'Valmiki Ramayana Kishkindha Kanda 5',
      },
      {
        questionText:
          'When Vibhishana seeks asylum (Sharanagati) with Sri Rama before the Lanka war, what principle does Rama announce to his hesitant commanders?',
        options: [
          'To demand heavy ransom before permitting entry into the camp',
          'That anyone who comes seeking protection with sincerity shall never be turned away, even if they are a former foe',
          'To imprison Vibhishana until the conclusion of hostilities',
          'To consult astrologers before offering refuge',
        ],
        correctIndex: 1,
        explanation:
          'Rama declares: "Sakrdeva prapannaya tavasmiti ca yacate, abhayam sarvabhutebhyo dadamy etad vratam mama" — I grant fearlessness to anyone who surrenders unto Me.',
        sourceRef: 'Valmiki Ramayana Yuddha Kanda 18.33',
      },
      {
        questionText:
          'Which noble bird sacrificed his life attempting to rescue Sita Devi from Ravana’s aerial chariot (Pushpaka Vimana)?',
        options: ['Sampati', 'Jatayu', 'Garuda', 'Sugriva'],
        correctIndex: 1,
        explanation:
          'The heroic king of vultures, Jatayu, valiantly fought Ravana to protect Sita and received sacred funeral rites directly from Sri Rama.',
        sourceRef: 'Valmiki Ramayana Aranya Kanda 51',
      },
    ],
  },
  {
    title: 'Panchatantra: Timeless Fables & Applied Intelligence',
    description:
      'Delve into Pandit Vishnu Sharma’s timeless pedagogical fables on friendship, strategy, discernment, and practical worldly wisdom (Niti).',
    domain: 'panchatantra',
    difficulty: 'beginner',
    tags: ['panchatantra', 'fables', 'niti', 'wisdom', 'strategy'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'Why did Acharya Vishnu Sharma compose the Panchatantra for King Amarasakti’s three wayward princes?',
        options: [
          'To teach complex Vedic ritual chants over twenty years',
          'To educate them in practical statecraft, worldly discernment, and moral intelligence (Niti Shastra) in six months through fables',
          'To document military drill formations for elephant warfare',
          'To compose romantic poetry for royal court entertainments',
        ],
        correctIndex: 1,
        explanation:
          'Vishnu Sharma pledged to transform the indifferent royal princes into wise statesmen within six months using captivating, interconnected animal fables.',
        sourceRef: 'Panchatantra Kathamukha (Introduction)',
      },
      {
        questionText:
          'In the first Tantra, "Mitra-Bheda" (Loss of Friends), which cunning jackal minister sows suspicion between King Pingalaka (the Lion) and Sanjivaka (the Bull)?',
        options: ['Damanaka', 'Karataka', 'Laghupatanaka', 'Hiranyaka'],
        correctIndex: 0,
        explanation:
          'Damanaka, motivated by his own ambition, systematically poisons the mind of the lion against his closest companion, demonstrating how insidious gossip can destroy unity.',
        sourceRef: 'Panchatantra Tantra 1 (Mitra-Bheda)',
      },
      {
        questionText:
          'In the famous fable of the Lion and the Clever Hare, how does the small hare defeat the tyrannical lion Bhasuraka?',
        options: [
          'By summoning an army of woodland creatures to attack at night',
          'By using the lion’s own vanity and wrath, leading him to see his reflection in a deep well and jump in to fight his "rival"',
          'By poisoning the lion’s drinking spring',
          'By convincing the lion to turn vegetarian',
        ],
        correctIndex: 1,
        explanation:
          'Panchatantra teaches "Buddhir yasya balam tasya" — true strength belongs to the one who possesses intelligence; a tiny hare outwits a ferocious lion through psychological cunning.',
        sourceRef: 'Panchatantra Tantra 1, Tale 8',
      },
      {
        questionText:
          'In "Mitra-Labha" (Winning of Friends), which quartet of unlikely creatures exemplifying collaborative unity rescues one another from hunters?',
        options: [
          'A Lion, Tiger, Leopard, and Bear',
          'A Crow (Laghupatanaka), Mouse (Hiranyaka), Turtle (Mantharaka), and Deer (Chitrangada)',
          'An Elephant, Monkey, Snake, and Peacock',
          'A Fox, Wolf, Jackal, and Badger',
        ],
        correctIndex: 1,
        explanation:
          'The enduring friendship among the Crow, Mouse, Turtle, and Deer proves that humble allies united in trust can overcome mortal perils that no single beast could survive alone.',
        sourceRef: 'Panchatantra Tantra 2 (Mitra-Labha)',
      },
      {
        questionText:
          'What is the moral warning taught in the third Tantra, "Kakolukiyam" (Of Crows and Owls)?',
        options: [
          'Never build nests in banyan trees',
          'Never extend hospitality to an untrusted adversary or allow an enemy into the heart of your fortress',
          'Owls are physically superior to all flying birds during daytime',
          'One should always choose night travel over morning travel',
        ],
        correctIndex: 1,
        explanation:
          'Kakolukiyam warns rulers and individuals never to grant shelter or confidential intimacy to hereditary enemies pretending allegiance.',
        sourceRef: 'Panchatantra Tantra 3 (Kakolukiyam)',
      },
    ],
  },
  {
    title: 'Patanjali Yoga Sutras: Eight Limbs & Inner Stillness',
    description:
      'Deepen your understanding of Maharishi Patanjali’s classical Raja Yoga, the eight limbs (Ashtanga), Chitta-Vritti-Nirodha, and mental transformation.',
    domain: 'yoga',
    difficulty: 'intermediate',
    tags: ['yoga', 'patanjali', 'meditation', 'ashtanga', 'mind-mastery'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'In Yoga Sutra 1.2, what is the foundational classical definition of Yoga given by Maharishi Patanjali?',
        options: [
          'Yogas chitta-vritti-nirodhah — Yoga is the intentional stilling of the fluctuations and turbulence of the mind field',
          'Yoga is solely the performance of acrobatic bodily postures',
          'Yoga is withdrawal from all ethical and social obligations',
          'Yoga is the mechanical counting of physical breaths',
        ],
        correctIndex: 0,
        explanation:
          'Yoga Sutra 1.2 establishes: "Yogas chitta-vritti-nirodhah" — Yoga is the mastery and calming of the modifications/whirlpools of consciousness.',
        sourceRef: 'Patanjali Yoga Sutras 1.2',
      },
      {
        questionText:
          'What are the twin indispensable pillars prescribed in Yoga Sutra 1.12 to achieve the stilling of mental fluctuations?',
        options: [
          'Diet and sleep alone',
          'Abhyasa (persistent, disciplined practice) and Vairagya (conscious dispassion and detachment)',
          'Physical strength and debate',
          'Reading commentaries and astrology',
        ],
        correctIndex: 1,
        explanation:
          'YS 1.12 states: "Abhyasa-vairagyabhyam tan-nirodhah" — the mind is quieted through unwavering, continuous practice alongside inner detachment.',
        sourceRef: 'Patanjali Yoga Sutras 1.12',
      },
      {
        questionText:
          'According to Yoga Sutra 1.33 (Chitta Prasadana), what fourfold attitudes should one cultivate toward the happy, unhappy, virtuous, and non-virtuous respectively?',
        options: [
          'Maitri (friendship), Karuna (compassion), Mudita (gladness), and Upeksha (equanimity/neutrality)',
          'Pride, sorrow, jealousy, and anger',
          'Indifference, avoidance, competition, and blame',
          'Silence, skepticism, fear, and submission',
        ],
        correctIndex: 0,
        explanation:
          'YS 1.33 teaches that peace of mind is restored by embodying friendship toward the glad, compassion for the suffering, joy for the virtuous, and neutral poise toward the flawed.',
        sourceRef: 'Patanjali Yoga Sutras 1.33',
      },
      {
        questionText:
          'In Yoga Sutra 2.33, what psychological practice is recommended when harmful, destructive, or negative thoughts (Vitarkas) perturb the mind?',
        options: [
          'Suppressing all feelings until they erupt',
          'Pratipaksha Bhavana — intentionally contemplating and holding in awareness the opposite uplifting perspective',
          'Projecting anger onto others',
          'Ceasing all intellectual study permanently',
        ],
        correctIndex: 1,
        explanation:
          'YS 2.33 teaches: "Vitarka-badhane pratipaksha-bhavanam" — when negative ideations disturb you, deliberately cultivate thoughts of the contrary positive nature.',
        sourceRef: 'Patanjali Yoga Sutras 2.33',
      },
      {
        questionText:
          'What are the final three internal limbs of Ashtanga Yoga that together constitute "Samyama"?',
        options: [
          'Yama, Niyama, and Asana',
          'Pranayama, Pratyahara, and Dharana',
          'Dharana (concentration), Dhyana (meditation), and Samadhi (absorption)',
          'Ahara, Nidra, and Brahmacharya',
        ],
        correctIndex: 2,
        explanation:
          'YS 3.4 identifies Dharana, Dhyana, and Samadhi practiced in unbroken succession on a single object of contemplation as Samyama.',
        sourceRef: 'Patanjali Yoga Sutras 3.4',
      },
    ],
  },
  {
    title: 'Universal Vedic Wisdom: Sanatana Principles, Purusharthas & Cosmic Order',
    description:
      'Evaluate your grasp of foundational Sanatana concepts: the four Purusharthas (Dharma, Artha, Kama, Moksha), Rta (cosmic harmony), and universal ethics.',
    domain: 'general',
    difficulty: 'beginner',
    tags: ['vedic', 'purusharthas', 'dharma', 'rta', 'universal-wisdom'],
    isActive: true,
    isDynamic: false,
    questions: [
      {
        questionText:
          'What are the four legitimate aims and aspirations of human existence (Purusharthas) in Vedic philosophy?',
        options: [
          'Dharma (righteousness), Artha (material prosperity), Kama (wholesome enjoyment), and Moksha (spiritual liberation)',
          'Power, Conquest, Luxury, and Fame',
          'Childhood, Youth, Middle age, and Old age',
          'Earth, Fire, Air, and Water',
        ],
        correctIndex: 0,
        explanation:
          'The four Purusharthas provide a holistic blueprint for human fulfillment: material and sensory pursuits guided by ethical Dharma, culminating in Moksha.',
        sourceRef: 'Vedic Shastras (Manusmriti & Mahabharata)',
      },
      {
        questionText:
          'In the Rigveda, what is "Rta" (ऋत) and why is it fundamental to the universe?',
        options: [
          'A specific seasonal rain dance',
          'The eternal cosmic, moral, and natural order that governs and harmonizes the cosmos, seasons, and moral actions',
          'A military treaty between rival kingdoms',
          'A rare mineral extracted from riverbeds',
        ],
        correctIndex: 1,
        explanation:
          'Rta is the universal rhythm and cosmic-moral harmony that regulates the movement of celestial bodies, moral causality, and ethical life.',
        sourceRef: 'Rigveda Mandala 4.23',
      },
      {
        questionText:
          'From which sacred text does the renowned universal declaration "Vasudhaiva Kutumbakam" (The entire world is one family) originate?',
        options: [
          'Maha Upanishad (Chapter 6)',
          'A medieval royal proclamation',
          'Modern diplomatic charters',
          'A textbook on agricultural geometry',
        ],
        correctIndex: 0,
        explanation:
          'Maha Upanishad 6.71 proclaims: "Udaracharitanam tu vasudhaiva kutumbakam" — for those of noble and magnanimous heart, the entire cosmos is their one family.',
        sourceRef: 'Maha Upanishad 6.71',
      },
      {
        questionText:
          'Which principle is proclaimed across the Shastras as the supreme moral virtue: "Ahimsa paramo dharmah"?',
        options: [
          'Non-harm / Non-violence is the highest Dharma',
          'Conquest by weapons is supreme virtue',
          'Accumulation of gold is the primary duty',
          'Silence in courts is the only rule',
        ],
        correctIndex: 0,
        explanation:
          'The Mahabharata (Anushasana Parva 115.1) teaches "Ahimsa paramo dharmah" — reverence for life and freedom from malice toward all beings is the pinnacle of virtue.',
        sourceRef: 'Mahabharata Anushasana Parva 115.1',
      },
      {
        questionText:
          'What are the four successive stages or Ashramas of life outlined in the classical Sanatana tradition?',
        options: [
          'Brahmacharya (student), Grihastha (householder), Vanaprastha (reflective retreat), and Sannyasa (renunciation)',
          'Infancy, Adolescence, Empire, and Royalty',
          'Farmer, Merchant, Artisan, and Scribe',
          'Morning, Noon, Sunset, and Midnight',
        ],
        correctIndex: 0,
        explanation:
          'The Ashrama system structures life into progressive phases of learning (Brahmacharya), social responsibility (Grihastha), inward reflection (Vanaprastha), and transcendent liberation (Sannyasa).',
        sourceRef: 'Jabala Upanishad & Manusmriti',
      },
    ],
  },
];

import { QuizModel } from '../models/quiz.model.js';

export async function seedCanonicalQuizzes(
  quizModel: import('mongoose').Model<any> = QuizModel
): Promise<number> {
  let seededCount = 0;
  for (const q of CANONICAL_SEED_QUIZZES) {
    const existing = await quizModel.findOne({ title: q.title }).exec();
    if (!existing) {
      await quizModel.create(q);
      seededCount++;
    }
  }
  return seededCount;
}
