export type Kategori = 'Başpehlivan';

export type SampiyonKaydi = {
  yil: number;
  kategori: Kategori;
  kazanan: string;
};

// Demo dataset: İçerik v2'de doğrulanmış kaynaklarla genişletilecek.
export const sampiyonlar: SampiyonKaydi[] = [
  { yil: 2025, kategori: 'Başpehlivan', kazanan: 'Orhan Okulu' },
  { yil: 2024, kategori: 'Başpehlivan', kazanan: 'Yusuf Can Zeybek' },
  { yil: 2023, kategori: 'Başpehlivan', kazanan: 'Yusuf Can Zeybek' },
  { yil: 2022, kategori: 'Başpehlivan', kazanan: 'Mustafa Taş' },
  { yil: 2021, kategori: 'Başpehlivan', kazanan: 'Ali Gürbüz' },
  { yil: 2020, kategori: 'Başpehlivan', kazanan: 'Yapılmadı (pandemi)' },
  { yil: 2019, kategori: 'Başpehlivan', kazanan: 'Ali Gürbüz' },
  { yil: 2018, kategori: 'Başpehlivan', kazanan: 'Orhan Okulu' },
  { yil: 2017, kategori: 'Başpehlivan', kazanan: 'İsmail Balaban' },
  { yil: 2016, kategori: 'Başpehlivan', kazanan: 'Recep Kara' },
  { yil: 2015, kategori: 'Başpehlivan', kazanan: 'Orhan Okulu' },
];

