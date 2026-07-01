import PageHeader from '@/components/shared/PageHeader';
import { mockDocuments } from '@/data/mockData';

export default function EmployeeDocuments() {
  const handleDownload = (name: string) => {
    alert(`Downloading "${name}"... (Demo)`);
  };

  return (
    <div className="page-shell">
      <PageHeader title="Employment Documents" description="View and download your employment documents" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="card flex flex-col">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-ink-900">{doc.name}</h3>
                <p className="text-xs text-ink-500">{doc.type} · {doc.size}</p>
                <p className="text-xs text-ink-400">Uploaded: {doc.uploadDate}</p>
              </div>
            </div>
            <button onClick={() => handleDownload(doc.name)} className="btn-secondary mt-4 text-xs">
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
