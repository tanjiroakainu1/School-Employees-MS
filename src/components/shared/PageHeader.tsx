interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  badge?: string;
}

export default function PageHeader({ title, description, actions, badge }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          {badge && <span className="section-tag mb-2">{badge}</span>}
          <h1 className="page-title">{title}</h1>
          {description && <p className="page-subtitle">{description}</p>}
        </div>
        {actions && (
          <div className="relative flex shrink-0 flex-wrap gap-2 sm:justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
