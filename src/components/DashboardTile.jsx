import Link from 'next/link';

export default function DashboardTile({ to, title, desc }) {
  // Ensure 'to' uses standard href format (e.g. /path instead of just path)
  const href = to.startsWith('/') ? to : `/${to}`;
  
  return (
    <Link href={href} className="block p-4 border border-slate-200 rounded-xl hover:-translate-y-0.5 transition bg-white shadow-sm">
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-600 mt-1">{desc}</p>
    </Link>
  );
}