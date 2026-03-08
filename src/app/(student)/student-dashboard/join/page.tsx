"use client";

import { useActionState, useRef, useEffect, useState } from "react";
import Link from "next/link";
import { joinGroup } from "@/server/actions/students";

type ActionState = {
  error: string | null;
  success?: boolean;
};

const initialState: ActionState = { error: null };

export default function JoinGroupPage() {
  const [state, formAction, isPending] = useActionState(joinGroup, initialState);
  const [code, setCode] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Handle individual character input
  function handleInput(index: number, value: string) {
    // Only allow alphanumeric characters
    const char = value.toUpperCase().replace(/[^A-Z2-9]/g, "");
    if (!char) return;

    const newCode = code.split("");
    newCode[index] = char[0];
    const joined = newCode.join("");
    setCode(joined);

    // Move focus to next input
    if (index < 5 && char) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = code.split("");
      if (newCode[index]) {
        newCode[index] = "";
        setCode(newCode.join(""));
      } else if (index > 0) {
        newCode[index - 1] = "";
        setCode(newCode.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .toUpperCase()
      .replace(/[^A-Z2-9]/g, "")
      .slice(0, 6);
    setCode(pasted);
    // Focus the input after the last pasted character
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }

  // Reset on success so they can join another
  useEffect(() => {
    if (state.success) {
      setCode("");
      inputRefs.current[0]?.focus();
    }
  }, [state.success]);

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(28px, 4vw, 40px)" }}>
        <Link href="/student-dashboard" className="jg-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to dashboard
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            letterSpacing: "-0.03em",
            color: "var(--forest)",
            margin: "16px 0 0",
            lineHeight: 1.1,
          }}
        >
          Join a group
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            color: "var(--forest)",
            opacity: 0.55,
            margin: "10px 0 0",
            lineHeight: 1.5,
          }}
        >
          Enter the 6-character code your teacher gave you.
        </p>
      </div>

      {/* ── Code form ── */}
      <div className="animate-fade-up delay-100">
        <form action={formAction} className="jg-form">
          {/* Hidden input carries the full code value */}
          <input type="hidden" name="join_code" value={code} />

          <div className="jg-code-grid" onPaste={handlePaste}>
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="text"
                maxLength={1}
                className={`jg-code-char${code[i] ? " jg-code-filled" : ""}`}
                value={code[i] || ""}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                autoComplete="off"
                aria-label={`Character ${i + 1}`}
              />
            ))}
          </div>

          {/* Error message */}
          {state.error && (
            <div className="jg-message jg-error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M8 5v3.5M8 10.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {state.error}
            </div>
          )}

          {/* Success message */}
          {state.success && (
            <div className="jg-message jg-success">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
                <path d="M5.5 8l2 2 3-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Request sent! Your teacher will review it shortly.
            </div>
          )}

          <button
            type="submit"
            className="btn-primary jg-submit"
            disabled={isPending || code.length < 6}
          >
            {isPending ? (
              <>
                <span className="jg-spinner" />
                Joining...
              </>
            ) : (
              "Join group"
            )}
          </button>
        </form>
      </div>

      {/* ── Help text ── */}
      <div className="animate-fade-up delay-200" style={{ marginTop: 40 }}>
        <div className="jg-help">
          <h3 className="jg-help-title">How does it work?</h3>
          <ol className="jg-help-steps">
            <li>Your teacher creates a class group and shares a 6-character code</li>
            <li>You enter the code above to request to join</li>
            <li>Your teacher approves your request</li>
            <li>Once approved, you can access the group&apos;s lessons and materials</li>
          </ol>
        </div>
      </div>

      <style>{`
        .jg-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.5;
          text-decoration: none;
          transition: opacity 0.15s;
        }
        .jg-back:hover {
          opacity: 0.8;
        }

        .jg-form {
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* ── Code grid ── */
        .jg-code-grid {
          display: flex;
          gap: 8px;
        }
        .jg-code-char {
          width: 54px;
          height: 64px;
          border: 2px solid rgba(30,58,47,0.12);
          border-radius: 14px;
          background: white;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--forest);
          text-align: center;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          caret-color: var(--sky);
        }
        .jg-code-char:focus {
          border-color: var(--sky);
          box-shadow: 0 0 0 3px rgba(125,181,200,0.2);
        }
        .jg-code-filled {
          background: rgba(125,181,200,0.06);
          border-color: rgba(125,181,200,0.3);
        }

        @media (max-width: 480px) {
          .jg-code-char {
            width: 44px;
            height: 54px;
            font-size: 1.2rem;
            border-radius: 10px;
          }
          .jg-code-grid {
            gap: 6px;
          }
        }

        /* ── Messages ── */
        .jg-message {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: 0.84rem;
          line-height: 1.5;
        }
        .jg-message svg {
          flex-shrink: 0;
          margin-top: 1px;
        }
        .jg-error {
          background: rgba(200,97,58,0.08);
          color: var(--terracotta);
          border: 1px solid rgba(200,97,58,0.15);
        }
        .jg-success {
          background: rgba(45,90,67,0.08);
          color: var(--forest-mid);
          border: 1px solid rgba(45,90,67,0.15);
        }

        /* ── Submit ── */
        .jg-submit {
          font-size: 0.92rem;
          padding: 13px 28px;
          width: 100%;
          justify-content: center;
        }
        .jg-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ── Spinner ── */
        .jg-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(247,243,235,0.3);
          border-top-color: var(--cream);
          border-radius: 50%;
          animation: jg-spin 0.6s linear infinite;
        }
        @keyframes jg-spin {
          to { transform: rotate(360deg); }
        }

        /* ── Help section ── */
        .jg-help {
          background: rgba(30,58,47,0.03);
          border: 1px solid rgba(30,58,47,0.06);
          border-radius: 16px;
          padding: clamp(20px, 3vw, 28px);
          max-width: 480px;
        }
        .jg-help-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1rem;
          color: var(--forest);
          margin: 0 0 14px;
        }
        .jg-help-steps {
          margin: 0;
          padding: 0 0 0 20px;
          font-family: var(--font-body);
          font-size: 0.84rem;
          color: var(--forest);
          opacity: 0.6;
          line-height: 1.8;
        }
        .jg-help-steps li {
          padding-left: 4px;
        }
        .jg-help-steps li::marker {
          color: var(--sky);
          font-weight: 700;
        }
      `}</style>
    </div>
  );
}
