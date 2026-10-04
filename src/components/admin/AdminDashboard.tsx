import React, { useState, useEffect } from 'react';
import { Problem } from '../../data/problems';
import { 
  AdminSettings, 
  StudentProfile, 
  LeaderboardRow, 
  HiddenTestVisibilityMode,
  UserRole
} from '../../types/admin';
import { 
  getAdminSettings, 
  saveAdminSettings, 
  getStoredStudents, 
  fetchStudentsFromFirestore,
  computeLeaderboard, 
  exportLeaderboardCSV, 
  freezeLeaderboard,
  assignUserRole,
  removeUserRole
} from '../../utils/adminStore';
import { PortalUser, DEVELOPER_EMAIL } from '../../firebase';
import { StudentProfileModal } from './StudentProfileModal';
import { RequestDeveloperModal } from './RequestDeveloperModal';
import { 
  ShieldCheck, 
  Users, 
  Trophy, 
  Layers, 
  Eye, 
  Lock, 
  Unlock, 
  Download, 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  FileCode,
  LogOut,
  Sparkles,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  Key,
  X,
  ShieldAlert,
  UserCog,
  UserPlus,
  Shield,
  GraduationCap,
  Trash2,
  UserCheck
} from 'lucide-react';

interface AdminDashboardProps {
  problems: Problem[];
  currentUser: PortalUser;
  onExitAdmin: () => void;
  onRefreshProblems: () => void;
  onSignOut: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  problems,
  currentUser,
  onExitAdmin,
  onRefreshProblems,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<'students' | 'controls' | 'problems' | 'roles'>('students');
  const [settings, setSettings] = useState<AdminSettings>(getAdminSettings());
  const [students, setStudents] = useState<StudentProfile[]>(getStoredStudents());
  const [leaderboardRows, setLeaderboardRows] = useState<LeaderboardRow[]>(() => computeLeaderboard(problems));

  // Modals state
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [requestProblem, setRequestProblem] = useState<Problem | null>(null);

  // Filters
  const [studentSearch, setStudentSearch] = useState('');
  const [studentDeptFilter, setStudentDeptFilter] = useState('All');
  const [problemSearch, setProblemSearch] = useState('');
  const [problemLevelFilter, setProblemLevelFilter] = useState<number | 'all'>('all');

  // Role Management State
  const [roleAssignEmail, setRoleAssignEmail] = useState('');
  const [roleAssignType, setRoleAssignType] = useState<'admin' | 'staff'>('staff');
  const [roleAssignError, setRoleAssignError] = useState<string | null>(null);
  const [roleDirectoryFilter, setRoleDirectoryFilter] = useState<'all' | 'admin' | 'staff' | 'student'>('all');
  const [roleSearch, setRoleSearch] = useState('');
  const [isAssigningRole, setIsAssigningRole] = useState(false);

  // Status & Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const isDeveloper = currentUser.role === 'developer' || currentUser.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase();

  // Guard against non-developer accounts accessing roles tab
  useEffect(() => {
    if (!isDeveloper && activeTab === 'roles') {
      setActiveTab('students');
    }
  }, [isDeveloper, activeTab]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshData = async (showCloudToast = false) => {
    setSettings(getAdminSettings());
    setIsSyncingCloud(true);
    try {
      const cloudStudents = await fetchStudentsFromFirestore();
      setStudents(cloudStudents);
      setLeaderboardRows(computeLeaderboard(problems));
      if (showCloudToast) {
        showToast(`Synced ${cloudStudents.length} student profiles from cloud`);
      }
    } catch {
      setStudents(getStoredStudents());
      setLeaderboardRows(computeLeaderboard(problems));
    } finally {
      setIsSyncingCloud(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    setLeaderboardRows(computeLeaderboard(problems));
  }, [problems]);

  const handleUpdateSetting = async <K extends keyof AdminSettings>(key: K, val: AdminSettings[K]) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    await saveAdminSettings(updated);
    showToast('Settings saved');
  };

  const handleToggleFreezeLeaderboard = async () => {
    const nextState = !settings.leaderboardFrozen;
    if (nextState) {
      freezeLeaderboard(leaderboardRows);
    }
    await handleUpdateSetting('leaderboardFrozen', nextState);
    showToast(nextState ? 'Leaderboard frozen for contest' : 'Leaderboard live');
  };

  const handleAssignRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRoleAssignError(null);
    const cleanEmail = roleAssignEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setRoleAssignError('Please enter an institutional email address.');
      return;
    }
    if (!cleanEmail.includes('@')) {
      setRoleAssignError('Please enter a valid email address.');
      return;
    }
    if (cleanEmail === DEVELOPER_EMAIL.toLowerCase()) {
      setRoleAssignError('Developer account is hardcoded and cannot be modified.');
      return;
    }

    setIsAssigningRole(true);
    try {
      await assignUserRole(cleanEmail, roleAssignType);
      showToast(`Assigned ${roleAssignType.toUpperCase()} role to ${cleanEmail}`);
      setRoleAssignEmail('');
      await refreshData();
    } catch (err: any) {
      setRoleAssignError(err.message || 'Failed to assign role');
    } finally {
      setIsAssigningRole(false);
    }
  };

  const handleRoleChange = async (email: string, newRole: UserRole) => {
    try {
      if (newRole === 'student') {
        await removeUserRole(email);
        showToast(`Reverted ${email} to default Student`);
      } else {
        await assignUserRole(email, newRole);
        showToast(`Updated ${email} to ${newRole.toUpperCase()}`);
      }
      await refreshData();
    } catch (err: any) {
      showToast(err.message || 'Error updating role');
    }
  };

  const handleToggleLevelLock = async (lvl: number) => {
    const currentLocked = new Set<number>(settings.lockedLevels || []);
    if (currentLocked.has(lvl)) {
      currentLocked.delete(lvl);
    } else {
      currentLocked.add(lvl);
    }
    await handleUpdateSetting('lockedLevels', Array.from(currentLocked));
  };

  // Filtered lists (strictly hide developer from student views)
  const displayStudents = students.filter(
    s => s.email.toLowerCase().trim() !== DEVELOPER_EMAIL.toLowerCase() && s.role !== 'developer'
  );

  const filteredStudents = displayStudents.filter(s => {
    if (studentDeptFilter !== 'All' && s.department !== studentDeptFilter) return false;
    if (studentSearch) {
      const q = studentSearch.toLowerCase();
      return (
        s.displayName.toLowerCase().includes(q) ||
        s.rollNumber.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredProblems = problems.filter(p => {
    if (problemLevelFilter !== 'all' && p.level !== problemLevelFilter) return false;
    if (problemSearch) {
      const q = problemSearch.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#fafafa] text-neutral-900 flex flex-col font-sans">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 bg-neutral-900 text-neutral-100 rounded-lg shadow-lg text-xs font-medium animate-in fade-in">
          <CheckCircle2 size={14} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Minimal Top Header */}
      <header className="bg-white border-b border-neutral-200/90 px-4 sm:px-6 py-2.5 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm tracking-tight text-neutral-900">
              FXEC Faculty Portal
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-xs text-neutral-500 font-normal">
              Francis Xavier Engineering College
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExitAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
              title="Preview coding workspace"
            >
              <ArrowLeft size={13} className="text-neutral-500" />
              <span>Coding View</span>
            </button>

            <button
              onClick={onSignOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
              title="Sign out of Faculty Portal"
            >
              <LogOut size={13} className="text-neutral-500" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Clean Segmented Tabs */}
        <div className="max-w-6xl mx-auto flex items-center gap-1 mt-2.5 pt-2 border-t border-neutral-100">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'students'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Students ({displayStudents.length})
          </button>

          <button
            onClick={() => setActiveTab('controls')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'controls'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            <span>Class Controls & Leaderboard</span>
            {settings.leaderboardFrozen && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('problems')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'problems'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
            }`}
          >
            Problem Suite ({problems.length})
          </button>

          {/* Roles & Access Tab: ONLY accessible to Developer */}
          {isDeveloper && (
            <button
              onClick={() => setActiveTab('roles')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'roles'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
              }`}
            >
              <ShieldCheck size={13} />
              <span>Roles & Access</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400 text-neutral-950 font-bold">
                Dev
              </span>
            </button>
          )}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-4">
        
        {/* ========================================================================= */}
        {/* 1. STUDENTS TAB */}
        {/* ========================================================================= */}
        {activeTab === 'students' && (
          <div className="space-y-4">
            
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by student name, roll number, or email..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <select
                  value={studentDeptFilter}
                  onChange={(e) => setStudentDeptFilter(e.target.value)}
                  className="bg-white border border-neutral-200 rounded-lg px-3 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science & Engineering">CSE</option>
                  <option value="Information Technology">IT</option>
                  <option value="Artificial Intelligence & Data Science">AI & DS</option>
                  <option value="Electronics & Communication Engineering">ECE</option>
                  <option value="Electrical & Electronics Engineering">EEE</option>
                  <option value="Mechanical Engineering">Mechanical</option>
                </select>

                <button
                  onClick={() => refreshData(true)}
                  disabled={isSyncingCloud}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-60 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  title="Fetch latest student registrations from Google Auth"
                >
                  <RefreshCw size={12} className={isSyncingCloud ? 'animate-spin text-neutral-900' : 'text-neutral-500'} />
                  <span>{isSyncingCloud ? 'Syncing...' : 'Sync Cloud'}</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50/75 text-neutral-500 font-medium border-b border-neutral-200/80">
                  <tr>
                    <th className="py-2.5 px-4 w-12">#</th>
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-4">Department</th>
                    <th className="py-2.5 px-4 w-48">Problems Solved</th>
                    <th className="py-2.5 px-4 text-right w-32">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-neutral-400 text-xs">
                        No students found matching your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st, idx) => {
                      const solvedCount = st.solvedProblems?.length || 0;
                      const pct = Math.round((solvedCount / problems.length) * 100);

                      return (
                        <tr key={st.uid} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="py-3 px-4 text-neutral-400 font-mono">{idx + 1}</td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-neutral-900 flex items-center gap-1.5">
                              <span>{st.displayName}</span>
                              <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1 py-0.5 rounded">
                                {st.rollNumber}
                              </span>
                            </div>
                            <span className="text-[11px] text-neutral-400 block font-mono">
                              {st.email}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-neutral-600">
                            {st.department.replace('&', '·')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center justify-between text-[11px] mb-1 font-mono">
                              <span className="font-semibold text-neutral-900">{solvedCount}</span>
                              <span className="text-neutral-400">/ {problems.length} ({pct}%)</span>
                            </div>
                            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                              <div className="h-full bg-neutral-900 rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedStudent(st)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 rounded-md transition-colors cursor-pointer"
                            >
                              <FileCode size={12} className="text-neutral-600" />
                              <span>View Code</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CLASS CONTROLS & LEADERBOARD TAB (STREAMLINED) */}
        {/* ========================================================================= */}
        {activeTab === 'controls' && (
          <div className="space-y-6">
            
            {/* Quick Evaluation Controls */}
            <div className="bg-white border border-neutral-200/90 rounded-xl p-4 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Evaluation & Access Policies
                  </h3>
                  <p className="text-xs text-neutral-700 mt-0.5">
                    Configure evaluation rules for your current class session.
                  </p>
                </div>

                <button
                  onClick={handleToggleFreezeLeaderboard}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    settings.leaderboardFrozen
                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {settings.leaderboardFrozen ? <Lock size={12} /> : <Unlock size={12} />}
                  <span>{settings.leaderboardFrozen ? 'Unfreeze Leaderboard' : 'Freeze Leaderboard'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Control 1: Hidden Test Cases Mode */}
                <div className="p-3 bg-neutral-50/60 border border-neutral-200/80 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-900">
                      Hidden Test Cases Policy
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {settings.hiddenTestCasesVisibility === 'strictly_hidden' ? 'Concealed' : 'Reveal Allowed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-md border border-neutral-200">
                    <button
                      onClick={() => handleUpdateSetting('hiddenTestCasesVisibility', 'strictly_hidden')}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                        settings.hiddenTestCasesVisibility === 'strictly_hidden'
                          ? 'bg-neutral-900 text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Concealed (Exam Mode)
                    </button>
                    <button
                      onClick={() => handleUpdateSetting('hiddenTestCasesVisibility', 'allow_reveal')}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                        settings.hiddenTestCasesVisibility === 'allow_reveal'
                          ? 'bg-neutral-900 text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Allow Reveal (Practice)
                    </button>
                  </div>
                </div>

                {/* Control 2: Level Locks */}
                <div className="p-3 bg-neutral-50/60 border border-neutral-200/80 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-900">
                      Level Progression Locks
                    </span>
                    <span className="text-[11px] text-neutral-500 font-mono">
                      {settings.lockedLevels?.length || 0} locked
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[1, 2, 3].map(lvl => {
                      const isLocked = settings.lockedLevels?.includes(lvl);
                      return (
                        <button
                          key={lvl}
                          onClick={() => handleToggleLevelLock(lvl)}
                          className={`py-1 px-2 text-xs font-medium rounded border transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                            isLocked
                              ? 'bg-rose-50 text-rose-700 border-rose-200'
                              : 'bg-white text-emerald-700 border-neutral-200 hover:bg-neutral-50'
                          }`}
                        >
                          {isLocked ? <Lock size={10} /> : <Unlock size={10} />}
                          <span>L{lvl}: {isLocked ? 'Locked' : 'Open'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Control 3: Role-Based Access Control Summary - Developer Only */}
                {isDeveloper && (
                  <div className="p-3 bg-neutral-50/60 border border-neutral-200/80 rounded-lg sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-neutral-700" />
                        <span className="text-xs font-semibold text-neutral-900">
                          Role-Based Access Management
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-amber-300 font-semibold">
                          Developer Console
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Configure administrative and staff access for faculty members.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('roles')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <UserCog size={13} className="text-neutral-500" />
                      <span>Manage Roles ({Object.keys(settings.roleAssignments || {}).length})</span>
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Live Leaderboard */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900">
                    Class Leaderboard
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Points: L1 = 10 pts · L2 = 20 pts · L3 = 30 pts.
                  </p>
                </div>

                <button
                  onClick={() => exportLeaderboardCSV(leaderboardRows)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Download size={13} className="text-neutral-500" />
                  <span>Export CSV</span>
                </button>
              </div>

              <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50/75 text-neutral-500 font-medium border-b border-neutral-200/80">
                    <tr>
                      <th className="py-2 px-4 w-16">Rank</th>
                      <th className="py-2 px-4">Student</th>
                      <th className="py-2 px-4">Department</th>
                      <th className="py-2 px-4 text-center font-mono">Solved</th>
                      <th className="py-2 px-4 text-right font-mono">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 font-mono">
                    {leaderboardRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-neutral-400 font-sans text-xs">
                          No students on leaderboard yet.
                        </td>
                      </tr>
                    ) : (
                      leaderboardRows.map((row) => (
                        <tr key={row.uid} className="hover:bg-neutral-50/60 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-neutral-900">
                            {row.rank === 1 ? '🥇 #1' :
                             row.rank === 2 ? '🥈 #2' :
                             row.rank === 3 ? '🥉 #3' : `#${row.rank}`}
                          </td>
                          <td className="py-2.5 px-4 font-sans">
                            <span className="font-medium text-neutral-900">{row.displayName}</span>
                            <span className="text-[10px] text-neutral-400 font-mono ml-1.5">({row.rollNumber})</span>
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
        )}

        {/* ========================================================================= */}
        {/* 3. PROBLEM SUITE TAB */}
        {/* ========================================================================= */}
        {activeTab === 'problems' && (
          <div className="space-y-4">
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search problem title..."
                    value={problemSearch}
                    onChange={(e) => setProblemSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                <select
                  value={problemLevelFilter}
                  onChange={(e) => setProblemLevelFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                  className="bg-white border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Levels</option>
                  <option value={1}>Level 1</option>
                  <option value={2}>Level 2</option>
                  <option value={3}>Level 3</option>
                </select>
              </div>

              <span className="text-xs text-neutral-500 font-mono">
                {problems.length} challenges configured
              </span>
            </div>

            {/* Problem Table */}
            <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-50/75 text-neutral-500 font-medium border-b border-neutral-200/80">
                  <tr>
                    <th className="py-2.5 px-4 w-20">Level</th>
                    <th className="py-2.5 px-4">Problem Title</th>
                    <th className="py-2.5 px-4 w-24">Difficulty</th>
                    <th className="py-2.5 px-4 w-36">Test Cases</th>
                    <th className="py-2.5 px-4 text-right w-44">Support Request</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 font-mono">
                  {filteredProblems.map((prob) => {
                    const publicCount = prob.testCases.filter(t => !t.hidden).length;
                    const hiddenCount = prob.testCases.filter(t => t.hidden).length;

                    return (
                      <tr key={prob.id} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-2.5 px-4 text-neutral-500">
                          Level {prob.level}
                        </td>
                        <td className="py-2.5 px-4 font-sans font-medium text-neutral-900">
                          {prob.title}
                        </td>
                        <td className="py-2.5 px-4 font-sans">
                          <span className={
                            prob.difficulty === 'Easy' ? 'text-emerald-600 font-medium' :
                            prob.difficulty === 'Medium' ? 'text-amber-600 font-medium' : 'text-rose-600 font-medium'
                          }>
                            {prob.difficulty}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-neutral-500 text-[11px]">
                          {publicCount} pub · <strong className="text-neutral-800">{hiddenCount} hidden</strong>
                        </td>
                        <td className="py-2.5 px-4 text-right font-sans">
                          <button
                            onClick={() => setRequestProblem(prob)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 rounded-md text-xs font-medium transition-colors cursor-pointer"
                            title="Request developer to add or adjust test cases"
                          >
                            <HelpCircle size={12} className="text-neutral-500" />
                            <span>Request Test Cases</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. ROLE-BASED ACCESS CONTROL TAB (DEVELOPER ONLY) */}
        {/* ========================================================================= */}
        {activeTab === 'roles' && isDeveloper && (() => {
          const roleAssignments = settings.roleAssignments || {};
          const assignedEntries = Object.entries(roleAssignments);
          
          // Candidate students/users for role management (never include developer)
          const allUsers = displayStudents.map(s => {
            const assigned = roleAssignments[s.email.trim().toLowerCase()];
            return {
              uid: s.uid,
              displayName: s.displayName,
              email: s.email,
              role: (assigned || 'student') as UserRole,
              department: s.department,
              rollNumber: s.rollNumber,
              solvedCount: s.solvedProblems.length
            };
          });

          const totalAdmins = allUsers.filter(u => u.role === 'admin').length;
          const totalStaff = allUsers.filter(u => u.role === 'staff').length;
          const totalStudents = allUsers.filter(u => u.role === 'student').length;

          const filteredDirectory = allUsers.filter(u => {
            if (roleDirectoryFilter !== 'all' && u.role !== roleDirectoryFilter) return false;
            if (roleSearch.trim()) {
              const q = roleSearch.toLowerCase();
              return (
                u.displayName.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q) ||
                u.rollNumber.toLowerCase().includes(q) ||
                u.department.toLowerCase().includes(q)
              );
            }
            return true;
          });

          return (
            <div className="space-y-6">
              
              {/* Top Banner: RBAC Architecture Overview */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-2xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-neutral-900" />
                      <h2 className="text-base font-semibold text-neutral-900">
                        Role-Based Access Control (RBAC)
                      </h2>
                      <span className="px-2 py-0.5 text-[11px] font-semibold bg-neutral-900 text-amber-300 rounded-full flex items-center gap-1">
                        <Sparkles size={11} className="text-amber-400" />
                        Master Developer
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 max-w-2xl">
                      Access to the administrative portal is determined strictly by account role. The Developer account can assign staff and admin permissions. Any college account not explicitly assigned defaults to <span className="font-semibold text-neutral-800">Student</span> access.
                    </p>
                  </div>

                  {/* Summary Metric Chips */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="px-3 py-1.5 bg-blue-50/60 border border-blue-200/70 rounded-lg text-center">
                      <div className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">Admins</div>
                      <div className="text-xs font-bold text-blue-900">{totalAdmins}</div>
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-50/60 border border-emerald-200/70 rounded-lg text-center">
                      <div className="text-[10px] text-emerald-600 font-medium uppercase tracking-wider">Staff</div>
                      <div className="text-xs font-bold text-emerald-900">{totalStaff}</div>
                    </div>
                    <div className="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-lg text-center">
                      <div className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Students</div>
                      <div className="text-xs font-bold text-neutral-800">{totalStudents}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Developer Action: Assign Role to Email */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-2xs space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <UserPlus size={16} className="text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">
                      Assign New Admin or Staff Role
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    Grant elevated portal access to any college account by entering their institutional email.
                  </p>
                </div>

                <form onSubmit={handleAssignRoleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-6 space-y-1">
                      <label className="block text-[11px] font-medium text-neutral-600">
                        Institutional Email Address (@francisxavier.ac.in)
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. faculty.cse@francisxavier.ac.in"
                        value={roleAssignEmail}
                        onChange={(e) => setRoleAssignEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 font-mono"
                      />
                    </div>

                    <div className="md:col-span-3 space-y-1">
                      <label className="block text-[11px] font-medium text-neutral-600">
                        Target Role
                      </label>
                      <select
                        value={roleAssignType}
                        onChange={(e) => setRoleAssignType(e.target.value as 'admin' | 'staff')}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer"
                      >
                        <option value="staff">Staff (Review & Monitor)</option>
                        <option value="admin">Admin (Full Control)</option>
                      </select>
                    </div>

                    <div className="md:col-span-3">
                      <button
                        type="submit"
                        disabled={isAssigningRole}
                        className="w-full py-2 px-4 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <UserCheck size={14} />
                        <span>{isAssigningRole ? 'Assigning...' : 'Assign Role'}</span>
                      </button>
                    </div>
                  </div>

                  {roleAssignError && (
                    <p className="text-xs text-rose-600 font-medium">{roleAssignError}</p>
                  )}

                  {/* Quick Suggestions Chips from active students list */}
                  {displayStudents.length > 0 && (
                    <div className="pt-2 border-t border-neutral-100 flex items-center flex-wrap gap-1.5">
                      <span className="text-[11px] text-neutral-500 font-medium">
                        Quick-fill from active accounts:
                      </span>
                      {displayStudents.slice(0, 5).map((s) => (
                        <button
                          key={s.uid}
                          type="button"
                          onClick={() => setRoleAssignEmail(s.email)}
                          className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] rounded transition-colors cursor-pointer font-mono"
                        >
                          {s.email}
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              {/* Assigned Faculty Roles (Admins & Staff) */}
              <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
                <div className="p-4 bg-neutral-50/75 border-b border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-900">
                      Assigned Faculty Roles (Admins & Staff)
                    </h3>
                    <p className="text-[11px] text-neutral-500">
                      Authorized faculty accounts with administrative or staff access.
                    </p>
                  </div>
                  <span className="text-xs text-neutral-600 font-mono">
                    {assignedEntries.length} Assigned
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/50 text-neutral-500 font-medium border-b border-neutral-100">
                      <tr>
                        <th className="py-2.5 px-4">Account</th>
                        <th className="py-2.5 px-4">Department / Details</th>
                        <th className="py-2.5 px-4">Role</th>
                        <th className="py-2.5 px-4">Authority Status</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {assignedEntries.map(([email, role]) => {
                        const student = students.find(s => s.email.trim().toLowerCase() === email.toLowerCase());
                        const displayName = student ? student.displayName : email.split('@')[0];
                        const dept = student ? student.department : 'Institutional Faculty';
                        const roll = student ? student.rollNumber : String(role).toUpperCase();

                        return (
                          <tr key={email} className="hover:bg-neutral-50/60 transition-colors">
                            <td className="py-3 px-4">
                              <div className="font-medium text-neutral-900">{displayName}</div>
                              <div className="text-[11px] font-mono text-neutral-600">{email}</div>
                            </td>
                            <td className="py-3 px-4 text-neutral-600">
                              <div>{dept}</div>
                              <div className="text-[11px] text-neutral-400">Roll: {roll}</div>
                            </td>
                            <td className="py-3 px-4">
                              {role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <Shield size={11} />
                                  Admin
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <GraduationCap size={11} />
                                  Staff
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-neutral-500 text-[11px]">
                              Assigned by Developer
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <select
                                  value={role}
                                  onChange={(e) => handleRoleChange(email, e.target.value as UserRole)}
                                  className="px-2 py-1 bg-white border border-neutral-200 rounded text-[11px] font-medium text-neutral-700 focus:outline-none cursor-pointer"
                                >
                                  <option value="admin">Role: Admin</option>
                                  <option value="staff">Role: Staff</option>
                                  <option value="student">Revert to Student</option>
                                </select>
                                <button
                                  onClick={() => handleRoleChange(email, 'student')}
                                  title="Revert to default Student access"
                                  className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {assignedEntries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-neutral-400 text-xs">
                            No faculty accounts currently assigned as Admin or Staff. All accounts default to Student status.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Complete User Directory with Role Filter & Inline Role Promotion */}
              <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs space-y-0">
                <div className="p-4 bg-neutral-50/75 border-b border-neutral-200/80 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xs font-semibold text-neutral-900">
                        Full User Directory & Quick Role Promotion
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Search any student or faculty to promote them to Staff/Admin or revert to Student.
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 bg-white border border-neutral-200 p-0.5 rounded-lg text-xs self-start sm:self-auto">
                      {(['all', 'admin', 'staff', 'student'] as const).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRoleDirectoryFilter(r)}
                          className={`px-2 py-0.5 rounded font-medium capitalize transition-colors cursor-pointer ${
                            roleDirectoryFilter === r
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search accounts by name, email, roll number, or department..."
                      value={roleSearch}
                      onChange={(e) => setRoleSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto max-h-96">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50/60 text-neutral-500 font-medium sticky top-0 border-b border-neutral-200/60 z-10">
                      <tr>
                        <th className="py-2.5 px-4">User</th>
                        <th className="py-2.5 px-4">Department & Roll</th>
                        <th className="py-2.5 px-4">Progress</th>
                        <th className="py-2.5 px-4">Current Role</th>
                        <th className="py-2.5 px-4 text-right">Quick Assignment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {filteredDirectory.map((user) => {
                        return (
                          <tr key={user.email} className="hover:bg-neutral-50/50 transition-colors">
                            <td className="py-2.5 px-4">
                              <div className="font-medium text-neutral-900">{user.displayName}</div>
                              <div className="text-[11px] font-mono text-neutral-500">{user.email}</div>
                            </td>
                            <td className="py-2.5 px-4 text-neutral-600">
                              <div>{user.department}</div>
                              <div className="text-[11px] text-neutral-400">Roll: {user.rollNumber}</div>
                            </td>
                            <td className="py-2.5 px-4 text-neutral-600 font-mono text-xs">
                              {user.solvedCount} solved
                            </td>
                            <td className="py-2.5 px-4">
                              {user.role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <Shield size={11} />
                                  Admin
                                </span>
                              ) : user.role === 'staff' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <GraduationCap size={11} />
                                  Staff
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-normal bg-neutral-100 text-neutral-600">
                                  Student (Default)
                                </span>
                              )}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {user.role === 'student' && (
                                  <>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'staff')}
                                      className="px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-neutral-200 hover:border-emerald-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      + Make Staff
                                    </button>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'admin')}
                                      className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-neutral-200 hover:border-blue-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      + Make Admin
                                    </button>
                                  </>
                                )}
                                {user.role === 'staff' && (
                                  <>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'admin')}
                                      className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-neutral-200 hover:border-blue-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Promote to Admin
                                    </button>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'student')}
                                      className="px-2 py-1 bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Revert to Student
                                    </button>
                                  </>
                                )}
                                {user.role === 'admin' && (
                                  <>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'staff')}
                                      className="px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-neutral-200 hover:border-emerald-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Demote to Staff
                                    </button>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'student')}
                                      className="px-2 py-1 bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Revert to Student
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {filteredDirectory.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-neutral-400 text-xs">
                            No accounts match "{roleSearch}".
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          );
        })()}

      </main>

      {/* Student Submissions & Code Modal */}
      {selectedStudent && (
        <StudentProfileModal
          student={selectedStudent}
          problems={problems}
          onClose={() => setSelectedStudent(null)}
          onRefresh={refreshData}
        />
      )}

      {/* Request Developer Modal */}
      {requestProblem && (
        <RequestDeveloperModal
          problem={requestProblem}
          onClose={() => setRequestProblem(null)}
          onSubmitted={(msg) => showToast(msg)}
        />
      )}

    </div>
  );
};
