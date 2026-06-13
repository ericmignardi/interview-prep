// ── M2: RegisterPage ──────────────────────────────────────────────────────────
// TODO (Milestone 2): Implement registration form
//
// Same shape as LoginPage but adds a `name` field.
// POST /api/auth/register { email, name, password }
// On success: setUser(data.user) + navigate('/notes')

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import type { User } from '../context/AuthContext';

export default function RegisterPage() {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', name: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO
  }

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div>
      <h1>Create account</h1>
      <form onSubmit={handleSubmit}>
        <label>Name<input type="text" value={form.name} onChange={update('name')} required /></label>
        <label>Email<input type="email" value={form.email} onChange={update('email')} required /></label>
        <label>Password<input type="password" value={form.password} onChange={update('password')} required minLength={8} /></label>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>{submitting ? 'Creating…' : 'Create account'}</button>
      </form>
      <p>Have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
