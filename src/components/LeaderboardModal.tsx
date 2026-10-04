import React, { useState } from 'react';
import { LeaderboardRow, AdminSettings } from '../types/admin';
import { X, Trophy, Lock, Search } from 'lucide-react';

interface LeaderboardModalProps {
  rows: LeaderboardRow[];
  settings: AdminSettings;
  currentUserId?: string;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  rows,
  settings,
  currentUserId,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = rows.filter(r => {
    if (deptFilter !== 'All' && r.department !== deptFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return r.displayName.toLowerCase().includes(q) || r.rollNumber.toLowerCase().includes(q);
    }
    return true;
  });

  const currentUserRow = rows.find(r => r.uid === currentUserId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-50/75 border-b border-neutral-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-neutral-900">College Leaderboard</h2>
              {settings.leaderboardFrozen && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700 font-mono flex items-center gap-1 font-medium">
                  <Lock size={10} /> Frozen
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Francis Xavier Engineering College · Real-time rankings
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Frozen Banner if active */}
        {settings.leaderboardFrozen && (
          <div className="px-6 py-2 bg-amber-50 border-b border-amber-200 text-xs text-amber-800 flex items-center gap-2 font-medium">
            <Lock size={12} className="shrink-0" />
            <span>Leaderboard is frozen during the contest session.</span>
          </div>
        )}

        {/* Current user rank highlight */}
        {currentUserRow && (
          <div className="px-6 py-2.5 bg-neutral-50 border-b border-neutral-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Your Rank:</span>
              <span className="font-bold text-neutral-900 font-mono text-sm">#{currentUserRow.rank}</span>
              <span className="text-neutral-300">·</span>
              <span className="font-medium text-neutral-900">{currentUserRow.displayName}</span>
            </div>
            <div className="font-mono">
              <span className="font-semibold text-neutral-900">{currentUserRow.solvedCount} Solved</span>
              <span className="text-neutral-400 mx-1.5">·</span>
              <span className="font-bold text-neutral-900">{currentUserRow.score} pts</span>
            </div>
          </div>
        )}

        {/* Search & Filter */}
        <div className="flex items-center gap-2.5 p-3.5 bg-white border-b border-neutral-100">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by student name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 focus:outline-none"
            />
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1 text-xs text-neutral-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Departments</option>
            <option value="Computer Science & Engineering">CSE</option>
            <option value="Information Technology">IT</option>
            <option value="Artificial Intelligence & Data Science">AI & DS</option>
            <option value="Electronics & Communication Engineering">ECE</option>
            <option value="Electrical & Electronics Engineering">EEE</option>
            <option value="Mechanical Engineering">Mechanical</option>
          </select>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white divide-y divide-neutral-100 text-xs">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-neutral-50/75 text-neutral-500 font-medium border-b border-neutral-200/80">
              <tr>
                <th className="py-2.5 px-4 w-16">Rank</th>
                <th className="py-2.5 px-4">Student</th>
                <th className="py-2.5 px-4">Department</th>
                <th className="py-2.5 px-4 text-center font-mono">Solved</th>
                <th className="py-2.5 px-4 text-right font-mono">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-mono">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-neutral-400 font-sans">
                    No students found.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr
                    key={row.uid}
                    className={`hover:bg-neutral-50/60 transition-colors ${
                      row.uid === currentUserId ? 'bg-neutral-50 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2.5 px-4 font-bold text-neutral-800">
                      {row.rank === 1 ? '🥇 #1' :
                       row.rank === 2 ? '🥈 #2' :
                       row.rank === 3 ? '🥉 #3' : `#${row.rank}`}
                    </td>
                    <td className="py-2.5 px-4 font-sans">
                      <div className="font-medium text-neutral-900">
                        {row.displayName}
                        {row.uid === currentUserId && (
                          <span className="text-[10px] ml-1.5 px-1 rounded bg-neutral-200 text-neutral-800 font-mono">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono">{row.rollNumber}</span>
                    </td>
                    <td className="py-2.5 px-4 font-sans text-neutral-600">
                      {row.department.replace('&', '·')}
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold text-neutral-900">
                      {row.solvedCount}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-neutral-900">
                      {row.score} pts
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
