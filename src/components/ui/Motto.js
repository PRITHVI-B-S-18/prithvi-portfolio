import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Auto-cycling motto with a "decode" effect — characters scramble through
// glyphs and resolve left-to-right, like decrypting. Pauses on hover.
const PHRASES = [
  { text: '恐れより高く飛べ', glyphs: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ' },
  { text: 'Fly higher than your fear', glyphs: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ/<>=+*#0123456789' },
];

export default function Motto() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState(PHRASES[0].text);
  const [paused, setPaused] = useState(false);
  const decodeTimer = useRef(null);

  // Decode animation whenever the active phrase changes.
  // Reveal is normalized to a fixed total duration so short phrases (the
  // Japanese one) don't resolve almost instantly, while the scramble stays
  // lively at a steady tick.
  useEffect(() => {
    const { text, glyphs } = PHRASES[idx];
    if (reduce) {
      setDisplay(text);
      return undefined;
    }
    const TOTAL = 1500; // ms to fully decode, regardless of length
    const TICK = 50; // scramble refresh rate
    let elapsed = 0;
    clearInterval(decodeTimer.current);
    decodeTimer.current = setInterval(() => {
      elapsed += TICK;
      const revealed = Math.floor((elapsed / TOTAL) * text.length);
      let out = '';
      for (let i = 0; i < text.length; i += 1) {
        const ch = text[i];
        if (ch === ' ' || i < revealed) out += ch;
        else out += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setDisplay(out);
      if (elapsed >= TOTAL) {
        setDisplay(text);
        clearInterval(decodeTimer.current);
      }
    }, TICK);
    return () => clearInterval(decodeTimer.current);
  }, [idx, reduce]);

  // Auto-cycle between languages at a calm interval (text holds ~4.5s)
  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = setInterval(() => setIdx((i) => (i + 1) % PHRASES.length), 6000);
    return () => clearInterval(id);
  }, [reduce, paused]);

  return (
    <button
      type="button"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onClick={() => setIdx((i) => (i + 1) % PHRASES.length)}
      className="group inline-flex items-center gap-2.5"
      aria-label="Personal motto: Fly higher than your fear. Tap to switch language."
    >
      <span className="hidden h-px w-6 bg-line transition-colors group-hover:bg-accent sm:block" aria-hidden="true" />
      <span
        aria-hidden="true"
        className="text-gradient font-mono text-sm font-medium tracking-wide sm:text-[15px]"
        lang={idx === 0 ? 'ja' : 'en'}
      >
        {display}
      </span>
    </button>
  );
}
