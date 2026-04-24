export type HomeSpotlight = {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  route:
    | { pathname: '/rehber/[slug]'; params: { slug: string } }
    | { pathname: '/sampiyonlar' }
    | { pathname: '/pehlivanlar' };
  sourceUrls?: string[];
};

export const homeSpotlights: HomeSpotlight[] = [
  {
    id: 'kirmizi-dipli-mum',
    title: 'Kırmızı Dipli Mum',
    subtitle:
      'Kırkpınar’ın “davetiyesi”. Eskiden kahvelere asılır, pehlivanlara ve protokole gönderilirdi.',
    cta: 'Geleneği oku',
    route: { pathname: '/rehber/[slug]', params: { slug: 'kirkpinar-nedir' } },
    sourceUrls: [
      'https://www.kulturportali.gov.tr/turkiye/edirne/kulturatlasi/tarihi-kirkpinar-yagli-guresleri-ogeleri--kirmizi-dipli-mum',
    ],
  },
  {
    id: 'cazgir-salavat',
    title: 'Cazgır ve Salavat',
    subtitle:
      'Pehlivanları manilerle tanıtır; dualama/salavatla er meydanına “ruh” katar.',
    cta: 'Cazgırı keşfet',
    route: { pathname: '/rehber/[slug]', params: { slug: 'pesrev-ve-davul-zurna' } },
    sourceUrls: [
      'https://www.kulturportali.gov.tr/turkiye/edirne/kulturatlasi/tarihi-kirkpinar-yagli-guresleri-ogeleri--cazgir',
    ],
  },
  {
    id: 'altin-kemer',
    title: 'Altın Kemer',
    subtitle:
      'Başpehlivanın en büyük ödülü. Üç yıl üst üste kazanan, kemerin daimi sahibi olur.',
    cta: 'Arşive git',
    route: { pathname: '/sampiyonlar' },
    sourceUrls: ['https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html'],
  },
  {
    id: 'kispet',
    title: 'Kıspet',
    subtitle:
      'Manda/sığır derisinden yapılan, belden diz altına uzanan güreş giysisi. Ustalığı ayrı bir zanaat.',
    cta: 'Kıspeti öğren',
    route: { pathname: '/rehber/[slug]', params: { slug: 'kispet-yaglanma-zembil' } },
    sourceUrls: [
      'https://ich.unesco.org/en/RL/00386',
      'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
    ],
  },
  {
    id: 'yagci-bezci',
    title: 'Yağcı & Bezci',
    subtitle:
      'Yağcı pehlivanı yağlar; bezci güneş altında göze kaçan yağı silmek için tülbent getirir.',
    cta: 'Er meydanı rolleri',
    route: { pathname: '/rehber/[slug]', params: { slug: 'kispet-yaglanma-zembil' } },
    sourceUrls: ['https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html'],
  },
];

export const cazgirQuotes: string[] = [
  '“Pehlivan pehlivan hoş geldiniz; er meydanına şeref verdiniz.”',
  '“Allah Allah illallah… Bu yiğitlere alkışlarla diyelim maşallah.”',
  '“Hasmın karıncaysa hor bakma; yiğitsen meydandan çıkma.”',
  '“Akıl gücüne güven; sabırla oyun kur.”',
];

export type TimelineItem = {
  title: string;
  note: string;
};

export const kirkpinarTimeline: TimelineItem[] = [
  {
    title: 'Ağanın açılışı',
    note: 'UNESCO’ya göre festival, Kırkpınar Ağası’nın töreniyle başlar.',
  },
  {
    title: 'Kemer alayı',
    note: 'Altın kemer şehirde taşınır; ardından Selimiye’de dualar edilir.',
  },
  {
    title: 'Er Meydanı',
    note: 'Cazgır manilerle tanıtır; yağcı yağlar; peşrev ile güreş başlar.',
  },
  {
    title: 'Sonuç',
    note: 'Başpehlivan Altın Kemer için mücadele eder; günün sonunda zirve belirlenir.',
  },
];

export type GlossaryItem = {
  term: string;
  short: string;
  sourceUrl?: string;
};

export const kirkpinarGlossary: GlossaryItem[] = [
  {
    term: 'Sarayiçi / Er Meydanı',
    short: 'Güreşlerin yapıldığı çayır alanı.',
    sourceUrl: 'https://ich.unesco.org/en/RL/00386',
  },
  {
    term: 'Cazgır',
    short: 'Pehlivanları manilerle tanıtan, güreşi başlatan sunucu.',
    sourceUrl:
      'https://www.kulturportali.gov.tr/turkiye/edirne/kulturatlasi/tarihi-kirkpinar-yagli-guresleri-ogeleri--cazgir',
  },
  {
    term: 'Peşrev',
    short: 'Güreş öncesi ritmik ısınma ve selamlaşma.',
    sourceUrl: 'https://tr.wikipedia.org/wiki/K%C4%B1rkp%C4%B1nar_Ya%C4%9Fl%C4%B1_G%C3%BCre%C5%9Fleri',
  },
  {
    term: 'Kıspet',
    short: 'Deri güreş giysisi.',
    sourceUrl: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
  },
  {
    term: 'Zembil',
    short: 'Kıspeti taşımak için kamıştan örülen çanta.',
    sourceUrl: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
  },
  {
    term: 'Kırmızı Dipli Mum',
    short: 'Kırkpınar’ın davet simgesi.',
    sourceUrl:
      'https://www.kulturportali.gov.tr/turkiye/edirne/kulturatlasi/tarihi-kirkpinar-yagli-guresleri-ogeleri--kirmizi-dipli-mum',
  },
  {
    term: 'Yağcı',
    short: 'Pehlivanı yağlayan görevli.',
    sourceUrl: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
  },
  {
    term: 'Bezci',
    short: 'Gözlere yağ kaçınca tülbent veren görevli.',
    sourceUrl: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
  },
];

export type MiniQuiz = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  sourceUrl: string;
};

export const miniQuizzes: MiniQuiz[] = [
  {
    id: 'quiz-kirmizi-dipli-mum',
    question: '“Kırmızı Dipli Mum” Kırkpınar’da neyi temsil eder?',
    options: ['Davet simgesi', 'Hakem işareti', 'Kispet ustası nişanı', 'Boy sistemi rozeti'],
    answerIndex: 0,
    sourceUrl:
      'https://www.kulturportali.gov.tr/turkiye/edirne/kulturatlasi/tarihi-kirkpinar-yagli-guresleri-ogeleri--kirmizi-dipli-mum',
  },
  {
    id: 'quiz-altin-kemer',
    question: 'Altın Kemer ile ilgili doğru bilgi hangisi?',
    options: [
      'Başpehlivana verilir',
      'Sadece gençler boyunda takılır',
      'Her maçtan sonra rastgele dağıtılır',
      'Sadece davulcular taşır',
    ],
    answerIndex: 0,
    sourceUrl: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
  },
];

export type TarihiKare = {
  id: string;
  title: string;
  note: string;
  image: any;
};

export const tarihiKareler: TarihiKare[] = [
  {
    id: 'tarihi-1',
    title: 'Er Meydanı • Arşiv',
    note: 'Çayır, tribünler ve ritüelin “anı”.',
    image: require('../../assets/images/tarih/tarihi-1.png'),
  },
  {
    id: 'tarihi-2',
    title: 'Başpehlivan anı',
    note: 'Kemer sevinci, meydanın hafızası.',
    image: require('../../assets/images/tarih/tarihi-2.png'),
  },
  {
    id: 'tarihi-3',
    title: 'Alay ve tören',
    note: 'Kırkpınar sadece güreş değil, bir akış.',
    image: require('../../assets/images/tarih/tarihi-3.png'),
  },
  {
    id: 'tarihi-4',
    title: 'Geniş kadraj',
    note: 'Sarayiçi’nde binlerce göz er meydanında.',
    image: require('../../assets/images/tarih/tarihi-4.png'),
  },
  {
    id: 'tarihi-5',
    title: 'Çayır ve seyir',
    note: 'Bir gün değil, nesiller boyu süren gelenek.',
    image: require('../../assets/images/tarih/tarihi-5.png'),
  },
];

export const kirkpinar2026 = {
  // Edirne Belediyesi açıklamasına göre güreş günleri 3-4-5 Temmuz 2026.
  // Countdown'u güreşlerin ilk sabahına bağladık.
  startIso: '2026-07-03T09:00:00+03:00',
  endIso: '2026-07-05T20:00:00+03:00',
  sources: [
    'https://www.edirne.bel.tr/gundem/haberdetay?haberid=7349b408-7f43-4eb4-b2d6-d79c1f41c4d6',
    'https://www.aa.com.tr/tr/spor/665-tarihi-kirkpinar-yagli-guresleri-2026da-3-5-temmuz-tarihlerinde-duzenlenecek/3638783',
  ],
} as const;

