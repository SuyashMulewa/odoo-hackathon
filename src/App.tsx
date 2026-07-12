import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { Brand } from './components/Brand'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'
import { AppShell } from './layout/AppShell'
import './App.css'

type View = 'login' | 'register' | 'forgot'
function AppContent() {
  const { user, loading, logout } = useAuth()
  const [view, setView] = useState<View>('login')
  const [notice, setNotice] = useState('')
  const showLogin = () => { setView('login'); setNotice('') }
  if (loading) return <main className="auth-loading">Restoring your session...</main>
  if (user) return <AppShell onSignOut={logout} />
  return <main className="login-page"><section className="intro" aria-label="AssetNexsus introduction"><div className="intro-content"><Brand light /><div className="intro-copy"><p className="eyebrow">ASSET INTELLIGENCE, CONNECTED</p><h1>Everything your assets need. In one clear view.</h1><p className="lede">Track, manage and get more from every asset across your organisation.</p></div><div className="feature-card"><div className="pulse-icon"><svg viewBox="0 0 24 24"><path d="M4 12h3l2-5 4 10 2-5h5" /></svg></div><div><strong>Built for better decisions</strong><span>Real-time visibility from acquisition to retirement.</span></div></div></div><footer>© 2026 AssetNexsus · Asset management, made simple.</footer></section><section className="signin" id="top"><Brand className="mobile-brand" /><div className="form-wrap">{view === 'login' && <><div className="welcome"><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your workspace</h2><p>Enter your details to continue to AssetNexsus.</p></div>{notice && <p className="notice">{notice}</p>}<LoginForm onForgot={() => setView('forgot')} /><p className="switch-copy">New to AssetNexsus? <button className="text-link" onClick={() => setView('register')}>Create an account</button></p></>}{view === 'register' && <><div className="welcome"><p className="eyebrow">CREATE ACCOUNT</p><h2>Join AssetNexsus</h2><p>Create your Employee account to get started.</p></div><RegisterForm onComplete={() => { setView('login'); setNotice('Your Employee account has been created. Please sign in.') }} /><p className="switch-copy">Already have an account? <button className="text-link" onClick={showLogin}>Sign in</button></p></>}{view === 'forgot' && <><div className="welcome"><p className="eyebrow">PASSWORD RECOVERY</p><h2>Reset your password</h2><p>We’ll send reset instructions to your work email.</p></div><ForgotPasswordForm onBack={showLogin} /></>}</div><p className="help">Having trouble signing in? <a href="mailto:support@assetnexsus.com">Contact support</a></p></section></main>
}
export default function App() { return <AuthProvider><AppContent /></AuthProvider> }
