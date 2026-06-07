const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-all duration-200';

const variants = {
  primary: 'bg-grad text-white shadow-lg shadow-accent/20 hover:shadow-accent/40 hover:-translate-y-0.5',
  secondary: 'border border-line text-ink hover:border-accent hover:text-accent hover:-translate-y-0.5',
  ghost: 'text-muted hover:text-ink',
};

export default function Button({ href, children, variant = 'primary', external = false, className = '', ...props }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={cls}
      {...props}
    >
      {children}
    </a>
  );
}
