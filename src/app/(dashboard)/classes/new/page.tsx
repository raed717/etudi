"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createClass, type ActionState } from "@/server/actions/classes";
import { SubjectPicker } from "@/components/dashboard/subject-picker";

const initialState: ActionState = { error: null };

export default function NewClassPage() {
  const [state, formAction, isPending] = useActionState(createClass, initialState);

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
        <Link
          href="/classes"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--forest)",
            opacity: 0.5,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 12,
            transition: "opacity 0.15s",
          }}
          className="nc-back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to classes
        </Link>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            letterSpacing: "-0.03em",
            color: "var(--forest)",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Create a new class
        </h1>
      </div>

      {/* ── Form ── */}
      <form action={formAction} className="animate-fade-up delay-100">
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-card)",
            border: "1.5px solid rgba(30,58,47,0.08)",
            padding: "clamp(24px, 4vw, 36px)",
            maxWidth: 640,
          }}
        >
          {/* Error */}
          {state.error && (
            <div
              style={{
                background: "rgba(200,97,58,0.08)",
                border: "1px solid rgba(200,97,58,0.2)",
                borderRadius: 10,
                padding: "12px 16px",
                fontFamily: "var(--font-body)",
                fontSize: "0.85rem",
                color: "var(--terracotta)",
                marginBottom: 24,
              }}
            >
              {state.error}
            </div>
          )}

          {/* Class name */}
          <div className="nc-field">
            <label className="nc-label" htmlFor="name">Class name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder='e.g. "5A" or "Grade 3 Morning"'
              className="nc-input"
              required
            />
          </div>

          {/* Grade */}
          <div className="nc-field">
            <label className="nc-label" htmlFor="grade">Grade</label>
            <select id="grade" name="grade" className="nc-input" required defaultValue="">
              <option value="" disabled>Select grade...</option>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>

          {/* Academic year */}
          <div className="nc-field">
            <label className="nc-label" htmlFor="academic_year">Academic year</label>
            <input
              id="academic_year"
              name="academic_year"
              type="text"
              placeholder="e.g. 2025-2026"
              className="nc-input"
              required
            />
          </div>

          {/* Subjects */}
          <div className="nc-field">
            <label className="nc-label">Subjects (optional)</label>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.78rem",
                color: "var(--forest)",
                opacity: 0.45,
                margin: "0 0 10px",
              }}
            >
              Select the subjects you teach in this class. You can add more later.
            </p>
            <SubjectPicker />
          </div>

          {/* Submit */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isPending}
              style={{ fontSize: "0.88rem", padding: "12px 28px", opacity: isPending ? 0.6 : 1 }}
            >
              {isPending ? "Creating..." : "Create class"}
            </button>
            <Link href="/classes" className="btn-secondary" style={{ fontSize: "0.88rem", padding: "12px 28px" }}>
              Cancel
            </Link>
          </div>
        </div>
      </form>

      <style>{`
        .nc-back:hover {
          opacity: 0.8 !important;
        }
        .nc-field {
          margin-bottom: 22px;
        }
        .nc-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: 6px;
        }
        .nc-input {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid rgba(30,58,47,0.12);
          background: var(--chalk);
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--forest);
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .nc-input:focus {
          border-color: var(--forest);
          box-shadow: 0 0 0 3px rgba(30,58,47,0.08);
        }
        .nc-input::placeholder {
          color: var(--forest);
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
