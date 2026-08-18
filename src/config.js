// ============================================================
//  KONFIGURASI PERNIKAHAN — Sul & Emi (Versi Pengantin Lelaki)
//  Edit semua data di bawah sesuai pernikahan kamu
// ============================================================

export const WEDDING = {
  mempelai1: "pempeng",
  mempelai2: "ulfa",

  namasingkat1: "pempeng",
  namasingkat2: "uppa",

  gelar1: "",
  gelar2: "S.Pd., Gr",

  ayah1: "Bapak Baharuddin",
  ibu1:  "Ibu Halipa",

  ayah2: "Bapak Saparuddin",
  ibu2:  "Ibu Nursiah",

  // Akad: Senin 08 Juni (di lokasi mempelai wanita)
  tanggal: "2026-09-18",

  akad: {
    tanggal: "Senin, 18 September 2026",
    waktu:   "10:00 WITA – selesai",
  },

  // Resepsi: Selasa 09 Juni (di lokasi mempelai lelaki)
  resepsi: {
    tanggal: "Selasa, 19 September 2026",
    waktu:   "10:00 WITA – selesai (Acara Siang)",
  },

  // Lokasi resepsi pengantin lelaki
  venue:  "Borong Leko, Dusun Sabbelawang",
  alamat: "Desa Rappolemba, Kec. Tompobulu, Kab. Gowa, Sulawesi Selatan",

  mapsUrl: "https://maps.google.com/?q=Rappolemba+Tompobulu+Gowa+Sulawesi+Selatan",

  batasRsvp: "18 September 2026",

  namaUndangan: "Bapak/Ibu/Saudara(i)",
};

// ============================================================
//  DATA MEMPELAI
//  Urutan: mempelai lelaki (Sul) di [0], wanita (Emi) di [1]
// ============================================================

export const MEMPELAI = [
  {
    nama:        "Sulfana",
    namasingkat: "Sul",
    gelar:       "The Groom",
    ayah:        "Bapak Baharuddin",
    ibu:         "Ibu Halipa",
    urutan:      "Putra Pertama",
    foto:        "/photos/mempelai2.jpeg",
    instagram:   "@sulfana",
    igUrl:       "https://www.instagram.com/sulfana_____?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    nama:        "Nuraeni, S.Pd., Gr",
    namasingkat: "Emi",
    gelar:       "The Bride",
    ayah:        "Bapak Saparuddin",
    ibu:         "Ibu Nursiah",
    urutan:      "Putri Kedua",
    foto:        "/photos/mempelai1.jpeg",
    instagram:   "@nuraeni",
    igUrl:       "https://www.instagram.com/nuraeni_1007?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

// ============================================================
//  YANG MENGUNDANG
// ============================================================

export const PENGUNDANG = {
  utama: "Baharuddin & Halipa",
  turut: [{ nama: "Dr. Azis Masang, S.Ag., M.Si.", keterangan: "Dg. Naba & Ny." },
    { nama: "Hartono Hamzah, S.Pd., Gr", keterangan: "& Ny." },
    { nama: "Muhammad Nur, S.H", keterangan: "" },
    { nama: "Muh. Saleh", keterangan: "& Ny." },
    { nama: "Mansur Masang Dg. Naro", keterangan: "& Ny." },
    { nama: "Amri, S.H.I., S.Pd.I", keterangan: "& Ny." },
    { nama: "Ismail Hamzah", keterangan: "& Ny." },
    { nama: "Kedua Mempelai", keterangan: "" },
  ],
};

// ============================================================
//  REKENING BANK (AMPLOP DIGITAL)
// ============================================================

export const BANKS = [
  {
    bank:  "BCA",
    norek: "7970592100",
    atas:  "SULFANA",
  },
    {
    bank:  "DANA",
    norek: "081340727775",
    atas:  "SULFANA",
  },
];

// ============================================================
//  KISAH CINTA
// ============================================================

export const LOVE_STORY = [
  {
    tahun:  "Awal Pertemuan",
    judul:  "Takdir yang Indah",
    cerita: "Dua hati yang berbeda jalan, dipertemukan oleh Yang Maha Kuasa dalam waktu yang tepat.",
    icon:   "✨",
  },
  {
    tahun:  "Mengenal Lebih Dekat",
    judul:  "Tumbuh Bersama",
    cerita: "Seiring waktu, kedekatan kami semakin terasa. Setiap percakapan membawa kami lebih memahami satu sama lain.",
    icon:   "💌",
  },
  {
    tahun:  "Lamaran",
    judul:  "Satu Langkah Lebih Dekat",
    cerita: "Di hadapan keluarga, dengan penuh kesungguhan dan ketulusan, ia hadir melamar dengan cara yang paling bermartabat.",
    icon:   "💍",
  },
  {
    tahun:  "08 Juni 2026",
    judul:  "Ikatan Abadi",
    cerita: "Insya Allah, di hari yang penuh berkah ini, kami akan mengikat janji suci di hadapan Allah dan para saksi.",
    icon:   "🕊️",
  },
];

// ============================================================
//  FOTO GALERI
// ============================================================

export const PHOTOS = [
  "/photos/galeri1.jpeg",
  "/photos/galeri2.jpeg",
  "/photos/galeri3.jpeg",
  "/photos/galeri4.jpeg",
  "/photos/galeri5.jpeg",
  "/photos/galeri6.jpeg",
];

export const PHOTO_PLACEHOLDERS = ["📸", "🌸", "💍", "🌿", "🕊️", "🌹"];

// ============================================================
//  GOOGLE FORMS RSVP
// ============================================================

export const GOOGLE_FORM = {
  actionUrl: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdIDK66BVP5aLEfVl4eGs50KpCiaGCwmCLHx2u8LIKJeCo7rg/formResponse",
  fields: {
    nama:       "entry.34614750",
    telepon:    "entry.483468591",
    kehadiran:  "entry.1978178535",
    jumlahTamu: "entry.2127729527",
    pesan:      "entry.1661952454",
  },
  enabled: true,
};

// BUKU TAMU
export const GUESTBOOK_URL = "https://script.google.com/macros/s/AKfycbz-fIm1sRUMzjmsnvzCeaqOWOt_hdTsWI9Faezav2DWnMPt1Pv9vVBFcTmhwwi3ArIfXw/exec";

// ============================================================
//  MUSIK BACKGROUND
// ============================================================

export const MUSIC = {
  src:     "/music/background.mp3",
  enabled: true,
};