import Monogram from '@/components/ui/Monogram';
import { profile } from '@/content/profile';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-6 py-12 text-center">
        <Monogram className="text-xl text-accent" />
        <p className="font-mono text-xs text-muted">Designed &amp; built by {profile.name}</p>
        <p className="font-mono text-xs text-muted">
          &copy; 2026 {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
