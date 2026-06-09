/**
 * Fixed top chrome — a window title bar, not a navbar. The only nav affordance
 * is the ⌘K hint, which opens the command palette.
 */
export default function TerminalChrome({ onOpenPalette }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-term-dim/25 bg-term-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-2.5 font-terminal text-xs">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full border border-term-dim/50" />
            <span className="h-2.5 w-2.5 rounded-full border border-term-dim/50" />
            <span className="h-2.5 w-2.5 rounded-full border border-phosphor/70 bg-phosphor/20" />
          </span>
          <span className="text-term-dim">
            <span className="text-phosphor">prithvi@portfolio</span>
            <span className="hidden sm:inline">: ~/portfolio</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenPalette}
          className="flex items-center gap-2 border border-term-dim/40 px-2.5 py-1 text-term-dim hover:border-phosphor hover:bg-phosphor hover:text-term-bg"
        >
          <span className="text-phosphor group-hover:text-term-bg">⌘K</span>
          <span className="hidden sm:inline">navigate</span>
        </button>
      </div>
    </header>
  );
}
