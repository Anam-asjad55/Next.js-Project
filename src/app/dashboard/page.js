"use client";
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     
    api.get('/dashboard')
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  // Fallback values if api fails (ensures page never crashes)
  const { name = 'Guest', email = 'Not logged in', budget, route, bookings = [] } = data || {};

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-blue-600 text-white rounded-lg p-6 mb-8">
          <h2 className="text-3xl font-bold">Welcome, 👋</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Bookings</h3>
            <p className="text-2xl font-bold text-blue-600">{bookings.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Budget total</h3>
            <p className="text-2xl font-bold text-blue-600">
              {budget?.totalBudget ? formatCurrency(budget.totalBudget) : '—'}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold">Route cost</h3>
            <p className="text-2xl font-bold text-blue-600">
              {route?.cost ? `PKR ${route.cost}` : '—'}
            </p>
          </div>
        </div>

        {/* Bookings list */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
           <h3 className="text-xl font-bold mb-4">Your bookings</h3>
           {bookings.length === 0 ? <p className="text-slate-500">No bookings yet.</p> : (
             <ul className="space-y-2">
                {bookings.map((b, i) => (
                  <li key={i} className="p-3 border rounded-lg bg-slate-50">
                    {b.title}
                  </li>
                ))}
             </ul>
           )}
        </div>
      </div>
    </div>
  );
}