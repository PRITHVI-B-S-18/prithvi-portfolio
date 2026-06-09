import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Prompt from './Prompt';

// Fake shell session. Commands type char-by-char; outputs appear as a block.
// Tuned to complete in ~2.2s — comfortably under the 3s budget.
const LINES = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'prithvi_b_s — software engineer @ iamneo' },
  { kind: 'cmd', text: 'cat /etc/motd' },
  { kind: 'out', text: '"I build for the day it breaks."' },
  { kind: 'cmd', text: 'ls ~/portfolio' },
  { kind: 'out', text: 'about/  experience/  projects/  skills/  contact/' },
  { kind: 'cmd', text: './launch --interface' },
  { kind: 'out', text: '[ OK ] interface mounted', ok: true },
];

function BootLine({ line }) {
  if (line.kind === 'cmd') return <Prompt command={line.text} />;
  return (
    <div className={`font-terminal text-sm leading-relaxed ${line.ok ? 'text-phosphor' : 'text-term-fg/75'}`}>
      {line.text}
    </div>
  );
}

export default function TerminalBoot({ onDone }) {
  const reduce = useReducedMotion();
  const [done, setDone] = useState([]);
  const [typing, setTyping] = useState('');
  const [finished, setFinished] = useState(false);
  const timer = useRef(null);
  const guard = useRef(false);

  const finish = useCallback(() => {
    if (guard.current) return;
    guard.current = true;
    clearTimeout(timer.current);
    setFinished(true);
    window.setTimeout(onDone, reduce ? 0 : 360);
  }, [onDone, reduce]);

  useEffect(() => {
    if (reduce) {
      finish();
      return undefined;
    }
    let i = 0;
    let ch = 0;
    const step = () => {
      if (i >= LINES.length) {
        timer.current = setTimeout(finish, 280);
        return;
      }
      const line = LINES[i];
      if (line.kind === 'out') {
        setDone((d) => [...d, line]);
        i += 1;
        timer.current = setTimeout(step, 140);
        return;
      }
      if (ch < line.text.length) {
        ch += 1;
        setTyping(line.text.slice(0, ch));
        timer.current = setTimeout(step, 18);
        return;
      }
      setDone((d) => [...d, line]);
      setTyping('');
      i += 1;
      ch = 0;
      timer.current = setTimeout(step, 90);
    };
    timer.current = setTimeout(step, 220);
    return () => clearTimeout(timer.current);
  }, [reduce, finish]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') finish();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [finish]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-term-bg"
      initial={{ opacity: 1 }}
      animate={{ opacity: finished ? 0 : 1 }}
      transition={{ duration: 0.35 }}
      aria-hidden={finished}
    >
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <div className="mb-4 font-terminal text-xs text-term-dim">portfolio_os 2.6.0 · booting session …</div>
        {done.map((l, idx) => (
          <BootLine key={idx} line={l} />
        ))}
        {typing !== '' && (
          <div className="font-terminal text-sm leading-relaxed">
            <span className="text-phosphor">prithvi@portfolio</span>
            <span className="text-term-dim">:</span>
            <span className="text-term-fg/70">~</span>
            <span className="text-term-dim">$ </span>
            <span className="text-term-fg">{typing}</span>
            <span className="term-caret" aria-hidden="true" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={finish}
        className="fixed bottom-6 right-6 z-[101] border border-term-dim/40 px-3 py-1.5 font-terminal text-xs text-term-dim hover:border-phosphor hover:bg-phosphor hover:text-term-bg"
      >
        [ esc ] skip
      </button>
    </motion.div>
  );
}
