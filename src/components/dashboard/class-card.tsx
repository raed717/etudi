import Link from "next/link";
import type { Enums } from "@/types/supabase";

const SUBJECT_LABELS: Record<Enums<"subject">, string> = {
  mathematics: "Mathematics",
  french: "French",
  arabic: "Arabic",
  science: "Science",
  history: "History",
  geography: "Geography",
  civic_ed: "Civic Ed.",
  art: "Art",
  pe: "PE",
  english: "English",
};

const SUBJECT_COLORS: Record<Enums<"subject">, string> = {
  mathematics: "#4a7c59",
  french: "#7db5c8",
  arabic: "#c8613a",
  science: "#d4a843",
  history: "#8b6f47",
  geography: "#5a9e8f",
  civic_ed: "#7a6b8a",
  art: "#c87da8",
  pe: "#e07a55",
  english: "#5b8dbf",
};

type ClassCardProps = {
  id: string;
  name: string;
  grade: number;
  academicYear: string;
  subjects: Enums<"subject">[];
  groupCount: number;
  studentCount: number;
};

export function ClassCard({
  id,
  name,
  grade,
  academicYear,
  subjects,
  groupCount,
  studentCount,
}: ClassCardProps) {
  return (
    <Link
      href={`/classes/${id}`}
      className="card cc-root"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div className="cc-inner">
        {/* Header row: grade badge + year */}
        <div className="cc-header">
          <span className="cc-grade">Grade {grade}</span>
          <span className="cc-year">{academicYear}</span>
        </div>

        {/* Class name */}
        <h3 className="cc-name">{name || `Grade ${grade} Class`}</h3>

        {/* Subject chips */}
        {subjects.length > 0 && (
          <div className="cc-subjects">
            {subjects.slice(0, 5).map((s) => (
              <span
                key={s}
                className="cc-chip"
                style={{
                  background: `${SUBJECT_COLORS[s]}14`,
                  color: SUBJECT_COLORS[s],
                  borderColor: `${SUBJECT_COLORS[s]}25`,
                }}
              >
                {SUBJECT_LABELS[s]}
              </span>
            ))}
            {subjects.length > 5 && (
              <span className="cc-chip cc-chip-more">+{subjects.length - 5}</span>
            )}
          </div>
        )}

        {/* Footer stats */}
        <div className="cc-footer">
          <span className="cc-stat">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="8.5" y="1" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <rect x="1" y="8.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            {groupCount} group{groupCount !== 1 ? "s" : ""}
          </span>
          <span className="cc-stat">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            {studentCount} student{studentCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <style>{`
        .cc-inner {
          padding: clamp(20px, 3vw, 28px);
        }
        .cc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .cc-grade {
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--cream);
          background: var(--forest);
          border-radius: 999px;
          padding: 3px 10px;
        }
        .cc-year {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.4;
        }
        .cc-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.15rem;
          color: var(--forest);
          margin: 0 0 14px;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .cc-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 16px;
        }
        .cc-chip {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
          border: 1px solid;
          white-space: nowrap;
        }
        .cc-chip-more {
          background: rgba(30,58,47,0.06) !important;
          color: var(--forest) !important;
          border-color: rgba(30,58,47,0.1) !important;
          opacity: 0.6;
        }
        .cc-footer {
          display: flex;
          gap: 16px;
          border-top: 1px solid rgba(30,58,47,0.06);
          padding-top: 14px;
        }
        .cc-stat {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.5;
        }
      `}</style>
    </Link>
  );
}
