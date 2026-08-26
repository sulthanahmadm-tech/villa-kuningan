'use client';

import { useState, useEffect, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import Image from 'next/image';

// Komponen UI Shadcn
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Ikon Lucide
import {
  ChevronLeft, ChevronRight, Star, MapPin, Phone, Users, Mountain,
  TreePine, Waves, Clock, Check, Leaf, Menu, X, Navigation, Coffee, Camera,
  Heart, Wifi, Car, UtensilsCrossed, MessageCircle, AlertTriangle,
  Trash2, Flame, Mic, Tent, Building, CheckCircle, Send, ShieldCheck, BedDouble
} from 'lucide-react';

/* ===========================
IMAGE URLS & MOCK DATA
=========================== */
const IMAGES = {
  // Menggunakan placeholder dari Unsplash untuk suasana gathering
  hero: '/images/hero-kampung-gunung.jpeg',
  activities: {
    apiUnggun: '/images/api unggun.jpeg',
    karaoke: '/images/karoke villa.jpeg',
    games: '/images/games villa.jpeg',
    makan: '/images/makan villa.jpg'
  }
};

const PAKET_EXPERIENCE = [
  {
    id: 1,
    name: 'Paket Gathering Kantor',
    subtitle: '1 Hari 1 Malam',
    priceText: 'Mulai dari Rp 7 Juta (50 Orang)',
    capacity: '50-120 Orang',
    description: 'Fasilitas komprehensif untuk employee gathering, rapat tahunan, atau selebrasi pencapaian perusahaan dengan nuansa alam yang menyegarkan.',
    features: ['Seluruh Area Villa', 'Meeting Hall', 'Sound System', 'Api Unggun', 'Opsional Catering'],
    image: '/images/paket corporate.jpeg'
  },
  {
    id: 2,
    name: 'Paket Character Building',
    subtitle: 'Program Intensif & Menyenangkan',
    priceText: 'Custom sesuai kebutuhan',
    capacity: '50-100 Orang',
    description: 'Dilengkapi dengan fasilitator profesional, outbound, dan simulasi tim untuk meningkatkan kohesivitas dan komunikasi antar anggota.',
    features: ['Fasilitator Profesional', 'Peralatan Outbound', 'Games Station', 'Ice Breaking', 'Sertifikat Opsional'],
    image: '/images/paket character.jpeg',
    highlight: true
  },
  {
    id: 3,
    name: 'Paket Reuni / Komunitas',
    subtitle: 'Temu Kangen Bebas Lepas',
    priceText: 'Mulai dari Rp 12 Juta (100 Orang)',
    capacity: 'Hingga 120 Orang',
    description: 'Sangat cocok untuk reuni akbar atau acara komunitas dengan area berkumpul yang sangat luas dan fleksibel.',
    features: ['Free Area Berkumpul', 'Set Barbeque (BBQ)', 'Panggung Mini', 'Parkir Kapasitas Besar', 'Bebas Bising'],
    image: '/images/paket komunitas.jpeg'
  }
];

const WISATA = [
  {
    name: 'Curug Putri Palutungan',
    description: 'Nikmati kemudahan akses QR-code digital ticketing yang terintegrasi. Rasakan kesejukan air terjun alami yang dilengkapi fasilitas smart-locker IoT untuk keamanan barang bawaan Anda.',
    distance: '10 menit dari villa',
    images: [
      '/images/curug-putri.jpg'
    ],
    icon: Waves,
    gmapsUrl: 'https://maps.app.goo.gl/oUsHAzSFd1WqJL4H9'
  },
  {
    name: 'Gedung Perundingan Linggarjati',
    description: 'Wisata sejarah imersif. Pindai ruangan dengan smartphone Anda untuk menikmati fitur Augmented Reality (AR) yang menghidupkan kembali momen krusial kemerdekaan RI.',
    distance: '20 menit dari villa',
    images: [
      '/images/linggarjati.jpg'
    ],
    icon: Mountain,
    gmapsUrl: 'https://maps.app.goo.gl/iFKJp519TToUAFQDA'
  },
  {
    name: 'Waduk Darma',
    description: 'Kawasan eco-tourism modern dengan bentangan air yang luas. Kami menyediakan layanan smart-booking untuk area piknik eksklusif keluarga Anda di tepi waduk.',
    distance: '25 menit dari villa',
    images: [
      '/images/waduk-darma.jpg'
    ],
    icon: TreePine,
    gmapsUrl: 'https://maps.app.goo.gl/HUjD73W2hecnVKDeA'
  }
];

const REVIEWS = [
  { name: 'Budi Santoso', avatar: 'BS', rating: 5, comment: 'Sangat cocok untuk corporate gathering! Area luas, tim jadi solid. Fasilitas lengkap dan makanannya enak banget. Pasti kembali lagi kesini!', date: 'Mei 2025' },
  { name: 'Siti Rahayu', avatar: 'SR', rating: 5, comment: 'Pengalaman reuni yang luar biasa! Kapasitas 100 orang tertampung dengan baik tanpa terasa sesak. Udaranya segar dan sangat tenang. Highly recommended!', date: 'April 2025' },
];

const TARGET_MARKET = [
  {
    id: 'corporate',
    title: 'Corporate Gathering',
    description: 'Tingkatkan produktivitas tim melalui capacity building di tengah harmoni alam hijau yang menyegarkan pikiran.',
    images: [
      '/images/kenangan/corporate/corporate 1.jpeg',
      '/images/kenangan/corporate/corporate 2.jpeg',
      '/images/kenangan/corporate/corporate 3.jpeg',
      '/images/kenangan/corporate/corporate 4.jpeg',
      '/images/kenangan/corporate/corporate 5.jpeg',
      '/images/kenangan/corporate/corporate 6.jpeg',
      '/images/kenangan/corporate/corporate 7.jpeg',
      '/images/kenangan/corporate/corporate 8.jpeg',
      '/images/kenangan/corporate/corporate 9.jpeg',
    ]
  },
  {
    id: 'community',
    title: 'Community Gathering',
    description: 'Sesi berbagi yang cair dan penuh inspirasi di pendopo joglo yang harmonis, cocok untuk reuni akbar.',
    images: [
      '/images/kenangan/comunity/komunitas 1.jpeg',
      '/images/kenangan/comunity/komunitas 2.jpeg',
      '/images/kenangan/comunity/komunitas 3.jpeg',
    ]
  },
  {
    id: 'Family',
    title: 'Family Gathering',
    description: 'Tempat meluapkan kantung rindu di lingkungan joglo yang harmonis dengan keasrian hutan pinus dan suasana yang hangat kekeluargaan.',
    images: [
      '/images/kenangan/Family/family 1.jpeg',
      '/images/kenangan/Family/family 2.jpeg',
      '/images/kenangan/Family/family 3.jpeg',
      '/images/kenangan/Family/family 4.jpeg',
      '/images/kenangan/Family/family 5.jpeg',
      '/images/kenangan/Family/family 6.jpeg',
      '/images/kenangan/Family/family 7.jpeg',
      '/images/kenangan/Family/family 8.jpeg',
      '/images/kenangan/Family/family 9.jpeg',
      '/images/kenangan/Family/family 10.jpeg',
    ]
  },
  {
    id: 'private',
    title: 'Private Retreat / Personal',
    description: 'Kami tetap melayani pemesanan kamar private untuk keluarga kecil atau Anda yang membutuhkan solo traveling untuk healing sejenak.',
    images: [
      '/images/kenangan/private/kamar 1.jpeg',
      '/images/kenangan/private/kamar 2.jpeg',
      '/images/kenangan/private/kamar 3.jpeg',
      '/images/kenangan/private/kamar 4.jpeg',
      '/images/kenangan/private/kamar 5.jpeg',
      '/images/kenangan/private/taman.jpeg',
      '/images/kenangan/private/villa belakang.jpeg',
      '/images/kenangan/private/villa taman samping.jpeg',
    ]
  },
  {
    id: 'intimate-wedding',
    title: 'Intimate Wedding',
    description: 'Wujudkan pernikahan impian dengan konsep intimate yang syahdu dan tak terlupakan di tengah suasana alam nan romantis.',
    images: [
      '/images/kenangan/wedding/wedding 1.jpeg',
      '/images/kenangan/wedding/wedding 2.jpeg',
      '/images/kenangan/wedding/wedding 3.jpeg',
      '/images/kenangan/wedding/wedding 4.jpeg',
    ]
  },
  {
    id: 'pesantren-kilat',
    title: 'Pesantren Kilat (Sanlat)',
    description: 'Fasilitas luas yang asri dan tenang, sangat mendukung kegiatan rohani, ibadah, serta pembelajaran secara fokus dan kondusif.',
    images: [
      '/images/kenangan/pesantren kilat/sanlat 1.jpg',
      '/images/kenangan/pesantren kilat/sanlat 2.jpg',
      '/images/kenangan/pesantren kilat/sanlat 3.jpg',
      '/images/kenangan/pesantren kilat/sanlat 4.jpeg',
      '/images/kenangan/pesantren kilat/sanlat 5.jpeg',
      '/images/kenangan/pesantren kilat/sanlat 6.jpeg',
    ]
  }
];

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

export default function Home() {
  // Booking Form State
  const [formInstansi, setFormInstansi] = useState('');
  const [formPeserta, setFormPeserta] = useState('50-100');
  const [formKebutuhan, setFormKebutuhan] = useState({
    Catering: false,
    Outbound: false,
    SoundSystem: false
  });


  // UI layout state
  const [carouselIndexes, setCarouselIndexes] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState(0);
  const [activeSubSlide, setActiveSubSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Interactive Target Carousel States
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-play Sub-Carousel
  useEffect(() => {
    if (isCarouselHovered) return;
    setTimeout(() => setProgress(0), 0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSubSlide((t) => (t + 1) % TARGET_MARKET[activeTarget].images.length);
          return 0;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isCarouselHovered, activeSubSlide, activeTarget]);

  useEffect(() => {
    setTimeout(() => {
      setActiveSubSlide(0);
      setProgress(0);
    }, 0);
  }, [activeTarget]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const totalImgs = TARGET_MARKET[activeTarget].images.length;
    if (diff > 50) {
      setActiveSubSlide((prev) => (prev + 1) % totalImgs);
    } else if (diff < -50) {
      setActiveSubSlide((prev) => (prev - 1 + totalImgs) % totalImgs);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  /* ------ Carousel Logic ------ */
  const nextSlide = (key, total, e) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) + 1) % total }));
  };

  const prevSlide = (key, total, e) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) - 1 + total) % total }));
  };

  /* ------ Handlers ------ */
  const toggleKebutuhan = (name) => {
    setFormKebutuhan(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSendProposal = () => {
    if (!formInstansi.trim()) {
      toast.error('Silakan isi Nama Instansi / Perusahaan / Komunitas');
      return;
    }
    const needs = Object.keys(formKebutuhan).filter(k => formKebutuhan[k]).join(', ');
    const msg = `Halo Admin Villa Kampung Gunung! Kami tertarik untuk merencanakan acara gathering di venue Anda. Berikut detail estimasi kami:
- Instansi/Komunitas: ${formInstansi}
- Estimasi Peserta: ${formPeserta} Orang
- Kebutuhan Tambahan: ${needs || 'Tidak ada'}
    
Mohon informasi mengenai ketersediaan dan proposal harga. Terima kasih!`;

    window.open(`https://wa.me/628112333838?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleTargetWA = (targetId) => {
    let message = '';
    if (targetId === 'private') {
      message = 'Halo Admin, saya tertarik untuk merencanakan Private Retreat (Sewa Kamar) di Villa Kampung Gunung. Boleh info lebih detail mengenai ketersediaan kamar?';
    } else if (targetId === 'community') {
      message = 'Halo Admin, saya mewakili komunitas dan ingin konsultasi mengenai penyelenggaraan Community Gathering di pendopo joglo Villa Kampung Gunung. Bisa bantu detailnya?';
    } else if (targetId === 'corporate') {
      message = 'Halo Admin, saya butuh bantuan untuk konsultasi Corporate Gathering (Event/Capacity Building) dari perusahaan saya di Villa Kampung Gunung. Mohon informasi fasilitas dan harganya.';
    } else if (targetId === 'intimate-wedding') {
      message = 'Halo Admin, saya ingin konsultasi mengenai paket Intimate Wedding di Villa Kampung Gunung. Boleh minta informasi detail paket dan harganya?';
    } else if (targetId === 'pesantren-kilat') {
      message = 'Halo Admin, saya ingin mengadakan kegiatan Pesantren Kilat (Sanlat) di Villa Kampung Gunung. Boleh info detail kapasitas, fasilitas, dan biayanya?';
    }
    window.open(`https://wa.me/628112333838?text=${encodeURIComponent(message)}`, '_blank');
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
    ));
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Villa Kampung Gunung",
    "description": "Villa khusus gathering dan kebersamaan di alam Kuningan. Kapasitas besar hingga 120 orang.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Perumahan Cipari, Cigugur",
      "addressLocality": "Kuningan",
      "addressRegion": "Jawa Barat",
      "postalCode": "45518",
      "addressCountry": "ID"
    },
    "telephone": "+62 811-2333-838",
    "priceRange": "$$$",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Paket Gathering",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Paket 50 Orang",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "7000000",
            "maxPrice": "10000000",
            "priceCurrency": "IDR"
          }
        },
        {
          "@type": "Offer",
          "name": "Paket 100 Orang",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "12000000",
            "maxPrice": "18000000",
            "priceCurrency": "IDR"
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen bg-[#F9F9F7]">
        <Toaster richColors position="top-center" />

        {/* ========== NAVBAR FIXED ========== */}
        <header className="fixed top-0 w-full z-50 bg-[#163a28]/95 backdrop-blur-xl border-b border-white/20 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <a href="#hero" className="flex items-center gap-2">
              <Image src="/images/logo-vkg.png" alt="Villa Kampung Gunung Logo" width={36} height={36} className="h-8 w-8 object-contain drop-shadow-md" />
              <span className="text-white font-serif font-bold text-xl tracking-tight">Villa Kampung Gunung</span>
            </a>
            <div className="hidden md:flex items-center gap-8">
              <a href="#hero" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Beranda</a>
              <a href="#activities" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Aktivitas</a>
              <a href="#packages" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Paket Experience</a>
              <a href="#wisata" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Wisata</a>
              <a href="https://wa.me/628112333838" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-transform shadow-md">
                <MessageCircle className="h-4 w-4" /> Konsultasi Gathering
              </a>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-1"
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </nav>

          {/* Mobile Navigation Drawer */}
          <div id="mobile-menu" className={`md:hidden absolute top-20 left-0 w-full bg-[#163a28]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-6 opacity-100 shadow-2xl' : 'max-h-0 py-0 opacity-0'}`}>
            <div className="flex flex-col items-center gap-6">
              <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Beranda</a>
              <a href="#activities" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Aktivitas</a>
              <a href="#packages" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Paket</a>
              <a href="#wisata" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Wisata</a>
            </div>
          </div>
        </header>

        {/* ========== HERO CORE SECTION (B2B) ========== */}
        <section id="hero" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-20">
          <Image src={IMAGES.hero} alt="Pemandangan luas fasilitas gathering berkapasitas besar di Villa Kampung Gunung dengan nuansa alam pegunungan yang asri" fill priority sizes="100vw" className="object-cover scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2818]/90 via-[#0d2818]/70 to-transparent" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

            <div className="text-left text-white">


              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 drop-shadow-2xl leading-tight">
                Villa Khusus Gathering & Kebersamaan <br className="hidden md:block" /> <span className="text-[#98D8A0]">di Alam Kuningan</span>
              </h1>

              <p className="text-base md:text-lg text-white/90 mb-6 max-w-lg drop-shadow-md font-medium leading-relaxed">
                Tempat Ngumpul Seru Dengan Kapasitas Besar (Hingga 120 Orang). Nikmati momen tak terlupakan dengan fasilitas lengkap di tengah hutan tropis Kuningan.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                  <Users className="h-5 w-5 text-yellow-400" />
                  <span className="text-white text-sm font-medium">Kapasitas S.d 120 Orang</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-xl px-4 py-2 border border-white/10">
                  <Mountain className="h-5 w-5 text-green-400" />
                  <span className="text-white text-sm font-medium">Alam Pegunungan Asri</span>
                </div>
              </div>
            </div>

            {/* EVENT INQUIRY FORM (LEAD GENERATION) */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xl border-t-4 border-[#163a28]">
              <h2 className="text-xl font-serif font-bold text-[#163a28] mb-1">Rencanakan Event Anda</h2>
              <p className="text-gray-500 text-xs mb-4">Dapatkan proposal penawaran harga dan ketersediaan jadwal terbaik dari tim kami.</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="instansi" className="text-[10px] font-extrabold text-[#163a28] uppercase tracking-wider mb-1 block">Nama Instansi / Perusahaan / Komunitas</label>
                  <Input
                    id="instansi"
                    placeholder="Misal: PT Teknologi Maju"
                    className="h-10 rounded-lg border-gray-300 focus-visible:ring-[#163a28] text-sm"
                    value={formInstansi}
                    onChange={(e) => setFormInstansi(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="peserta" className="text-[10px] font-extrabold text-[#163a28] uppercase tracking-wider mb-1 block">Estimasi Jumlah Peserta</label>
                  <div className="relative border border-gray-300 rounded-lg bg-white focus-within:border-[#163a28]">
                    <select
                      id="peserta"
                      className="w-full h-10 px-3 bg-transparent text-sm font-medium text-gray-700 outline-none appearance-none cursor-pointer"
                      value={formPeserta}
                      onChange={(e) => setFormPeserta(e.target.value)}
                    >
                      <option value="20-50">20 - 50 Orang</option>
                      <option value="50-100">50 - 100 Orang</option>
                      <option value="100+">Lebih dari 100 Orang</option>
                    </select>
                    <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-[#163a28] uppercase tracking-wider mb-2 block">Kebutuhan Tambahan (Opsional)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Catering', 'Outbound', 'SoundSystem'].map((need) => (
                      <label key={need} htmlFor={`kebutuhan-${need}`} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formKebutuhan[need] ? 'bg-[#163a28] border-[#163a28]' : 'border-gray-300 group-hover:border-[#163a28]'}`}>
                          {formKebutuhan[need] && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-xs font-medium text-gray-600">{need === 'SoundSystem' ? 'Sound System' : need}</span>
                        {/* Visually hidden checkbox for accessibility/logic */}
                        <input type="checkbox" id={`kebutuhan-${need}`} className="sr-only" checked={formKebutuhan[need]} onChange={() => toggleKebutuhan(need)} />
                      </label>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSendProposal} className="w-full bg-[#163a28] hover:bg-[#0d2618] text-white h-10 rounded-lg text-sm font-bold tracking-wide shadow-md transition-transform active:scale-95 mt-2 group">
                  <Send className="h-3 w-3 mr-2 group-hover:animate-pulse" /> Kirim Proposal
                </Button>
              </div>
            </div>

          </div>
        </section>

        {/* ========== USP BANNER ========== */}
        <section className="hidden md:block bg-[#163a28] py-8 border-y-4 border-[#98D8A0]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-around items-center gap-6 text-center">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-[#98D8A0]" />
                <h2 className="text-white font-serif text-xl md:text-2xl font-bold">&quot;Tempat gathering 100 orang tapi serasa private!&quot;</h2>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/20"></div>
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-[#98D8A0]" />
                <h2 className="text-white font-serif text-xl md:text-2xl font-bold">&quot;Hidden place buat reuni &amp; komunitas di Kuningan&quot;</h2>
              </div>
            </div>
          </div>
        </section>

        {/* ========== HIGHLIGHT ACTIVITIES (BENTO GRID) ========== */}
        <section id="activities" className="py-12 lg:py-20 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#163a28] mb-3 lg:mb-4">Aktivitas & Kebersamaan</h2>
              <p className="text-gray-500 max-w-2xl mx-auto text-base lg:text-lg">Bangun keakraban tim Anda melalui berbagai aktivitas seru di venue kami yang luas.</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-4 md:grid-rows-2 md:overflow-visible gap-4 h-[400px] md:h-[600px] pb-4 md:pb-0">
              {/* Api Unggun (Besar) */}
              <div className="w-[85vw] flex-shrink-0 snap-center md:w-auto md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group shadow-lg">
                <Image src={IMAGES.activities.apiUnggun} alt="Suasana hangat malam api unggun di area terbuka Villa Kampung Gunung" fill sizes="(max-width: 768px) 85vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-orange-500 w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <Flame className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-2xl mb-2">Malam Api Unggun</h3>
                  <p className="text-gray-200 text-sm">Momen hangat berbagi cerita di bawah langit malam Kuningan dengan hangatnya api unggun.</p>
                </div>
              </div>

              {/* Games & Team Building */}
              <div className="w-[85vw] flex-shrink-0 snap-center md:w-auto md:col-span-2 relative rounded-3xl overflow-hidden group shadow-lg">
                <Image src={IMAGES.activities.games} alt="Aktivitas team building dan outbond seru di lapangan rumput luas Villa Kampung Gunung" fill sizes="(max-width: 768px) 85vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <Tent className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-2xl mb-1">Games & Team Building</h3>
                  <p className="text-gray-200 text-sm">Tingkatkan kerjasama tim dengan area lapang hijau yang super luas.</p>
                </div>
              </div>

              {/* Karaoke Outdoor */}
              <div className="w-[85vw] flex-shrink-0 snap-center md:w-auto relative rounded-3xl overflow-hidden group shadow-lg">
                <Image src={IMAGES.activities.karaoke} alt="Fasilitas karaoke outdoor dengan panggung mini dan sound system di bawah langit pegunungan Kuningan" fill sizes="(max-width: 768px) 85vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-purple-500 w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <Mic className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-xl mb-1">Karaoke Outdoor</h3>
                  <p className="text-gray-200 text-sm">Panggung mini & sound system siap menyemarakkan acara.</p>
                </div>
              </div>

              {/* Makan Bareng */}
              <div className="w-[85vw] flex-shrink-0 snap-center md:w-auto relative rounded-3xl overflow-hidden group shadow-lg">
                <Image src={IMAGES.activities.makan} alt="Sajian makan bersama prasmanan di area makan terbuka dengan pemandangan alam Villa Kampung Gunung" fill sizes="(max-width: 768px) 85vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="bg-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-lg">
                    <UtensilsCrossed className="text-white h-5 w-5" />
                  </div>
                  <h3 className="text-white font-serif font-bold text-xl mb-1">Makan Bareng</h3>
                  <p className="text-gray-200 text-sm">Opsional catering buffet atau BBQ set premium.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========== PAKET EXPERIENCE (Menggantikan Rooms) ========== */}
        <section id="packages" className="py-12 lg:py-24 bg-[#F0F4F1] px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#163a28] mb-3 lg:mb-4">Pilihan Paket Experience</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">Solusi hemat dan praktis untuk event berskala besar Anda.</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar lg:grid lg:grid-cols-3 lg:overflow-visible gap-6 lg:gap-8 items-stretch pb-6 lg:pb-0">
              {PAKET_EXPERIENCE.map((paket) => (
                <div key={paket.id} className={`w-[85vw] lg:w-auto flex-shrink-0 snap-center bg-white rounded-3xl overflow-hidden flex flex-col relative transition-all duration-300 hover:-translate-y-2 ${paket.highlight ? 'border-4 border-[#163a28] shadow-2xl lg:scale-105 lg:z-10' : 'border border-gray-200 shadow-lg'}`}>
                  {paket.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#163a28] text-[#98D8A0] font-bold text-xs uppercase tracking-widest py-1.5 px-6 rounded-b-xl z-20">
                      Most Popular
                    </div>
                  )}
                  <div className="relative h-48 lg:h-56">
                    <Image src={paket.image} alt={`Fasilitas dan suasana untuk ${paket.name} berkapasitas ${paket.capacity}`} fill sizes="(max-width: 1024px) 85vw, 33vw" className="object-cover" />
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-[#163a28] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" /> {paket.capacity}
                    </div>
                  </div>

                  <div className="p-6 lg:p-8 flex flex-col flex-1">
                    <div className="mb-2 text-[#98D8A0] font-bold text-xs lg:text-sm tracking-wide">{paket.subtitle}</div>
                    <h3 className="font-serif font-bold text-2xl text-[#163a28] mb-4">{paket.name}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">{paket.description}</p>

                    <div className="space-y-3 mb-8">
                      {paket.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle className="text-[#98D8A0] h-5 w-5 shrink-0" />
                          <span className="text-gray-700 text-sm font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-100 mt-auto">
                      <div className="font-bold text-[#163a28] text-lg mb-4">{paket.priceText}</div>
                      <Button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className={`w-full h-12 rounded-xl text-sm font-bold shadow-md transition-transform active:scale-95 ${paket.highlight ? 'bg-[#163a28] hover:bg-[#0d2618] text-white' : 'bg-[#e8f3ec] text-[#163a28] hover:bg-[#98D8A0] hover:text-[#112419]'}`}>
                        Pesan Paket Ini
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== TARGET PENJUALAN CAROUSEL ========== */}
        <section
          id="target-market"
          className="pt-16 pb-12 md:pt-20 md:pb-16 px-4 overflow-hidden relative transition-colors duration-1000"
          style={{ backgroundColor: '#112419' }}
        >
          <div
            className="absolute inset-0 transition-opacity duration-1000 opacity-20"
            style={{
              backgroundImage: `url(${TARGET_MARKET[activeTarget].images[activeSubSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(50px)',
            }}
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#112419]/80 via-transparent to-[#112419]/90"></div>

          <div className="max-w-7xl mx-auto relative z-10" onMouseEnter={() => setIsCarouselHovered(true)} onMouseLeave={() => setIsCarouselHovered(false)}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Deretan Kenangan Bersama Kami</h2>
              <p className="text-[#a3bfae] max-w-2xl mx-auto text-lg">Apapun agendanya, temukan harmoni dan pertumbuhan di sini.</p>


            </div>

            <div
              className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center perspective-[1000px] mb-12"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {TARGET_MARKET[activeTarget].images.map((imgSrc, idx) => {
                const total = TARGET_MARKET[activeTarget].images.length;
                let offset = idx - activeSubSlide;

                if (offset > Math.floor(total / 2)) offset -= total;
                if (offset < -Math.floor(total / 2)) offset += total;

                const isActive = offset === 0;
                const isHidden = Math.abs(offset) > 2;

                let transformStyles = '';
                let zIndex = 0;
                let opacity = 0;

                if (isActive) {
                  transformStyles = 'translateX(0) scale(1) translateZ(0)';
                  zIndex = 30;
                  opacity = 1;
                } else if (offset === -1) {
                  transformStyles = 'translateX(-50%) scale(0.85) translateZ(-100px)';
                  zIndex = 20;
                  opacity = 0.5;
                } else if (offset === 1) {
                  transformStyles = 'translateX(50%) scale(0.85) translateZ(-100px)';
                  zIndex = 20;
                  opacity = 0.5;
                } else {
                  transformStyles = 'translateX(0) scale(0.5) translateZ(-300px)';
                  zIndex = 5;
                  opacity = 0;
                }

                return (
                  <div
                    key={idx}
                    className="absolute w-[85%] md:w-[70%] h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
                    style={{ transform: transformStyles, zIndex, opacity, pointerEvents: isHidden ? 'none' : 'auto' }}
                    onClick={() => setActiveSubSlide(idx)}
                  >
                    <Image src={imgSrc} alt={`Galeri dokumentasi acara ${TARGET_MARKET[activeTarget].title} di Villa Kampung Gunung`} fill sizes="(max-width: 768px) 85vw, 70vw" className="object-cover" />

                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                    {isActive && (
                      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
                        <h3 className="font-serif font-bold text-3xl md:text-4xl text-white mb-6 tracking-wide drop-shadow-lg">{TARGET_MARKET[activeTarget].title}</h3>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleTargetWA(TARGET_MARKET[activeTarget].id); }}
                          className="bg-[#98D8A0] hover:bg-[#7bc885] text-[#112419] font-bold py-2.5 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-sm uppercase tracking-wider"
                        >
                          {TARGET_MARKET[activeTarget].id === 'private' ? 'Cek Ketersediaan Kamar' : 'Konsultasi Event'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={() => setActiveSubSlide((prev) => (prev - 1 + TARGET_MARKET[activeTarget].images.length) % TARGET_MARKET[activeTarget].images.length)}
                className="absolute left-2 md:left-10 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-colors border border-white/20 shadow-lg"
                aria-label="Geser gambar sebelumnya"
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
              </button>
              <button
                onClick={() => setActiveSubSlide((prev) => (prev + 1) % TARGET_MARKET[activeTarget].images.length)}
                className="absolute right-2 md:right-10 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-colors border border-white/20 shadow-lg"
                aria-label="Geser gambar selanjutnya"
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
              </button>
            </div>

            <div className="text-center w-full flex flex-col items-center">
              <div className="w-full max-w-2xl mb-6 min-h-[50px] flex items-center justify-center">
                <p key={activeTarget} className="text-gray-200 text-sm md:text-base leading-relaxed drop-shadow-md animate-in fade-in zoom-in-95 duration-500 font-medium px-4">
                  {TARGET_MARKET[activeTarget].description}
                </p>
              </div>

              <div className="w-full max-w-sm h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-[#98D8A0] transition-all duration-[50ms] ease-linear rounded-full"
                  style={{ width: `${isCarouselHovered ? 100 : progress}%` }}
                />
              </div>

              <div className="w-full max-w-7xl px-0 md:px-8">
                <h3 className="text-white/80 font-medium mb-6 font-serif tracking-widest text-[10px] md:text-xs uppercase opacity-80">Pilih Tipe Pesanan Anda</h3>

                <div className="flex overflow-x-auto md:grid md:grid-cols-4 md:overflow-x-visible md:place-items-center snap-x snap-mandatory md:snap-none hide-scrollbar gap-4 lg:gap-6 pb-6 pt-2 w-full max-w-5xl mx-auto px-4">
                  {TARGET_MARKET.map((target, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveTarget(idx)}
                      className={`relative flex-none snap-center cursor-pointer transition-all duration-500 rounded-2xl lg:rounded-3xl overflow-hidden 
                      ${activeTarget === idx
                          ? 'w-[160px] md:w-[280px] h-[90px] md:h-[150px] shadow-[0_10px_40px_rgba(152,216,160,0.3)] ring-2 ring-[#98D8A0] scale-100'
                          : 'w-[120px] md:w-[200px] h-[70px] md:h-[120px] opacity-60 hover:opacity-100 hover:scale-105 scale-95'
                        }`}
                    >
                      <Image src={target.images[0]} alt={`Pilihan target pesanan: ${target.title}`} fill sizes="(max-width: 768px) 200px, 280px" className="object-cover" />
                      <div className={`absolute inset-0 transition-opacity duration-500 ${activeTarget === idx ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent' : 'bg-black/60'}`} />
                      <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
                        <h3 className={`text-white font-serif font-bold transition-all duration-500 ${activeTarget === idx ? 'text-base md:text-lg text-[#98D8A0] translate-y-0' : 'text-xs md:text-sm translate-y-2'}`}>
                          {target.title}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== LOCAL TOURISM WITH CAROUSEL ========== */}
        <section id="wisata" className="py-12 lg:pt-16 lg:pb-24 bg-white px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <div className="flex items-center justify-center gap-2 text-[#163a28] text-sm font-bold uppercase tracking-widest mb-3">
                <Navigation className="h-4 w-4" /> Destinasi
              </div>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#163a28] mb-3 lg:mb-4">Wisata Sekitar</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base lg:text-lg">Jelajahi keindahan alam dan tempat wisata menarik di sekitar Kuningan</p>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible gap-6 lg:gap-8 pb-6 md:pb-0">
              {WISATA.map((w, idx) => {
                return (
                  <div key={idx} className="w-[85vw] flex-shrink-0 snap-center md:w-auto h-full flex flex-col bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative border border-gray-100">
                    <div className="relative h-48 lg:h-60 w-full overflow-hidden group">
                      <Image src={w.images[0]} alt={`Pemandangan destinasi wisata terdekat ${w.name} dari Villa Kampung Gunung`} fill sizes="(max-width: 768px) 85vw, 33vw" className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#163a28]/90 via-transparent to-transparent group-hover:from-[#163a28]/80 transition-colors" />

                      <div className="absolute bottom-4 left-4 lg:bottom-5 lg:left-5 flex items-center gap-2 lg:gap-3 z-10">
                        <span className="text-white text-xs lg:text-sm font-semibold bg-black/30 backdrop-blur-md px-3 lg:px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                          <Clock className="h-3 w-3 lg:h-3.5 lg:w-3.5" /> {w.distance}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col flex-1">
                      <h3 className="font-serif font-bold text-xl lg:text-2xl text-[#163a28] mb-2 lg:mb-3 group-hover:text-[#235c40] transition-colors">{w.name}</h3>
                      <p className="text-gray-500 leading-relaxed text-sm mb-6 flex-1">{w.description}</p>
                      <a
                        href={w.gmapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#e8f3ec] text-[#163a28] font-semibold text-sm rounded-xl hover:bg-[#98D8A0] transition-colors mt-auto"
                      >
                        <MapPin className="h-4 w-4" /> Buka di Maps
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========== MAPS & KONTAK SECTION ========== */}
        <section className="py-24 max-w-7xl mx-auto px-4 bg-[#F9F9F7]">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#163a28] mb-4">Temukan Kami</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="bg-white rounded-[2rem] p-4 shadow-xl flex flex-col border border-gray-100">
              <div className="w-full h-80 rounded-[1.5rem] overflow-hidden mb-6 relative border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.468982191127!2d108.46087147451955!3d-6.9538738930464215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f165cd30cdfe1%3A0x14f67880b4742c6e!2sVilla%20Kampung%20Gunung!5e0!3m2!1sid!2sid!4v1779119608247!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Resort Map Location"
                  className="absolute inset-0"
                />
              </div>
              <div className="px-4 pb-4">
                <h3 className="font-serif font-bold text-2xl text-[#163a28] mb-4">Villa Kampung Gunung</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                    <MapPin className="h-5 w-5 text-[#163a28] mt-0.5 shrink-0" />
                    <span>Jl. Perumahan Cipari, Cigugur, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45518</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <Phone className="h-5 w-5 text-[#163a28] shrink-0" />
                    <span>+62 811-2333-838</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 flex flex-col justify-center">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                <h3 className="font-serif font-bold text-2xl text-[#163a28] mb-6">Siap Melaksanakan Event Anda?</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Jangan ragu untuk menghubungi tim kami. Kami siap membantu merencanakan acara kantor, reuni, atau gathering komunitas Anda dari awal hingga akhir dengan fasilitas B2B lengkap kami.
                </p>
                <Button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#163a28] hover:bg-[#0d2618] text-white h-14 rounded-xl text-lg font-bold tracking-wide shadow-lg transition-transform active:scale-95 group">
                  <Send className="h-5 w-5 mr-2 group-hover:animate-bounce" /> Kirim Detail Event
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer className="bg-[#112419] text-white pt-20 pb-8 px-4 border-t-4 border-[#163a28]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="lg:col-span-1">
                <div className="flex items-center gap-3 mb-6">
                  <Image src="/images/logo-vkg.png" alt="Villa Kampung Gunung Logo" width={48} height={48} className="h-12 w-12 object-contain" />
                  <span className="font-serif font-bold text-2xl text-white leading-tight">Villa Kampung Gunung</span>
                </div>
                <p className="text-[#a3bfae] text-sm leading-loose mb-8">
                  Venue Gathering Premium di Kuningan. Tempat terbaik untuk acara perusahaan, komunitas, dan reuni keluarga besar.
                </p>
              </div>

              <div className="lg:col-span-1 lg:pl-4">
                <h2 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-widest">Navigasi</h2>
                <div className="space-y-4 flex flex-col">
                  <a href="#hero" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Beranda</a>
                  <a href="#activities" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Aktivitas</a>
                  <a href="#packages" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Paket Experience</a>
                  <a href="#wisata" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Wisata</a>
                </div>
              </div>

              <div className="lg:col-span-1">
                <h2 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-widest">Kontak B2B</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3 text-sm text-[#a3bfae] font-medium leading-relaxed">
                    <MapPin className="h-5 w-5 shrink-0 text-[#98D8A0]" />
                    <span>Jl. Perumahan Cipari, Cigugur, Kuningan, Jawa Barat</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#a3bfae] font-medium">
                    <Phone className="h-5 w-5 shrink-0 text-[#98D8A0]" />
                    <span>+62 811-2333-838</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-[1.5rem] p-6">
                  <h2 className="font-serif font-bold text-xl text-white mb-3">Ikuti Kami</h2>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/vilakampunggunung?igsh=MXV6N21iMnBjcnhmMw==" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#98D8A0] hover:text-[#112419] transition-colors" aria-label="Kunjungi Instagram resmi kami">
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                    <a href="https://www.tiktok.com/@villakampunggunung?_r=1&_t=ZS-96Syg9IYbjg" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#98D8A0] hover:text-[#112419] transition-colors" aria-label="Kunjungi TikTok resmi kami">
                      <TikTokIcon className="h-4 w-4" />
                    </a>
                    <a href="https://www.facebook.com/share/1Jt8mHA8cb/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#98D8A0] hover:text-[#112419] transition-colors" aria-label="Kunjungi Facebook resmi kami">
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1a4731] pt-8 text-center text-[#6e9680] text-sm font-medium">
              <p>© {new Date().getFullYear()} Villa Kampung Gunung. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* ========== FLOATING WHATSAPP BUTTON ========== */}
        <a
          href="https://wa.me/628112333838?text=Halo%20Admin,%20saya%20ingin%20tanya%20informasi%20Villa%20Kampung%20Gunung."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3.5 md:p-4 rounded-full shadow-2xl hover:scale-110 hover:bg-[#20b858] transition-all duration-300 flex items-center justify-center animate-bounce"
          aria-label="Chat WhatsApp"
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </a>
      </main>
    </>
  );
}

// Helper SVG
function InstagramIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>; }
function TikTokIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5V19a4 4 0 0 1-4-4z" /></svg>; }
function FacebookIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>; }