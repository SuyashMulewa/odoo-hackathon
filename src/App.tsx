import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <span></span><span></span><span></span>
    </div>
  )
}

function App() {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('Welcome back. Your workspace is ready.')
  }

  return (
    <main className="login-page">
      <section className="intro" aria-label="AssetNexsus introduction">
        <div className="intro-content">
          <a className="brand light" href="#top" aria-label="AssetNexsus home">
            <Mark />
            <span>Asset<span>Nexsus</span></span>
          </a>
          <div className="intro-copy">
            <p className="eyebrow">ASSET INTELLIGENCE, CONNECTED</p>
            <h1>Everything your assets need. In one clear view.</h1>
            <p className="lede">Track, manage and get more from every asset across your organisation.</p>
          </div>
          <div className="feature-card">
            <div className="pulse-icon"><svg viewBox="0 0 24 24"><path d="M4 12h3l2-5 4 10 2-5h5" /></svg></div>
            <div><strong>Built for better decisions</strong><span>Real-time visibility from acquisition to retirement.</span></div>
          </div>
        </div>
        <footer>© 2026 AssetNexsus &nbsp;·&nbsp; Asset management, made simple.</footer>
      </section>

      <section className="signin" id="top">
        <div className="mobile-brand brand"><Mark /><span>Asset<span>Nexsus</span></span></div>
        <div className="form-wrap">
          <div className="welcome"><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your workspace</h2><p>Enter your details to continue to AssetNexsus.</p></div>
          <form onSubmit={submit}>
            <label htmlFor="email">Work email</label>
            <div className="input-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/></svg><input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></div>
            <div className="label-row"><label htmlFor="password">Password</label><a href="#forgot">Forgot password?</a></div>
            <div className="input-wrap"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" required /><button className="eye" type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}><svg viewBox="0 0 24 24"><path d="M2.5 12s3.3-5 9.5-5 9.5 5 9.5 5-3.3 5-9.5 5-9.5-5-9.5-5Z"/><circle cx="12" cy="12" r="2.3"/></svg></button></div>
            <label className="check"><input type="checkbox" name="remember" /><span className="box"></span>Keep me signed in</label>
            <button className="submit" type="submit">Sign in <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5"/></svg></button>
            {message && <p className="success" role="status">{message}</p>}
          </form>
          <div className="divider"><span>or continue with</span></div>
          <button className="sso" type="button"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.7h5.4a4.6 4.6 0 0 1-2 3v2.4h3.2c1.9-1.7 3-4.2 3-7.1Z"/><path fill="#34a853" d="M12 22c2.7 0 5-.9 6.7-2.6l-3.2-2.4c-.9.6-2 .9-3.5.9-2.7 0-5-1.8-5.8-4.3H2.9V16A10 10 0 0 0 12 22Z"/><path fill="#fbbc05" d="M6.2 13.6a6 6 0 0 1 0-3.7V7.5H2.9a10 10 0 0 0 0 8.9l3.3-2.8Z"/><path fill="#ea4335" d="M12 6.1c1.5 0 2.9.5 3.9 1.5l2.9-2.9C17 3.1 14.7 2 12 2a10 10 0 0 0-9.1 5.5l3.3 2.4C7 7.9 9.3 6.1 12 6.1Z"/></svg>Continue with Google</button>
          <p className="request">Need access to AssetNexsus? <a href="#request">Request an account</a></p>
        </div>
        <p className="help">Having trouble signing in? <a href="#support">Contact support</a></p>
      </section>
    </main>
  )
}

export default App
