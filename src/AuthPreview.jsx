import { useState } from 'react'
import logo from './assets/arendnik.png'

const PROPERTY_IMAGE = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85'

export default function AuthPreview() {
  const [mode, setMode] = useState('login')
  const [showPassword, setShowPassword] = useState(false)
  const isSignup = mode === 'signup'

  return (
    <main className="auth-preview">
      <section className="auth-visual" aria-label="Arendnik property management">
        <img className="auth-photo" src={PROPERTY_IMAGE} alt="Modern apartment building" />
        <a className="auth-brand auth-brand-light" href="/" aria-label="Arendnik home">
          <img src={logo} alt="Arendnik" />
        </a>
        <div className="auth-story">
          <span className="auth-kicker">PROPERTY MANAGEMENT</span>
          <h1>Everything connected.<br /><span>Every property in view.</span></h1>
          <p>Payments, maintenance, agreements and tenant communication in one place.</p>
        </div>
        <p className="auth-visual-foot">A clearer way to manage rental properties.</p>
      </section>

      <section className="auth-main" aria-labelledby="auth-title">
        <div className="auth-form-wrap">
          <a className="auth-brand auth-brand-mobile" href="/" aria-label="Arendnik home">
            <img src={logo} alt="Arendnik" />
          </a>
          <div className="auth-topline">
            <span>{isSignup ? 'Already have an account?' : 'New to Arendnik?'}</span>
            <button type="button" onClick={() => { setMode(isSignup ? 'login' : 'signup'); setShowPassword(false) }}>
              {isSignup ? 'Log in' : 'Create account'}
            </button>
          </div>

          <div className="auth-heading">
            <span className="auth-kicker">{isSignup ? 'GET STARTED' : 'WELCOME BACK'}</span>
            <h2 id="auth-title">{isSignup ? 'Create your account' : 'Sign in to Arendnik'}</h2>
            <p>{isSignup ? 'Set up your account to manage your properties.' : 'Enter your details to continue to your workspace.'}</p>
          </div>

          <form className="auth-form" onSubmit={event => event.preventDefault()}>
            {isSignup && (
              <label className="auth-field">
                <span>Full name</span>
                <input type="text" name="name" autoComplete="name" placeholder="Your name" required />
              </label>
            )}
            <label className="auth-field">
              <span>Email address</span>
              <input type="email" name="email" autoComplete="email" placeholder="name@example.com" required />
            </label>
            <label className="auth-field">
              <span>Password</span>
              <span className="auth-password">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                />
                <button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </span>
            </label>
            {isSignup ? (
              <label className="auth-field">
                <span>Confirm password</span>
                <input type="password" name="confirm-password" autoComplete="new-password" placeholder="Re-enter your password" required />
              </label>
            ) : (
              <div className="auth-options">
                <label className="auth-check"><input type="checkbox" name="remember" /><span>Remember me</span></label>
                <button type="button" className="auth-text-button">Forgot password?</button>
              </div>
            )}
            <button className="btn auth-submit" type="submit">{isSignup ? 'Create account' : 'Log in'}<span aria-hidden="true">→</span></button>
          </form>

          <p className="auth-legal">By continuing, you agree to use Arendnik in accordance with its terms and privacy policy.</p>
        </div>
        <footer className="auth-footer"><span>© Arendnik</span><span>Property management platform</span></footer>
      </section>
    </main>
  )
}