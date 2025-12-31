 "use client";
import { createContext, useContext, useState, useEffect } from 'react';

const UIContext = createContext();

export function UIProvider({ children }) {
  const [toast, setToast] = useState({ msg: '', type: 'info' });

  const showToast = (msg, type = 'info') => {
    setToast({ msg, type });
    // Auto clear after 3 seconds
    setTimeout(() => setToast({ msg: '', type: 'info' }), 3000);
  };

  return (
    <UIContext.Provider value={{ showToast }}>
      {children}
      {/* Global Toast Component */}
      {toast.msg && (
        <div className={`fixed bottom-5 right-5 px-4 py-2 rounded shadow-lg text-white z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-slate-800'}`}>
          {toast.msg}
        </div>
      )}
    </UIContext.Provider>
  );
}

export const useUI = () => useContext(UIContext);