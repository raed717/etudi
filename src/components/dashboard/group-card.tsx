import Link from "next/link";
import { PendingBadge } from "./pending-badge";

type GroupCardProps = {
  id: string;
  classId: string;
  name: string;
  joinCode: string;
  memberCount: number;
  pendingCount: number;
};

export function GroupCard({
  id,
  classId,
  name,
  joinCode,
  memberCount,
  pendingCount,
}: GroupCardProps) {
  return (
    <Link
      href={`/classes/${classId}/groups/${id}`}
      className="card gc-root"
      style={{ textDecoration: "none", display: "block" }}
    >
      <div className="gc-inner">
        {/* Header */}
        <div className="gc-header">
          <h4 className="gc-name">{name || "Group"}</h4>
          {pendingCount > 0 && <PendingBadge count={pendingCount} size="sm" />}
        </div>

        {/* Join code */}
        <div className="gc-code-row">
          <span className="gc-code-label">Join code</span>
          <span className="gc-code">{joinCode}</span>
        </div>

        {/* Stats */}
        <div className="gc-stats">
          <span className="gc-stat">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M2 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
            {memberCount} member{memberCount !== 1 ? "s" : ""}
          </span>
          {pendingCount > 0 && (
            <span className="gc-stat gc-stat-pending">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 4v4l2.5 1.25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {pendingCount} pending
            </span>
          )}
        </div>
      </div>

      <style>{`
        .gc-inner {
          padding: clamp(16px, 2.5vw, 24px);
        }
        .gc-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .gc-name {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.05rem;
          color: var(--forest);
          margin: 0;
          letter-spacing: -0.01em;
        }
        .gc-code-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 14px;
        }
        .gc-code-label {
          font-family: var(--font-body);
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.4;
        }
        .gc-code {
          font-family: "SF Mono", "Fira Code", monospace;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: var(--forest);
          background: rgba(30,58,47,0.06);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .gc-stats {
          display: flex;
          gap: 14px;
          border-top: 1px solid rgba(30,58,47,0.06);
          padding-top: 12px;
        }
        .gc-stat {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-body);
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--forest);
          opacity: 0.5;
        }
        .gc-stat-pending {
          color: var(--terracotta);
          opacity: 1;
        }
      `}</style>
    </Link>
  );
}
