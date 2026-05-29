import React from 'react';

/* ══════════════════════════════════════════════════════════
   DECORATIONS — Warisan Bugis Autentik + Keris & Badik
   Motif: Sulapa Eppa, Pallullungang, Lontara, Lipa'Sabbe
   + Keris & Badik untuk versi pengantin lelaki
   ══════════════════════════════════════════════════════════ */

/* ── Sulapa Eppa (belah ketupat Bugis) + garis gold ── */
export function BotanicalDivider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: '12px', margin: '16px 0', width: '100%', maxWidth: '360px',
    }}>
      <div style={{
        flex: 1, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(201,146,42,0.5))',
      }} />
      <svg viewBox="0 0 44 44" width="28" height="28" fill="none">
        <polygon points="22,3 41,22 22,41 3,22"
          stroke="rgba(201,146,42,0.7)" strokeWidth="1" fill="none" />
        <polygon points="22,10 34,22 22,34 10,22"
          stroke="rgba(201,146,42,0.4)" strokeWidth="0.8" fill="none" />
        <circle cx="22" cy="22" r="2.5" fill="rgba(201,146,42,0.6)" />
      </svg>
      <div style={{
        flex: 1, height: '1px',
        background: 'linear-gradient(to left, transparent, rgba(201,146,42,0.5))',
      }} />
    </div>
  );
}

/* ── Label uppercase kecil ── */
export function SectionLabel({ children }) {
  return (
    <p style={{
      fontFamily: "'Cinzel Decorative', serif",
      fontSize: '9px',
      letterSpacing: '0.45em',
      textTransform: 'uppercase',
      fontWeight: 400,
      color: 'rgba(201,146,42,0.85)',
      textAlign: 'center',
      marginBottom: '14px',
    }}>
      {children}
    </p>
  );
}

export function HeadingRule() {
  return (
    <div style={{
      width: '48px', height: '1px',
      background: 'rgba(201,146,42,0.3)',
      margin: '16px auto 0',
    }} />
  );
}

/* ── Ornamen sudut Bugis geometrik ── */
export function BugisCornerAccent({ style }) {
  return (
    <svg viewBox="0 0 120 120" fill="none"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true">
      <path d="M8 8 L8 52" stroke="rgba(201,146,42,0.3)" strokeWidth="1" />
      <path d="M8 8 L52 8" stroke="rgba(201,146,42,0.3)" strokeWidth="1" />
      <path d="M16 16 L16 44" stroke="rgba(201,146,42,0.15)" strokeWidth="0.7" />
      <path d="M16 16 L44 16" stroke="rgba(201,146,42,0.15)" strokeWidth="0.7" />
      <polygon points="8,8 14,8 8,14" fill="rgba(201,146,42,0.25)" />
      <circle cx="8" cy="8" r="2" fill="rgba(201,146,42,0.5)" />
    </svg>
  );
}

export function CornerAccent({ style }) {
  return <BugisCornerAccent style={style} />;
}

/* ── Sulapa Eppa besar (dekorasi background) ── */
export function SulapaEppa({ style }) {
  return (
    <svg viewBox="0 0 200 200" fill="none"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}
      aria-hidden="true">
      <polygon points="100,10 190,100 100,190 10,100"
        stroke="rgba(201,146,42,0.07)" strokeWidth="0.8" fill="none" />
      <polygon points="100,30 170,100 100,170 30,100"
        stroke="rgba(201,146,42,0.05)" strokeWidth="0.6" fill="none" />
      <polygon points="100,60 140,100 100,140 60,100"
        stroke="rgba(201,146,42,0.04)" strokeWidth="0.5" fill="none" />
      <line x1="100" y1="10" x2="100" y2="190" stroke="rgba(201,146,42,0.03)" strokeWidth="0.5" />
      <line x1="10" y1="100" x2="190" y2="100" stroke="rgba(201,146,42,0.03)" strokeWidth="0.5" />
    </svg>
  );
}

/* ── Divider Sulapa Eppa 3x ── */
export function BugisDividerLine() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '8px',
      margin: '20px 0', width: '100%', maxWidth: '400px',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,146,42,0.4))' }} />
      {[0, 1, 2].map(i => (
        <svg key={i} viewBox="0 0 16 16" width="10" height="10" fill="none">
          <polygon points="8,1 15,8 8,15 1,8"
            stroke={`rgba(201,146,42,${0.65 - i * 0.15})`}
            strokeWidth="1" fill="none" />
        </svg>
      ))}
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left,transparent,rgba(201,146,42,0.4))' }} />
    </div>
  );
}

/* ── Pulse rings (cover) ── */
export function PulseRings() {
  return (
    <>
      {[520, 380, 240].map((size, i) => (
        <div key={size} className="cover-pulse-ring" style={{
          width: size, height: size,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          border: `1px solid rgba(201,146,42,${0.07 - i * 0.01})`,
          animationDelay: `${i * 1.2}s`,
        }} />
      ))}
    </>
  );
}

/* ── Floating gold particles ── */
export function FloatingParticles() {
  const particles = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 5.8) % 90}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${8 + (i % 5) * 1.5}s`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          bottom: '-5%',
          left: p.left,
          width: `${p.size}px`,
          height: `${p.size}px`,
          borderRadius: '50%',
          background: p.id % 2 === 0
            ? 'rgba(201,146,42,0.65)'
            : 'rgba(245,223,160,0.4)',
          animation: `particleDrift ${p.duration} linear ${p.delay} infinite`,
        }} />
      ))}
    </div>
  );
}

/* ── Pallullungang ornamen kecil ── */
export function PallullunganSmall({ scale = 1 }) {
  const s = scale;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', opacity: 0.8 }}>
      <div style={{ width: 14 * s, height: 4 * s, background: 'linear-gradient(90deg,#7A2828,#C9922A,#7A2828)', borderRadius: 1 }} />
      <div style={{ width: 24 * s, height: 5 * s, background: 'linear-gradient(90deg,#5C1A1A,#E8B84B,#5C1A1A)', borderRadius: 1 }} />
      <div style={{ width: 34 * s, height: 7 * s, background: 'linear-gradient(90deg,#3A0A0A,#C9922A,#3A0A0A)', borderRadius: 1 }} />
      <div style={{ width: 2 * s, height: 14 * s, background: 'linear-gradient(to bottom,rgba(201,146,42,0.8),rgba(201,146,42,0.2))' }} />
    </div>
  );
}

/* ── Lontara text dekoratif ── */
export function LontaraPattern({ style }) {
  const chars = 'ᨊᨀᨔᨒᨆᨕᨒᨕᨓᨑᨔᨆᨈᨒᨒᨕᨓᨅᨑᨀᨈᨕᨕᨅᨔᨆᨒᨒᨕᨑᨔᨆᨊᨑᨔᨆᨕᨀᨊᨆᨊᨀᨕ';
  return (
    <div className="lontara-bg-pattern" style={style}>
      {[0, 1, 2, 3].map(row => (
        <div key={row} style={{ marginBottom: 4 }}>
          {chars.slice(row * 10, row * 10 + 18)}
        </div>
      ))}
    </div>
  );
}

/* ── Stub (agar tidak error) ── */
export function LeafDeco() { return null; }
export function BotanicalCurve() { return null; }

/* ══════════════════════════════════════════════════════════
   KERIS BUGIS — Ornamen Senjata Adat
   SVG keris khas Bugis-Makassar dengan pamor emas
   ══════════════════════════════════════════════════════════ */

export function KerisOrnament({ style = {} }) {
  return (
    <svg
      viewBox="0 0 60 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        ...style,
      }}
    >
      {/* Gagang (hulu) keris */}
      <rect x="24" y="0" width="12" height="8" rx="3"
        fill="rgba(201,146,42,0.15)" stroke="rgba(201,146,42,0.6)" strokeWidth="0.8" />
      {/* Simbol sulapa pada gagang */}
      <polygon points="30,1 34,4 30,7 26,4"
        stroke="rgba(201,146,42,0.8)" strokeWidth="0.6" fill="rgba(201,146,42,0.1)" />

      {/* Ganja (pelindung antara gagang-bilah) */}
      <ellipse cx="30" cy="12" rx="10" ry="4"
        fill="rgba(201,146,42,0.12)" stroke="rgba(201,146,42,0.7)" strokeWidth="0.9" />
      <line x1="20" y1="12" x2="40" y2="12" stroke="rgba(201,146,42,0.5)" strokeWidth="0.5" />

      {/* Bilah keris berlekuk (luk) — 3 lekukan */}
      <path
        d="M30 16
           C 28 20, 26 24, 28 28
           C 30 32, 32 36, 30 40
           C 28 44, 26 48, 28 52
           C 30 56, 32 60, 30 64
           L 30 100"
        stroke="url(#kerisGold)" strokeWidth="2.2" strokeLinecap="round" fill="none"
      />
      {/* Tepi bilah kiri */}
      <path
        d="M30 16
           C 27 20, 25 24, 27 28
           C 29 32, 31 36, 29 40
           C 27 44, 25 48, 27 52
           C 29 56, 31 60, 29 64
           L 28 100"
        stroke="rgba(201,146,42,0.3)" strokeWidth="0.8" strokeLinecap="round" fill="none"
      />
      {/* Pamor (motif pada bilah) */}
      <path d="M29 22 C 31 24, 29 26, 31 28" stroke="rgba(232,184,75,0.4)" strokeWidth="0.6" fill="none" />
      <path d="M29 34 C 31 36, 29 38, 31 40" stroke="rgba(232,184,75,0.4)" strokeWidth="0.6" fill="none" />
      <path d="M29 46 C 31 48, 29 50, 31 52" stroke="rgba(232,184,75,0.4)" strokeWidth="0.6" fill="none" />
      <path d="M29 58 C 31 60, 29 62, 31 64" stroke="rgba(232,184,75,0.4)" strokeWidth="0.6" fill="none" />

      {/* Ujung lancip keris */}
      <path d="M28 100 L30 108 L32 100" stroke="rgba(201,146,42,0.7)" strokeWidth="1" fill="rgba(201,146,42,0.08)" />

      {/* Kilap / sorotan bilah */}
      <line x1="30" y1="18" x2="30" y2="96"
        stroke="rgba(232,184,75,0.15)" strokeWidth="1" strokeDasharray="4 8" />

      <defs>
        <linearGradient id="kerisGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8b84b" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#c9922a" stopOpacity="1" />
          <stop offset="100%" stopColor="#a07840" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════
   BADIK DIVIDER — Sepasang Badik Bugis saling berhadap
   Dipakai sebagai divider di cover & hero
   ══════════════════════════════════════════════════════════ */

export function BadikDivider() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', gap: '10px',
      margin: '8px 0 12px', width: '100%', maxWidth: '280px',
    }}>
      {/* Garis kiri */}
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,146,42,0.45))' }} />

      {/* Badik kiri — mengarah ke kanan */}
      <svg viewBox="0 0 40 14" width="36" height="12" fill="none">
        {/* Gagang badik */}
        <rect x="0" y="4" width="10" height="6" rx="2"
          fill="rgba(201,146,42,0.12)" stroke="rgba(201,146,42,0.55)" strokeWidth="0.7" />
        <line x1="10" y1="5" x2="10" y2="9" stroke="rgba(201,146,42,0.4)" strokeWidth="0.5" />
        {/* Bilah badik — melengkung ke atas */}
        <path d="M10 7 C 18 7, 28 5, 38 7 C 28 8, 18 9, 10 7 Z"
          fill="rgba(201,146,42,0.15)" stroke="rgba(201,146,42,0.65)" strokeWidth="0.8" />
        {/* Tepi tajam */}
        <path d="M10 6 C 20 5, 30 4, 38 7" stroke="rgba(232,184,75,0.5)" strokeWidth="0.6" fill="none" />
      </svg>

      {/* Sulapa Eppa tengah */}
      <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
        <polygon points="8,1 15,8 8,15 1,8"
          stroke="rgba(201,146,42,0.8)" strokeWidth="1" fill="rgba(201,146,42,0.08)" />
        <circle cx="8" cy="8" r="1.5" fill="rgba(201,146,42,0.5)" />
      </svg>

      {/* Badik kanan — cermin (mengarah ke kiri) */}
      <svg viewBox="0 0 40 14" width="36" height="12" fill="none" style={{ transform: 'scaleX(-1)' }}>
        <rect x="0" y="4" width="10" height="6" rx="2"
          fill="rgba(201,146,42,0.12)" stroke="rgba(201,146,42,0.55)" strokeWidth="0.7" />
        <line x1="10" y1="5" x2="10" y2="9" stroke="rgba(201,146,42,0.4)" strokeWidth="0.5" />
        <path d="M10 7 C 18 7, 28 5, 38 7 C 28 8, 18 9, 10 7 Z"
          fill="rgba(201,146,42,0.15)" stroke="rgba(201,146,42,0.65)" strokeWidth="0.8" />
        <path d="M10 6 C 20 5, 30 4, 38 7" stroke="rgba(232,184,75,0.5)" strokeWidth="0.6" fill="none" />
      </svg>

      {/* Garis kanan */}
      <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left,transparent,rgba(201,146,42,0.45))' }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PINISI — Perahu Layar Bugis Makassar
   ══════════════════════════════════════════════════════════ */

function PinisiIcon({ size = 48, opacity = 0.35, style = {}, flip = false, rotate = 0 }) {
  const g = '#C9922A';
  const gb = '#E8B84B';
  return (
    <svg
      viewBox="0 0 100 90"
      width={size}
      height={size * 0.9}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        opacity,
        transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${rotate}deg)`,
        filter: `drop-shadow(0 0 3px rgba(201,146,42,0.4))`,
        ...style,
      }}
    >
      <path
        d="M8 68 Q20 74 50 76 Q80 74 92 68 L85 78 Q65 86 50 87 Q35 86 15 78 Z"
        stroke={g} strokeWidth="2" fill={`rgba(201,146,42,0.08)`}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M10 72 Q4 76 2 80 Q12 78 22 76"
        stroke={g} strokeWidth="1.6" fill="none"
        strokeLinecap="round"
      />
      <path d="M14 70 L6 78" stroke={g} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M22 68 L14 78" stroke={g} strokeWidth="1.4" strokeLinecap="round" />
      <path d="M50 68 L50 8" stroke={gb} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M50 60 L32 16" stroke={g} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M50 58 L66 20" stroke={g} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M50 10 L50 64 L18 54 Z"
        stroke={gb} strokeWidth="1.6" fill={`rgba(232,184,75,0.12)`}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M34 18 L50 62 L20 56 Z"
        stroke={g} strokeWidth="1.4" fill={`rgba(201,146,42,0.08)`}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M50 22 L64 20 L50 58 Z"
        stroke={g} strokeWidth="1.3" fill={`rgba(201,146,42,0.07)`}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M50 8 L60 13 L50 18"
        stroke={gb} strokeWidth="1.3" fill={`rgba(232,184,75,0.2)`}
        strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M4 82 Q14 78 24 82 Q34 86 44 82 Q54 78 64 82 Q74 86 84 82 Q94 78 98 82"
        stroke={g} strokeWidth="1.4" fill="none"
        strokeLinecap="round"
      />
      <path
        d="M8 87 Q18 83 30 87 Q42 91 54 87 Q66 83 78 87 Q88 91 96 87"
        stroke={g} strokeWidth="1" fill="none" strokeOpacity="0.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PinisiBackground() {
  const ships = [
    { top: '4%',  left: '3%',   size: 42, op: 0.32, flip: false, rot: -3  },
    { top: '2%',  left: '22%',  size: 30, op: 0.28, flip: true,  rot: 2   },
    { top: '6%',  left: '55%',  size: 36, op: 0.30, flip: false, rot: -5  },
    { top: '3%',  left: '78%',  size: 26, op: 0.26, flip: true,  rot: 3   },
    { top: '8%',  left: '90%',  size: 40, op: 0.30, flip: false, rot: -2  },
    { top: '22%', left: '1%',   size: 28, op: 0.28, flip: true,  rot: 4   },
    { top: '18%', left: '38%',  size: 38, op: 0.32, flip: false, rot: -4  },
    { top: '25%', left: '68%',  size: 24, op: 0.26, flip: true,  rot: 2   },
    { top: '20%', left: '88%',  size: 34, op: 0.30, flip: false, rot: -3  },
    { top: '42%', left: '5%',   size: 36, op: 0.30, flip: false, rot: -5  },
    { top: '38%', left: '28%',  size: 22, op: 0.26, flip: true,  rot: 3   },
    { top: '45%', left: '72%',  size: 40, op: 0.32, flip: false, rot: -2  },
    { top: '40%', left: '92%',  size: 26, op: 0.27, flip: true,  rot: 4   },
    { top: '60%', left: '2%',   size: 32, op: 0.28, flip: true,  rot: 2   },
    { top: '58%', left: '42%',  size: 34, op: 0.30, flip: false, rot: -4  },
    { top: '63%', left: '65%',  size: 24, op: 0.26, flip: true,  rot: 3   },
    { top: '57%', left: '84%',  size: 38, op: 0.30, flip: false, rot: -3  },
    { top: '78%', left: '8%',   size: 40, op: 0.32, flip: false, rot: -5  },
    { top: '75%', left: '30%',  size: 26, op: 0.27, flip: true,  rot: 2   },
    { top: '80%', left: '58%',  size: 30, op: 0.28, flip: false, rot: -3  },
    { top: '76%', left: '80%',  size: 22, op: 0.25, flip: true,  rot: 4   },
    { top: '82%', left: '93%',  size: 36, op: 0.30, flip: false, rot: -2  },
    { top: '33%', left: '15%',  size: 20, op: 0.24, flip: true,  rot: 5   },
    { top: '50%', left: '50%',  size: 18, op: 0.22, flip: false, rot: -6  },
    { top: '68%', left: '20%',  size: 24, op: 0.26, flip: true,  rot: 3   },
    { top: '12%', left: '45%',  size: 20, op: 0.24, flip: false, rot: -4  },
  ];

  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      {ships.map((s, i) => (
        <PinisiIcon
          key={i}
          size={s.size}
          opacity={s.op}
          flip={s.flip}
          rotate={s.rot}
          style={{ top: s.top, left: s.left }}
        />
      ))}
    </div>
  );
}