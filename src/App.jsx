import './index.css';
import './gallery.css';
import React, { useState, useEffect, useRef, useMemo } from 'react';

import {
  WEDDING, MEMPELAI, BANKS, LOVE_STORY, PENGUNDANG,
} from './config';

import BrideGroomSection from './components/BrideGroomSection';
import CountDown         from './components/CountDown';
import MusicPlayer       from './components/MusicPlayer';
import RSVPForm          from './components/RSVPForm';
import GuestBook         from './components/GuestBook';
import Gallery           from './components/Gallery';

import {
  BotanicalDivider,
  BugisDividerLine,
  PulseRings,
  CornerAccent,
  SulapaEppa,
  FloatingParticles,
  PallullunganSmall,
  LontaraPattern,
  PinisiBackground,
  KerisOrnament,
  BadikDivider,
} from './components/Decorations';

/* ════════════════════════════════════════════════
   SCROLL REVEAL
════════════════════════════════════════════════ */

function useScrollReveal(isOpen) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (!el.classList.contains('reveal--visible')) observer.observe(el);
      });
    };
    observe();
    const t = setTimeout(observe, 400);
    return () => { clearTimeout(t); observer.disconnect(); };
  }, [isOpen]);
}

function Reveal({ children, anim = 'up', delay = '0ms', style = {}, className = '' }) {
  return (
    <div className={`reveal reveal--${anim} ${className}`}
      style={{ '--reveal-delay': delay, ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════
   LOCAL COMPONENTS
════════════════════════════════════════════════ */

function GoldDivider() { return <BotanicalDivider />; }
function SectionDivider() { return <BugisDividerLine />; }

/* Sudut Bugis dengan aksen keris */
function BugisCorner({ style }) {
  return (
    <svg viewBox="0 0 100 100" fill="none"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true">
      <path d="M6 6 L6 42" stroke="rgba(201,146,42,0.3)" strokeWidth="1" />
      <path d="M6 6 L42 6" stroke="rgba(201,146,42,0.3)" strokeWidth="1" />
      <path d="M14 14 L14 36" stroke="rgba(201,146,42,0.15)" strokeWidth="0.6" />
      <path d="M14 14 L36 14" stroke="rgba(201,146,42,0.15)" strokeWidth="0.6" />
      <polygon points="6,6 12,6 6,12" fill="rgba(201,146,42,0.2)" />
      <circle cx="6" cy="6" r="2" fill="rgba(201,146,42,0.5)" />
      {/* Aksen mata keris kecil di sudut */}
      <path d="M20 20 L26 14 L28 16 L22 22 Z" fill="rgba(201,146,42,0.15)" stroke="rgba(201,146,42,0.3)" strokeWidth="0.5"/>
    </svg>
  );
}

/* Style shortcuts */
const TG = { color: 'var(--gold)' };
const T2 = { color: 'var(--text-secondary)' };

// Taruh setelah baris "const T2 = ..." (sekitar baris 88)
function useGuestName() {
  return useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('to') || WEDDING.namaUndangan;
  }, []);
}

/* NAV ITEMS */
const NAV_ITEMS = [
  { id: 'cover',    label: 'Beranda',  icon: '🏠' },
  { id: 'mempelai', label: 'Mempelai', icon: '💍' },
  { id: 'info',     label: 'Acara',    icon: '📅' },
  { id: 'story',    label: 'Kisah',    icon: '💌' },
  { id: 'gallery',  label: 'Galeri',   icon: '📸' },
  { id: 'rsvp',     label: 'RSVP',     icon: '✉️' },
  { id: 'amplop',   label: 'Amplop',   icon: '💝' },
  { id: 'pesan',    label: 'Ucapan',   icon: '🌸' },
];

/* ════════════════════════════════════════════════
   AUTO SCROLL
════════════════════════════════════════════════ */

function useAutoScroll(isOpen) {
  const rafRef       = useRef(null);
  const activeRef    = useRef(false);
  const listenersRef = useRef([]);

  useEffect(() => {
    if (!isOpen) return;

    const stop = () => {
      if (!activeRef.current) return;
      activeRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };

    const removeListeners = () => {
      listenersRef.current.forEach(({ type, fn, opts }) =>
        window.removeEventListener(type, fn, opts)
      );
      listenersRef.current = [];
    };

    const startTimer = setTimeout(() => {
      activeRef.current = true;
      const SPEED = 1.5;

      const tick = () => {
        if (!activeRef.current) return;
        const atBottom =
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
        if (atBottom) { stop(); return; }
        window.scrollBy(0, SPEED);
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);

      const onMove  = () => { stop(); removeListeners(); };
      const onWheel = () => { stop(); removeListeners(); };
      const onKey   = () => { stop(); removeListeners(); };

      window.addEventListener('touchmove', onMove,  { passive: true });
      window.addEventListener('wheel',     onWheel, { passive: true });
      window.addEventListener('keydown',   onKey);

      listenersRef.current = [
        { type: 'touchmove', fn: onMove,  opts: { passive: true } },
        { type: 'wheel',     fn: onWheel, opts: { passive: true } },
        { type: 'keydown',   fn: onKey,   opts: undefined },
      ];
    }, 1200);

    return () => {
      clearTimeout(startTimer);
      stop();
      removeListeners();
    };
  }, [isOpen]);
}

function App() {
  const guestName = useGuestName();
  const [activeSection, setActiveSection] = useState('cover');
  const [storyIndex,    setStoryIndex]    = useState(0);
  const [copiedBank,    setCopiedBank]    = useState('');
  const [toast,         setToast]         = useState('');
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [isOpen,        setIsOpen]        = useState(false);
  const [playMusic,     setPlayMusic]     = useState(false);

  useScrollReveal(isOpen);
  useAutoScroll(isOpen);

  /* Kunci scroll saat cover */
  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
    document.documentElement.style.overflow = isOpen ? '' : 'hidden';
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  /* Active nav via IntersectionObserver */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    document.querySelectorAll('section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const copyNorek = (norek) => {
    navigator.clipboard.writeText(norek).then(() => {
      setCopiedBank(norek);
      showToast('Nomor rekening tersalin! ✓');
      setTimeout(() => setCopiedBank(''), 3000);
    });
  };

  const handleOpenInvite = () => {
    setIsOpen(true);
    setPlayMusic(true);
  };

  /* ══════════════════════════════════════════════
     COVER PAGE
  ══════════════════════════════════════════════ */
  if (!isOpen) {
    return (
      <>
        <FloatingParticles />
        <div style={{
          position: 'fixed', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '24px',
        }}>
          <div className="cover-photo-bg cover-photo-bg--groom" />
          <div className="cover-photo-overlay" />
          <div className="cover-shimmer-sweep" />
          <div className="cover-shimmer-sweep cover-shimmer-sweep--2" />
          <div className="cover-glow-tl" />
          <div className="cover-glow-br" />
          <div className="cover-weave-pattern" />

          <LontaraPattern style={{ top: '8%', left: '5%', right: '5%' }} />

          {/* Ornamen keris di sudut kiri bawah */}
          <KerisOrnament style={{ bottom: '8%', left: '4%', width: 60, height: 90, opacity: 0.35 }} />
          {/* Ornamen keris di sudut kanan bawah — cermin */}
          <KerisOrnament style={{ bottom: '8%', right: '4%', width: 60, height: 90, opacity: 0.35, transform: 'scaleX(-1)' }} />

          <div className="cover-border" />
          <div className="cover-corner tl" /><div className="cover-corner tr" />
          <div className="cover-corner bl" /><div className="cover-corner br" />

          <PulseRings />

          <div className="cover-inner">
            {/* Pallullungang */}
            <div className="pallullungang">
              <div className="pall-t1 pall-tier" />
              <div className="pall-t2 pall-tier" />
              <div className="pall-t3 pall-tier" />
              <div className="pall-pole" />
            </div>

            <p className="cover-badge">The Wedding of</p>

            <div className="cover-monogram">
              {WEDDING.namasingkat1[0]}
              <span className="slash">&</span>
              {WEDDING.namasingkat2[0]}
            </div>

            <p className="cover-couple">
              {WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}
            </p>

            <div className="cover-divider" />

            {/* Badik divider kecil */}
            <BadikDivider />

            <p className="cover-date">08 · Juni · 2026</p>
            <p className="cover-location">Borong Leko, Kab. Gowa</p>

            <div className="cover-to-wrapper">
              <p className="cover-to-label">Kepada Yth.</p>
              <p className="cover-to-name">{guestName}</p>
            </div>

            <button className="btn-open-invite" onClick={handleOpenInvite}>
              Buka Undangan
            </button>

            <div className="scroll-cue" style={{ marginTop: 28 }}>
              <div className="scroll-dot" />
              <div className="scroll-dot" />
              <div className="scroll-dot" />
            </div>
          </div>
        </div>
        <MusicPlayer triggerPlay={false} />
      </>
    );
  }

  /* ══════════════════════════════════════════════
     MAIN CONTENT
  ══════════════════════════════════════════════ */
  return (
    <>
      <FloatingParticles />

      {/* ── TOP NAV ── */}
      <nav className="topbar">
        <span className="brand">{WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}</span>
        <div className="nav-links">
          {NAV_ITEMS.map((item) => (
            <a key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => scrollTo(item.id)}>
              {item.label}
            </a>
          ))}
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-drawer">
          {NAV_ITEMS.map((item) => (
            <a key={item.id}
              className={activeSection === item.id ? 'active' : ''}
              onClick={() => scrollTo(item.id)}>
              <span>{item.icon}</span> {item.label}
            </a>
          ))}
        </div>
      )}

      {/* ══════════════ HERO ═════════════════════════════════ */}
      <section id="cover" style={{ textAlign: 'center' }}>
        <div className="cover-bg-silk" />
        <div className="cover-weave-pattern" />
        <LontaraPattern style={{ top: '8%', left: '5%', right: '5%' }} />
        <div className="cover-border" />
        <div className="cover-corner tl" /><div className="cover-corner tr" />
        <div className="cover-corner bl" /><div className="cover-corner br" />
        <PulseRings />

        {/* Keris dekoratif background hero */}
        <KerisOrnament style={{ bottom: '5%', left: '3%', width: 55, height: 85, opacity: 0.2 }} />
        <KerisOrnament style={{ bottom: '5%', right: '3%', width: 55, height: 85, opacity: 0.2, transform: 'scaleX(-1)' }} />

        <div className="cover-inner">
          <div className="pallullungang">
            <div className="pall-t1 pall-tier" />
            <div className="pall-t2 pall-tier" />
            <div className="pall-t3 pall-tier" />
            <div className="pall-pole" />
          </div>
          <p className="cover-badge">The Wedding of</p>
          <div className="cover-monogram">
            {WEDDING.namasingkat1[0]}<span className="slash">&</span>{WEDDING.namasingkat2[0]}
          </div>
          <p className="cover-couple">{WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}</p>
          <div className="cover-divider" />
          <BadikDivider />
          <p className="cover-date">08 · Juni · 2026</p>
          <p className="cover-location">Borong Leko, Kab. Gowa</p>
          <div className="scroll-cue">
            <div className="scroll-dot" />
            <div className="scroll-dot" />
            <div className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* ══════════════ MEMPELAI ═════════════════════════════ */}
      <section id="mempelai">
        <PinisiBackground />
        <SulapaEppa style={{ width: 300, height: 300, bottom: -40, right: -40, opacity: 1 }} />
        <BugisCorner style={{ top: 20, left: 20, width: 65, height: 65 }} />
        {/* Keris aksen kiri */}
        <KerisOrnament style={{ top: '12%', left: '1%', width: 42, height: 65, opacity: 0.18 }} />

        <Reveal anim="down">
          <p className="subtitle">Bismillahirrahmanirrahim</p>
        </Reveal>

        {/* Sambutan */}
        <Reveal anim="up" delay="350ms">
          <div style={{
            maxWidth: 480, textAlign: 'center', marginTop: 24,
            padding: '20px 20px', border: '0.5px solid rgba(201,146,42,0.15)',
            background: 'rgba(255,255,255,0.025)',
          }}>
            <p style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 10, letterSpacing: '0.35em', color: 'var(--gold)', marginBottom: 8 }}>
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p style={{ ...T2, fontSize: 13, lineHeight: 1.9, fontFamily: 'Poppins,sans-serif' }}>
              Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara(i) untuk hadir dan mendoakan pernikahan kami.
            </p>
          </div>
        </Reveal>

        <Reveal anim="up" delay="100ms">
          <h2>Kedua Mempelai</h2>
        </Reveal>
        <Reveal anim="fade" delay="150ms">
          <p style={{
            ...T2, maxWidth: '440px', textAlign: 'center',
            fontSize: '13px', lineHeight: 1.9, margin: '12px 0 28px',
            fontFamily: 'Poppins, sans-serif', fontStyle: 'italic',
          }}>
            "Siri' na Pacce': Dua Jiwa, Satu Kehormatan"
          </p>
        </Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <LontaraPattern style={{ bottom: '10%', left: '5%', right: '5%', opacity: 0.6 }} />

        <Reveal anim="zoom" delay="250ms" style={{ width: '100%', alignItems: 'stretch' }}>
          <div className="bridegroom-flower-wrap">
            <BrideGroomSection mempelai={MEMPELAI} />
          </div>
        </Reveal>
      </section>

      {/* ══════════════ INFO ACARA ════════════════════════════ */}
      <section id="info">
        <PinisiBackground />
        <SulapaEppa style={{ width: 280, height: 280, top: -30, left: -30, opacity: 1 }} />
        <BugisCorner style={{ top: 20, right: 20, width: 65, height: 65, transform: 'scaleX(-1)' }} />
        {/* Keris aksen kanan */}
        <KerisOrnament style={{ top: '10%', right: '1%', width: 42, height: 65, opacity: 0.18, transform: 'scaleX(-1)' }} />

        <Reveal anim="down">
          <p className="subtitle">Insya Allah akan dilaksanakan</p>
        </Reveal>
        <Reveal anim="up" delay="100ms">
          <h2>Detail Acara</h2>
        </Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 28px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        {/* Hitung mundur */}
        <Reveal anim="zoom" delay="200ms" style={{ width: '100%', maxWidth: 500, marginBottom: 44 }}>
          <CountDown />
        </Reveal>

        {/* Kartu Akad & Resepsi */}
        <Reveal anim="up" delay="250ms">
          <div className="event-cards">
            {/* AKAD — Senin 08 Juni */}
            <div className="event-card">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <PallullunganSmall scale={0.65} />
              </div>
              <div className="event-card-type">Akad Nikah</div>
              <div className="event-card-date">08</div>
              <div className="event-card-month">Juni 2026</div>
              <div className="event-card-time">{WEDDING.akad.waktu}</div>
              <div className="event-card-location-mini">Alla'galung, Kel. Malakaji</div>
            </div>

            {/* RESEPSI — Selasa 09 Juni */}
            <div className="event-card event-card--groom">
              <div style={{ fontSize: 18, marginBottom: 8, opacity: 0.7 }}>⚔</div>
              <div className="event-card-type">Resepsi</div>
              <div className="event-card-date">09</div>
              <div className="event-card-month">Juni 2026</div>
              <div className="event-card-time">{WEDDING.resepsi.waktu}</div>
              <div className="event-card-location-mini">Borong Leko, Dusun Sabbelawang</div>
            </div>
          </div>
        </Reveal>

        {/* Lokasi Resepsi */}
        <Reveal anim="up" delay="350ms" style={{ width: '100%' }}>
          <div className="location-card">
            <p style={{ fontSize: 18, marginBottom: 8, opacity: 0.6 }}>⊕</p>
            <p className="location-name">{WEDDING.venue}</p>
            <p className="location-detail">{WEDDING.alamat}</p>
            <a href={WEDDING.mapsUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', marginTop: 14 }}>
              <button className="btn-outline">Buka Peta ↗</button>
            </a>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ KISAH CINTA ══════════════════════════ */}
      <section id="story">
        <PinisiBackground />
        <BugisCorner style={{ bottom: 20, right: 20, width: 65, height: 65, transform: 'rotate(180deg)' }} />
        <SulapaEppa style={{ width: 250, height: 250, top: -30, right: -30, opacity: 1 }} />

        <Reveal anim="down"><p className="subtitle">Perjalanan Kami</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Kisah Cinta</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 28px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <div style={{ width: '100%', maxWidth: 520 }}>
          {LOVE_STORY.map((item, i) => (
            <Reveal key={i} anim={i % 2 === 0 ? 'left' : 'right'} delay={`${i * 120}ms`}
              style={{ width: '100%' }}>
              <div className="story-item"
                style={i === LOVE_STORY.length - 1 ? { borderBottom: 'none' } : {}}>
                <div className="story-icon">{item.icon}</div>
                <div>
                  <p className="story-year">{item.tahun}</p>
                  <p className="story-title">{item.judul}</p>
                  <p className="story-text">{item.cerita}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ GALERI ════════════════════════════════ */}
      <section id="gallery">
        <PinisiBackground />
        <SulapaEppa style={{ width: 300, height: 300, top: -40, right: -40, opacity: 1 }} />
        <BugisCorner style={{ top: 20, left: 20, width: 65, height: 65 }} />

        <Reveal anim="down"><p className="subtitle">Galeri Foto</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Momen Berharga</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="zoom" delay="250ms" style={{ width: '100%' }}>
          <Gallery />
        </Reveal>
      </section>

      {/* ══════════════ RSVP ══════════════════════════════════ */}
      <section id="rsvp">
        <PinisiBackground />
        <Reveal anim="down"><p className="subtitle">Konfirmasi Kehadiran</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>RSVP</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '420px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins,sans-serif' }}>
            Kehadiranmu adalah kebahagiaan terbesar kami. 🌸<br />
            Mohon konfirmasi paling lambat <strong style={TG}>{WEDDING.batasRsvp}</strong>.
          </p>
        </Reveal>
        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <RSVPForm />
        </Reveal>
      </section>

      {/* ══════════════ AMPLOP DIGITAL ════════════════════════ */}
      <section id="amplop">
        <PinisiBackground />
        <SulapaEppa style={{ width: 350, height: 350, bottom: -60, right: -60, opacity: 1 }} />

        <Reveal anim="down"><p className="subtitle">Amplop Digital</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Hadiah &amp; Doa</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins,sans-serif' }}>
            Jika kamu berniat memberikan hadiah, kami sangat berterima kasih.<br />
            Doamu pun sudah lebih dari cukup. 🙏
          </p>
        </Reveal>

        <div style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {BANKS.map((b, i) => (
            <Reveal key={b.bank} anim="left" delay={`${i * 120}ms`} style={{ width: '100%' }}>
              <div className="bank-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ ...TG, fontSize: '11px', letterSpacing: '0.25em', fontWeight: 700, fontFamily: 'Poppins,sans-serif', textTransform: 'uppercase' }}>
                    {b.bank}
                  </span>
                  <span style={{
                    fontSize: 9, color: 'var(--maroon-dark)',
                    background: 'linear-gradient(135deg,var(--gold),var(--gold-bright))',
                    padding: '3px 12px', borderRadius: '2px', letterSpacing: '0.12em',
                    fontWeight: 600, fontFamily: 'Poppins,sans-serif',
                  }}>Transfer</span>
                </div>
                <p style={{
                  fontFamily: "'Cinzel',serif", fontSize: 'clamp(18px,5vw,26px)',
                  letterSpacing: '0.12em', color: 'var(--champagne)', marginBottom: 4,
                  textShadow: '0 0 12px rgba(201,146,42,0.2)',
                }}>{b.norek}</p>
                <p style={{ ...T2, fontSize: 12, marginBottom: 16, fontFamily: 'Poppins,sans-serif' }}>
                  a.n. {b.atas}
                </p>
                <button className="btn-outline" style={{ fontSize: 11 }}
                  onClick={() => copyNorek(b.norek)}>
                  {copiedBank === b.norek ? '✓ Tersalin!' : '📋 Salin Nomor'}
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════ BUKU TAMU ════════════════════════════ */}
      <section id="pesan">
        <PinisiBackground />
        <Reveal anim="down"><p className="subtitle">Buku Tamu Adat</p></Reveal>
        <Reveal anim="up" delay="100ms"><h2>Ucapan &amp; Doa</h2></Reveal>
        <Reveal anim="fade" delay="200ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <SectionDivider />
          </div>
        </Reveal>
        <Reveal anim="up" delay="200ms">
          <p style={{ ...T2, maxWidth: '440px', textAlign: 'center', fontSize: '13px', lineHeight: 1.85, marginBottom: '28px', fontFamily: 'Poppins,sans-serif' }}>
            Tinggalkan ucapan dan doa terbaikmu untuk kami. 💌<br />
            Setiap kata akan kami simpan sebagai kenangan indah.
          </p>
        </Reveal>
        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <GuestBook />
        </Reveal>
      </section>

      {/* ══════════════ HORMAT KAMI ═══════════════════════════ */}
      <section id="hormat" style={{ background: 'rgba(30,5,5,0.5)' }}>
        <PinisiBackground />
        <BugisCorner style={{ top: 20, left: 20, width: 65, height: 65 }} />
        <BugisCorner style={{ bottom: 20, right: 20, width: 65, height: 65, transform: 'rotate(180deg)' }} />
        <SulapaEppa style={{ width: 280, height: 280, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 1 }} />

        {/* Keris kiri-kanan di section hormat */}
        <KerisOrnament style={{ bottom: '8%', left: '3%', width: 52, height: 78, opacity: 0.28 }} />
        <KerisOrnament style={{ bottom: '8%', right: '3%', width: 52, height: 78, opacity: 0.28, transform: 'scaleX(-1)' }} />

        <Reveal anim="down"><p className="subtitle">Hormat Kami Yang Mengundang</p></Reveal>
        <Reveal anim="fade" delay="150ms">
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 24px' }}>
            <SectionDivider />
          </div>
        </Reveal>

        <Reveal anim="up" delay="200ms">
          <p className="hormat-utama">{PENGUNDANG.utama}</p>
        </Reveal>

        {/* <Reveal anim="fade" delay="250ms">
          <p style={{ ...T2, fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 16, textAlign: 'center' }}>
            Turut Mengundang
          </p>
        </Reveal> */}

        <Reveal anim="zoom" delay="300ms" style={{ width: '100%' }}>
          <div className="turut-grid turut-grid--groom">
            {PENGUNDANG.turut.map((item, i) => (
              <div key={i} className="turut-item">
                <p className="turut-nama">{item.nama}</p>
                {item.keterangan && <p className="turut-ket">{item.keterangan}</p>}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal anim="up" delay="400ms">
          <div style={{ marginTop: 32, padding: '20px 0', borderTop: '0.5px solid rgba(201,146,42,0.2)', textAlign: 'center', maxWidth: 480, width: '100%' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 9, letterSpacing: '0.35em', color: 'var(--gold)', marginBottom: 8 }}>
              Wassalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
            <p style={{ ...T2, fontSize: 12, fontStyle: 'italic', lineHeight: 1.9, fontFamily: 'Poppins,sans-serif' }}>
              Atas kehadiran dan do'a restu Bapak/Ibu/Saudara(i),<br />
              kami ucapkan terima kasih
            </p>
          </div>
        </Reveal>
      </section>

      {/* ══════════════ FOOTER ════════════════════════════════ */}
      <footer className="footer-section">
        <Reveal anim="zoom">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28, opacity: 0.35 }}>
            {/* Sulapa Eppa + keris kecil di footer */}
            <svg viewBox="0 0 80 60" width="60" height="45" fill="none">
              <polygon points="40,6 74,30 40,54 6,30" stroke="rgba(201,146,42,0.8)" strokeWidth="1" fill="none" />
              <polygon points="40,14 66,30 40,46 14,30" stroke="rgba(201,146,42,0.5)" strokeWidth="0.7" fill="none" />
              <circle cx="40" cy="30" r="3" fill="rgba(201,146,42,0.6)" />
              {/* Silang keris kecil */}
              <line x1="28" y1="18" x2="52" y2="42" stroke="rgba(201,146,42,0.4)" strokeWidth="0.8" />
              <line x1="52" y1="18" x2="28" y2="42" stroke="rgba(201,146,42,0.4)" strokeWidth="0.8" />
            </svg>
          </div>
        </Reveal>

        <Reveal anim="up" delay="100ms">
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: 'clamp(13px,3vw,16px)',
            fontStyle: 'italic', color: 'rgba(245,223,160,0.7)',
            lineHeight: 2, maxWidth: 500, margin: '0 auto 12px',
            textAlign: 'center', padding: '0 16px',
          }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa
            tenteram kepadanya..."
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(201,146,42,0.4)', letterSpacing: '0.2em', marginBottom: 28, textAlign: 'center', fontFamily: 'Poppins,sans-serif' }}>
            QS. AR-RUM : 21
          </p>
        </Reveal>

        <div style={{ width: 60, height: '1px', background: 'rgba(201,146,42,0.2)', margin: '0 auto 20px' }} />

        <Reveal anim="up" delay="200ms">
          <p style={{
            fontFamily: "'Cinzel Decorative',serif",
            fontSize: 'clamp(16px,4vw,22px)',
            letterSpacing: '0.1em', color: 'var(--champagne)',
            textAlign: 'center', textShadow: '0 0 20px rgba(201,146,42,0.2)',
          }}>
            {WEDDING.namasingkat1} &amp; {WEDDING.namasingkat2}
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(201,146,42,0.4)', letterSpacing: '0.3em', marginTop: 6, textAlign: 'center', fontFamily: 'Poppins,sans-serif', textTransform: 'uppercase' }}>
            08 . 06 . 2026
          </p>
        </Reveal>
      </footer>

      <MusicPlayer triggerPlay={playMusic} />
      {toast && <div className="toast show">{toast}</div>}
    </>
  );
}

export default App;