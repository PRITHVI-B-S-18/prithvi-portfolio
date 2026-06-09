import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV, LINKS } from './sections';

// Lightweight subsequence fuzzy match → score (lower = better, -1 = no match).
function fuzzyScore(query, text) {
  if (!query) return 0;
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  let score = 0;
  let lastIdx = -1;
  for (let ti = 0; ti < t.length && qi < q.length; ti += 1) {
    if (t[ti] === q[qi]) {
      score += lastIdx === -1 ? ti : ti - lastIdx; // reward contiguity / early matches
      lastIdx = ti;
      qi += 1;
    }
  }
  return qi === q.length ? score : -1;
}

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const items = useMemo(
    () => [
      ...NAV.map((n) => ({ ...n, type: 'nav', display: n.label, sub: n.cmd })),
      ...LINKS.map((l) => ({ ...l, type: 'link', display: l.label, sub: l.cmd })),
    ],
    []
  );

  const results = useMemo(() => {
    if (!query) return items;
    return items
      .map((it) => ({ it, s: Math.max(fuzzyScore(query, it.display), fuzzyScore(query, it.sub)) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => a.s - b.s)
      .map((r) => r.it);
  }, [items, query]);

  // Global open shortcuts: ⌘K / Ctrl+K, or "/" when not typing in a field.
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if ((e.metaKey || e.ctrlKey) && k === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      const typing = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // focus after the open animation begins
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const select = useCallback(
    (item) => {
      if (!item) return;
      setOpen(false);
      if (item.type === 'nav') {
        const el = document.getElementById(item.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.history.replaceState(null, '', item.id === 'top' ? '#top' : `#${item.id}`);
        }
      } else if (item.href) {
        if (item.href.startsWith('mailto') || item.href.startsWith('/')) {
          window.location.href = item.href;
        } else {
          window.open(item.href, '_blank', 'noopener,noreferrer');
        }
      }
    },
    [setOpen]
  );

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      select(results[active]);
    }
  };

  // keep active row in view
  useEffect(() => {
    const node = listRef.current?.querySelector(`[data-idx="${active}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-start sm:pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <motion.div
            className="w-full border border-phosphor/40 bg-term-bg font-terminal shadow-[0_0_40px_rgba(0,255,136,0.08)] sm:max-w-xl"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.14 }}
          >
            {/* input row */}
            <div className="flex items-center gap-2 border-b border-term-dim/30 px-4 py-3">
              <span className="text-phosphor">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="jump to… (type a section or link)"
                className="w-full bg-transparent text-sm text-term-fg placeholder-term-dim caret-phosphor outline-none"
                spellCheck={false}
                autoComplete="off"
              />
              <kbd className="hidden border border-term-dim/40 px-1.5 py-0.5 text-[10px] text-term-dim sm:block">esc</kbd>
            </div>

            {/* results */}
            <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-1">
              {results.length === 0 && (
                <div className="px-4 py-3 text-sm text-term-dim">no matches — command not found</div>
              )}
              {results.map((it, idx) => {
                const on = idx === active;
                return (
                  <button
                    key={it.id || it.label}
                    type="button"
                    data-idx={idx}
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => select(it)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm ${
                      on ? 'bg-phosphor text-term-bg' : 'text-term-fg'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={on ? 'text-term-bg' : 'text-phosphor'}>{it.type === 'nav' ? '→' : '↗'}</span>
                      {it.display}
                    </span>
                    <span className={`text-xs ${on ? 'text-term-bg/70' : 'text-term-dim'}`}>{it.sub}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-term-dim/30 px-4 py-2 text-[11px] text-term-dim">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
