"use client";

import { approveStudent, rejectStudent } from "@/server/actions/classes";
import { useTransition } from "react";

type StudentRowProps = {
  memberId: string;
  groupId: string;
  classId: string;
  studentName: string;
  studentEmail: string;
  status: "pending" | "approved" | "rejected";
  joinedAt: string;
};

export function StudentRow({
  memberId,
  groupId,
  classId,
  studentName,
  studentEmail,
  status,
  joinedAt,
}: StudentRowProps) {
  const [isPending, startTransition] = useTransition();

  const joinDate = new Date(joinedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  function handleApprove() {
    startTransition(() => {
      approveStudent(memberId, groupId, classId);
    });
  }

  function handleReject() {
    startTransition(() => {
      rejectStudent(memberId, groupId, classId);
    });
  }

  const statusColor =
    status === "approved"
      ? "var(--forest)"
      : status === "rejected"
        ? "var(--terracotta)"
        : "var(--gold)";

  const statusBg =
    status === "approved"
      ? "rgba(30,58,47,0.08)"
      : status === "rejected"
        ? "rgba(200,97,58,0.1)"
        : "rgba(212,168,67,0.12)";

  return (
    <div
      className="sr-root"
      style={{ opacity: isPending ? 0.5 : 1 }}
    >
      {/* Student info */}
      <div className="sr-info">
        <div className="sr-avatar">
          <span className="sr-initials">
            {studentName
              .split(" ")
              .slice(0, 2)
              .map((w) => w[0])
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <div className="sr-text">
          <span className="sr-name">{studentName}</span>
          <span className="sr-email">{studentEmail}</span>
        </div>
      </div>

      {/* Status / date */}
      <div className="sr-meta">
        <span className="sr-date">{joinDate}</span>
        <span
          className="sr-status"
          style={{ color: statusColor, background: statusBg }}
        >
          {status}
        </span>
      </div>

      {/* Actions */}
      {status === "pending" && (
        <div className="sr-actions">
          <button
            className="sr-btn sr-approve"
            onClick={handleApprove}
            disabled={isPending}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l4 4 6-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Approve
          </button>
          <button
            className="sr-btn sr-reject"
            onClick={handleReject}
            disabled={isPending}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Reject
          </button>
        </div>
      )}

      <style>{`
        .sr-root {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(30,58,47,0.06);
          transition: opacity 0.2s;
        }
        .sr-root:last-child {
          border-bottom: none;
        }
        .sr-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }
        .sr-avatar {
          flex-shrink: 0;
        }
        .sr-initials {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(30,58,47,0.08);
          color: var(--forest);
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sr-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .sr-name {
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 0.88rem;
          color: var(--forest);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sr-email {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--forest);
          opacity: 0.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sr-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .sr-date {
          font-family: var(--font-body);
          font-size: 0.75rem;
          color: var(--forest);
          opacity: 0.35;
        }
        .sr-status {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 3px 8px;
          border-radius: 999px;
        }
        .sr-actions {
          display: flex;
          gap: 6px;
          flex-shrink: 0;
        }
        .sr-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 600;
          border: 1.5px solid;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          background: none;
        }
        .sr-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .sr-approve {
          color: var(--forest);
          border-color: rgba(30,58,47,0.15);
        }
        .sr-approve:hover:not(:disabled) {
          background: rgba(30,58,47,0.06);
        }
        .sr-reject {
          color: var(--terracotta);
          border-color: rgba(200,97,58,0.15);
        }
        .sr-reject:hover:not(:disabled) {
          background: rgba(200,97,58,0.06);
        }

        @media (max-width: 640px) {
          .sr-root {
            flex-wrap: wrap;
          }
          .sr-meta {
            order: 3;
            width: 100%;
            padding-left: 46px;
          }
          .sr-actions {
            order: 2;
            margin-left: auto;
          }
        }
      `}</style>
    </div>
  );
}
