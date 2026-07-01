export function statusBadge(status: string) {
  const map: Record<string, string> = {
    active: 'badge-success',
    inactive: 'badge-danger',
    'on-leave': 'badge-warning',
    present: 'badge-success',
    late: 'badge-warning',
    absent: 'badge-danger',
    'half-day': 'badge-info',
    pending: 'badge-warning',
    approved: 'badge-success',
    rejected: 'badge-danger',
    'in-progress': 'badge-info',
    completed: 'badge-success',
    low: 'badge-info',
    medium: 'badge-warning',
    high: 'badge-danger',
  };
  return map[status] || 'badge-info';
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}
