"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../services/api';
import regEmailTest from '../../utils/regEmailTest';
import isAlphabetOnly from '../../utils/isAlphabetOnly';
import charLength from '../../utils/charLength';
import sanitizeLight from '../../utils/sanitizeLight';

export default function Registration() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    const nameSan = sanitizeLight(form.name);
    const emailSan = sanitizeLight(form.email);
    const passSan = form.password;

    if (!isAlphabetOnly(nameSan) || !charLength(nameSan, 2, 60)) {
      errs.name = 'Enter a valid name (letters, 2–60 chars)';
    }
    if (!regEmailTest(emailSan)) {
      errs.email = 'Enter a valid email';
    }
    if (!charLength(passSan, 6, 100)) {
      errs.password = 'Password must be at least 6 characters';
    }
    return errs;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setServerMsg('');

    try {
      await api.post('/register', {
        name: sanitizeLight(form.name),
        email: sanitizeLight(form.email),
        password: form.password,
      });

      setServerMsg('✅ Registered successfully! Redirecting...');
      setTimeout(() => router.push('/login'), 800);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      setServerMsg(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          {/* Inputs kept same as original */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input name="name" value={form.name} onChange={onChange} className="w-full px-3 py-2 border rounded-md" autoComplete="name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input name="email" value={form.email} onChange={onChange} className="w-full px-3 py-2 border rounded-md" autoComplete="email" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} className="w-full px-3 py-2 border rounded-md" autoComplete="new-password" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-60" disabled={submitting}>
            {submitting ? 'Signing Up…' : 'Sign Up'}
          </button>
        </form>
        {serverMsg && <p className="mt-4 text-center text-sm text-gray-700">{serverMsg}</p>}
      </div>
    </div>
  );
}