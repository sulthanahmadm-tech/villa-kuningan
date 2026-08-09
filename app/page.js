'use client';

import { useState, useEffect, useRef } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';
import { Toaster, toast } from 'sonner';

// Komponen UI Shadcn
import { Calendar } from '@/components/ui/calendar';
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

// Ikon Lucide (Tidak pakai Facebook, Instagram, Video agar tidak error)
import {
  CalendarIcon, ChevronLeft, ChevronRight, Star, MapPin, Phone, Users, Mountain,
  TreePine, Waves, Clock, Check, Leaf, Menu, X, Navigation, Coffee, Camera,
  Heart, Wifi, Car, UtensilsCrossed, MessageCircle, ShieldCheck, AlertTriangle,
  Trash2, BedDouble
} from 'lucide-react'; 
/* ===========================
IMAGE URLS & MOCK DATA
=========================== */
const IMAGES = {
  hero: 'hero-kampung-gunung.jpeg',
  villa1: ['https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?w=800', 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800', 'https://images.unsplash.com/photo-1754078219069-7565df2033b0?w=800'],
  wisataCurug: ['https://images.unsplash.com/photo-1651133292080-ed0783e93d28?w=800', 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=800'],
  wisataGunung: ['https://images.unsplash.com/photo-1615809265087-1416ccddd6ab?w=800', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'],
  wisataTelaga: ['https://images.unsplash.com/photo-1599685315640-9ceab2f58148?w=800', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800'],
  food1: 'https://images.unsplash.com/photo-1677029969063-23ecbb98d0af?w=800',
  food2: 'https://images.unsplash.com/photo-1677030016230-da4f478b300b?w=800'
};

const VILLAS = [
  {
    id: 1,
    name: 'Single Room',
    price: 350000,
    capacity: 2,
    availableUnits: 3,
    description: 'Kamar nyaman untuk 2 orang dengan pemandangan taman tropis yang asri. Dilengkapi AC, TV, dan kamar mandi dalam.',
    features: ['AC', 'TV', 'WiFi', 'Kamar Mandi Dalam'],
    images: IMAGES.villa1,
  },
  {
    id: 2,
    name: 'Double Room',
    price: 550000,
    capacity: 4,
    availableUnits: 1,
    description: 'Kamar luas untuk keluarga kecil dengan balkon menghadap pegunungan. Dua tempat tidur queen size.',
    features: ['AC', 'Balkon', 'WiFi', '2 Queen Bed'],
    images: IMAGES.villa1,
  },
  {
    id: 3,
    name: 'Triple Standard',
    price: 750000,
    capacity: 6,
    availableUnits: 4,
    description: 'Kamar triple standar cocok untuk rombongan dengan fasilitas lengkap dan ruang santai bersama.',
    features: ['AC', 'Ruang Tamu', 'WiFi', '3 Bed'],
    images: IMAGES.villa1,
  },
  {
    id: 4,
    name: 'Triple Suite',
    price: 1200000,
    capacity: 6,
    availableUnits: 2,
    description: 'Suite premium dengan ruang tamu terpisah, dapur mini, dan jacuzzi privat menghadap pegunungan.',
    features: ['Jacuzzi', 'Dapur Mini', 'WiFi', 'Living Room'],
    images: IMAGES.villa1,
  },
];

const WISATA = [
  {
    name: 'Curug Putri Palutungan',
    description: 'Nikmati kemudahan akses QR-code digital ticketing yang terintegrasi. Rasakan kesejukan air terjun alami yang dilengkapi fasilitas smart-locker IoT untuk keamanan barang bawaan Anda.',
    distance: '10 menit dari villa',
    images: [
      'https://picsum.photos/seed/curug1/800/600',
      'https://picsum.photos/seed/curug2/800/600',
      'https://picsum.photos/seed/curug3/800/600'
    ],
    icon: Waves,
    gmapsUrl: 'https://www.google.com/maps/search/Curug+Putri+Palutungan'
  },
  {
    name: 'Gedung Perundingan Linggarjati',
    description: 'Wisata sejarah imersif. Pindai ruangan dengan smartphone Anda untuk menikmati fitur Augmented Reality (AR) yang menghidupkan kembali momen krusial kemerdekaan RI.',
    distance: '20 menit dari villa',
    images: [
      'https://picsum.photos/seed/linggar1/800/600',
      'https://picsum.photos/seed/linggar2/800/600',
      'https://picsum.photos/seed/linggar3/800/600'
    ],
    icon: Mountain,
    gmapsUrl: 'https://www.google.com/maps/search/Gedung+Perundingan+Linggarjati'
  },
  {
    name: 'Waduk Darma',
    description: 'Kawasan eco-tourism modern dengan bentangan air yang luas. Kami menyediakan layanan smart-booking untuk area piknik eksklusif keluarga Anda di tepi waduk.',
    distance: '25 menit dari villa',
    images: [
      'https://picsum.photos/seed/waduk1/800/600',
      'https://picsum.photos/seed/waduk2/800/600',
      'https://picsum.photos/seed/waduk3/800/600'
    ],
    icon: TreePine,
    gmapsUrl: 'https://www.google.com/maps/search/Waduk+Darma'
  },
];

const KULINER = [
  {
    name: 'Nasi Liwet Kampung',
    description: 'Nasi liwet otentik dimasak dengan kayu bakar, disajikan dengan lauk tradisional khas Sunda.',
    price: 75000,
    image: IMAGES.food1,
    includes: ['Nasi Liwet', 'Ayam Goreng', 'Lalapan Segar', 'Sambal Dadak', 'Es Teh Manis']
  },
  {
    name: 'BBQ Gunung Premium',
    description: 'Paket BBQ premium dengan daging sapi dan ayam marinasi rempah lokal di tengah alam pegunungan.',
    price: 150000,
    image: IMAGES.food2,
    includes: ['Daging Sapi', 'Ayam Bakar', 'Jagung Bakar', 'Sosis Premium', 'Minuman Segar']
  },
  {
    name: 'Paket Tradisional Sunda',
    description: 'Sajian lengkap masakan Sunda autentik: nasi timbel, gurame bakar, dan sayur asem segar.',
    price: 120000,
    image: IMAGES.food1,
    includes: ['Nasi Timbel', 'Gurame Bakar', 'Sayur Asem', 'Karedok', 'Es Kelapa Muda']
  },
];

const REVIEWS = [
  { name: 'Budi Santoso', avatar: 'BS', rating: 5, comment: 'Villa yang sangat nyaman dengan pemandangan luar biasa. Staff ramah dan makanannya enak banget. Pasti kembali lagi kesini!', date: 'Mei 2025' },
  { name: 'Siti Rahayu', avatar: 'SR', rating: 5, comment: 'Pengalaman menginap terbaik! Anak-anak sangat senang dengan suasana alamnya. Udaranya segar dan sangat tenang. Highly recommended!', date: 'April 2025' },
];

const TARGET_MARKET = [
  {
    id: 'private',
    title: 'Private Retreat',
    description: 'Bagi Anda warga urban yang membutuhkan solo traveling untuk menghilangkan beban pikiran dari pekerjaan. Temukan kembali ketenangan batin Anda di rumah kayu kami yang damai.',
    images: [
      'https://picsum.photos/seed/private1/1200/800',
      'https://picsum.photos/seed/private2/1200/800',
      'https://picsum.photos/seed/private3/1200/800',
      'https://picsum.photos/seed/private4/1200/800',
      'https://picsum.photos/seed/private5/1200/800',
      'https://picsum.photos/seed/private6/1200/800',
      'https://picsum.photos/seed/private7/1200/800',
      'https://picsum.photos/seed/private8/1200/800',
      'https://picsum.photos/seed/private9/1200/800',
      'https://picsum.photos/seed/private10/1200/800'
    ]
  },
  {
    id: 'family',
    title: 'Family Gathering',
    description: 'Rasakan kembali kehangatan keluarga tradisional dengan sentuhan layanan resor bintang lima modern.',
    images: [
      'https://picsum.photos/seed/family1/1200/800',
      'https://picsum.photos/seed/family2/1200/800',
      'https://picsum.photos/seed/family3/1200/800',
      'https://picsum.photos/seed/family4/1200/800',
      'https://picsum.photos/seed/family5/1200/800',
      'https://picsum.photos/seed/family6/1200/800',
      'https://picsum.photos/seed/family7/1200/800',
      'https://picsum.photos/seed/family8/1200/800',
      'https://picsum.photos/seed/family9/1200/800',
      'https://picsum.photos/seed/family10/1200/800'
    ]
  },
  {
    id: 'community',
    title: 'Community Gathering',
    description: 'Sesi berbagi yang cair dan penuh inspirasi di pendopo joglo yang harmonis.',
    images: [
      'https://picsum.photos/seed/community1/1200/800',
      'https://picsum.photos/seed/community2/1200/800',
      'https://picsum.photos/seed/community3/1200/800',
      'https://picsum.photos/seed/community4/1200/800',
      'https://picsum.photos/seed/community5/1200/800',
      'https://picsum.photos/seed/community6/1200/800',
      'https://picsum.photos/seed/community7/1200/800',
      'https://picsum.photos/seed/community8/1200/800',
      'https://picsum.photos/seed/community9/1200/800',
      'https://picsum.photos/seed/community10/1200/800'
    ]
  },
  {
    id: 'corporate',
    title: 'Corporate Gathering',
    description: 'Tingkatkan produktivitas tim melalui capacity building di tengah harmoni alam hijau yang menyegarkan pikiran.',
    images: [
      'https://picsum.photos/seed/corporate1/1200/800',
      'https://picsum.photos/seed/corporate2/1200/800',
      'https://picsum.photos/seed/corporate3/1200/800',
      'https://picsum.photos/seed/corporate4/1200/800',
      'https://picsum.photos/seed/corporate5/1200/800',
      'https://picsum.photos/seed/corporate6/1200/800',
      'https://picsum.photos/seed/corporate7/1200/800',
      'https://picsum.photos/seed/corporate8/1200/800',
      'https://picsum.photos/seed/corporate9/1200/800',
      'https://picsum.photos/seed/corporate10/1200/800'
    ]
  }
];

function formatRupiah(num) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
}

export default function Home() {
  // Booking State Core
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const [checkInOpen, setCheckInOpen] = useState(false);
  const [checkOutOpen, setCheckOutOpen] = useState(false);

  // Villa Swipe Tracking
  const villaTouchStartX = useRef({});
  const villaTouchEndX = useRef({});

  // Cancellation Flow state
  const [cancelOpen, setCancelOpen] = useState(false);
  const [searchCancelId, setSearchCancelId] = useState('');
  const [foundReservation, setFoundReservation] = useState(null);
  const [cancelStatus, setCancelStatus] = useState('idle');

  // Carousel & UI layout state (Menangani index untuk villa dan wisata)
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
    
    // Reset progress when slide changes manually or unpauses
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveSubSlide((t) => (t + 1) % 10); // 10 is the number of images per category
          return 0;
        }
        return prev + 1; // Update progress smoothly (100 ticks = 5 seconds if interval is 50ms)
      });
    }, 50); // 50ms * 100 = 5000ms (5 seconds)

    return () => clearInterval(interval);
  }, [isCarouselHovered, activeSubSlide, activeTarget]);

  // Reset sub slide when target changes
  useEffect(() => {
    setActiveSubSlide(0);
    setProgress(0);
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
    if (diff > 50) {
      setActiveSubSlide((prev) => (prev + 1) % 10);
    } else if (diff < -50) {
      setActiveSubSlide((prev) => (prev - 1 + 10) % 10);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  /* ------ Carousel Logic ------ */
  const nextSlide = (key, total, e) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) + 1) % total }));
  };

  const prevSlide = (key, total, e) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) - 1 + total) % total }));
  };

  const goToSlide = (key, sIdx, e) => {
    e.stopPropagation();
    setCarouselIndexes(prev => ({ ...prev, [key]: sIdx }));
  };

  /* ------ Villa Swipe Logic ------ */
  const handleVillaTouchStart = (e, key) => {
    villaTouchStartX.current[key] = e.touches[0].clientX;
  };

  const handleVillaTouchMove = (e, key) => {
    villaTouchEndX.current[key] = e.touches[0].clientX;
  };

  const handleVillaTouchEnd = (key, total) => {
    if (!villaTouchStartX.current[key] || !villaTouchEndX.current[key]) return;
    const diff = villaTouchStartX.current[key] - villaTouchEndX.current[key];
    if (diff > 50) {
      setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) + 1) % total }));
    } else if (diff < -50) {
      setCarouselIndexes(prev => ({ ...prev, [key]: ((prev[key] || 0) - 1 + total) % total }));
    }
    villaTouchStartX.current[key] = 0;
    villaTouchEndX.current[key] = 0;
  };

  /* ------ Cancellation Logic Engine ------ */
  const handleFindReservation = async () => {
    if (!searchCancelId.trim()) {
      toast.error('Masukkan ID Reservasi Anda');
      return;
    }
    setCancelStatus('searching');
    try {
      const res = await fetch('/api/booking');
      const json = await res.json();
      if (!res.ok) throw new Error();

      const match = json.data.find(item => item.reservationId.toUpperCase() === searchCancelId.trim().toUpperCase());
      if (!match) {
        toast.error('ID Reservasi tidak ditemukan di database.');
        setFoundReservation(null);
      } else {
        setFoundReservation(match);
      }
      setCancelStatus('idle');
    } catch (err) {
      toast.error('Gagal mengambil data dari database.');
      setCancelStatus('idle');
    }
  };

  const handleCancelExecution = async () => {
    setCancelStatus('cancelling');
    try {
      toast.success(`Reservasi ${foundReservation.reservationId} berhasil dibatalkan secara sistemis.`);
      setCancelOpen(false);
      setFoundReservation(null);
      setSearchCancelId('');
      setCancelStatus('idle');
    } catch (err) {
      toast.error('Gagal memperbarui status pembatalan.');
      setCancelStatus('idle');
    }
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} />
    ));
  };

  const handleTargetWA = (targetId) => {
    let message = '';
    if (targetId === 'private') {
      message = 'Halo Admin, saya tertarik untuk merencanakan Private Retreat (Solo Traveling) di Villa Kampung Gunung. Boleh info lebih detail mengenai ketersediaan dan paketnya?';
    } else if (targetId === 'family') {
      message = 'Halo Admin, saya ingin konsultasi mengenai paket Family Gathering di Villa Kampung Gunung. Kami ingin mengadakan acara keluarga yang hangat dan nyaman. Mohon info lengkapnya.';
    } else if (targetId === 'community') {
      message = 'Halo Admin, saya mewakili komunitas dan ingin konsultasi mengenai penyelenggaraan Community Gathering di pendopo joglo Villa Kampung Gunung. Bisa bantu detailnya?';
    } else if (targetId === 'corporate') {
      message = 'Halo Admin, saya butuh bantuan untuk konsultasi Corporate Gathering (Event/Capacity Building) dari perusahaan saya di Villa Kampung Gunung. Mohon informasi fasilitas dan harganya.';
    }
    window.open(`https://wa.me/628112333838?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#F9F9F7]">
      <Toaster richColors position="top-center" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "Villa Kampung Gunung Kuningan",
            "description": "Premium nature resort di Kuningan Jawa Barat dengan integrasi pemesanan langsung.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kuningan",
              "addressRegion": "Jawa Barat",
              "addressCountry": "ID"
            },
            "url": "http://localhost:3000"
          })
        }}
      />

      {/* ========== NAVBAR FIXED ========== */}
      <nav className="fixed top-0 w-full z-50 bg-[#163a28]/40 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-[#98D8A0]" />
            <span className="text-white font-serif font-bold text-xl tracking-tight">Villa Kampung Gunung</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Beranda</a>
            <a href="#villas" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Villa</a>
            <a href="#wisata" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Wisata</a>
            <a href="#kuliner" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Kuliner</a>
            <a href="#reviews" className="text-white font-medium hover:text-[#98D8A0] transition-colors text-sm">Ulasan</a>
            <button onClick={() => setCancelOpen(true)} className="text-[#E5B869] hover:text-white transition-colors text-sm font-medium flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Kelola Booking
            </button>
            <a href="https://wa.me/628112333838" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white px-5 py-2.5 rounded-full text-sm font-bold transition-transform active:scale-95 shadow-md">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-1">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`md:hidden absolute top-20 left-0 w-full bg-[#163a28]/95 backdrop-blur-2xl border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 py-6 opacity-100 shadow-2xl' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="flex flex-col items-center gap-6">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Beranda</a>
            <a href="#villas" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Villa</a>
            <a href="#wisata" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium hover:text-[#98D8A0] text-base">Wisata</a>
            <button onClick={() => { setCancelOpen(true); setMobileMenuOpen(false); }} className="text-[#E5B869] font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Kelola Booking
            </button>
          </div>
        </div>
      </nav>

      {/* ========== HERO CORE SECTION ========== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <img src={IMAGES.hero} alt="Mountain View Resort" className="absolute inset-0 w-full h-full object-cover scale-105" />
        <div className="absolute inset-0 bg-[#0d2818]/60" />

        <div className="relative z-10 text-center px-4 pt-12 pb-12 w-full max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-2 border border-white/30">
            <MapPin className="h-4 w-4 text-[#98D8A0]" />
            <span className="text-white text-sm font-medium tracking-wide">Kuningan, Jawa Barat</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 md:mb-6 drop-shadow-2xl leading-tight">
            Villa Kampung <br /><span className="text-[#98D8A0]">Gunung</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 md:mb-10 max-w-2xl mx-auto drop-shadow-md font-medium px-4">
            Rasakan ketenangan alam pegunungan dengan kenyamanan premium di tengah hutan tropis
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10 md:mb-12">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:bg-black/60 transition cursor-pointer">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm font-semibold">4.8 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:bg-black/60 transition cursor-pointer">
              <Heart className="h-4 w-4 text-red-400" />
              <span className="text-white text-sm font-semibold">500+ Ulasan</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10 hover:bg-black/60 transition cursor-pointer">
              <Camera className="h-4 w-4 text-blue-300" />
              <span className="text-white text-sm font-semibold">Instagram Worthy</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl md:rounded-[2rem] p-5 md:p-8 shadow-2xl max-w-4xl mx-auto border-b-4 border-[#163a28]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-end">
              <div className="text-left">
                <label className="text-xs font-extrabold text-[#163a28] uppercase tracking-wider mb-2 block">Check-in</label>
                <Popover open={checkInOpen} onOpenChange={setCheckInOpen}>
                  <PopoverTrigger className="w-full">
                    <div className="flex items-center w-full h-12 border border-gray-200 bg-white hover:border-[#163a28] rounded-xl px-4 text-sm text-gray-700 transition-colors shadow-sm cursor-pointer">
                      <CalendarIcon className="mr-3 h-5 w-5 text-[#98D8A0]" />
                      {checkIn ? <span className="text-[#163a28] font-semibold">{format(checkIn, 'dd MMM yyyy')}</span> : 'Pilih tanggal'}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkIn} onSelect={(d) => { setCheckIn(d); setCheckInOpen(false); if (d >= checkOut) setCheckOut(null); }} disabled={(d) => d < today} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="text-left">
                <label className="text-xs font-extrabold text-[#163a28] uppercase tracking-wider mb-2 block">Check-out</label>
                <Popover open={checkOutOpen} onOpenChange={setCheckOutOpen}>
                  <PopoverTrigger className="w-full">
                    <div className="flex items-center w-full h-12 border border-gray-200 bg-white hover:border-[#163a28] rounded-xl px-4 text-sm text-gray-700 transition-colors shadow-sm cursor-pointer">
                      <CalendarIcon className="mr-3 h-5 w-5 text-[#98D8A0]" />
                      {checkOut ? <span className="text-[#163a28] font-semibold">{format(checkOut, 'dd MMM yyyy')}</span> : 'Pilih tanggal'}
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={checkOut} onSelect={(d) => { setCheckOut(d); setCheckOutOpen(false); }} disabled={(d) => checkIn ? d <= checkIn : d <= today} />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="text-left">
                <label className="text-xs font-extrabold text-[#163a28] uppercase tracking-wider mb-2 block">Jumlah Tamu</label>
                <div className="flex items-center border border-gray-200 rounded-xl h-12 px-4 bg-white hover:border-[#163a28] transition-colors shadow-sm cursor-pointer">
                  <Users className="h-5 w-5 text-[#98D8A0] mr-3 shrink-0" />
                  <select value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} className="w-full bg-transparent text-sm font-semibold text-[#163a28] focus:outline-none cursor-pointer">
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} Tamu</option>)}
                  </select>
                </div>
              </div>

              <Button onClick={() => document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' })} className="w-full bg-[#163a28] hover:bg-[#0d2618] text-white h-12 rounded-xl text-sm font-bold tracking-wide shadow-lg transition-transform active:scale-95">
                <Mountain className="h-5 w-5 mr-2" /> Cari Villa
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ========== VILLAS ACCOMMODATION GRID SYSTEM ========== */}
      <section id="villas" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#163a28] mb-4">Pilihan Villa Kami</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">Temukan hunian yang sempurna untuk liburan Anda di tengah keindahan alam pegunungan</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {VILLAS.map((villa, idx) => {
            const cKey = `villa_${idx}`;
            return (
              <div key={villa.id} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border-none hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between cursor-pointer relative" onClick={() => toast.success("Pesanan anda berhasil!")}>
                <div 
                  className="relative h-32 md:h-60 overflow-hidden"
                  onTouchStart={(e) => handleVillaTouchStart(e, cKey)}
                  onTouchMove={(e) => handleVillaTouchMove(e, cKey)}
                  onTouchEnd={() => handleVillaTouchEnd(cKey, villa.images.length)}
                >
                  <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${(carouselIndexes[cKey] || 0) * 100}%)` }}>
                    {villa.images.map((img, i) => (
                      <img key={i} src={img} alt="Villa Profile" className="w-full h-full object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-1000" />
                    ))}
                  </div>

                  <div className="hidden md:flex absolute inset-0 bg-[#163a28]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center pointer-events-none">
                    <span className="bg-white text-[#163a28] font-bold px-6 py-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                      Lihat Detail Kamar
                    </span>
                  </div>

                  <button onClick={(e) => prevSlide(cKey, villa.images.length, e)} className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-[#163a28] p-1 md:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block"><ChevronLeft className="h-4 w-4 md:h-5 md:w-5" /></button>
                  <button onClick={(e) => nextSlide(cKey, villa.images.length, e)} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-[#163a28] p-1 md:p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block"><ChevronRight className="h-4 w-4 md:h-5 md:w-5" /></button>

                  <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-1.5 z-10">
                    {villa.images.map((_, dotIdx) => (
                      <div key={dotIdx} className={`h-1.5 md:h-2 rounded-full transition-all ${(carouselIndexes[cKey] || 0) === dotIdx ? 'bg-white w-4 md:w-6' : 'bg-white/60 w-1.5 md:w-2'}`} />
                    ))}
                  </div>

                  <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-[#163a28]/90 backdrop-blur-md text-white text-[9px] md:text-[11px] font-semibold px-2 md:px-3 py-1 md:py-1.5 rounded-full flex items-center gap-1 md:gap-1.5 z-10">
                    <Users className="h-2.5 w-2.5 md:h-3.5 md:w-3.5" /> {villa.capacity} tamu
                  </div>
                </div>

                <div className="p-3 md:p-6 flex-1 flex flex-col justify-between bg-white z-20">
                  <div>
                    <h3 className="font-serif font-bold text-sm md:text-xl text-[#163a28] mb-1 md:mb-2 line-clamp-1">{villa.name}</h3>
                    <p className="hidden md:block text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">{villa.description}</p>

                    <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-4 bg-green-50 px-2 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg border border-green-100 w-fit">
                      <BedDouble className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                      <span className="text-[9px] md:text-xs font-bold text-green-700">Tersisa: {villa.availableUnits}</span>
                    </div>

                    <div className="hidden md:flex flex-wrap gap-2 mb-6">
                      {villa.features.map((f, i) => (
                        <span key={i} className="text-xs font-medium bg-[#e8f3ec] text-[#1a4731] px-3 py-1 rounded-full">{f}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto pt-2 md:pt-4 border-t border-gray-100 gap-2">
                    <div>
                      <span className="text-sm md:text-2xl font-extrabold text-[#163a28] leading-none">{formatRupiah(villa.price)}</span>
                      <span className="text-[9px] md:text-xs font-medium text-gray-400 block mt-0.5">/ malam</span>
                    </div>
                    <Button className="w-full md:w-auto bg-[#163a28] hover:bg-[#0d2618] text-white text-[10px] md:text-sm px-4 md:px-6 h-8 md:h-11 rounded-lg md:rounded-xl font-bold shadow-md transition-transform active:scale-95" onClick={(e) => { e.stopPropagation(); toast.success("Pesanan anda berhasil!"); }}>Pesan</Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========== TARGET PENJUALAN CAROUSEL ========== */}
      <section 
        id="target-market" 
        className="pt-16 pb-12 md:pt-20 md:pb-16 px-4 overflow-hidden relative transition-colors duration-1000"
        style={{ backgroundColor: '#112419' }}
      >
        {/* Dynamic Background Blur Effect */}
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
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Deretan kenangan bersama Villa Kampung Gunung</h2>
            <p className="text-[#a3bfae] max-w-2xl mx-auto text-lg">Apapun agendanya, temukan harmoni dan pertumbuhan di sini, pengalaman dan tujuan anda adalah prioritas kami</p>
          </div>

          {/* Main Carousel Area */}
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
              const isLeft = offset === -1 || offset === -2; 
              const isRight = offset === 1 || offset === 2;
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
              } else if (offset === -2) {
                transformStyles = 'translateX(-75%) scale(0.65) translateZ(-200px)';
                zIndex = 10;
                opacity = 0.2;
              } else if (offset === 2) {
                transformStyles = 'translateX(75%) scale(0.65) translateZ(-200px)';
                zIndex = 10;
                opacity = 0.2;
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
                  <img src={imgSrc} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                  
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {isActive && (
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
                      <h3 className="font-serif font-bold text-3xl md:text-4xl text-white mb-6 tracking-wide drop-shadow-lg">{TARGET_MARKET[activeTarget].title}</h3>
                      
                      {/* CTA Button */}
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleTargetWA(TARGET_MARKET[activeTarget].id); }}
                        className="bg-[#98D8A0] hover:bg-[#7bc885] text-[#112419] font-bold py-2.5 px-6 rounded-full shadow-lg transition-transform active:scale-95 text-sm uppercase tracking-wider"
                      >
                        {TARGET_MARKET[activeTarget].id === 'private' ? 'Pesan Sekarang' : 'Konsultasi Event'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={() => setActiveSubSlide((prev) => (prev - 1 + 10) % 10)}
              className="absolute left-2 md:left-10 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-colors border border-white/20 shadow-lg"
            >
              <ChevronLeft className="h-6 w-6 md:h-8 md:w-8" />
            </button>
            <button
              onClick={() => setActiveSubSlide((prev) => (prev + 1) % 10)}
              className="absolute right-2 md:right-10 z-40 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-3 md:p-4 rounded-full transition-colors border border-white/20 shadow-lg"
            >
              <ChevronRight className="h-6 w-6 md:h-8 md:w-8" />
            </button>
          </div>

          {/* Quick Selection Thumbnails with Glassmorphism Container */}
          <div className="text-center w-full flex flex-col items-center">
            {/* Description Text replacing the progress bar */}
            <div className="w-full max-w-2xl mb-8 min-h-[60px] flex items-center justify-center">
               <p key={activeTarget} className="text-gray-200 text-base md:text-lg leading-relaxed drop-shadow-md animate-in fade-in zoom-in-95 duration-500 font-medium px-4">
                 {TARGET_MARKET[activeTarget].description}
               </p>
            </div>

            {/* Progress Bar for Sub-slides */}
            <div className="w-full max-w-sm h-1 bg-white/10 rounded-full mb-8 overflow-hidden">
               <div 
                 className="h-full bg-[#98D8A0] transition-all duration-[50ms] ease-linear rounded-full" 
                 style={{ width: `${isCarouselHovered ? 100 : progress}%` }}
               />
            </div>

            {/* Konsep B + C: Expanded Image Cards with Horizontal Scroll */}
            <div className="w-full max-w-7xl px-0 md:px-8">
              <h4 className="text-white/80 font-medium mb-6 font-serif tracking-widest text-[10px] md:text-xs uppercase opacity-80">Pilih Cerita Anda di Villa Kampung Gunung</h4>
              
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 pt-2 w-full mx-auto justify-start md:justify-center px-4 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {TARGET_MARKET.map((target, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveTarget(idx)}
                    className={`relative flex-none snap-center cursor-pointer transition-all duration-500 rounded-[2rem] overflow-hidden 
                      ${activeTarget === idx 
                        ? 'w-[260px] md:w-[320px] h-[140px] md:h-[180px] shadow-[0_10px_40px_rgba(152,216,160,0.3)] ring-2 ring-[#98D8A0] scale-100' 
                        : 'w-[200px] md:w-[240px] h-[110px] md:h-[130px] opacity-60 hover:opacity-100 hover:scale-105 scale-95'
                      }`}
                  >
                    <img src={target.images[0]} alt={target.title} className="w-full h-full object-cover" />
                    
                    <div className={`absolute inset-0 transition-opacity duration-500 ${activeTarget === idx ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent' : 'bg-black/40'}`} />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-left">
                      <h4 className={`text-white font-serif font-bold transition-all duration-500 ${activeTarget === idx ? 'text-lg md:text-xl text-[#98D8A0] translate-y-0' : 'text-sm md:text-base translate-y-2'}`}>
                        {target.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== LOCAL TOURISM WITH CAROUSEL ========== */}
      <section id="wisata" className="pt-16 pb-24 bg-[#F0F4F1] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-[#163a28] text-sm font-bold uppercase tracking-widest mb-3">
              <Navigation className="h-4 w-4" /> Destinasi
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#163a28] mb-4">Wisata Sekitar</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Jelajahi keindahan alam dan tempat wisata menarik di sekitar Kuningan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {WISATA.map((w, idx) => {
              const IconComp = w.icon;
              const cKey = `wisata_${idx}`;
              return (
                <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group cursor-pointer relative">
                  <div className="relative h-60 w-full overflow-hidden">
                    {/* Carousel Wisata */}
                    <div className="flex h-full transition-transform duration-500" style={{ transform: `translateX(-${(carouselIndexes[cKey] || 0) * 100}%)` }}>
                      {w.images.map((img, i) => (
                        <img key={i} src={img} alt="Destinasi Wisata" className="w-full h-full object-cover flex-shrink-0 group-hover:scale-110 transition-transform duration-1000" />
                      ))}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#163a28]/90 via-transparent to-transparent group-hover:from-[#163a28]/80 transition-colors" />

                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a href={w.gmapsUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        <span className="bg-white text-[#163a28] font-bold px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 block hover:scale-105">
                          Jelajahi Lokasi
                        </span>
                      </a>
                    </div>

                    {/* Controls Wisata */}
                    <button onClick={(e) => prevSlide(cKey, w.images.length, e)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronLeft className="h-5 w-5" /></button>
                    <button onClick={(e) => nextSlide(cKey, w.images.length, e)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-md text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"><ChevronRight className="h-5 w-5" /></button>

                    <div className="absolute bottom-5 left-5 flex items-center gap-3 z-10">
                      <div className="bg-white/20 backdrop-blur-md rounded-full p-2.5">
                        <IconComp className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white text-sm font-semibold bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10">
                        <Clock className="h-3.5 w-3.5" /> {w.distance}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-serif font-bold text-2xl text-[#163a28] mb-3 group-hover:text-[#235c40] transition-colors">{w.name}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{w.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ========== KULINER SECTION ========== */}
      <section id="kuliner" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-[#a37b3d] text-sm font-bold uppercase tracking-widest mb-3">
              <UtensilsCrossed className="h-4 w-4" /> Kuliner
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#163a28] mb-4">Paket Kuliner</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Nikmati cita rasa autentik masakan Sunda dan BBQ khas pegunungan</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {KULINER.map((pkg, idx) => (
              <div key={idx} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 group border border-gray-100 cursor-pointer">
                <div className="relative h-60 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />

                  <div className="absolute inset-0 bg-[#a37b3d]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-[#a37b3d] font-bold px-5 py-2.5 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Pesan Sekarang
                    </span>
                  </div>

                  <div className="absolute top-5 right-5 bg-[#a37b3d]/90 backdrop-blur-md text-white text-sm font-extrabold px-4 py-2 rounded-full shadow-lg z-10 border border-white/20">
                    {formatRupiah(pkg.price)}<span className="font-medium text-xs"> / pax</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-serif font-bold text-2xl text-[#163a28] mb-3 group-hover:text-[#a37b3d] transition-colors">{pkg.name}</h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">{pkg.description}</p>
                  <div className="space-y-2.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <p className="text-xs font-bold text-[#163a28] uppercase tracking-widest mb-3">Menu Termasuk:</p>
                    {pkg.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                        <Check className="h-4 w-4 text-[#a37b3d] flex-shrink-0" />{item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== KATA MEREKA & MAPS SECTION ========== */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#163a28] mb-4">Temukan Kami</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-[#F9F9F7] rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col">
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
                <div className="flex items-start gap-3 text-sm text-gray-600 font-medium hover:text-[#163a28] transition-colors cursor-pointer">
                  <MapPin className="h-5 w-5 text-[#163a28] mt-0.5 shrink-0" />
                  <span>Jl. Perumahan Cipari, Cigugur, Kec. Kuningan, Kabupaten Kuningan, Jawa Barat 45518</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <Phone className="h-5 w-5 text-[#163a28] shrink-0" />
                  <span>+62 811-2333-838</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                  <Clock className="h-5 w-5 text-[#163a28] shrink-0" />
                  <span>Check-in: 14:00 | Check-out: 12:00</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 mt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#163a28] bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 cursor-pointer">
                    <Wifi className="h-4 w-4 text-gray-400" /> Free WiFi
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#163a28] bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 cursor-pointer">
                    <Car className="h-4 w-4 text-gray-400" /> Parkir Luas
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#163a28] bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 cursor-pointer">
                    <Coffee className="h-4 w-4 text-gray-400" /> Restoran
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex items-center gap-8 hover:-translate-y-1 transition-transform cursor-pointer">
              <div className="text-center shrink-0">
                <div className="text-6xl font-extrabold text-[#163a28]">4.8</div>
                <div className="flex gap-1 justify-center mt-2 mb-1">{renderStars(5)}</div>
                <div className="text-xs font-medium text-gray-400">500+ ulasan Google</div>
              </div>
              <div className="flex-1 space-y-2">
                {[{ l: '5', p: 85 }, { l: '4', p: 10 }, { l: '3', p: 3 }, { l: '2', p: 1 }, { l: '1', p: 1 }].map((b) => (
                  <div key={b.l} className="flex items-center gap-3 text-xs font-medium">
                    <span className="text-gray-500 w-2 text-right">{b.l}</span>
                    <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${b.p}%` }} />
                    </div>
                    <span className="text-gray-400 w-8 text-right">{b.p}%</span>
                  </div>
                ))}
              </div>
            </div>

            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 hover:-translate-y-1 transition-transform">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-[#e8f3ec] rounded-full flex items-center justify-center text-sm font-bold text-[#163a28]">
                    {r.avatar}
                  </div>
                  <div>
                    <h5 className="font-bold text-[#163a28] text-base">{r.name}</h5>
                    <span className="text-xs font-medium text-gray-400">{r.date}</span>
                  </div>
                  <div className="ml-auto flex gap-1">{renderStars(r.rating)}</div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">"{r.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FOOTER (With Social Media) ========== */}
      <footer className="bg-[#112419] text-white pt-20 pb-8 px-4 border-t-4 border-[#163a28]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Leaf className="h-8 w-8 text-[#98D8A0]" />
                <span className="font-serif font-bold text-2xl text-white leading-tight">Villa Kampung Gunung</span>
              </div>
              <p className="text-[#a3bfae] text-sm leading-loose mb-8">
                Villa premium di tengah alam pegunungan. Rasakan ketenangan dan keindahan alam dengan fasilitas modern dan pelayanan terbaik di Kuningan, Jawa Barat.
              </p>
            </div>

            <div className="lg:col-span-1 lg:pl-4">
              <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-widest">Navigasi</h4>
              <div className="space-y-4 flex flex-col">
                <a href="#hero" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Beranda</a>
                <a href="#villas" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Villa</a>
                <a href="#wisata" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Wisata</a>
                <a href="#kuliner" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Kuliner</a>
                <a href="#reviews" className="text-[#a3bfae] hover:text-white transition-colors text-sm font-medium w-fit">Ulasan</a>
              </div>
            </div>

            <div className="lg:col-span-1">
              <h4 className="font-sans font-bold text-sm text-white mb-6 uppercase tracking-widest">Kontak Kami</h4>
              <div className="space-y-5">
                <div className="flex items-start gap-3 text-sm text-[#a3bfae] font-medium leading-relaxed">
                  <MapPin className="h-5 w-5 shrink-0 text-[#98D8A0]" />
                  <span>Jl. Perumahan Cipari, Cigugur, Kuningan, Jawa Barat</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-[#a3bfae] font-medium">
                  <Phone className="h-5 w-5 shrink-0 text-[#98D8A0]" />
                  <span>+62 811-2333-838</span>
                </div>
                <a
                  href="https://wa.me/628112333838"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-[#163a28] border border-[#25D366] text-white px-6 py-3 rounded-2xl text-sm font-bold transition-colors mt-2 w-fit shadow-sm"
                >
                  <MessageCircle className="h-5 w-5 text-[#25D366]" /> Chat WhatsApp
                </a>
              </div>
            </div>

            <div className="lg:col-span-1">
              {/* Card Social Media Baru */}
              <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                <h4 className="font-serif font-bold text-xl text-[#163a28] mb-3">Our Social Media</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Ikuti akun resmi kami untuk update promo menarik dan galeri estetis.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/vilakampunggunung?igsh=MXV6N21iMnBjcnhmMw==" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                    <InstagramIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                  <a href="https://www.tiktok.com/@villakampunggunung?_r=1&_t=ZS-96Syg9IYbjg" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                    <TikTokIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                  <a href="https://www.facebook.com/share/1Jt8mHA8cb/" target="_blank" rel="noopener noreferrer" className="h-12 w-12 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors group">
                    <FacebookIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-[#1a4731] pt-8 text-center text-[#6e9680] text-sm font-medium flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Villa Kampung Gunung. All rights reserved.</p>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>



      {/* ========== CANCELLATION MODAL ========== */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-8 border-none shadow-2xl">
          <DialogHeader className="mb-4">
            <DialogTitle className="font-serif text-2xl text-[#163a28] flex items-center gap-2">
              <Trash2 className="text-red-500 h-6 w-6" /> Pembatalan Mandiri
            </DialogTitle>
            <DialogDescription className="text-gray-500 font-medium">
              Masukkan Reservation ID unik yang Anda terima saat checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 mt-2">
            <div className="flex gap-3">
              <Input value={searchCancelId} onChange={(e) => setSearchCancelId(e.target.value)} placeholder="VKG-XXXX" className="uppercase tracking-widest font-mono font-bold h-12 rounded-xl text-center border-gray-300 focus-visible:ring-[#163a28]" />
              <Button onClick={handleFindReservation} className="bg-[#163a28] hover:bg-[#0d2618] text-white h-12 rounded-xl px-6 font-bold" disabled={cancelStatus === 'searching'}>
                {cancelStatus === 'searching' ? 'Mencari...' : 'Cari'}
              </Button>
            </div>

            {foundReservation && (
              <div className="p-5 bg-red-50 border border-red-200 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-sm space-y-2.5 text-gray-700">
                  <div className="flex justify-between border-b border-red-100 pb-2"><strong>ID:</strong> <span className="font-mono font-bold text-red-700">{foundReservation.reservationId}</span></div>
                  <div className="flex justify-between border-b border-red-100 pb-2"><strong>Nama:</strong> <span className="font-semibold">{foundReservation.customerName}</span></div>
                  <div className="flex justify-between border-b border-red-100 pb-2"><strong>Kamar:</strong> <span className="font-semibold">{foundReservation.room}</span></div>
                  <div className="flex justify-between"><strong>Status:</strong> <span className="capitalize px-3 py-1 rounded-full text-xs bg-amber-200 font-extrabold text-amber-900">{foundReservation.status}</span></div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-red-200 text-xs font-semibold text-red-700 flex gap-3 shadow-sm">
                  <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
                  <span className="leading-relaxed">Mengeksekusi pembatalan akan menghapus hak sewa secara permanen.</span>
                </div>
                <Button onClick={handleCancelExecution} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-12 rounded-xl shadow-lg" disabled={cancelStatus === 'cancelling'}>
                  {cancelStatus === 'cancelling' ? 'Memproses...' : 'Ya, Batalkan Pesanan Ini'}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      {/* Sticky Bottom Booking Bar (Mobile Only) */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 p-4 pb-6 bg-white/90 backdrop-blur-xl border-t border-gray-200 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] md:hidden transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-between items-center gap-3 ${isScrolled ? 'translate-y-0' : 'translate-y-full'}`}>
        <Button onClick={() => document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' })} className="flex-1 bg-[#163a28] hover:bg-[#0d2618] text-white rounded-full font-bold h-12 shadow-lg text-sm tracking-wide">
          <CalendarIcon className="w-5 h-5 mr-2 text-[#98D8A0]" /> Pesan Kamar
        </Button>
        <a href="https://wa.me/628112333838" target="_blank" rel="noreferrer" className="flex items-center justify-center h-12 w-12 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full flex-shrink-0 shadow-xl transition-transform active:scale-95">
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </main>
  );
}

// Helper SVG agar tidak import error dari library luar
function InstagramIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-5 w-5 text-white group-hover:text-[#112419]"}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>; }
function TikTokIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-5 w-5 text-white group-hover:text-[#112419]"}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.5V19a4 4 0 0 1-4-4z" /></svg>; }
function FacebookIcon({ className }) { return <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className || "h-5 w-5 text-white group-hover:text-[#112419]"}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>; }