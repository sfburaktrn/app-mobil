export type RehberBolum = {
  slug: string;
  baslik: string;
  ozet: string;
  maddeler: string[];
  kaynaklar: { ad: string; url: string }[];
};

export const rehberBolumleri: RehberBolum[] = [
  {
    slug: 'kirkpinar-nedir',
    baslik: 'Kırkpınar nedir?',
    ozet:
      'Edirne’de düzenlenen Tarihi Kırkpınar Yağlı Güreşleri, yüzlerce yıllık geleneğiyle bir spor etkinliğinden fazlası: ritüel, müzik, zanaat ve toplumsal hafıza.',
    maddeler: [
      'Her yıl Edirne’de “Er Meydanı”nda yapılır; başpehlivan Altın Kemer için güreşir.',
      'Cazgırın manileri, davul-zurna repertuvarı ve peşrev, festivalin ayrılmaz parçalarıdır.',
      'UNESCO Somut Olmayan Kültürel Miras listesinde yer alır.',
      'Festival; açılış törenleri, alaylar, dualar ve er meydanı akışıyla bir “ritüeller bütünü”dür.',
      'Kırkpınar Ağası, geleneğin taşıyıcı figürlerinden biridir; organizasyonun simgesel yüzüdür.',
      'Güreşler Sarayiçi’nde yapılır; çayır düzeni, protokol ve seyir kültürüyle “meydan” kimliği taşır.',
      'Kırkpınar sadece baş boyu değil; farklı boy kategorilerinde yüzlerce pehlivanın mücadelesini içerir.',
    ],
    kaynaklar: [
      {
        ad: 'UNESCO ICH – Kırkpınar oil wrestling festival',
        url: 'https://ich.unesco.org/en/RL/krkpnar-oil-wrestling-festival-00386',
      },
      {
        ad: 'Vikipedi – Kırkpınar Yağlı Güreşleri',
        url: 'https://tr.wikipedia.org/wiki/K%C4%B1rkp%C4%B1nar_Ya%C4%9Fl%C4%B1_G%C3%BCre%C5%9Fleri',
      },
    ],
  },
  {
    slug: 'pesrev-ve-davul-zurna',
    baslik: 'Peşrev, davul-zurna ve cazgır',
    ozet:
      'Güreş başlamadan önce pehlivanın peşrevi, cazgırın salavatı ve davul-zurnanın ritmi; er meydanına “an”ı ve saygıyı taşır.',
    maddeler: [
      'Peşrev, ısınma ve selamlaşma ritüelidir; seyirciyi ve pehlivanı güreşe hazırlar.',
      'Cazgır, pehlivanları manilerle tanıtır; geleneğin sözlü hafızasını taşır.',
      'Davul-zurna ezgileri güreş temposuna göre değişir.',
      'Cazgırın “salavat”/dualama kısmı, güreşi bir spor karşılaşmasının ötesine taşır: niyet, saygı ve gelenek.',
      'Peşrevde jestler; rakibe, seyirciye ve er meydanına saygıyı sembolize eder.',
      'Davul-zurna, ritimle “tempo” kurar: seyircinin heyecanı ve pehlivanın hazırlığı birlikte akar.',
      'Bu üçlü (peşrev–cazgır–davul) Kırkpınar’ın “ses ve hareket imzası”dır.',
    ],
    kaynaklar: [
      {
        ad: 'Vikipedi – Peşrev / Altın kemer bölümleri',
        url: 'https://tr.wikipedia.org/wiki/K%C4%B1rkp%C4%B1nar_Ya%C4%9Fl%C4%B1_G%C3%BCre%C5%9Fleri',
      },
      {
        ad: 'UNESCO ICH – festival akışı',
        url: 'https://ich.unesco.org/en/RL/krkpnar-oil-wrestling-festival-00386',
      },
    ],
  },
  {
    slug: 'kispet-yaglanma-zembil',
    baslik: 'Kıspet, yağlanma ve zembil',
    ozet:
      'Yağlı güreşin simgesi kıspet, zeytinyağıyla yapılan yağlanma ve pehlivanın eşyasını taşıdığı zembil; geleneğin zanaat ve pratik tarafını temsil eder.',
    maddeler: [
      'Kıspet; manda/sığır derisinden yapılan, belden diz altına uzanan dar paçalı güreş giysisidir.',
      'Yağlanma; kavramayı zorlaştıran savunma amaçlı bir uygulamadır.',
      'Zembil; kıspet ve malzemelerin taşındığı geleneksel sepet/çantadır.',
      'Kıspet ustalığı bir zanaattır: kesim, dikiş ve kalıp; pehlivanın hareketini doğrudan etkiler.',
      'Yağ, oyunu “temas” üzerinden zorlaştırır; denge, sabır ve doğru hamle zamanlaması öne çıkar.',
      'Yağcı; pehlivanı yağlar, bezci tülbentle göze kaçan yağı silmeye yardımcı olur (meydanın görünmez kahramanları).',
      'Zembil, pehlivanın sadece eşyasını değil; “meydana çıkma” hazırlığını da taşır.',
    ],
    kaynaklar: [
      {
        ad: 'Yağlı Güreş Birliği – Yağlı güreş unsurları',
        url: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
      },
      {
        ad: 'Vikipedi – Kırkpınar Yağlı Güreşleri',
        url: 'https://tr.wikipedia.org/wiki/K%C4%B1rkp%C4%B1nar_Ya%C4%9Fl%C4%B1_G%C3%BCre%C5%9Fleri',
      },
    ],
  },
  {
    slug: 'altin-kemer',
    baslik: 'Altın Kemer',
    ozet:
      'Kırkpınar’ın en büyük ödülü. Başpehlivan, kemeri bir yıl taşır; art arda üç kez kazanan ebedi sahibi olur.',
    maddeler: [
      'Altın Kemer, Kırkpınar başpehlivanına verilen en büyük ödüldür.',
      'Üç yıl üst üste başpehlivan olan güreşçi kemerin daimi sahibi olur.',
      'Kemer geleneği, modern dönemde belediye tarafından hazırlanıp uygulanır.',
      'Altın kemer, bir “sezon kupası” gibi değil; geleneğin devamlılığını temsil eden bir onur simgesidir.',
      'Başpehlivan kemeri bir yıl taşır; sonraki yıl kemer yeniden er meydanında “aranır”.',
      'Kemerin etrafındaki törenler, Kırkpınar’ın ritüel akışının en güçlü anlarındandır.',
      'Kemer, hafızada isim bırakır: başpehlivanın adı “yıl” ile birlikte anılır.',
    ],
    kaynaklar: [
      {
        ad: 'Yağlı Güreş Birliği – Altın Kemer',
        url: 'https://www.yagliguresbirligi.gov.tr/sayfa/yagli-gures-unsurlari.html',
      },
      {
        ad: 'Vikipedi – Altın kemer',
        url: 'https://tr.wikipedia.org/wiki/K%C4%B1rkp%C4%B1nar_Ya%C4%9Fl%C4%B1_G%C3%BCre%C5%9Fleri',
      },
    ],
  },
];

