import type { ImageSourcePropType } from 'react-native';

export type Pehlivan = {
  id: string;
  ad: string;
  fotograf: ImageSourcePropType;
  dogumYili?: number;
  memleket?: string;
  kisaBiyografi?: string;
  basarilar?: string[];
};

export const pehlivanlar: Pehlivan[] = [
  {
    id: 'orhan-okulu',
    ad: 'Orhan Okulu',
    fotograf: require('../../assets/images/pehlivanlar-normalized/orhan-okulu.webp'),
    dogumYili: 1989,
    memleket: 'Kumluca, Antalya',
    kisaBiyografi:
      'Yağlı güreşin son dönemdeki en istikrarlı başpehlivanlarından. Güçlü fizik, baskılı oyun ve tecrübesiyle uzun güreşlerde kontrol kurmasıyla öne çıkar.',
    basarilar: [
      'Kırkpınar Başpehlivanlığı: 2015, 2018, 2025',
      'Elmalı Yeşilyayla Başpehlivanlığı: 2013–2018 (6 kez üst üste)',
      'Türkiye Yağlı Güreş Ligi Şampiyonluğu: 2023, 2025',
    ],
  },
  {
    id: 'ali-ihsan-batmaz',
    ad: 'Ali İhsan Batmaz',
    fotograf: require('../../assets/images/pehlivanlar-normalized/ali-ihsan-batmaz.webp'),
    memleket: 'Antalya',
    kisaBiyografi:
      'Güncel başpehlivan kuşağının öne çıkan isimlerinden. Hız ve kondisyonu ile bilinir.',
    basarilar: ['Başpehlivan kategorisinde çoklu final/yarı final tecrübeleri (demo)'],
  },
  {
    id: 'bekir-eryucel',
    ad: 'Bekir Eryücel',
    fotograf: require('../../assets/images/pehlivanlar-normalized/bekir-eryucel.webp'),
    kisaBiyografi:
      'Disiplinli güreşi ve sert oyun stiliyle tanınır. Klasik el-ense oyunlarında etkilidir.',
    basarilar: ['Türkiye genelinde çeşitli er meydanları dereceleri (demo)'],
  },
  {
    id: 'cengizhan-simsek',
    ad: 'Cengizhan Şimşek',
    fotograf: require('../../assets/images/pehlivanlar-normalized/cengizhan-simsek.webp'),
    kisaBiyografi:
      'Genç kuşağın dikkat çeken isimlerinden. Atak güreş tarzı ve çevikliğiyle öne çıkar.',
    basarilar: ['Başaltı/başpehlivan geçiş kuşağında dereceler (demo)'],
  },
  {
    id: 'ertugrul-dagdeviren',
    ad: 'Ertuğrul Dağdeviren',
    fotograf: require('../../assets/images/pehlivanlar-normalized/ertugrul-dagdeviren.webp'),
    kisaBiyografi:
      'Güreşte denge ve kontrolü önceleyen, sabırlı oyunuyla bilinen bir pehlivan.',
    basarilar: ['Kırkpınar farklı yıllarda üst turlara çıkış (demo)'],
  },
  {
    id: 'fatih-atli',
    ad: 'Fatih Atlı',
    fotograf: require('../../assets/images/pehlivanlar-normalized/fatih-atli.webp'),
    kisaBiyografi:
      'Tecrübesi ve oyun çeşitliliği ile tanınır. Kısa sürede oyun kurabilen bir isim.',
    basarilar: ['Önemli turnuvalarda derece/çeyrek final (demo)'],
  },
  {
    id: 'hamza-koseoglu',
    ad: 'Hamza Köseoğlu',
    fotograf: require('../../assets/images/pehlivanlar-normalized/hamza-koseoglu.webp'),
    kisaBiyografi:
      'Fizik gücü ve dirençli yapısıyla öne çıkar. Uzun süren güreşlerde avantaj sağlar.',
    basarilar: ['Çeşitli organizasyonlarda kürsü (demo)'],
  },
  {
    id: 'ismail-koc',
    ad: 'İsmail Koç',
    fotograf: require('../../assets/images/pehlivanlar-normalized/ismail-koc.webp'),
    kisaBiyografi:
      'Teknik oyunları ve çevik hamleleriyle bilinir. Rakibin dengesini bozmayı sever.',
    basarilar: ['Er meydanlarında istikrarlı performans (demo)'],
  },
  {
    id: 'kursat-sevki-korkmaz',
    ad: 'Kürşat Şevki Korkmaz',
    fotograf: require('../../assets/images/pehlivanlar-normalized/kursat-sevki-korkmaz.webp'),
    kisaBiyografi:
      'Güç-temelli oyunlarıyla tanınır. Sıkı tutuş ve baskı kurma stratejisi öne çıkar.',
    basarilar: ['Farklı yıllarda başpehlivan boyu turları (demo)'],
  },
  {
    id: 'mehmet-yesil-yesil',
    ad: 'Mehmet Yeşil Yeşil',
    fotograf: require('../../assets/images/pehlivanlar-normalized/mehmet-yesil-yesil.webp'),
    kisaBiyografi:
      'Kırkpınar geleneğinde adı sık anılan isimlerden. Tecrübe ve oyun bilgisiyle öne çıkar.',
    basarilar: ['Kırkpınar’da üst düzey başarılar (demo)'],
  },
  {
    id: 'mustafa-batu',
    ad: 'Mustafa Batu',
    fotograf: require('../../assets/images/pehlivanlar-normalized/mustafa-batu.webp'),
    kisaBiyografi:
      'Atak başlatmayı seven, kısa mesafede patlayıcı güç kullanabilen bir pehlivan.',
    basarilar: ['Bölgesel turnuvalarda dereceler (demo)'],
  },
  {
    id: 'nedim-gurel',
    ad: 'Nedim Gürel',
    fotograf: require('../../assets/images/pehlivanlar-normalized/nedim-gurel.webp'),
    kisaBiyografi:
      'Dengeli güreşiyle tanınır. Rakibin hatasını kollayarak oyun kurar.',
    basarilar: ['Çeşitli organizasyonlarda turlar (demo)'],
  },
  {
    id: 'osman-kan',
    ad: 'Osman Kan',
    fotograf: require('../../assets/images/pehlivanlar-normalized/osman-kan.webp'),
    kisaBiyografi:
      'Kararlı ve sert oyun stiliyle bilinir. Mücadeleden düşmeyen bir karakter.',
    basarilar: ['Er meydanlarında istikrarlı turlar (demo)'],
  },
  {
    id: 'ozkan-yilmaz',
    ad: 'Özkan Yılmaz',
    fotograf: require('../../assets/images/pehlivanlar-normalized/ozkan-yilmaz.webp'),
    kisaBiyografi:
      'Çevikliği ve teknik varyasyonlarıyla öne çıkar. Hızlı geçiş oyunlarını sever.',
    basarilar: ['Kürsü potansiyeliyle dikkat çeken sonuçlar (demo)'],
  },
  {
    id: 'recep-kara',
    ad: 'Recep Kara',
    fotograf: require('../../assets/images/pehlivanlar-normalized/recep-kara.webp'),
    kisaBiyografi:
      'Kırkpınar başpehlivanları arasında yer alan tecrübeli bir isim. Güç ve kontrolüyle bilinir.',
    basarilar: ['Kırkpınar Başpehlivanlığı (demo)'],
  },
  {
    id: 'riza-yildirim',
    ad: 'Rıza Yıldırım',
    fotograf: require('../../assets/images/pehlivanlar-normalized/riza-yildirim.webp'),
    kisaBiyografi:
      'Yüksek tempo ve kondisyonuyla öne çıkar. Uzun güreşlerde avantaj sağlar.',
    basarilar: ['Farklı yıllarda önemli dereceler (demo)'],
  },
  {
    id: 'seckin-duman',
    ad: 'Seçkin Duman',
    fotograf: require('../../assets/images/pehlivanlar-normalized/seckin-duman.webp'),
    kisaBiyografi:
      'Sakin oyun kurar, doğru anı bekler. Teknik hamleleriyle sonuç alır.',
    basarilar: ['Çeşitli organizasyonlarda dereceler (demo)'],
  },
  {
    id: 'suleyman-aykiri',
    ad: 'Süleyman Aykırı',
    fotograf: require('../../assets/images/pehlivanlar-normalized/suleyman-aykiri.webp'),
    kisaBiyografi:
      'Güçlü tutuş ve baskı kuran oyun tarzı. Rakibi yormayı hedefler.',
    basarilar: ['Er meydanlarında istikrarlı yükseliş (demo)'],
  },
  {
    id: 'tanju-gemici',
    ad: 'Tanju Gemici',
    fotograf: require('../../assets/images/pehlivanlar-normalized/tanju-gemici.webp'),
    kisaBiyografi:
      'Çevik oyunlarıyla öne çıkar. Açık alan hamlelerinde etkili.',
    basarilar: ['Bölgesel kürsüler (demo)'],
  },
  {
    id: 'yalcin-uncul',
    ad: 'Yalçın Üncül',
    fotograf: require('../../assets/images/pehlivanlar-normalized/yalcin-uncul.webp'),
    kisaBiyografi:
      'Denge ve kontrol odaklı. Rakibin açığını yakalayıp hızlı bitiriş arar.',
    basarilar: ['Önemli turnuvalarda turlar (demo)'],
  },
  {
    id: 'yunus-emre-yaman',
    ad: 'Yunus Emre Yaman',
    fotograf: require('../../assets/images/pehlivanlar-normalized/yunus-emre-yaman.webp'),
    kisaBiyografi:
      'Genç ve dinamik oyun stili. Tempo yükseltmeyi seven bir pehlivan.',
    basarilar: ['Yükselen performans (demo)'],
  },
];

