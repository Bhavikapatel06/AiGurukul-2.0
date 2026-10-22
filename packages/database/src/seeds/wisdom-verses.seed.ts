import { WisdomDomain } from '@ai-gurukul/types';

export interface SeedVerse {
  domain: WisdomDomain;
  canonicalReference: string;
  sanskrit: string;
  transliteration: string;
  englishTranslation: string;
  commentary: string;
  themes: string[];
  speaker: string;
}

export const CANONICAL_SEED_VERSES: SeedVerse[] = [
  // --- 1. LORD KRISHNA (Bhagavad Gita) ---
  {
    domain: 'gita',
    canonicalReference: 'BG 2.47',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration:
      'karmaṇy-evādhikāras te mā phaleṣu kadācana, mā karma-phala-hetur bhūr mā te saṅgo ’stv akarmaṇi',
    englishTranslation:
      'You have a right to perform your prescribed duties, but never to the fruits of your actions. Never consider yourself the cause of results, nor let yourself be attached to inaction.',
    commentary:
      'The foundational verse of Nishkama Karma (selfless action). Sri Krishna teaches Arjuna that mental peace and spiritual liberation arise when effort is decoupled from anxiety about rewards.',
    themes: ['duty', 'action', 'detachment', 'anxiety', 'karma-yoga'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 2.11',
    sanskrit: 'अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे। गतासूनगतासूंश्च नानुशोचन्ति पण्डिताः॥',
    transliteration:
      'aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase, gatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ',
    englishTranslation:
      'While speaking learned words, you are grieving for that which is not worthy of sorrow. The truly wise mourn neither for the living nor for the departed.',
    commentary:
      'Krishna reminds the sorrowful seeker of the eternal, imperishable nature of the soul (Atman) behind temporary physical vessels.',
    themes: ['grief', 'wisdom', 'mortality', 'equanimity'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 2.56',
    sanskrit: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥',
    transliteration:
      'duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ, vīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate',
    englishTranslation:
      'One whose mind remains unperturbed amid misery, who is devoid of longing in pleasure, and who is free from attachment, fear, and anger, is termed a sage of steady wisdom (Sthitaprajna).',
    commentary:
      'Teaches steady mental equilibrium that withstands life’s inevitable dualities without being thrown into emotional reactivity.',
    themes: ['equanimity', 'emotional-balance', 'fearlessness', 'sthitaprajna'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 3.19',
    sanskrit: 'तस्मादसक्तः सततं कार्यं कर्म समाचर। असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥',
    transliteration:
      'tasmād asaktaḥ satataṁ kāryaṁ karma samācara, asakto hy ācaran karma param āpnoti pūruṣaḥ',
    englishTranslation:
      'Therefore, without attachment, constantly perform the work that ought to be done; for by doing work without attachment, a person attains the Supreme.',
    commentary:
      'Emphasizes consistent engagement with one’s present responsibilities with an unburdened, focused mind.',
    themes: ['focus', 'duty', 'dedication', 'work-ethic'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 3.35',
    sanskrit: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥',
    transliteration:
      'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt, sva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ',
    englishTranslation:
      'It is far better to perform one’s own prescribed duty, even if imperfect, than to perform another’s duty perfectly. Destruction in one’s own duty is auspicious, but pursuing another’s path invites inner peril.',
    commentary:
      'Addresses life direction, authentic calling (Svadharma), and resisting the temptation to imitate others at the cost of one’s own integrity.',
    themes: ['purpose', 'svadharma', 'authenticity', 'career', 'direction'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 6.5',
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    transliteration:
      'uddhared ātmanātmānaṁ nātmānam avasādayet, ātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ',
    englishTranslation:
      'Let a seeker elevate themselves through their own mind, and not degrade themselves. For the mind alone is the truest friend of the self, and the mind alone is the fiercest foe.',
    commentary:
      'Teaches radical self-accountability and mastery over mental fluctuations. An undisciplined mind behaves as an internal adversary; a disciplined mind is an ally.',
    themes: ['mindset', 'self-discipline', 'mental-health', 'inner-strength'],
    speaker: 'Lord Krishna',
  },
  {
    domain: 'gita',
    canonicalReference: 'BG 12.13',
    sanskrit: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥',
    transliteration:
      'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca, nirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī',
    englishTranslation:
      'One who is devoid of malice toward all beings, who is friendly and compassionate, free from possessiveness and false ego, poised in pleasure and pain, and forgiving.',
    commentary:
      'The qualities of deep devotion and emotional maturity: radiating goodwill without demanding reciprocal gratitude.',
    themes: ['compassion', 'relationships', 'forgiveness', 'peace'],
    speaker: 'Lord Krishna',
  },

  // --- 2. CHANAKYA PANDIT (Arthashastra & Chanakya Neeti) ---
  {
    domain: 'chanakya',
    canonicalReference: 'Arthashastra 1.7.1',
    sanskrit: 'विद्या विनीतो राजा हि प्रजानां विनये रतः। अनन्यश्च श्रियं भुङ्क्ते सर्वभूतहिते रतः॥',
    transliteration:
      'vidyā-vinīto rājā hi prajānāṁ vinaye rataḥ, ananyaś ca śriyaṁ bhuṅkte sarva-bhūta-hite rataḥ',
    englishTranslation:
      'A leader who is trained in true knowledge, self-restrained, and devoted to the welfare of the people enjoys supreme prosperity and reigns without rival.',
    commentary:
      'Chanakya establishes ethical leadership: power is sustainable only when rooted in personal self-discipline (vinaya) and the tangible upliftment of those governed.',
    themes: ['leadership', 'governance', 'discipline', 'strategy'],
    speaker: 'Chanakya Pandit',
  },
  {
    domain: 'chanakya',
    canonicalReference: 'Arthashastra 1.9.1',
    sanskrit: 'अमात्यानुपधाभिः शौचयेत्। धर्मोपधाऽर्थोपधा कामोपधा भयोपधेति।',
    transliteration:
      'amātyān upadhābhiḥ śaucayet: dharmopadhā, arthopadhā, kāmopadhā, bhayopadheti',
    englishTranslation:
      'Test the integrity and loyalty of ministers and close associates through secret tests: tests of virtue, financial temptation, personal desire, and steadfastness in crisis.',
    commentary:
      'Counsel on discernment of loyalty and professional boundaries: trust is earned through observed resilience under pressure, not mere words.',
    themes: ['trust', 'vetting', 'loyalty', 'alliances', 'discernment'],
    speaker: 'Chanakya Pandit',
  },
  {
    domain: 'chanakya',
    canonicalReference: 'Arthashastra 1.15.1',
    sanskrit: 'मन्त्रपूर्वाः सर्वारम्भाः। तदुद्देशः संवृतः स्यात्।',
    transliteration:
      'mantra-pūrvāḥ sarvārambhāḥ, tad-uddeśaḥ saṁvṛtaḥ syāt',
    englishTranslation:
      'All successful undertakings must be preceded by deliberate, strategic planning. The core objective and plans must be kept confidential until executed.',
    commentary:
      'Premature disclosure of intentions invites sabotage, friction, and counter-strategies. Deliberation demands confidentiality.',
    themes: ['strategy', 'planning', 'confidentiality', 'execution'],
    speaker: 'Chanakya Pandit',
  },
  {
    domain: 'chanakya',
    canonicalReference: 'Chanakya Neeti 1.2',
    sanskrit: 'अनभ्यासे विषं शास्त्रमजीर्णे भोजनं विषम्। दरिद्रस्य विषं गोष्ठी वृद्धस्य तरुणी विषम्॥',
    transliteration:
      'anabhyāse viṣaṁ śāstram ajīrṇe bhojanaṁ viṣam, daridrasya viṣaṁ goṣṭhī vṛddhasya taruṇī viṣam',
    englishTranslation:
      'Knowledge without continuous practice and reflection turns into poison; food consumed while suffering indigestion is poison; a royal assembly is torture for the destitute; and a youthful companion is poison to an infirm elder.',
    commentary:
      'Teaches the supremacy of applied, practiced skill over sterile theoretical accumulation.',
    themes: ['applied-knowledge', 'practice', 'realism', 'prudence'],
    speaker: 'Chanakya Pandit',
  },
  {
    domain: 'chanakya',
    canonicalReference: 'Chanakya Neeti 1.12',
    sanskrit: 'जानीयात् प्रेषणे भृत्यान् बान्धवान् व्यसनागमे। मित्रं चापत्तिकाले तु भार्यां च विभवक्षये॥',
    transliteration:
      'jānīyāt preṣaṇe bhṛtyān bāndhavān vyasanāgame, mitraṁ cāpatti-kāle tu bhāryāṁ ca vibhava-kṣaye',
    englishTranslation:
      'Test a subordinate in the discharge of duty, relatives in the hour of adversity, friends in times of disaster, and a companion when fortune dwindles.',
    commentary:
      'Adversity is the supreme filter of authentic relationships and dependable partners.',
    themes: ['relationships', 'loyalty', 'adversity', 'character'],
    speaker: 'Chanakya Pandit',
  },
  {
    domain: 'chanakya',
    canonicalReference: 'Chanakya Neeti 2.8',
    sanskrit: 'सरलवृक्षाः छिद्यन्ते वक्राः तिष्ठन्ति पादपाः।',
    transliteration:
      'sarala-vṛkṣāḥ chidyante vakrāḥ tiṣṭhanti pādapāḥ',
    englishTranslation:
      'Straight trees in the forest are felled first, while crooked trees survive. Therefore, do not be overly naive or transparently yielding in corrupt company; maintain tactical prudence.',
    commentary:
      'Warns against excessive naivety and unguarded transparency in competitive or compromised environments.',
    themes: ['tactics', 'self-defense', 'pragmatism', 'caution'],
    speaker: 'Chanakya Pandit',
  },

  // --- 3. VAIDYA CHARAKA (Charaka Samhita) ---
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 1.41',
    sanskrit: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्। मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥',
    transliteration:
      'hitāhitaṁ sukhaṁ duḥkham āyus tasya hitāhitam, mānaṁ ca tac ca yatroktam āyurvedaḥ sa ucyate',
    englishTranslation:
      'That science is called Ayurveda wherein wholesome and unwholesome, happy and unhappy lifespans are explained along with measures for longevity.',
    commentary:
      'Ayurveda is not merely treatment for illness, but the science of living in alignment with nature, circadian rhythm, and individual biological constitution.',
    themes: ['vitality', 'wellness', 'holistic-health', 'doshas', 'longevity'],
    speaker: 'Vaidya Charaka',
  },
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 1.42',
    sanskrit: 'शरीरेन्द्रियसत्त्वात्मसंयोगो धारि जीवितम्। नित्यगश्चानुबन्धश्च पर्यायैरायुरुच्यते॥',
    transliteration:
      'śarīrendriya-sattvātma-saṁyogo dhāri jīvitam, nityagaś cānubandhaś ca paryāyair āyur ucyate',
    englishTranslation:
      'Life (Ayu) is the continuous conjunction of physical body (Sharira), sensory faculties (Indriya), mind (Sattva), and conscious soul (Atman).',
    commentary:
      'Emphasizes the psychosomatic continuum: mental stress directly impacts biological tissues, and physical depletion impairs cognitive clarity.',
    themes: ['mind-body', 'wholeness', 'harmony', 'vital-balance'],
    speaker: 'Vaidya Charaka',
  },
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 1.57',
    sanskrit: 'वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः। विकृताऽविकृता देहं घ्नन्ति ते वर्तयन्ति च॥',
    transliteration:
      'vāyuḥ pittaṁ kaphaś ceti trayo doṣāḥ samāsataḥ, vikṛtā’vikṛtā dehaṁ ghnanti te vartayanti ca',
    englishTranslation:
      'Vata, Pitta, and Kapha are the three biological humors (Doshas). In their balanced state they sustain life and nourish the organism; when disturbed, they cause disease.',
    commentary:
      'The foundational principle of Tridosha equilibrium: understanding individual metabolic tendencies to maintain daily vitality.',
    themes: ['tridosha', 'metabolism', 'balance', 'physiology'],
    speaker: 'Vaidya Charaka',
  },
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 5.3',
    sanskrit: 'मात्राशी स्यात्। आहारमात्रा पुनरग्निबलापेक्षिणी।',
    transliteration:
      'mātrāśī syāt, āhāra-mātrā punar agni-balāpekṣiṇī',
    englishTranslation:
      'One should always eat in proper measure. The appropriate quantity of food depends directly upon the strength of one’s digestive fire (Agni).',
    commentary:
      'Guidance on digestive health: honoring digestive capacity prevents metabolic accumulation (Ama) and fatigue.',
    themes: ['digestion', 'agni', 'nutrition', 'energy', 'diet'],
    speaker: 'Vaidya Charaka',
  },
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 7.3-6',
    sanskrit: 'न वेगान् धारयेद्धीमान् जातान् मूत्रपुरीषयोः। धारयेत्तु सदा वेगान् हितैषी लोभशोकभयक्रोधमानवेगान्॥',
    transliteration:
      'na vegān dhārayed dhīmān jātān mūtra-purīṣayoḥ, dhārayet tu sadā vegān hitaiṣī lobha-śoka-bhaya-krodha-māna-vegān',
    englishTranslation:
      'A wise person never suppresses natural biological urges, but should diligently restrain the harmful psychological urges of greed, grief, fear, anger, vanity, and malice.',
    commentary:
      'Distinguishes physical health from emotional regulation: psychological discipline preserves nervous system balance.',
    themes: ['emotional-regulation', 'urges', 'stress', 'mental-health'],
    speaker: 'Vaidya Charaka',
  },
  {
    domain: 'ayurveda',
    canonicalReference: 'Charaka Samhita Sutrasthana 11.54',
    sanskrit: 'सत्त्वावजयः पुनरहितेभ्योऽर्थेभ्यो मनोनिग्रहः।',
    transliteration:
      'sattvāvjayaḥ punar ahitebhyo ’rthebhyo mano-nigrahaḥ',
    englishTranslation:
      'Sattvavajaya is the therapy of disciplining the mind, consciously restraining it from unwholesome objects and steering it toward clarity and harmony.',
    commentary:
      'Ayurvedic psychotherapy: cultivating Sattva (lucidity) through wholesome habits, gentle self-restraint, and regular rest.',
    themes: ['mental-hygiene', 'sattva', 'calm', 'rest'],
    speaker: 'Vaidya Charaka',
  },

  // --- 4. SAGE VYASA (Mahabharata: Shanti Parva & Vidura Niti) ---
  {
    domain: 'mahabharata',
    canonicalReference: 'Mahabharata Shanti Parva 109.11',
    sanskrit: 'धारणाद्धर्ममित्याहुर्धर्मो धारयते प्रजाः। यत्स्याद्धारणसंयुक्तं स धर्म इति निश्चयः॥',
    transliteration:
      'dhāraṇād dharmam ity āhur dharmo dhārayate prajāḥ, yat syād dhāraṇa-saṁyuktaṁ sa dharma iti niścayaḥ',
    englishTranslation:
      'Dharma is called so because it upholds and sustains. Dharma maintains all living beings and human society. That which supports and preserves life is Dharma.',
    commentary:
      'Sage Vyasa establishes that Dharma is not rigid dogma, but the cosmic and social order that nurtures living beings and maintains ethical harmony.',
    themes: ['dharma', 'ethics', 'universal-welfare', 'principles'],
    speaker: 'Sage Vyasa',
  },
  {
    domain: 'mahabharata',
    canonicalReference: 'Mahabharata Vidura Niti 33.16',
    sanskrit: 'आपत्सु च न मुह्यन्ति नराः पण्डितबुद्धयः। उद्योगिनश्च सततं धर्मज्ञाः सत्यवादिनः॥',
    transliteration:
      'āpatsu ca na muhyanti narāḥ paṇḍita-buddhayaḥ, udyoginaś ca satataṁ dharma-jñāḥ satya-vādinaḥ',
    englishTranslation:
      'Persons of true wisdom do not become bewildered or paralyzed in the midst of adversity. They remain steadfast in duty, industrious, and dedicated to truth.',
    commentary:
      'Reflects on the dignity of enduring character: wisdom is tested not when conditions are pleasant, but when confronting sudden misfortune.',
    themes: ['resilience', 'adversity', 'courage', 'integrity'],
    speaker: 'Sage Vyasa (via Mahatma Vidura)',
  },
  {
    domain: 'mahabharata',
    canonicalReference: 'Mahabharata Vidura Niti 33.40',
    sanskrit: 'श्रेयश्च प्रेयश्च मनुष्यमेतस्तौ संपरीत्य विविनक्ति धीरः। तयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते॥',
    transliteration:
      'śreyaś ca preyaś ca manuṣyam etas tau samparītya vivinakti dhīraḥ, tayoḥ śreya ādadānasya sādhu bhavati hīyate ’rthād ya u preyo vṛṇīte',
    englishTranslation:
      'The enduring good (Shreyas) and the immediately pleasant (Preyas) present themselves to every human. The wise discriminate between them; one who chooses Shreyas prospers in character, while one who chooses Preyas loses purpose.',
    commentary:
      'The classic ethical dilemma: short-term gratification versus long-term moral integrity.',
    themes: ['choice', 'dilemma', 'shreyas-preyas', 'moral-clarity'],
    speaker: 'Sage Vyasa (via Mahatma Vidura)',
  },
  {
    domain: 'mahabharata',
    canonicalReference: 'Mahabharata Vidura Niti 34.18',
    sanskrit: 'अष्टौ गुणाः पुरुषं दीपयन्ति प्रज्ञा च कौल्यं च दमः श्रुतं च। पराक्रमश्चाबहुभाषिता च दानं यथाशक्ति कृतज्ञता च॥',
    transliteration:
      'aṣṭau guṇāḥ puruṣaṁ dīpayanti prajñā ca kaulyaṁ ca damaḥ śrutaṁ ca, parākramaś cābahu-bhāṣitā ca dānaṁ yathā-śakti kṛtajñatā ca',
    englishTranslation:
      'Eight virtues illuminate the character of a person: wisdom, noble conduct, self-restraint, learning, disciplined valor, measured speech, generous charity, and sincere gratitude.',
    commentary:
      'A holistic compass for living with personal dignity, humility, and moral uprightness.',
    themes: ['virtue', 'nobility', 'speech', 'gratitude', 'character'],
    speaker: 'Sage Vyasa (via Mahatma Vidura)',
  },
  {
    domain: 'mahabharata',
    canonicalReference: 'Mahabharata Vana Parva 313.116',
    sanskrit: 'अहन्‍यहनि भूतानि गच्छन्ति यममन्दिरम्। शेषाः स्थावरमिच्छन्ति किमाश्चर्यमतः परम्॥',
    transliteration:
      'ahany-ahani bhūtāni gacchanti yama-mandiram, śeṣāḥ sthāvaram icchanti kim āścaryam ataḥ param',
    englishTranslation:
      'In the Yaksha Prashna, Yudhisthira notes: Day after day living beings depart to the house of death, yet those who remain act as if they will never perish. What can be more astonishing than this?',
    commentary:
      'Reminds the seeker of the transience of worldly ambitions, urging an honest reckoning with what truly matters.',
    themes: ['impermanence', 'truth', 'perspective', 'humility'],
    speaker: 'Sage Vyasa (via Yudhisthira)',
  },

  // --- 5. SAGE PATANJALI (Yoga Sutras) ---
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 1.2-1.3',
    sanskrit: 'योगश्चित्तवृत्तिनिरोधः॥ तदा द्रष्टुः स्वरूपेऽवस्थानम्॥',
    transliteration:
      'yogaś citta-vṛtti-nirodhaḥ, tadā draṣṭuḥ sva-rūpe ’vasthānam',
    englishTranslation:
      'Yoga is the intentional stilling of the oscillations and agitation of the mind field (Chitta Vritti). Then the witnessing consciousness abides established in its true nature.',
    commentary:
      'The foundational definition of Yoga: moving beyond mental turmoil to anchor in peaceful self-awareness.',
    themes: ['mind-mastery', 'stillness', 'awareness', 'yoga'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 1.12-14',
    sanskrit: 'अभ्यासवैराग्याभ्यां तन्निरोधः॥ स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः॥',
    transliteration:
      'abhyāsa-vairāgyābhyāṁ tan-nirodhaḥ, sa tu dīrgha-kāla-nairantarya-satkārāsevito dṛḍha-bhūmiḥ',
    englishTranslation:
      'The stilling of mental turbulence is accomplished through persistent practice (Abhyasa) and non-attachment (Vairagya). Practice becomes firmly rooted when maintained patiently over a long period with devotion.',
    commentary:
      'Teaches that sustainable mental focus and peace require consistent, patient practice rather than sporadic, hurried efforts.',
    themes: ['discipline', 'abhyasa', 'vairagya', 'patience', 'habits'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 1.33',
    sanskrit: 'मैत्रीकरुणामुदितोपेक्षणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्॥',
    transliteration:
      'maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam',
    englishTranslation:
      'Serenity of the mind is attained by cultivating friendliness toward the happy, compassion toward the suffering, delight in the virtuous, and neutral equanimity toward the flawed.',
    commentary:
      'The practical psychological attitudes that extinguish envy, anger, and agitation in interpersonal encounters.',
    themes: ['mental-peace', 'relationships', 'compassion', 'equanimity'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 2.1',
    sanskrit: 'तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः॥',
    transliteration:
      'tapaḥ-svādhyāyeśvara-praṇidhānāni kriyā-yogaḥ',
    englishTranslation:
      'Kriya Yoga consists of disciplined effort (Tapas), introspective self-study and learning (Svadhyaya), and surrendering ego to the higher reality (Ishvara Pranidhana).',
    commentary:
      'The practical three-step discipline for daily living: effort to refine the self, reflective inquiry, and letting go of obsessive control.',
    themes: ['kriya-yoga', 'self-study', 'discipline', 'surrender'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 2.16',
    sanskrit: 'हेयं दुःखमनागतम्॥',
    transliteration:
      'heyaṁ duḥkham anāgatam',
    englishTranslation:
      'The suffering that has not yet manifested can and should be prevented through foresight, discernment, and self-mastery.',
    commentary:
      'An empowering reminder that past errors do not dictate future pain; conscious discernment protects against foreseeable distress.',
    themes: ['prevention', 'foresight', 'discernment', 'freedom'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 2.33',
    sanskrit: 'वितर्कबाधने प्रतिपक्षभावनम्॥',
    transliteration:
      'vitarka-bādhane pratipakṣa-bhāvanam',
    englishTranslation:
      'When the mind is afflicted by negative, destructive, or distressing thoughts, consciously evoke and cultivate the opposite constructive attitude.',
    commentary:
      'The cognitive antidote technique: replace hatred with benevolence, anxiety with steady breath, and greed with contentment.',
    themes: ['cognitive-reframing', 'pratipaksha-bhavana', 'mindset', 'positivity'],
    speaker: 'Sage Patanjali',
  },
  {
    domain: 'classical_texts',
    canonicalReference: 'Yoga Sutras 3.1-2',
    sanskrit: 'देशबन्धश्चित्तस्य धारणा॥ तत्र प्रत्ययैकतानता ध्यानम्॥',
    transliteration:
      'deśa-bandhaś cittasya dhāraṇā, tatra pratyayaikatānatā dhyānam',
    englishTranslation:
      'Dharana (concentration) is fixing the mind upon a single focal object or area. Dhyana (meditation) is the uninterrupted continuous flow of attention toward that object.',
    commentary:
      'Demythologizes meditation: it begins with the discipline of returning attention again and again to a single point until concentration becomes fluid.',
    themes: ['focus', 'concentration', 'meditation', 'dharana'],
    speaker: 'Sage Patanjali',
  },

  // --- 6. SAGE YAMA (Katha Upanishad) ---
  {
    domain: 'upanishads',
    canonicalReference: 'Katha Upanishad 1.3.3',
    sanskrit: 'आत्मानं रथिनं विद्धि शरीरं रथमेव तु। बुद्धिं तु सारथिं विद्धि मनः प्रग्रहमेव च॥',
    transliteration:
      'ātmānaṁ rathinaṁ viddhi śarīraṁ ratham eva tu, buddhiṁ tu sārathiṁ viddhi manaḥ pragraham eva ca',
    englishTranslation:
      'Know the Self as the rider in the chariot, the body as the chariot itself, the intellect (buddhi) as the charioteer, and the mind as the reins.',
    commentary:
      'The classic Upanishadic chariot allegory illustrating how conscious intellect must gently steer sensory desires to maintain psychological harmony.',
    themes: ['consciousness', 'mind-control', 'self-realization', 'clarity'],
    speaker: 'Sage Yama',
  },
];

import { WisdomVerseModel } from '../models/wisdom-verse.model.js';

export async function seedCanonicalWisdom(
  verseModel: import('mongoose').Model<any> = WisdomVerseModel
): Promise<number> {
  let seededCount = 0;
  for (const v of CANONICAL_SEED_VERSES) {
    const existing = await verseModel.findOne({ canonicalReference: v.canonicalReference }).exec();
    if (!existing) {
      await verseModel.create(v);
      seededCount++;
    } else {
      // Update with rich commentary and translations
      await verseModel.updateOne({ canonicalReference: v.canonicalReference }, { $set: v });
    }
  }
  return seededCount;
}
