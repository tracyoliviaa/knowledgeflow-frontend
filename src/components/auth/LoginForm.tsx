import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { DEMO_LOGIN } from '../../services/demoData';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login fehlgeschlagen. Bitte pruefe deine Daten.');
    }
  };

  const handleDemo = () => {
    loginAsDemo();
    navigate('/dashboard');
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_LOGIN.email);
    setPassword(DEMO_LOGIN.password);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <p className="text-center text-gray-400 text-sm mb-6">KnowledgeFlow</p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-700 font-medium mb-2">Recruiter Demo</p>
          <p className="text-xs text-blue-500 mb-3">
            Sofort testen ohne Registrierung. Die Demo nutzt lokale Beispieldaten.
          </p>
          <button
            type="button"
            onClick={handleDemo}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-medium text-sm"
          >
            Demo starten
          </button>
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700"
          >
            Demo-Zugang eintragen ({DEMO_LOGIN.email} / {DEMO_LOGIN.password})
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">oder mit Account</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm">E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition text-sm"
          >
            Einloggen
          </button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Noch kein Account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Registrieren
          </a>
        </p>
      </div>
    </div>
  );
};
