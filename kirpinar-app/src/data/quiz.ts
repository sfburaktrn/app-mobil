export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  // Shown after answer/timeout as a quick learning bite.
  explain: string;
  tag: 'rehber' | 'tarih' | 'rituel';
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q-kirkpinar-nerede',
    question: 'Kırkpınar güreşleri geleneksel olarak nerede yapılır?',
    options: ['Edirne – Sarayiçi', 'İstanbul – Yenikapı', 'Ankara – Atatürk Orman Çiftliği', 'Bursa – Tophane'],
    answerIndex: 0,
    explain: 'Kırkpınar’ın er meydanı Edirne’de Sarayiçi bölgesindedir.',
    tag: 'tarih',
  },
  {
    id: 'q-pesrev-nedir',
    question: 'Peşrev’in Kırkpınar’daki temel anlamı nedir?',
    options: ['Isınma + saygı/selamlaşma ritüeli', 'Kura çekimi', 'Ödül töreni', 'Hakem uyarısı'],
    answerIndex: 0,
    explain: 'Peşrev, güreş öncesi ritmik ısınma ve selamlaşma (saygı) akışıdır.',
    tag: 'rituel',
  },
  {
    id: 'q-cazgir-gorevi',
    question: 'Cazgır ne yapar?',
    options: ['Pehlivanları manilerle tanıtır ve duayla akışı başlatır', 'Kıspet diker', 'Yağı ölçer', 'Kemer taşır'],
    answerIndex: 0,
    explain: 'Cazgır; mani/salavat ile pehlivanları tanıtır, meydanın sözlü geleneğini taşır.',
    tag: 'rituel',
  },
  {
    id: 'q-davul-zurna',
    question: 'Davul-zurna güreş akışında neyi etkiler?',
    options: ['Ritmi/temposu ve atmosferi', 'Boy klasmanını', 'Kemerin ağırlığını', 'Kural kitabını'],
    answerIndex: 0,
    explain: 'Davul-zurna, er meydanının temposunu ve atmosferini kuran ana unsurlardandır.',
    tag: 'rituel',
  },
  {
    id: 'q-kispet',
    question: 'Kıspet nedir?',
    options: ['Deri güreş giysisi', 'Hakem düdüğü', 'Pehlivan madalyası', 'Seyirci bileti'],
    answerIndex: 0,
    explain: 'Kıspet; belden diz altına uzanan, deri (manda/sığır) güreş giysisidir.',
    tag: 'rehber',
  },
  {
    id: 'q-yaglanma',
    question: 'Yağlanma neden yapılır?',
    options: ['Kavramayı zorlaştırır, oyunu “denge/sabır”a taşır', 'Sadece gösteri için', 'Zorunlu sağlık kontrolü', 'Kemer hakkı kazanmak için'],
    answerIndex: 0,
    explain: 'Zeytinyağı kavramayı zorlaştırır; denge ve doğru zamanlamayı öne çıkarır.',
    tag: 'rehber',
  },
  {
    id: 'q-zembil',
    question: 'Zembil ne işe yarar?',
    options: ['Kıspet ve eşyaları taşımaya', 'Puan tutmaya', 'Güreşi durdurmaya', 'Müzik çalmaya'],
    answerIndex: 0,
    explain: 'Zembil, pehlivanın kıspet ve eşyalarını taşıdığı geleneksel sepet/çantadır.',
    tag: 'rehber',
  },
  {
    id: 'q-altin-kemer',
    question: 'Altın Kemer kime verilir?',
    options: ['Başpehlivan', 'Cazgır', 'Yağcı', 'Davulcu'],
    answerIndex: 0,
    explain: 'Altın Kemer, Kırkpınar’ın en büyük ödülü olarak başpehlivana verilir.',
    tag: 'tarih',
  },
  {
    id: 'q-kemer-ebedi',
    question: 'Altın Kemer’in ebedi sahibi olmak için genel kural nedir?',
    options: ['3 yıl üst üste başpehlivan olmak', '3 farklı boyda derece', '3 kez peşrev yapmak', '3 gün üst üste yağlanmak'],
    answerIndex: 0,
    explain: 'Genel kural: Kırkpınar’da üç yıl üst üste başpehlivan olan kemerin daimi sahibi olur.',
    tag: 'tarih',
  },
  {
    id: 'q-unesco',
    question: 'Kırkpınar hangi nedenle kültürel açıdan öne çıkar?',
    options: [
      'Ritüel + müzik + sözlü gelenek + zanaat bütünlüğü',
      'Sadece spor salonu kuralları',
      'Sadece modern lig puanları',
      'Sadece tek bir gösteri maçı',
    ],
    answerIndex: 0,
    explain: 'Kırkpınar; ritüeller, müzik, sözlü gelenek ve zanaatla “bütün” bir kültürel akıştır.',
    tag: 'tarih',
  },
];

export type QuizMode = 'quick' | 'full';

export const quizModes: Record<QuizMode, { title: string; count: number; secondsPerQuestion: number }> = {
  quick: { title: 'Hızlı Tur', count: 5, secondsPerQuestion: 10 },
  full: { title: 'Tam Tur', count: 10, secondsPerQuestion: 14 },
} as const;

