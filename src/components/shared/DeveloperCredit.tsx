import { developerInfo } from '@/config/developerInfo';

type Variant = 'showcase' | 'footer' | 'sidebar' | 'compact';

interface DeveloperCreditProps {
  variant?: Variant;
  className?: string;
  collapsed?: boolean;
}

function Avatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-9 w-9 text-xs',
    md: 'h-14 w-14 text-lg',
    lg: 'h-20 w-20 text-2xl',
  };

  return (
    <div className={`developer-avatar ${sizes[size]} shrink-0`}>
      <span className="relative z-10 font-extrabold tracking-tight">{developerInfo.initials}</span>
      <span className="developer-avatar-ring" aria-hidden />
    </div>
  );
}

export default function DeveloperCredit({ variant = 'compact', className = '', collapsed = false }: DeveloperCreditProps) {
  if (variant === 'showcase') {
    return (
      <section id="developer" className={`scroll-mt-20 py-16 sm:py-20 lg:py-24 ${className}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="developer-showcase relative overflow-hidden rounded-3xl border border-primary-200/60 p-6 sm:p-10 lg:p-12">
            <div className="developer-sparkle developer-sparkle-1" aria-hidden />
            <div className="developer-sparkle developer-sparkle-2" aria-hidden />
            <div className="developer-sparkle developer-sparkle-3" aria-hidden />

            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="text-center lg:text-left">
                <span className="section-tag">Crafted With Passion</span>
                <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl lg:text-4xl">
                  Meet the{' '}
                  <span className="text-gradient">Developer</span>
                </h2>
                <p className="mt-3 text-sm text-ink-500 sm:text-base">{developerInfo.tagline}</p>

                <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
                  <Avatar size="lg" />
                  <div className="text-center lg:text-left">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary-600">
                      {developerInfo.role}
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-ink-900 sm:text-2xl">
                      {developerInfo.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink-500">{developerInfo.title}</p>
                    <p className="mt-2 text-xs font-semibold text-accent-600">{developerInfo.funLine}</p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {developerInfo.builtWith.map((tech) => (
                    <span key={tech} className="developer-tech-chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 xs:grid-cols-2">
                {developerInfo.highlights.map((item) => (
                  <div key={item.label} className="developer-highlight-card">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="mt-2 font-bold text-ink-900">{item.label}</p>
                    <p className="mt-0.5 text-xs text-ink-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="relative mt-8 text-center text-xs font-medium text-ink-400">
              {developerInfo.emoji} Designed & developed end-to-end by{' '}
              <span className="font-bold text-primary-700">{developerInfo.name}</span>
              {' '}— School Employees Management System
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`developer-footer-strip ${className}`}>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="sm" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary-600">Developer</p>
              <p className="font-extrabold text-ink-900">{developerInfo.name}</p>
            </div>
          </div>
          <p className="max-w-md text-center text-xs text-ink-500 sm:text-right">
            {developerInfo.funLine}
          </p>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    if (collapsed) {
      return (
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-[10px] font-extrabold text-white shadow-glow-sm ring-1 ring-primary-400/30 ${className}`}
          title={`Built by ${developerInfo.name}`}
        >
          {developerInfo.initials}
        </div>
      );
    }

    return (
      <div className={`developer-sidebar-credit ${className}`} title={`Built by ${developerInfo.name}`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 text-[10px] font-extrabold text-white shadow-glow-sm">
          {developerInfo.initials}
        </div>
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold uppercase tracking-wider text-primary-300/90">Developer</p>
          <p className="truncate text-xs font-bold text-white">{developerInfo.name}</p>
        </div>
      </div>
    );
  }

  // compact — auth pages & inline
  return (
    <div className={`developer-compact ${className}`}>
      <Avatar size="sm" />
      <p className="text-xs text-ink-500">
        Built with {developerInfo.emoji} by{' '}
        <span className="font-bold text-primary-700">{developerInfo.name}</span>
        <span className="hidden sm:inline"> · {developerInfo.role}</span>
      </p>
    </div>
  );
}
