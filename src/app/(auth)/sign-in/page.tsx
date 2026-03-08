"use client";

import { useActionState, useEffect, useRef } from "react";
import { signIn } from "@/server/actions/auth";
import type { AuthState } from "@/server/actions/auth";
import Link from "next/link";

const initialState: AuthState = { error: null };

export default function SignInPage() {
  const [state, formAction, isPending] = useActionState(signIn, initialState);
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className="auth-form-box animate-fade-up">
      {/* Mobile-only logo */}
      <a href="/" className="auth-mobile-logo" aria-label="etudi home">
        <span className="auth-logo-mark-sm">e</span>
        <span className="auth-logo-wordmark-sm">etudi</span>
      </a>

      {/* Heading */}
      <div className="auth-heading-block">
        <h1 className="auth-heading">Welcome back</h1>
        <p className="auth-subheading">
          Sign in to your teacher account to continue.
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
          <label htmlFor="email" className="auth-label">Email address</label>
          <input
            ref={emailRef}
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
          <div className="auth-label-row">
            <label htmlFor="password" className="auth-label">Password</label>
            <a href="/forgot-password" className="auth-forgot">Forgot password?</a>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••••"
            className="auth-input"
            disabled={isPending}
          />
        </div>

        <button type="submit" className="auth-submit" disabled={isPending}>
          {isPending ? (
            <>
              <span className="auth-spinner" aria-hidden />
              Signing in…
            </>
          ) : (
            <>
              Sign in
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span>or</span>
      </div>

      {/* Switch */}
      <p className="auth-switch">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="auth-switch-link">
          Create one free
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
        gap: 20px;
      }
      .auth-field { display: flex; flex-direction: column; gap: 7px; }
      .auth-label-row {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
      }
      .auth-label {
        font-family: var(--font-body);
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--forest);
        letter-spacing: 0.01em;
      }
      .auth-forgot {
        font-family: var(--font-body);
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--terracotta);
        text-decoration: none;
        opacity: 0.85;
        transition: opacity 0.15s;
      }
      .auth-forgot:hover { opacity: 1; }

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
    `}</style>
  );
}
