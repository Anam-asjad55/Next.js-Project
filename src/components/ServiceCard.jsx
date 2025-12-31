import Link from 'next/link';

export default function ServiceCard({ title, description, to, icon }) {
  const href = to.startsWith('/') ? to : `/${to}`;
  
  return (
    <Link href={href} className="block p-4 border border-slate-200 rounded-xl hover:-translate-y-0.5 transition bg-white shadow-sm">
      {icon && <div className="mb-2">{icon}</div>}
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-600 mt-1">{description}</p>
    </Link>
  );
}