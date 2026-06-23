import {
  useEffect,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useSession } from './SessionProvider'

export function LoginPage() {
  const { session } = useSession()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  // Already signed in → leave the login screen.
  useEffect(() => {
    if (session) navigate('/', { replace: true })
  }, [session, navigate])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    setNotice(null)
    try {
      if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        // onAuthStateChange + the effect above handle the redirect.
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        })
        if (error) throw error
        if (!data.session) {
          setNotice('Akun dibuat. Cek email Anda untuk konfirmasi, lalu masuk.')
          setMode('signin')
        }
      }
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--surface-deep)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--surface-card)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          padding: 32,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <svg viewBox="0 0 36 36" width="40" height="40">
              <circle cx="18" cy="18" r="18" fill="#142242" />
              <ellipse cx="18" cy="18" rx="8" ry="14" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <ellipse cx="18" cy="18" rx="14" ry="8" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <circle cx="18" cy="18" r="14" fill="none" stroke="#0593D5" strokeWidth="1.4" />
              <circle cx="18" cy="18" r="3" fill="#FCB017" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', lineHeight: 1 }}>
              AQOBAH
            </div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--brand-accent-deep)',
                marginTop: 2,
              }}
            >
              ERP Console
            </div>
          </div>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '18px 0 4px' }}>
          {mode === 'signin' ? 'Masuk' : 'Buat Akun'}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20 }}>
          {mode === 'signin'
            ? 'Masuk untuk mengakses konsol operasional.'
            : 'Daftarkan akun staf Aqobah.'}
        </p>

        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {mode === 'signup' && (
            <Field label="Nama lengkap">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={inputStyle}
                placeholder="Nama Anda"
              />
            </Field>
          )}
          <Field label="Email">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="nama@aqobah.com"
            />
          </Field>
          <Field label="Kata sandi">
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              placeholder="••••••••"
            />
          </Field>

          {error && <div style={{ color: 'var(--danger-500)', fontSize: 13 }}>{error}</div>}
          {notice && <div style={{ color: 'var(--success-500)', fontSize: 13 }}>{notice}</div>}

          <button
            type="submit"
            className="btn-primary"
            disabled={busy}
            style={{ justifyContent: 'center', marginTop: 4, opacity: busy ? 0.7 : 1 }}
          >
            {busy ? 'Memproses…' : mode === 'signin' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div style={{ marginTop: 18, fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
          {mode === 'signin' ? (
            <>
              Belum punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup')
                  setError(null)
                  setNotice(null)
                }}
                style={linkBtn}
              >
                Daftar
              </button>
            </>
          ) : (
            <>
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin')
                  setError(null)
                  setNotice(null)
                }}
                style={linkBtn}
              >
                Masuk
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--border-default)',
  fontFamily: 'var(--font-ui)',
  fontSize: 14,
  color: 'var(--text-primary)',
  outline: 'none',
}

const linkBtn: CSSProperties = {
  background: 'none',
  border: 'none',
  color: 'var(--text-link)',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: 13,
  padding: 0,
  fontFamily: 'var(--font-ui)',
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</span>
      {children}
    </label>
  )
}
