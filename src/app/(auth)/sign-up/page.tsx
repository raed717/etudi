"use client";

import { useActionState, useEffect, useRef } from "react";
import { signUp } from "@/server/actions/auth";
import type { AuthState } from "@/server/actions/auth";
import Link from "next/link";

const initialState: AuthState = { error: null };

export default function SignUpPage() {
  const [state, formAction, isPending] = useActionState(signUp, initialState);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // Success state — email confirmation sent
  if (state.success) {
    return (
      <div className="auth-form-box animate-fade-up">
        <AuthFormStyles />
        <div className="auth-success">
          <div className="auth-success-icon" aria-hidden>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="13" stroke="var(--forest)" strokeWidth="1.8"/>
              <path d="M8 14.5l4 4 8-9" stroke="var(--forest)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="auth-heading" style={{ textAlign: "center" }}>Check your email</h1>
          <p className="auth-subheading" style={{ textAlign: "center", marginBottom: 28 }}>
            We&apos;ve sent you a confirmation link. Click it to activate your
            account and get started with etudi.
          </p>
          <Link href="/sign-in" className="auth-submit" style={{ textDecoration: "none", justifyContent: "center" }}>
            Go to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-form-box animate-fade-up">
      {/* Mobile-only logo */}
      <a href="/" className="auth-mobile-logo" aria-label="etudi home">
        <span className="auth-logo-mark-sm">e</span>
        <span className="auth-logo-wordmark-sm">etudi</span>
      </a>

      {/* Heading */}
      <div className="auth-heading-block">
        <div className="auth-badge">
          <span className="auth-badge-dot" aria-hidden />
          Free to start
        </div>
        <h1 className="auth-heading">Create your account</h1>
        <p className="auth-subheading">
          Join 2,400+ teachers already sharing lessons with etudi.
        </p>
      </div>

      {/* Error */}
      {state.error && (
        <div className="auth-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M8 5v3.5M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {state.error}
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="auth-form" noValidate>
        <div className="auth-field">
          <label htmlFor="full_name" className="auth-label">Full name</label>
          <input
            ref={nameRef}
            id="full_name"
            name="full_name"
            type="text"
            autoComplete="name"
            required
            placeholder="Ms. Elena Torres"
            className="auth-input"
            disabled={isPending}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="email" className="auth-label">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@school.edu"
            className="auth-input"
            disabled={isPending}
          />
        </div>

        <div className="auth-field">
          <label htmlFor="password" className="auth-label">
            Password
            <span className="auth-label-hint">at least 8 characters</span>
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="••••••••"
            className="auth-input"
            disabled={isPending}
          />
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending ? (
            <>
              <span className="auth-spinner" aria-hidden />
              Creating account…
            </>
          ) : (
            <>
              Create free account
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>

        <p className="auth-terms">
          By creating an account you agree to our{" "}
          <a href="/terms" className="auth-terms-link">Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="auth-terms-link">Privacy Policy</a>.
        </p>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span>already have an account?</span>
      </div>

      {/* Switch */}
      <p className="auth-switch">
        <Link href="/sign-in" className="auth-switch-link">
          Sign in instead
        </Link>
      </p>

      <AuthFormStyles />
    </div>
  );
}

function AuthFormStyles() {
  return (
    <style>{`
      /* Box */
      .auth-form-box {
        width: 100%;
        max-width: 420px;
      }

      /* Mobile logo */
      .auth-mobile-logo {
        display: none;
        align-items: center;
        gap: 8px;
        text-decoration: none;
        margin-bottom: 36px;
      }
      .auth-logo-mark-sm {
        width: 32px; height: 32px;
        border-radius: 9px;
        background: var(--terracotta);
        display: flex; align-items: center; justify-content: center;
        font-family: var(--font-display);
        font-weight: 900; font-size: 1.1rem;
        color: var(--cream); font-style: italic;
      }
      .auth-logo-wordmark-sm {
        font-family: var(--font-display);
        font-weight: 700; font-size: 1.2rem;
        color: var(--forest); letter-spacing: -0.02em;
      }
      @media (max-width: 860px) {
        .auth-mobile-logo { display: flex; }
      }

      /* Badge */
      .auth-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        background: rgba(30,58,47,0.07);
        border: 1.5px solid rgba(30,58,47,0.10);
        border-radius: 999px;
        padding: 5px 14px;
        font-family: var(--font-body);
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--forest);
        letter-spacing: 0.04em;
        text-transform: uppercase;
        margin-bottom: 14px;
      }
      .auth-badge-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: var(--terracotta);
        animation: pulse-dot 2s ease-in-out infinite;
      }
      @keyframes pulse-dot {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:0.5; transform:scale(0.8); }
      }

      /* Headings */
      .auth-heading-block { margin-bottom: 32px; }
      .auth-heading {
        font-family: var(--font-display);
        font-weight: 700;
        font-size: clamp(1.9rem, 4vw, 2.4rem);
        letter-spacing: -0.03em;
        color: var(--forest);
        margin: 0 0 10px;
        line-height: 1.1;
      }
      .auth-subheading {
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--forest);
        opacity: 0.60;
        margin: 0;
        line-height: 1.5;
      }

      /* Error banner */
      .auth-error {
        display: flex;
        align-items: center;
        gap: 9px;
        background: rgba(200,97,58,0.09);
        border: 1.5px solid rgba(200,97,58,0.22);
        border-radius: 12px;
        padding: 12px 16px;
        font-family: var(--font-body);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--terracotta);
        margin-bottom: 24px;
      }

      /* Form */
      .auth-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .auth-field { display: flex; flex-direction: column; gap: 7px; }
      .auth-label {
        font-family: var(--font-body);
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--forest);
        letter-spacing: 0.01em;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .auth-label-hint {
        font-weight: 400;
        opacity: 0.45;
        font-size: 0.75rem;
      }

      .auth-input {
        font-family: var(--font-body);
        font-size: 0.95rem;
        color: var(--forest);
        background: white;
        border: 1.5px solid rgba(30,58,47,0.14);
        border-radius: 12px;
        padding: 13px 16px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        width: 100%;
      }
      .auth-input::placeholder { color: rgba(30,58,47,0.32); }
      .auth-input:focus {
        border-color: var(--forest-mid);
        box-shadow: 0 0 0 3px rgba(30,58,47,0.08);
      }
      .auth-input:disabled { opacity: 0.55; cursor: not-allowed; }

      /* Submit button */
      .auth-submit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        background: var(--forest);
        color: var(--cream);
        font-family: var(--font-body);
        font-weight: 600;
        font-size: 0.97rem;
        padding: 15px 24px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        margin-top: 4px;
      }
      .auth-submit:hover:not(:disabled) {
        background: var(--terracotta);
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(200,97,58,0.28);
      }
      .auth-submit:disabled { opacity: 0.60; cursor: not-allowed; }

      /* Terms */
      .auth-terms {
        font-family: var(--font-body);
        font-size: 0.78rem;
        color: var(--forest);
        opacity: 0.45;
        text-align: center;
        margin: 0;
        line-height: 1.5;
      }
      .auth-terms-link {
        color: var(--forest);
        opacity: 1;
        text-decoration: underline;
        text-decoration-color: rgba(30,58,47,0.25);
        text-underline-offset: 2px;
      }
      .auth-terms-link:hover { opacity: 0.8; }

      /* Spinner */
      .auth-spinner {
        width: 15px; height: 15px;
        border: 2px solid rgba(247,243,235,0.35);
        border-top-color: var(--cream);
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
        flex-shrink: 0;
      }
      @keyframes spin { to { transform: rotate(360deg); } }

      /* Divider */
      .auth-divider {
        display: flex;
        align-items: center;
        gap: 14px;
        margin: 24px 0;
        color: rgba(30,58,47,0.30);
        font-family: var(--font-body);
        font-size: 0.78rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .auth-divider::before,
      .auth-divider::after {
        content: "";
        flex: 1;
        height: 1px;
        background: rgba(30,58,47,0.10);
      }

      /* Switch */
      .auth-switch {
        font-family: var(--font-body);
        font-size: 0.88rem;
        color: var(--forest);
        opacity: 0.65;
        text-align: center;
        margin: 0;
      }
      .auth-switch-link {
        color: var(--forest);
        font-weight: 700;
        opacity: 1;
        text-decoration: underline;
        text-decoration-color: var(--gold);
        text-underline-offset: 3px;
      }
      .auth-switch-link:hover { color: var(--terracotta); text-decoration-color: var(--terracotta); }

      /* Success state */
      .auth-success {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        text-align: center;
      }
      .auth-success-icon {
        width: 64px; height: 64px;
        border-radius: 50%;
        background: rgba(30,58,47,0.07);
        display: flex; align-items: center; justify-content: center;
        margin-bottom: 8px;
      }
    `}</style>
  );
}
