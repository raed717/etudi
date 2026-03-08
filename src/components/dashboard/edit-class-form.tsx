"use client";

import { useActionState } from "react";
import Link from "next/link";
import { updateClass, deleteClass, type ActionState } from "@/server/actions/classes";
import { useTransition } from "react";

const initialState: ActionState = { error: null };

type EditClassFormProps = {
  classId: string;
  currentName: string;
  currentGrade: number;
  currentYear: string;
};

export function EditClassForm({
  classId,
  currentName,
  currentGrade,
  currentYear,
}: EditClassFormProps) {
  const [state, formAction, isPending] = useActionState(updateClass, initialState);
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleDelete() {
    if (!confirm("Are you sure you want to delete this class? This action cannot be undone.")) return;
    startDeleteTransition(() => {
      deleteClass(classId);
    });
  }

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="class_id" value={classId} />
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-card)",
            border: "1.5px solid rgba(30,58,47,0.08)",
            padding: "clamp(24px, 4vw, 36px)",
            maxWidth: 640,
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

          <div className="ecf-field">
            <label className="ecf-label" htmlFor="name">Class name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={currentName}
              className="ecf-input"
              required
            />
          </div>

          <div className="ecf-field">
            <label className="ecf-label" htmlFor="grade">Grade</label>
            <select id="grade" name="grade" className="ecf-input" required defaultValue={currentGrade}>
              {[1, 2, 3, 4, 5, 6].map((g) => (
                <option key={g} value={g}>Grade {g}</option>
              ))}
            </select>
          </div>

          <div className="ecf-field">
            <label className="ecf-label" htmlFor="academic_year">Academic year</label>
            <input
              id="academic_year"
              name="academic_year"
              type="text"
              defaultValue={currentYear}
              className="ecf-input"
              required
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button
              type="submit"
              className="btn-primary"
              disabled={isPending}
              style={{ fontSize: "0.88rem", padding: "12px 28px", opacity: isPending ? 0.6 : 1 }}
            >
              {isPending ? "Saving..." : "Save changes"}
            </button>
            <Link href={`/classes/${classId}`} className="btn-secondary" style={{ fontSize: "0.88rem", padding: "12px 28px" }}>
              Cancel
            </Link>
          </div>
        </div>
      </form>

      {/* ── Danger zone ── */}
      <div
        style={{
          marginTop: 32,
          maxWidth: 640,
          background: "rgba(200,97,58,0.04)",
          border: "1.5px solid rgba(200,97,58,0.12)",
          borderRadius: "var(--radius-card)",
          padding: "clamp(20px, 3vw, 28px)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: "1rem",
            color: "var(--terracotta)",
            margin: "0 0 8px",
          }}
        >
          Danger zone
        </h3>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.82rem",
            color: "var(--forest)",
            opacity: 0.55,
            margin: "0 0 16px",
          }}
        >
          Deleting this class will also remove all its groups and student memberships.
        </p>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "9px 18px",
            borderRadius: "var(--radius-pill)",
            border: "1.5px solid var(--terracotta)",
            background: "none",
            color: "var(--terracotta)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.82rem",
            cursor: isDeleting ? "not-allowed" : "pointer",
            opacity: isDeleting ? 0.5 : 1,
            transition: "background 0.15s",
          }}
        >
          {isDeleting ? "Deleting..." : "Delete class"}
        </button>
      </div>

      <style>{`
        .ecf-field {
          margin-bottom: 22px;
        }
        .ecf-label {
          display: block;
          font-family: var(--font-body);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--forest);
          margin-bottom: 6px;
        }
        .ecf-input {
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
        .ecf-input:focus {
          border-color: var(--forest);
          box-shadow: 0 0 0 3px rgba(30,58,47,0.08);
        }
      `}</style>
    </>
  );
}
