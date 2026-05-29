import React, { useState } from 'react';
import './bridegroom.css';

/* ══════════════════════════════════════════════════════════
   BrideGroomSection
   Props: mempelai — array 2 item dari config.js (MEMPELAI)
   Styling: src/components/bridegroom.css
   ══════════════════════════════════════════════════════════ */

/* ── Frame SVG ornamen Bugis/cinematic ── */
function BugisFrame() {
  return (
    <svg
      viewBox="0 0 320 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg-frame-svg"
      aria-hidden="true"
    >
      {/* Frame utama — oval */}
      <ellipse cx="160" cy="175" rx="128" ry="152"
        stroke="url(#goldGrad)" strokeWidth="1.5" fill="none" />
      <ellipse cx="160" cy="175" rx="120" ry="144"
        stroke="rgba(201,168,76,0.25)" strokeWidth="0.7" fill="none" />

      {/* Ornamen atas */}
      <g transform="translate(160, 18)">
        <polygon points="0,-10 10,0 0,10 -10,0"
          stroke="rgba(201,168,76,0.9)" strokeWidth="1.2" fill="rgba(201,168,76,0.15)" />
        <line x1="0" y1="-10" x2="0" y2="-28" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8"/>
        <line x1="-22" y1="0" x2="-38" y2="0" stroke="rgba(201,168,76,0.35)" strokeWidth="0.7"/>
        <line x1="22"  y1="0" x2="38"  y2="0" stroke="rgba(201,168,76,0.35)" strokeWidth="0.7"/>
        <circle cx="0" cy="-32" r="2.5" fill="rgba(201,168,76,0.6)"/>
        <circle cx="-42" cy="0" r="2" fill="rgba(201,168,76,0.4)"/>
        <circle cx="42"  cy="0" r="2" fill="rgba(201,168,76,0.4)"/>
        <line x1="-15" y1="-5" x2="-28" y2="-14" stroke="rgba(201,168,76,0.2)" strokeWidth="0.6"/>
        <line x1="15"  y1="-5" x2="28"  y2="-14" stroke="rgba(201,168,76,0.2)" strokeWidth="0.6"/>
      </g>

      {/* Ornamen bawah */}
      <g transform="translate(160, 332)">
        <polygon points="0,-10 10,0 0,10 -10,0"
          stroke="rgba(201,168,76,0.9)" strokeWidth="1.2" fill="rgba(201,168,76,0.15)" />
        <line x1="0" y1="10" x2="0" y2="28" stroke="rgba(201,168,76,0.5)" strokeWidth="0.8"/>
        <line x1="-22" y1="0" x2="-38" y2="0" stroke="rgba(201,168,76,0.35)" strokeWidth="0.7"/>
        <line x1="22"  y1="0" x2="38"  y2="0" stroke="rgba(201,168,76,0.35)" strokeWidth="0.7"/>
        <circle cx="0" cy="32" r="2.5" fill="rgba(201,168,76,0.6)"/>
        <circle cx="-42" cy="0" r="2" fill="rgba(201,168,76,0.4)"/>
        <circle cx="42"  cy="0" r="2" fill="rgba(201,168,76,0.4)"/>
      </g>

      {/* Ornamen kiri */}
      <g transform="translate(28, 175)">
        <polygon points="0,-8 8,0 0,8 -8,0"
          stroke="rgba(201,168,76,0.7)" strokeWidth="1" fill="rgba(201,168,76,0.1)" />
        <line x1="-8" y1="0" x2="-22" y2="0" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
      </g>

      {/* Ornamen kanan */}
      <g transform="translate(292, 175)">
        <polygon points="0,-8 8,0 0,8 -8,0"
          stroke="rgba(201,168,76,0.7)" strokeWidth="1" fill="rgba(201,168,76,0.1)" />
        <line x1="8" y1="0" x2="22" y2="0" stroke="rgba(201,168,76,0.3)" strokeWidth="0.6"/>
      </g>

      {/* Corner sudut */}
      <path d="M 50 40 L 50 58 M 50 40 L 68 40"   stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      <circle cx="50"  cy="40"  r="2" fill="rgba(201,168,76,0.4)"/>
      <path d="M 270 40 L 270 58 M 270 40 L 252 40" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      <circle cx="270" cy="40"  r="2" fill="rgba(201,168,76,0.4)"/>
      <path d="M 50 310 L 50 292 M 50 310 L 68 310"   stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      <circle cx="50"  cy="310" r="2" fill="rgba(201,168,76,0.4)"/>
      <path d="M 270 310 L 270 292 M 270 310 L 252 310" stroke="rgba(201,168,76,0.3)" strokeWidth="0.8"/>
      <circle cx="270" cy="310" r="2" fill="rgba(201,168,76,0.4)"/>

      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#c9a84c" stopOpacity="0.9"/>
          <stop offset="35%"  stopColor="#e8c87a" stopOpacity="1"/>
          <stop offset="65%"  stopColor="#c9a84c" stopOpacity="0.85"/>
          <stop offset="100%" stopColor="#a07840" stopOpacity="0.7"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Foto atau placeholder di dalam frame ── */
function FramePhoto({ foto, nama }) {
  const [imgError, setImgError] = useState(false);

  if (!foto || imgError) {
    return (
      <div className="bg-photo-placeholder">
        <span className="bg-placeholder-icon">📷</span>
        <span className="bg-placeholder-label">Foto Mempelai</span>
        <span className="bg-placeholder-hint">Simpan di public/photos/</span>
      </div>
    );
  }

  return (
    <img
      src={foto}
      alt={`Foto ${nama}`}
      onError={() => setImgError(true)}
      className="bg-photo-img"
    />
  );
}

/* ── Satu card mempelai ── */
function MempelaiCard({ data, index }) {
  return (
    <div className="bg-card" style={{ animationDelay: `${index * 0.2}s` }}>

      {/* Label gelar */}
      <p className="bg-gelar">{data.gelar}</p>

      {/* Frame + Foto */}
      <div className="bg-frame-wrap">
        <div className="bg-frame-glow" />
        <FramePhoto foto={data.foto} nama={data.nama} />
        <BugisFrame />
      </div>

      {/* Nama mempelai */}
      <h3 className="bg-nama">{data.nama}</h3>

      {/* Divider */}
      <div className="bg-divider" />

      {/* Urutan anak */}
      <p className="bg-urutan">{data.urutan}</p>

      {/* Nama orang tua */}
      <p className="bg-ortu">
        {data.ayah}<br />
        <span className="bg-ortu-amp">&amp;</span>{' '}
        {data.ibu}
      </p>

      {/* Tombol Instagram */}
      <a
        href={data.igUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-ig-btn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <circle cx="12" cy="12" r="4.5"
            stroke="currentColor" strokeWidth="1.8" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
        </svg>
        {data.instagram}
      </a>
    </div>
  );
}

/* ── Separator "&" antara dua mempelai ── */
function AndSeparator() {
  return (
    <div className="bg-separator">
      <div className="bg-sep-line bg-sep-line--top" />
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <polygon points="12,2 22,12 12,22 2,12"
          stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="rgba(201,168,76,0.4)"/>
      </svg>
      <p className="bg-sep-ampersand">&amp;</p>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
        <polygon points="12,2 22,12 12,22 2,12"
          stroke="rgba(201,168,76,0.5)" strokeWidth="1" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="rgba(201,168,76,0.4)"/>
      </svg>
      <div className="bg-sep-line bg-sep-line--bottom" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KOMPONEN UTAMA
   ══════════════════════════════════════════════════════════ */
function BrideGroomSection({ mempelai }) {
  return (
    <div className="bg-section">
      <MempelaiCard data={mempelai[0]} index={0} />
      <AndSeparator />
      <MempelaiCard data={mempelai[1]} index={1} />
    </div>
  );
}

export default BrideGroomSection;