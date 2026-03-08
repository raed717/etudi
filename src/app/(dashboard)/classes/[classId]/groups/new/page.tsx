"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { createGroup, type ActionState } from "@/server/actions/classes";

const initialState: ActionState = { error: null };

export default function NewGroupPage() {
  const params = useParams<{ classId: string }>();
  const classId = params.classId;
  const [state, formAction, isPending] = useActionState(createGroup, initialState);

  return (
    <div style={{ padding: "clamp(24px, 4vw, 48px) clamp(20px, 4vw, 40px)" }}>
      {/* ── Header ── */}
      <div className="animate-fade-up" style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}>
        <Link
          href={`/classes/${classId}`}
          className="ng-back"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to class
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
          Create a new group
        </h1>
      </div>

      {/* ── Form ── */}
      <form action={formAction} className="animate-fade-up delay-100">
        <input type="hidden" name="class_id" value={classId} />
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-card)",
            border: "1.5px solid rgba(30,58,47,0.08)",
            padding: "clamp(24px, 4vw, 36px)",
            maxWidth: 480,
          }}
        >
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

          <div style={{ marginBottom: 22 }}>
            <label
              htmlFor="name"
              style={{
                display: "block",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "var(--forest)",
                marginBottom: 6,
              }}
            >
              Group name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder='e.g. "Group A" or "Morning Session"'
              className="ng-input"
              required
            />
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.78rem",
              color: "var(--forest)",
              opacity: 0.45,
              margin: "0 0 20px",
              lineHeight: 1.5,
            }}
          >
            A unique 6-character join code will be generated automatically. Students can use it to request to join this group.
          </p>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isPending}
              style={{ fontSize: "0.88rem", padding: "12px 28px", opacity: isPending ? 0.6 : 1 }}
            >
              {isPending ? "Creating..." : "Create group"}
            </button>
            <Link href={`/classes/${classId}`} className="btn-secondary" style={{ fontSize: "0.88rem", padding: "12px 28px" }}>
              Cancel
            </Link>
          </div>
        </div>
      </form>

      <style>{`
        .ng-back {
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.5;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
          transition: opacity 0.15s;
        }
        .ng-back:hover {
          opacity: 0.8;
        }
        .ng-input {
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
        .ng-input:focus {
          border-color: var(--forest);
          box-shadow: 0 0 0 3px rgba(30,58,47,0.08);
        }
        .ng-input::placeholder {
          color: var(--forest);
          opacity: 0.3;
        }
      `}</style>
    </div>
  );
}
