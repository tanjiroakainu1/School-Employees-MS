interface SectionIntroProps {
  tag: string;
  title: string;
  description?: string;
  className?: string;
}

export default function SectionIntro({ tag, title, description, className = '' }: SectionIntroProps) {
  return (
    <div className={`section-intro ${className}`}>
      <span className="section-tag">{tag}</span>
      <h2 className="section-heading mt-3">{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  );
}
