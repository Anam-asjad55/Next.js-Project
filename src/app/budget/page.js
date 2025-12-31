"use client";
import { useState, useEffect } from 'react';
import BudgetCalculator from '../../components/BudgetCalculator';
import MapRoutePicker from '../../components/MapRoutePicker';
import { useJourney } from '../../context/JourneyContext';
import { useUI } from '../../context/UIContext';

export default function BudgetCalculatorPage() {
  const { steps, clearSteps, budget, route, decisions, addDecision } = useJourney();
  const { showToast } = useUI();
  const [activeTab, setActiveTab] = useState('budget');

  useEffect(() => {
    if (budget && route) {
      addDecision('Consider booking stay closer to midpoint to reduce transport cost.');
    }
  }, [!!budget, !!route]); // Fixed dependency array syntax for safety

  const clearAllSteps = () => {
    clearSteps();
    showToast('History cleared');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="font-[Poppins] text-3xl font-bold mb-6">Budget Calculator</h2>

      <div className="mt-4 flex gap-2">
        {[{ id: 'overview', label: 'Overview' }, { id: 'budget', label: 'Budget' }, { id: 'route', label: 'Route' }, { id: 'history', label: 'History' }].map(t => (
          <button
            key={t.id}
            className={`px-4 py-2 rounded-xl border text-sm transition ${activeTab === t.id ? 'bg-sky-500 text-white border-sky-500' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="tile">
            <h4 className="font-semibold mb-2">System suggestions</h4>
            {decisions.length ? <ul className="text-sm mt-2 space-y-1">{decisions.map((d, i) => <li key={i}>• {d.text}</li>)}</ul> : <p className="text-sm text-slate-600">No suggestions yet.</p>}
          </div>
          {/* Other overview tiles... kept simple for brevity, paste your logic here if specific display needed, standard JSX works */}
          <div className="tile">
            <h4 className="font-semibold mb-2">Current budget</h4>
            <div className="text-xs bg-slate-50 p-3 rounded-xl overflow-auto max-h-40">{budget ? <pre>{JSON.stringify(budget, null, 2)}</pre> : <p className="text-slate-600">No budget saved.</p>}</div>
          </div>
        </div>
      )}

      {activeTab === 'budget' && <div id="budget" className="mt-8"><h3 className="font-semibold text-xl mb-3">Plan your budget</h3><BudgetCalculator /></div>}
      {activeTab === 'route' && <div id="route" className="mt-8"><h3 className="font-semibold text-xl mb-3">Route picker and pricing</h3><MapRoutePicker /></div>}
      {activeTab === 'history' && (
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="tile">
            <div className="flex justify-between items-center"><h4 className="font-semibold">Saved journey steps</h4><button onClick={clearAllSteps} className="text-xs text-rose-600 hover:underline">Clear</button></div>
            <ul className="mt-2 space-y-1 text-sm max-h-56 overflow-y-auto">{steps.slice().reverse().map((s, i) => <li key={i} className="border-b border-slate-200 pb-1"><span className="font-semibold">{s.label}</span> — {new Date(s.ts).toLocaleString()}</li>)}</ul>
          </div>
        </div>
      )}
    </div>
  );
}