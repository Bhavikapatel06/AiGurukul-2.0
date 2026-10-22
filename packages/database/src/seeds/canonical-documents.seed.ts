import { Types } from 'mongoose';
import { DocumentModel } from '../models/document.model.js';
import { DocumentChunkModel } from '../models/document-chunk.model.js';

export interface SeedDocumentData {
  title: string;
  fileName: string;
  domain: string;
  language: string;
  author: string;
  era: string;
  chunks: Array<{
    text: string;
    canonicalReference: string;
    tokenCount: number;
    metadata?: Record<string, unknown>;
  }>;
}

export const CANONICAL_DOCUMENTS: SeedDocumentData[] = [
  {
    title: 'Bhagavad Gita: Karma Yoga, Equanimity and Self-Mastery',
    fileName: 'bhagavad_gita_karma_yoga.txt',
    domain: 'gita',
    language: 'sa',
    author: 'Maharishi Veda Vyasa (Spoken by Lord Krishna)',
    era: 'c. 5th–2nd Century BCE',
    chunks: [
      {
        text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥ [BG 2.47] You have a right to perform your prescribed duty, but you are not entitled to the fruits of actions. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.',
        canonicalReference: 'BG 2.47',
        tokenCount: 65,
        metadata: { chapter: 2, verse: 47, focus: 'Nishkama Karma' },
      },
      {
        text: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः। वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥ [BG 2.56] One whose mind remains unperturbed amid misery, who is devoid of longing in pleasure, and who is free from attachment, fear, and anger, is termed a sage of steady wisdom (Sthitaprajna).',
        canonicalReference: 'BG 2.56',
        tokenCount: 62,
        metadata: { chapter: 2, verse: 56, focus: 'Sthitaprajna' },
      },
      {
        text: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते। सङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥ क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः। स्मृतिभ्रंशाद्बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥ [BG 2.62-63] While contemplating the objects of the senses, a person develops attachment to them; from attachment lust develops, and from lust anger arises. From anger arises complete delusion, and from delusion bewilderment of memory; when memory is bewildered, intellect is lost, and when intellect is lost one falls down.',
        canonicalReference: 'BG 2.62-63',
        tokenCount: 88,
        metadata: { chapter: 2, verses: [62, 63], focus: 'Chain of Causation' },
      },
      {
        text: 'तस्मादसक्तः सततं कार्यं कर्म समाचर। असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥ [BG 3.19] Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme.',
        canonicalReference: 'BG 3.19',
        tokenCount: 52,
        metadata: { chapter: 3, verse: 19, focus: 'Detached Action' },
      },
      {
        text: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्। स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥ [BG 3.35] It is far better to execute one’s own duty (Svadharma) though imperfectly, than to perform another’s duty perfectly. Destruction in the course of performing one’s own duty is better than engaging in another’s, for to follow another’s path is dangerous.',
        canonicalReference: 'BG 3.35',
        tokenCount: 66,
        metadata: { chapter: 3, verse: 35, focus: 'Svadharma' },
      },
      {
        text: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्। आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥ [BG 6.5] Let a person elevate themselves through their own mind, and not degrade themselves. For the mind alone is the truest friend of the self, and the mind alone is the fiercest foe.',
        canonicalReference: 'BG 6.5',
        tokenCount: 55,
        metadata: { chapter: 6, verse: 5, focus: 'Self-Elevation' },
      },
      {
        text: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च। निर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥ [BG 12.13] One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, and who is forgiving.',
        canonicalReference: 'BG 12.13',
        tokenCount: 60,
        metadata: { chapter: 12, verse: 13, focus: 'Compassion & Equanimity' },
      },
      {
        text: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज। अहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥ [BG 18.66] Abandon all varieties of anxious clinging and surrender unto righteous purpose alone. I shall deliver you from all sinful reactions and distress; do not grieve.',
        canonicalReference: 'BG 18.66',
        tokenCount: 58,
        metadata: { chapter: 18, verse: 66, focus: 'Surrender of Anxiety' },
      },
    ],
  },
  {
    title: 'Arthashastra & Chanakya Neeti: Strategy, Prudence and Statecraft',
    fileName: 'chanakya_arthashastra_neeti.txt',
    domain: 'chanakya',
    language: 'sa',
    author: 'Acharya Chanakya (Kautilya)',
    era: 'c. 4th Century BCE',
    chunks: [
      {
        text: 'विद्या विनीतो राजा हि प्रजानां विनये रतः। अनन्यश्च श्रियं भुङ्क्ते सर्वभूतहिते रतः॥ [Arthashastra 1.7.1] A leader who is trained in true knowledge, self-restrained (vinaya-yukta), and devoted to the welfare of the people enjoys supreme prosperity and reigns without rival.',
        canonicalReference: 'Arthashastra 1.7.1',
        tokenCount: 62,
        metadata: { book: 1, chapter: 7, focus: 'Ethical Leadership & Vinaya' },
      },
      {
        text: 'अमात्यानुपधाभिः शौचयेत्। धर्मोपधाऽर्थोपधा कामोपधा भयोपधेति। [Arthashastra 1.9.1] A ruler must thoroughly test the integrity of ministers and close counselors through structured tests (upadha): tests of virtue, financial temptation, emotional allure, and courage under acute fear.',
        canonicalReference: 'Arthashastra 1.9.1',
        tokenCount: 65,
        metadata: { book: 1, chapter: 9, focus: 'Vetting Counselors & Trust' },
      },
      {
        text: 'मन्त्रपूर्वाः सर्वारम्भाः। तदुद्देशः संवृतः स्यात्। [Arthashastra 1.15.1-4] All undertakings depend upon deliberation and strategic counsel. The counsel must be kept strictly confidential, for any premature leak of deliberation ruins the objective and arms the adversary.',
        canonicalReference: 'Arthashastra 1.15.1',
        tokenCount: 56,
        metadata: { book: 1, chapter: 15, focus: 'Strategic Confidentiality' },
      },
      {
        text: 'अनभ्यासे विषं शास्त्रमजीर्णे भोजनं विषम्। दरिद्रस्य विषं गोष्ठी वृद्धस्य तरुणी विषम्॥ [Chanakya Neeti 1.2] Knowledge without continuous practice and reflection turns into poison; food consumed while suffering indigestion is poison; a royal assembly is torture for the destitute; and a youthful companion is poison to an infirm elder.',
        canonicalReference: 'Chanakya Neeti 1.2',
        tokenCount: 68,
        metadata: { chapter: 1, verse: 2, focus: 'Applied Knowledge' },
      },
      {
        text: 'जानीयात् प्रेषणे भृत्यान् बान्धवान् व्यसनागमे। मित्रं चापत्तिकाले तु भार्यां च विभवक्षये॥ [Chanakya Neeti 1.12] Test a servant in the discharge of duty, relatives in the hour of adversity, friends in times of disaster, and a companion when fortune dwindles.',
        canonicalReference: 'Chanakya Neeti 1.12',
        tokenCount: 58,
        metadata: { chapter: 1, verse: 12, focus: 'Discernment of Loyalty' },
      },
      {
        text: 'सरलवृक्षाः छिद्यन्ते वक्राः तिष्ठन्ति पादपाः। [Chanakya Neeti 2.8] Straight trees in the forest are felled first, while crooked trees survive. Therefore, do not be overly naive or transparently yielding in corrupt company; maintain tactical prudence and self-preservation.',
        canonicalReference: 'Chanakya Neeti 2.8',
        tokenCount: 52,
        metadata: { chapter: 2, verse: 8, focus: 'Pragmatic Defense' },
      },
      {
        text: 'अधीत्येदं यथाशास्त्रं नरो जानाति सत्तमः। धर्मोपदेशविख्यातं कार्याकार्यं शुभाशुभम्॥ [Chanakya Neeti 2.1] A person who carefully studies the shastras with discrimination gains clarity on what ought to be done and what ought not to be done, distinguishing true virtue from harmful paths.',
        canonicalReference: 'Chanakya Neeti 2.1',
        tokenCount: 64,
        metadata: { chapter: 2, verse: 1, focus: 'Critical Discernment' },
      },
    ],
  },
  {
    title: 'Charaka Samhita: Sutrasthana and Fundamental Physiology',
    fileName: 'charaka_samhita_sutrasthana.txt',
    domain: 'ayurveda',
    language: 'sa',
    author: 'Maharishi Charaka',
    era: 'c. 2nd Century BCE',
    chunks: [
      {
        text: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्। मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥ [Charaka Samhita Sutrasthana 1.41] That science is called Ayurveda wherein wholesome and unwholesome, happy and unhappy lifespans are explained along with measures for longevity.',
        canonicalReference: 'Charaka Samhita Sutra 1.41',
        tokenCount: 56,
        metadata: { section: 'Sutrasthana', chapter: 1, verse: 41, focus: 'Definition of Ayurveda' },
      },
      {
        text: 'शरीरेन्द्रियसत्त्वात्मसंयोगो धारि जीवितम्। नित्यगश्चानुबन्धश्च पर्यायैरायुरुच्यते॥ [Charaka Samhita Sutrasthana 1.42] Ayu (life) is defined as the seamless conjunction of body (Sharira), sensory faculties (Indriya), mind (Sattva), and conscious soul (Atman). It is the maintainer of vital breath and the continuum of experience.',
        canonicalReference: 'Charaka Samhita Sutra 1.42',
        tokenCount: 64,
        metadata: { section: 'Sutrasthana', chapter: 1, verse: 42, focus: 'Definition of Life' },
      },
      {
        text: 'सर्वदा सर्वभावानां सामान्यं वृद्धिकारणम्। ह्रासहेतुर्विशेषश्च प्रवृत्तिरुभयस्य तु॥ [Charaka Samhita Sutrasthana 1.44] Similarity in qualities (Samanya) always causes augmentation of all constituents, while dissimilarity (Vishesha) causes attenuation. Both are operative in maintaining equilibrium.',
        canonicalReference: 'Charaka Samhita Sutra 1.44',
        tokenCount: 56,
        metadata: { section: 'Sutrasthana', chapter: 1, verse: 44, focus: 'Law of Similarities' },
      },
      {
        text: 'वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः। विकृताऽविकृता देहं घ्नन्ति ते वर्तयन्ति च॥ [Charaka Samhita Sutrasthana 1.57] Vata, Pitta, and Kapha are the three biological humors (Doshas). When in balance they sustain and nourish the physical organism; when deranged they bring about pathology and disease.',
        canonicalReference: 'Charaka Samhita Sutra 1.57',
        tokenCount: 59,
        metadata: { section: 'Sutrasthana', chapter: 1, verse: 57, focus: 'Tri-Dosha Matrix' },
      },
      {
        text: 'मात्राशी स्यात्। आहारमात्रा पुनरग्निबलापेक्षिणी। [Charaka Samhita Sutrasthana 5.3] One should eat in proper measure (Matrashin). The exact quantity of food depends directly on the strength of one’s digestive fire (Agni). Food consumed in appropriate quantity sustains strength, complexion, and lifespan without aggravating doshas.',
        canonicalReference: 'Charaka Samhita Sutra 5.3',
        tokenCount: 60,
        metadata: { section: 'Sutrasthana', chapter: 5, verse: 3, focus: 'Agni & Wholesome Diet' },
      },
      {
        text: 'न वेगान् धारयेद्धीमान् जातान् मूत्रपुरीषयोः। धारयेत्तु सदा वेगान् हितैषी प्रेत्य चेह च। लोभशोकभयक्रोधमानवेगान् जितेन्द्रियः॥ [Charaka Samhita Sutrasthana 7.3-6] An intelligent person should never suppress natural physiological urges. Conversely, one seeking genuine wellbeing should consciously restrain the destructive surges of greed, grief, fear, anger, vanity, and envy.',
        canonicalReference: 'Charaka Samhita Sutra 7.3-6',
        tokenCount: 72,
        metadata: { section: 'Sutrasthana', chapter: 7, verses: [3, 6], focus: 'Mental & Physical Urges' },
      },
      {
        text: 'सत्त्वावजयः पुनरहितेभ्योऽर्थेभ्यो मनोनिग्रहः। [Charaka Samhita Sutrasthana 11.54] Sattvavajaya is the therapeutic discipline of mind-restraint, withdrawing the mind from unwholesome, destabilizing sensory habits and anchoring it in clarity, patience, and purpose.',
        canonicalReference: 'Charaka Samhita Sutra 11.54',
        tokenCount: 54,
        metadata: { section: 'Sutrasthana', chapter: 11, verse: 54, focus: 'Mental Hygiene & Sattvavajaya' },
      },
    ],
  },
  {
    title: 'Mahabharata: Shanti Parva and Vidura Niti on Dharma & Dilemmas',
    fileName: 'mahabharata_shanti_vidura.txt',
    domain: 'mahabharata',
    language: 'sa',
    author: 'Maharishi Veda Vyasa',
    era: 'c. 4th Century BCE',
    chunks: [
      {
        text: 'धारणाद्धर्ममित्याहुर्धर्मो धारयते प्रजाः। यत्स्याद्धारणसंयुक्तं स धर्म इति निश्चयः॥ [Mahabharata Shanti Parva 109.11] Dharma is so called because it sustains and upholds (dhārana). Dharma preserves all living beings and human society. That which possesses the capacity to uphold and nurture all beings is undeniably Dharma.',
        canonicalReference: 'Mahabharata Shanti Parva 109.11',
        tokenCount: 66,
        metadata: { section: 'Shanti Parva', chapter: 109, verse: 11, focus: 'Definition of Dharma' },
      },
      {
        text: 'आपत्सु च न मुह्यन्ति नराः पण्डितबुद्धयः। उद्योगिनश्च सततं धर्मज्ञाः सत्यवादिनः॥ [Mahabharata Vidura Niti 33.16] Wise persons possessing steady intellect do not become bewildered or paralyzed in the midst of adversity (apatsu). They remain diligently active, steadfast in duty, and anchored in truth.',
        canonicalReference: 'Mahabharata Vidura Niti 33.16',
        tokenCount: 62,
        metadata: { section: 'Vidura Niti', chapter: 33, verse: 16, focus: 'Composure in Adversity' },
      },
      {
        text: 'श्रेयश्च प्रेयश्च मनुष्यमेतस्तौ संपरीत्य विविनक्ति धीरः। तयोः श्रेय आददानस्य साधु भवति हीयतेऽर्थाद्य उ प्रेयो वृणीते॥ [Mahabharata / Katha Tradition Vidura Niti 33.40] The enduringly good (Shreyas) and the immediately pleasant (Preyas) present themselves before every human being. The discerning mind examines both and chooses the path of enduring integrity, whereas one who clings to immediate gratification falls away from true purpose.',
        canonicalReference: 'Mahabharata Vidura Niti 33.40',
        tokenCount: 76,
        metadata: { section: 'Vidura Niti', chapter: 33, verse: 40, focus: 'Preyas vs Shreyas' },
      },
      {
        text: 'अष्टौ गुणाः पुरुषं दीपयन्ति प्रज्ञा च कौल्यं च दमः श्रुतं च। पराक्रमश्चाबहुभाषिता च दानं यथाशक्ति कृतज्ञता च॥ [Mahabharata Vidura Niti 34.18] Eight qualities illuminate and dignify a human being: wisdom, noble conduct, self-restraint, learning, disciplined valor, restrained speech, generous charity according to one’s means, and heartfelt gratitude.',
        canonicalReference: 'Mahabharata Vidura Niti 34.18',
        tokenCount: 68,
        metadata: { section: 'Vidura Niti', chapter: 34, verse: 18, focus: 'Eight Cardinal Virtues' },
      },
      {
        text: 'किमाश्चर्यं? अहन्‍यहनि भूतानि गच्छन्ति यममन्दिरम्। शेषाः स्थावरमिच्छन्ति किमाश्चर्यमतः परम्॥ [Mahabharata Vana Parva 313.116] In the Yaksha Prashna, Yudhisthira is asked: What is the greatest wonder in the world? He answers: Day after day countless living beings depart for the halls of death, yet those who remain believe they will live forever. What can be more astonishing than this delusion?',
        canonicalReference: 'Mahabharata Vana Parva 313.116',
        tokenCount: 78,
        metadata: { section: 'Vana Parva', chapter: 313, verse: 116, focus: 'Yaksha Prashna on Mortality' },
      },
      {
        text: 'यतो धर्मस्ततो जयः। धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः॥ [Mahabharata Vana Parva 313.128] Where there is Dharma, there is true victory. Dharma destroyed destroys its violator, while Dharma safeguarded protects those who uphold it. Therefore, duty and integrity must never be abandoned for temporary convenience.',
        canonicalReference: 'Mahabharata Vana Parva 313.128',
        tokenCount: 64,
        metadata: { section: 'Vana Parva', chapter: 313, verse: 128, focus: 'Integrity Protects' },
      },
    ],
  },
  {
    title: 'Patanjali Yoga Sutras: Science of Mental Stillness and Awareness',
    fileName: 'patanjali_yoga_sutras.txt',
    domain: 'classical_texts',
    language: 'sa',
    author: 'Maharishi Patanjali',
    era: 'c. 400 CE',
    chunks: [
      {
        text: 'योगश्चित्तवृत्तिनिरोधः॥ तदा द्रष्टुः स्वरूपेऽवस्थानम्॥ [Yoga Sutras 1.2-1.3] Yoga is the intentional stilling of the fluctuations and turbulence of the mind field (Chitta Vritti Nirodha). Then the witnessing consciousness (Drashta) abides established in its own true transcendental nature.',
        canonicalReference: 'Yoga Sutras 1.2-1.3',
        tokenCount: 52,
        metadata: { section: 'Samadhi Pada', verses: [2, 3], focus: 'Nature of Yoga' },
      },
      {
        text: 'अभ्यासवैराग्याभ्यां तन्निरोधः॥ स तु दीर्घकालनैरन्तर्यसत्कारासेवितो दृढभूमिः॥ [Yoga Sutras 1.12-14] The stilling of mental fluctuations is achieved through persistent, disciplined practice (Abhyasa) and conscious dispassion (Vairagya). That practice becomes firmly established when attended to consistently for a long time, without interruption, and with reverent devotion.',
        canonicalReference: 'Yoga Sutras 1.12-14',
        tokenCount: 68,
        metadata: { section: 'Samadhi Pada', verses: [12, 14], focus: 'Twin Pillars of Practice' },
      },
      {
        text: 'मैत्रीकरुणामुदितोपेक्षणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्॥ [Yoga Sutras 1.33] Serenity of mind (Chitta Prasadana) is cultivated by embodying friendship toward the joyful, compassion for the sorrowful, gladness for the virtuous, and equanimity toward the flawed or difficult.',
        canonicalReference: 'Yoga Sutras 1.33',
        tokenCount: 60,
        metadata: { section: 'Samadhi Pada', verse: 33, focus: 'Fourfold Attitude for Peace' },
      },
      {
        text: 'तपःस्वाध्यायेश्वरप्रणिधानानि क्रियायोगः॥ [Yoga Sutras 2.1] Kriya Yoga consists of disciplined transformative effort (Tapas), introspective self-study and study of sacred teachings (Svadhyaya), and surrendering the ego to the supreme order (Ishvara Pranidhana).',
        canonicalReference: 'Yoga Sutras 2.1',
        tokenCount: 52,
        metadata: { section: 'Sadhana Pada', verse: 1, focus: 'Kriya Yoga' },
      },
      {
        text: 'हेयं दुःखमनागतम्॥ [Yoga Sutras 2.16] The suffering that has not yet arrived can and should be prevented through foresight, discernment, and self-mastery.',
        canonicalReference: 'Yoga Sutras 2.16',
        tokenCount: 38,
        metadata: { section: 'Sadhana Pada', verse: 16, focus: 'Preventing Future Suffering' },
      },
      {
        text: 'योगाङ्गानुष्ठानादशुद्धिक्षये ज्ञानदीप्तिरा विवेकख्यातेः॥ [Yoga Sutras 2.28] By dedicated adherence to the eight limbs of Yoga, as impurities are progressively eradicated, the radiant light of wisdom shines forth culminating in discriminative discernment (Viveka Khyati).',
        canonicalReference: 'Yoga Sutras 2.28',
        tokenCount: 50,
        metadata: { section: 'Sadhana Pada', verse: 28, focus: 'Ashtanga Fruit' },
      },
      {
        text: 'वितर्कबाधने प्रतिपक्षभावनम्॥ [Yoga Sutras 2.33] When disturbed by destructive, harmful, or negative thoughts, intentionally cultivate and hold in mind the opposite uplifting perspective (Pratipaksha Bhavana).',
        canonicalReference: 'Yoga Sutras 2.33',
        tokenCount: 46,
        metadata: { section: 'Sadhana Pada', verse: 33, focus: 'Pratipaksha Bhavana' },
      },
      {
        text: 'देशबन्धश्चित्तस्य धारणा॥ तत्र प्रत्ययैकतानता ध्यानम्॥ [Yoga Sutras 3.1-2] Dharana (concentration) is the binding of consciousness to a single chosen focus or point of awareness. Dhyana (meditation) is the continuous, uninterrupted flow of awareness toward that focal point.',
        canonicalReference: 'Yoga Sutras 3.1-2',
        tokenCount: 52,
        metadata: { section: 'Vibhuti Pada', verses: [1, 2], focus: 'Dharana & Dhyana' },
      },
    ],
  },
];

export async function seedCanonicalDocuments(): Promise<{
  documentsCreated: number;
  chunksCreated: number;
}> {
  let documentsCreated = 0;
  let chunksCreated = 0;

  for (const docData of CANONICAL_DOCUMENTS) {
    const storageKey = `canonical/${docData.fileName}`;
    const totalTokens = docData.chunks.reduce((sum, c) => sum + c.tokenCount, 0);

    const doc = await DocumentModel.findOneAndUpdate(
      { storageKey },
      {
        $setOnInsert: {
          _id: new Types.ObjectId(),
        },
        $set: {
          title: docData.title,
          fileName: docData.fileName,
          fileSize: Buffer.byteLength(docData.chunks.map((c) => c.text).join('\n\n')),
          mimeType: 'text/plain',
          storageKey,
          domain: docData.domain,
          language: docData.language,
          author: docData.author,
          era: docData.era,
          status: 'indexed',
          chunkCount: docData.chunks.length,
          tokenCount: totalTokens,
          uploadedBy: 'system',
        },
      },
      { upsert: true, new: true }
    );

    documentsCreated++;

    // Remove existing chunks for this document to ensure clean idempotency
    await DocumentChunkModel.deleteMany({ documentId: doc._id });

    const chunkDocs = docData.chunks.map((chunk, idx) => ({
      documentId: doc._id,
      chunkIndex: idx,
      text: chunk.text,
      tokenCount: chunk.tokenCount,
      canonicalReference: chunk.canonicalReference,
      metadata: {
        domain: docData.domain,
        language: docData.language,
        author: docData.author,
        title: docData.title,
        ...chunk.metadata,
      },
    }));

    await DocumentChunkModel.insertMany(chunkDocs);
    chunksCreated += chunkDocs.length;
  }

  return { documentsCreated, chunksCreated };
}
