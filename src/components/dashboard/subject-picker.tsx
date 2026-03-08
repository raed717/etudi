"use client";

import { useState } from "react";
import type { Enums } from "@/types/supabase";

const SUBJECTS: { value: Enums<"subject">; label: string }[] = [
  { value: "mathematics", label: "Mathematics" },
  { value: "french", label: "French" },
  { value: "arabic", label: "Arabic" },
  { value: "science", label: "Science" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "civic_ed", label: "Civic Ed." },
  { value: "art", label: "Art" },
  { value: "pe", label: "PE" },
  { value: "english", label: "English" },
];

type SubjectPickerProps = {
  selected?: Enums<"subject">[];
  name?: string;
};

export function SubjectPicker({ selected = [], name = "subjects" }: SubjectPickerProps) {
  const [picked, setPicked] = useState<Set<Enums<"subject">>>(new Set(selected));

  function toggle(subject: Enums<"subject">) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  }

  return (
    <div className="sp-grid">
      {SUBJECTS.map((s) => {
        const active = picked.has(s.value);
        return (
          <label key={s.value} className={`sp-item${active ? " sp-active" : ""}`}>
            <input
              type="checkbox"
              name={name}
              value={s.value}
              checked={active}
              onChange={() => toggle(s.value)}
              className="sp-input"
            />
            <span className="sp-check">
              {active && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="sp-label">{s.label}</span>
          </label>
        );
      })}

      <style>{`
        .sp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 8px;
        }
        .sp-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1.5px solid rgba(30,58,47,0.1);
          background: white;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          user-select: none;
        }
        .sp-item:hover {
          border-color: rgba(30,58,47,0.2);
        }
        .sp-active {
          border-color: var(--forest);
          background: rgba(30,58,47,0.04);
        }
        .sp-active:hover {
          border-color: var(--forest);
        }
        .sp-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        .sp-check {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.5px solid rgba(30,58,47,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s;
          color: var(--cream);
        }
        .sp-active .sp-check {
          background: var(--forest);
          border-color: var(--forest);
        }
        .sp-label {
          font-family: var(--font-body);
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--forest);
        }
      `}</style>
    </div>
  );
}
