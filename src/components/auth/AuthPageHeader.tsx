interface AuthPageHeaderProps {
  tag: string;
  title: string;
  description: string;
}

export default function AuthPageHeader({ tag, title, description }: AuthPageHeaderProps) {
  return (
    <div className="auth-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark opacity-30" />
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <span className="section-tag border-white/20 bg-white/10 text-white ring-white/20">{tag}</span>
        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-green-100 sm:text-base">{description}</p>
      </div>
    </div>
  );
}
