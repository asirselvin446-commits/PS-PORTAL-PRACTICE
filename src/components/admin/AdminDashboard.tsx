import React, { useState, useEffect, useMemo } from 'react';
import { Problem } from '../../data/problems';
import { 
  AdminSettings, 
  StudentProfile, 
  LeaderboardRow, 
  HiddenTestVisibilityMode,
  UserRole,
  Batch,
  Announcement
} from '../../types/admin';
import { 
  getAdminSettings, 
  saveAdminSettings, 
  fetchAdminSettingsFromFirestore,
  fetchCustomProblemsFromFirestore,
  fetchProblemOverridesFromFirestore,
  getStoredStudents, 
  fetchStudentsFromFirestore,
  computeLeaderboard, 
  exportLeaderboardCSV, 
  freezeLeaderboard,
  assignUserRole,
  removeUserRole,
  getStoredBatches,
  fetchBatchesFromFirestore,
  getStoredAnnouncements,
  fetchAnnouncementsFromFirestore,
  resetStudentProgress,
  toggleStudentLevelUnlock,
  toggleStudentSuspension,
  updateStudentRole,
  assignStudentBatch,
  bulkAssignBatch,
  bulkResetProgress,
  deleteStudent,
  bulkDeleteStudents
} from '../../utils/adminStore';
import { PortalUser, DEVELOPER_EMAIL } from '../../firebase';
import { generateReport } from '../../utils/report';
import { StudentProfileModal } from './StudentProfileModal';
import { RequestDeveloperModal } from './RequestDeveloperModal';
import { ConfirmationModal } from './ConfirmationModal';
import { BatchManageModal } from './BatchManageModal';
import { CSVImportModal } from './CSVImportModal';
import { AddStudentModal } from './AddStudentModal';
import { AnnouncementModal } from './AnnouncementModal';
import { SimilarityReviewModal } from './SimilarityReviewModal';
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
  UserCheck,
  UserMinus,
  Upload,
  FolderCheck,
  Megaphone,
  FileDown,
  RotateCcw,
  UserX,
  SlidersHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  CheckSquare,
  Square,
  FolderPlus
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
  const [studentRoleFilter, setStudentRoleFilter] = useState<'all' | UserRole>('all');
  const [studentActivityFilter, setStudentActivityFilter] = useState<'all' | '24h' | '7d' | 'inactive7d' | 'inactive30d'>('all');
  const [studentBatchFilter, setStudentBatchFilter] = useState<'all' | 'unassigned' | string>('all');

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'roll' | 'dept' | 'solved' | 'lastActive'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Multi-select bulk checkboxes
  const [selectedUids, setSelectedUids] = useState<Set<string>>(new Set());

  // Batches & Announcements State
  const [batches, setBatches] = useState<Batch[]>(getStoredBatches());
  const [announcements, setAnnouncements] = useState<Announcement[]>(getStoredAnnouncements());

  // Additional Modals
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showCSVImportModal, setShowCSVImportModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementTargets, setAnnouncementTargets] = useState<string[] | undefined>(undefined);
  const [showSimilarityModal, setShowSimilarityModal] = useState(false);
  const [bulkBatchModalOpen, setBulkBatchModalOpen] = useState(false);
  const [bulkBatchChoice, setBulkBatchChoice] = useState('');
  const [activeRowMenuUid, setActiveRowMenuUid] = useState<string | null>(null);

  // Generic Confirmation Modal state
  const [confirmModalState, setConfirmModalState] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText?: string;
    confirmVariant?: 'danger' | 'warning' | 'primary';
    requireTextMatch?: string;
    onConfirm: () => Promise<void> | void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  const [problemSearch, setProblemSearch] = useState('');
  const [problemLevelFilter, setProblemLevelFilter] = useState<number | 'all'>('all');

  const availableLevels = useMemo(() => {
    return Array.from(new Set<number>(problems.map(p => Number(p.level)))).sort((a: number, b: number) => a - b);
  }, [problems]);

  // Role Management State
  const [roleAssignEmail, setRoleAssignEmail] = useState('');
  const [roleAssignType, setRoleAssignType] = useState<UserRole>('staff');
  const [roleAssignError, setRoleAssignError] = useState<string | null>(null);
  const [roleDirectoryFilter, setRoleDirectoryFilter] = useState<'all' | 'primary_admin' | 'admin' | 'staff' | 'student'>('all');
  const [roleSearch, setRoleSearch] = useState('');
  const [isAssigningRole, setIsAssigningRole] = useState(false);

  // Status & Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);

  const isDeveloper = currentUser.role === 'developer' || currentUser.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
  const isPrimaryAdmin = currentUser.role === 'primary_admin';
  const canManageRoles = isDeveloper || isPrimaryAdmin;
  // Deployed firestore.rules allow settings/* writes only for developer,
  // primary_admin, and admin (Sub-Admin). Staff can view the dashboard but
  // their settings writes would be rejected — disable the controls instead of
  // showing a fake "Settings saved".
  const canChangeSettings = isDeveloper || isPrimaryAdmin || currentUser.role === 'admin';

  // Guard against non-authorized accounts accessing roles tab
  useEffect(() => {
    if (!canManageRoles && activeTab === 'roles') {
      setActiveTab('students');
    }
  }, [canManageRoles, activeTab]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const refreshData = async (showCloudToast = false) => {
    try {
      const latestSettings = await fetchAdminSettingsFromFirestore();
      setSettings(latestSettings);
    } catch {
      setSettings(getAdminSettings());
    }

    try {
      const latestBatches = await fetchBatchesFromFirestore();
      setBatches(latestBatches);
    } catch {}

    try {
      const latestAnn = await fetchAnnouncementsFromFirestore();
      setAnnouncements(latestAnn);
    } catch {}

    try {
      await fetchCustomProblemsFromFirestore();
      await fetchProblemOverridesFromFirestore();
      onRefreshProblems();
    } catch (e) {
      console.warn('Error refreshing custom problems from Firestore:', e);
    }

    setIsSyncingCloud(true);
    try {
      const cloudStudents = await fetchStudentsFromFirestore(showCloudToast);
      setStudents(cloudStudents);
      // Keep an open profile modal in sync — otherwise it shows stale
      // solved counts / timeline entries after actions like reset.
      setSelectedStudent(prev => prev ? (cloudStudents.find(s => s.uid === prev.uid) || null) : prev);
      setLeaderboardRows(computeLeaderboard(problems));
      if (showCloudToast) {
        showToast(`Synced ${cloudStudents.length} student profiles from cloud`, 'success');
      }
    } catch (err: any) {
      setStudents(getStoredStudents());
      setLeaderboardRows(computeLeaderboard(problems));
      if (showCloudToast) {
        const reason = err?.message || 'Unable to sync with Firestore';
        showToast(`Cloud sync failed: ${reason}`, 'error');
      }
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
    if (isPrimaryAdmin && (roleAssignType === 'primary_admin' || roleAssignType === 'developer')) {
      setRoleAssignError('Primary Administrator can only assign Sub-Admin or Staff roles.');
      return;
    }

    setIsAssigningRole(true);
    try {
      await assignUserRole(cleanEmail, roleAssignType, currentUser.role);
      const roleLabel = roleAssignType === 'primary_admin' ? 'Primary Admin' : roleAssignType === 'admin' ? 'Sub-Admin' : 'Staff';
      showToast(`Assigned ${roleLabel} role to ${cleanEmail}`);
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
        await removeUserRole(email, currentUser.role);
        showToast(`Reverted ${email} to default Student`);
      } else {
        await assignUserRole(email, newRole, currentUser.role);
        const roleLabel = newRole === 'primary_admin' ? 'Primary Admin' : newRole === 'admin' ? 'Sub-Admin' : 'Staff';
        showToast(`Updated ${email} to ${roleLabel}`);
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

  const filteredStudents = useMemo(() => {
    const list = displayStudents.filter(s => {
      if (studentDeptFilter !== 'All' && s.department !== studentDeptFilter) return false;
      if (studentRoleFilter !== 'all' && s.role !== studentRoleFilter) return false;
      if (studentBatchFilter !== 'all') {
        if (studentBatchFilter === 'unassigned') {
          if (s.batch) return false;
        } else if (s.batch !== studentBatchFilter) {
          return false;
        }
      }
      if (studentActivityFilter !== 'all') {
        const lastActiveTime = s.lastActive ? new Date(s.lastActive).getTime() : 0;
        const now = Date.now();
        const diffMs = now - lastActiveTime;
        const oneDay = 24 * 60 * 60 * 1000;
        if (studentActivityFilter === '24h') {
          if (diffMs > oneDay) return false;
        } else if (studentActivityFilter === '7d') {
          if (diffMs > 7 * oneDay) return false;
        } else if (studentActivityFilter === 'inactive7d') {
          if (diffMs <= 7 * oneDay) return false;
        } else if (studentActivityFilter === 'inactive30d') {
          if (diffMs <= 30 * oneDay) return false;
        }
      }
      if (studentSearch) {
        const q = studentSearch.toLowerCase();
        return (
          s.displayName.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.batch && s.batch.toLowerCase().includes(q))
        );
      }
      return true;
    });

    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') {
        cmp = a.displayName.localeCompare(b.displayName);
      } else if (sortField === 'roll') {
        cmp = a.rollNumber.localeCompare(b.rollNumber);
      } else if (sortField === 'dept') {
        cmp = a.department.localeCompare(b.department);
      } else if (sortField === 'solved') {
        const aCount = a.solvedProblems?.length || 0;
        const bCount = b.solvedProblems?.length || 0;
        cmp = aCount - bCount;
      } else if (sortField === 'lastActive') {
        const aTime = a.lastActive ? new Date(a.lastActive).getTime() : 0;
        const bTime = b.lastActive ? new Date(b.lastActive).getTime() : 0;
        cmp = aTime - bTime;
      }
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [displayStudents, studentDeptFilter, studentRoleFilter, studentBatchFilter, studentActivityFilter, studentSearch, sortField, sortOrder]);

  // Bulk selection helpers
  const isAllFilteredSelected = filteredStudents.length > 0 && filteredStudents.every(s => selectedUids.has(s.uid));
  const isSomeFilteredSelected = filteredStudents.some(s => selectedUids.has(s.uid)) && !isAllFilteredSelected;

  const handleToggleSelectAll = () => {
    if (isAllFilteredSelected) {
      setSelectedUids(new Set());
    } else {
      const next = new Set(selectedUids);
      filteredStudents.forEach(s => next.add(s.uid));
      setSelectedUids(next);
    }
  };

  const handleToggleSelectOne = (uid: string) => {
    const next = new Set(selectedUids);
    if (next.has(uid)) {
      next.delete(uid);
    } else {
      next.add(uid);
    }
    setSelectedUids(next);
  };

  const handleBulkExportCSV = () => {
    const selected = displayStudents.filter(s => selectedUids.has(s.uid));
    if (selected.length === 0) return;
    const header = "Name,Roll Number,Email,Department,Batch,Role,Status,Solved Count,Total Count,Percentage,Last Active\n";
    const csvRows = selected.map(s => {
      const solved = s.solvedProblems?.length || 0;
      const pct = Math.round((solved / problems.length) * 100);
      return `"${s.displayName}","${s.rollNumber}","${s.email}","${s.department}","${s.batch || 'Unassigned'}","${s.role}","${s.isSuspended ? 'Suspended' : 'Active'}",${solved},${problems.length},"${pct}%","${s.lastActive}"`;
    }).join('\n');
    const blob = new Blob([header + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fxec_students_export_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Exported ${selected.length} students to CSV`);
  };

  const handleTriggerBulkReset = () => {
    setConfirmModalState({
      isOpen: true,
      title: 'Bulk Reset Student Progress',
      message: (
        <div className="space-y-2">
          <p>
            Are you sure you want to reset all test progress for <span className="font-bold text-neutral-900">{selectedUids.size} selected students</span>?
          </p>
          <p className="text-[11px] text-rose-600 font-medium">
            This will permanently clear solved problem statuses and saved codes for these students across devices.
          </p>
        </div>
      ),
      confirmText: 'Reset Progress',
      confirmVariant: 'danger',
      onConfirm: async () => {
        await bulkResetProgress(Array.from(selectedUids));
        setSelectedUids(new Set());
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`Reset progress for ${selectedUids.size} students`);
        await refreshData();
      }
    });
  };

  const handleTriggerBulkDelete = () => {
    setConfirmModalState({
      isOpen: true,
      title: 'Bulk Delete Students (Permanent)',
      message: (
        <div className="space-y-2">
          <p>
            This action will permanently delete <span className="font-bold text-neutral-900">{selectedUids.size} selected student accounts</span> from Firestore and local cache.
          </p>
          <p className="text-[11px] text-rose-600 font-medium">
            Their submissions, solved records, and profiles cannot be recovered.
          </p>
        </div>
      ),
      confirmText: 'Permanently Delete',
      confirmVariant: 'danger',
      requireTextMatch: 'DELETE',
      onConfirm: async () => {
        await bulkDeleteStudents(Array.from(selectedUids));
        setSelectedUids(new Set());
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`Deleted ${selectedUids.size} students`);
        await refreshData();
      }
    });
  };

  const handleBulkAssignBatchSubmit = async () => {
    if (!bulkBatchChoice) return;
    await bulkAssignBatch(Array.from(selectedUids), bulkBatchChoice);
    setBulkBatchModalOpen(false);
    setSelectedUids(new Set());
    showToast(`Assigned ${selectedUids.size} students to ${bulkBatchChoice}`);
    await refreshData();
  };

  // Row Action Handlers with Confirmation Dialogs
  const handleRowResetProgress = (st: StudentProfile) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Reset Student Progress',
      message: (
        <div className="space-y-2">
          <p>
            Reset all problem solving progress for <span className="font-bold text-neutral-900">{st.displayName}</span> ({st.rollNumber})?
          </p>
          <p className="text-[11px] text-rose-600">
            This will clear their solved problems list and test scores from Firestore.
          </p>
        </div>
      ),
      confirmText: 'Reset Progress',
      confirmVariant: 'danger',
      onConfirm: async () => {
        await resetStudentProgress(st.uid);
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`Reset progress for ${st.displayName}`);
        await refreshData();
      }
    });
  };

  const handleRowToggleUnlock = (st: StudentProfile, lvl: number) => {
    const isCurrentlyUnlocked = st.unlockedLevels?.includes(lvl);
    setConfirmModalState({
      isOpen: true,
      title: `Toggle Level ${lvl} Unlock Override`,
      message: (
        <p>
          {isCurrentlyUnlocked ? 'Lock' : 'Manually unlock'} Level {lvl} for <span className="font-semibold text-neutral-900">{st.displayName}</span>?
        </p>
      ),
      confirmText: isCurrentlyUnlocked ? 'Lock Level' : 'Unlock Level',
      confirmVariant: 'primary',
      onConfirm: async () => {
        await toggleStudentLevelUnlock(st.uid, lvl);
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`Updated Level ${lvl} unlock override for ${st.displayName}`);
        await refreshData();
      }
    });
  };

  const handleRowToggleSuspend = (st: StudentProfile) => {
    const willSuspend = !st.isSuspended;
    setConfirmModalState({
      isOpen: true,
      title: willSuspend ? 'Suspend Student Account' : 'Reactivate Student Account',
      message: willSuspend ? (
        <p>
          Temporarily suspend <span className="font-semibold text-neutral-900">{st.displayName}</span>? They will see a suspension notice on login.
        </p>
      ) : (
        <p>
          Reactivate access for <span className="font-semibold text-neutral-900">{st.displayName}</span>?
        </p>
      ),
      confirmText: willSuspend ? 'Suspend Student' : 'Reactivate Student',
      confirmVariant: willSuspend ? 'danger' : 'primary',
      onConfirm: async () => {
        await toggleStudentSuspension(st.uid, willSuspend);
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`${willSuspend ? 'Suspended' : 'Reactivated'} ${st.displayName}`);
        await refreshData();
      }
    });
  };

  const handleRowDeleteStudent = (st: StudentProfile) => {
    setConfirmModalState({
      isOpen: true,
      title: 'Delete Student Account',
      message: (
        <div className="space-y-2">
          <p>
            Permanently delete <span className="font-bold text-neutral-900">{st.displayName}</span> ({st.rollNumber})?
          </p>
          <p className="text-[11px] text-rose-600 font-medium">
            This action cannot be undone. All user data and submissions will be removed from Firestore.
          </p>
        </div>
      ),
      confirmText: 'Delete Permanently',
      confirmVariant: 'danger',
      onConfirm: async () => {
        await deleteStudent(st.uid);
        setConfirmModalState(prev => ({ ...prev, isOpen: false }));
        showToast(`Deleted ${st.displayName}`);
        await refreshData();
      }
    });
  };

  const handleRowChangeRole = (st: StudentProfile, newRole: UserRole) => {
    if (st.email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase()) {
      showToast('Developer account role cannot be changed');
      return;
    }
    const roleTitle = newRole === 'primary_admin' ? 'Primary Admin' : newRole === 'admin' ? 'Sub-Admin' : newRole === 'staff' ? 'Staff' : 'Student';
    setConfirmModalState({
      isOpen: true,
      title: `Change User Role to ${roleTitle}`,
      message: (
        <p>
          Change role of <span className="font-semibold text-neutral-900">{st.displayName}</span> ({st.email}) to <span className="font-bold text-neutral-900">{roleTitle}</span>?
        </p>
      ),
      confirmText: `Set Role to ${roleTitle}`,
      confirmVariant: 'primary',
      onConfirm: async () => {
        try {
          await updateStudentRole(st.uid, newRole, currentUser.role);
          setConfirmModalState(prev => ({ ...prev, isOpen: false }));
          showToast(`Updated role of ${st.displayName} to ${roleTitle}`);
          await refreshData();
        } catch (e: any) {
          showToast(e?.message || 'Error updating role');
        }
      }
    });
  };

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
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-3.5 py-2 bg-neutral-900 text-neutral-100 rounded-lg shadow-lg text-xs font-medium animate-in fade-in">
          {toast.type === 'error' ? (
            <AlertTriangle size={14} className="text-rose-400" />
          ) : (
            <CheckCircle2 size={14} className="text-emerald-400" />
          )}
          <span>{toast.message}</span>
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

          {/* Roles & Access Tab: ONLY accessible to Developer & Primary Admin (Completely hidden from Sub-Admin & Staff) */}
          {canManageRoles && (
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
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${
                isDeveloper ? 'bg-amber-400 text-neutral-950' : 'bg-purple-100 text-purple-800'
              }`}>
                {isDeveloper ? 'Dev' : 'Primary Admin'}
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
            
            {/* Top Toolbar: Directory Header & Management Action Buttons */}
            <div className="bg-white border border-neutral-200/90 rounded-xl p-3.5 shadow-2xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Student Roster & Cohort Management
                  </h3>
                  <p className="text-xs text-neutral-800 font-medium mt-0.5">
                    {filteredStudents.length} of {displayStudents.length} registered students
                    {selectedUids.size > 0 && ` · ${selectedUids.size} selected`}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowAddStudentModal(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer shadow-2xs"
                  >
                    <UserPlus size={13} />
                    <span>Add Student</span>
                  </button>

                  <button
                    onClick={() => setShowCSVImportModal(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Upload size={13} className="text-neutral-500" />
                    <span>Import CSV</span>
                  </button>

                  <button
                    onClick={() => setShowBatchModal(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <FolderCheck size={13} className="text-neutral-500" />
                    <span>Batches ({batches.length})</span>
                  </button>

                  <button
                    onClick={() => {
                      setAnnouncementTargets(undefined);
                      setShowAnnouncementModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <Megaphone size={13} className="text-neutral-500" />
                    <span>Announcements</span>
                  </button>

                  <button
                    onClick={() => setShowSimilarityModal(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                    title="Automated Cross-Student Code Similarity Analysis"
                  >
                    <ShieldAlert size={13} className="text-rose-600" />
                    <span>Integrity Audit</span>
                  </button>

                  <button
                    onClick={() => refreshData(true)}
                    disabled={isSyncingCloud}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
                    title="Fetch latest student registrations from Google Auth"
                  >
                    <RefreshCw size={12} className={isSyncingCloud ? 'animate-spin text-neutral-900' : 'text-neutral-500'} />
                    <span>{isSyncingCloud ? 'Syncing...' : 'Sync'}</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar: Search, Role, Batch, Activity, Dept */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 text-xs">
                {/* Search */}
                <div className="relative lg:col-span-1 sm:col-span-2">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search name, roll, email..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-400"
                  />
                </div>

                {/* Role Filter */}
                <select
                  value={studentRoleFilter}
                  onChange={(e) => setStudentRoleFilter(e.target.value as any)}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Roles</option>
                  <option value="student">Role: Student</option>
                  <option value="staff">Role: Staff</option>
                  <option value="admin">Role: Sub-Admin</option>
                  <option value="primary_admin">Role: Primary Admin</option>
                </select>

                {/* Batch Filter */}
                <select
                  value={studentBatchFilter}
                  onChange={(e) => setStudentBatchFilter(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Batches</option>
                  {batches.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                  <option value="unassigned">Unassigned</option>
                </select>

                {/* Activity Filter */}
                <select
                  value={studentActivityFilter}
                  onChange={(e) => setStudentActivityFilter(e.target.value as any)}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
                >
                  <option value="all">All Activity</option>
                  <option value="24h">Active Today (&lt; 24h)</option>
                  <option value="7d">Active Past 7 Days</option>
                  <option value="inactive7d">Inactive 7+ Days</option>
                  <option value="inactive30d">Inactive 30+ Days</option>
                </select>

                {/* Department Filter */}
                <select
                  value={studentDeptFilter}
                  onChange={(e) => setStudentDeptFilter(e.target.value)}
                  className="bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-xs text-neutral-700 focus:outline-none cursor-pointer"
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
            </div>

            {/* Bulk Actions Floating Bar (Active when students are selected) */}
            {selectedUids.size > 0 && (
              <div className="bg-neutral-900 text-white rounded-xl p-3 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs animate-in slide-in-from-top-2">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center justify-center w-5 h-5 rounded bg-neutral-800 text-amber-300 font-bold text-[11px] font-mono">
                    {selectedUids.size}
                  </div>
                  <span className="font-medium">student(s) selected</span>
                  <button
                    onClick={() => setSelectedUids(new Set())}
                    className="text-[11px] text-neutral-400 hover:text-white underline cursor-pointer ml-1"
                  >
                    Deselect All
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleTriggerBulkReset}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={12} className="text-amber-400" />
                    <span>Reset Progress</span>
                  </button>

                  <button
                    onClick={handleBulkExportCSV}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                  >
                    <Download size={12} className="text-emerald-400" />
                    <span>Export CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      setBulkBatchChoice(batches[0]?.name || '');
                      setBulkBatchModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                  >
                    <FolderPlus size={12} className="text-blue-400" />
                    <span>Assign Batch</span>
                  </button>

                  <button
                    onClick={() => {
                      setAnnouncementTargets(Array.from(selectedUids));
                      setShowAnnouncementModal(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 transition-colors cursor-pointer"
                  >
                    <Megaphone size={12} className="text-indigo-400" />
                    <span>Broadcast Notice</span>
                  </button>

                  <button
                    onClick={handleTriggerBulkDelete}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer ml-1"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            )}

            {/* Students Table */}
            <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50/75 text-neutral-500 font-medium border-b border-neutral-200/80">
                    <tr>
                      <th className="py-2.5 px-3 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={isAllFilteredSelected}
                          ref={el => {
                            if (el) el.indeterminate = isSomeFilteredSelected;
                          }}
                          onChange={handleToggleSelectAll}
                          className="rounded accent-neutral-900 cursor-pointer"
                          title="Select / Deselect all"
                        />
                      </th>
                      <th className="py-2.5 px-3 w-10">#</th>
                      <th 
                        onClick={() => {
                          if (sortField === 'name') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                          else { setSortField('name'); setSortOrder('asc'); }
                        }}
                        className="py-2.5 px-4 cursor-pointer hover:text-neutral-900 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Student</span>
                          {sortField === 'name' ? (
                            sortOrder === 'asc' ? <ArrowUp size={11} className="text-neutral-900" /> : <ArrowDown size={11} className="text-neutral-900" />
                          ) : <ArrowUpDown size={11} className="text-neutral-300" />}
                        </div>
                      </th>
                      <th className="py-2.5 px-3 w-28">Batch</th>
                      <th 
                        onClick={() => {
                          if (sortField === 'dept') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                          else { setSortField('dept'); setSortOrder('asc'); }
                        }}
                        className="py-2.5 px-3 cursor-pointer hover:text-neutral-900 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Department</span>
                          {sortField === 'dept' ? (
                            sortOrder === 'asc' ? <ArrowUp size={11} className="text-neutral-900" /> : <ArrowDown size={11} className="text-neutral-900" />
                          ) : <ArrowUpDown size={11} className="text-neutral-300" />}
                        </div>
                      </th>
                      <th 
                        onClick={() => {
                          if (sortField === 'solved') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                          else { setSortField('solved'); setSortOrder('desc'); }
                        }}
                        className="py-2.5 px-4 w-44 cursor-pointer hover:text-neutral-900 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Problems Solved</span>
                          {sortField === 'solved' ? (
                            sortOrder === 'asc' ? <ArrowUp size={11} className="text-neutral-900" /> : <ArrowDown size={11} className="text-neutral-900" />
                          ) : <ArrowUpDown size={11} className="text-neutral-300" />}
                        </div>
                      </th>
                      <th 
                        onClick={() => {
                          if (sortField === 'lastActive') setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
                          else { setSortField('lastActive'); setSortOrder('desc'); }
                        }}
                        className="py-2.5 px-3 w-32 cursor-pointer hover:text-neutral-900 select-none"
                      >
                        <div className="flex items-center gap-1">
                          <span>Last Active</span>
                          {sortField === 'lastActive' ? (
                            sortOrder === 'asc' ? <ArrowUp size={11} className="text-neutral-900" /> : <ArrowDown size={11} className="text-neutral-900" />
                          ) : <ArrowUpDown size={11} className="text-neutral-300" />}
                        </div>
                      </th>
                      <th className="py-2.5 px-4 text-right w-44">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-neutral-400 text-xs">
                          No students found matching your search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((st, idx) => {
                        // Count only solved IDs that still exist in the problem set (deduped);
                        // stale IDs from renamed/removed problems must not inflate the count.
                        const solvedSet = new Set(st.solvedProblems || []);
                        const solvedCount = problems.filter(p => solvedSet.has(p.id)).length;
                        const pct = Math.round((solvedCount / problems.length) * 100);
                        const isMenuOpen = activeRowMenuUid === st.uid;

                        return (
                          <tr 
                            key={st.uid} 
                            className={`hover:bg-neutral-50/60 transition-colors ${
                              selectedUids.has(st.uid) ? 'bg-neutral-50/90' : ''
                            }`}
                          >
                            <td className="py-3 px-3 text-center">
                              <input
                                type="checkbox"
                                checked={selectedUids.has(st.uid)}
                                onChange={() => handleToggleSelectOne(st.uid)}
                                className="rounded accent-neutral-900 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-3 text-neutral-400 font-mono text-[11px]">{idx + 1}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-neutral-900 flex items-center gap-1.5 flex-wrap">
                                <span>{st.displayName}</span>
                                <span className="font-mono text-[10px] text-neutral-500 bg-neutral-100 px-1 py-0.5 rounded">
                                  {st.rollNumber}
                                </span>
                                {st.role === 'admin' && (
                                  <span className="text-[10px] px-1 py-0.2 rounded bg-blue-100 text-blue-800 font-bold">
                                    Sub-Admin
                                  </span>
                                )}
                                {st.role === 'staff' && (
                                  <span className="text-[10px] px-1 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                                    Staff
                                  </span>
                                )}
                                {st.role === 'primary_admin' && (
                                  <span className="text-[10px] px-1 py-0.2 rounded bg-purple-100 text-purple-800 font-bold">
                                    Primary Admin
                                  </span>
                                )}
                                {st.isSuspended && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 font-semibold flex items-center gap-0.5">
                                    <UserX size={10} /> Suspended
                                  </span>
                                )}
                                {st.unlockedLevels && st.unlockedLevels.length > 0 && (
                                  <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-50 text-emerald-700 font-mono">
                                    🔓 L{st.unlockedLevels.join(',')}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-neutral-400 block font-mono">
                                {st.email}
                              </span>
                            </td>

                            <td className="py-3 px-3 text-neutral-600 font-mono text-[11px]">
                              {st.batch ? (
                                <span className="px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700">
                                  {st.batch}
                                </span>
                              ) : (
                                <span className="text-neutral-300">—</span>
                              )}
                            </td>

                            <td className="py-3 px-3 text-neutral-600">
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

                            <td className="py-3 px-3 text-neutral-500 font-mono text-[11px]">
                              {st.lastActive ? new Date(st.lastActive).toLocaleDateString() : '—'}
                            </td>

                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5 relative">
                                <button
                                  onClick={() => setSelectedStudent(st)}
                                  className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-neutral-800 bg-neutral-100 hover:bg-neutral-200/90 rounded-md transition-colors cursor-pointer"
                                  title="View student status and submitted solutions"
                                >
                                  <FileCode size={12} className="text-neutral-600" />
                                  <span>View Status</span>
                                </button>

                                <button
                                  onClick={async () => {
                                    try {
                                      await generateReport({
                                        userId: st.uid,
                                        userName: st.displayName,
                                        problems,
                                        solvedProblemIds: new Set(st.solvedProblems || []),
                                        attemptedProblemIds: new Set(st.attemptedProblems || []),
                                        userEmail: st.email,
                                        rollNumber: st.rollNumber,
                                        department: st.department,
                                        submissions: st.submissions
                                      });
                                      showToast(`Generated PDF for ${st.displayName}`);
                                    } catch (err: any) {
                                      showToast(err?.message || `Failed to generate PDF for ${st.displayName}`, 'error');
                                    }
                                  }}
                                  className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                                  title="Download Performance PDF"
                                >
                                  <FileDown size={14} />
                                </button>

                                {/* More Row Actions Dropdown */}
                                <div className="relative">
                                  <button
                                    onClick={() => setActiveRowMenuUid(isMenuOpen ? null : st.uid)}
                                    className="p-1 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                                    title="More student management actions"
                                  >
                                    <MoreHorizontal size={14} />
                                  </button>

                                  {isMenuOpen && (
                                    <>
                                      <div 
                                        className="fixed inset-0 z-20 cursor-default" 
                                        onClick={() => setActiveRowMenuUid(null)} 
                                      />
                                      <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-neutral-200 rounded-xl shadow-xl py-1.5 z-30 text-left text-xs divide-y divide-neutral-100 animate-in fade-in">
                                        
                                        {/* Group 1: Progress & Overrides */}
                                        <div className="py-1">
                                          <button
                                            onClick={() => {
                                              setActiveRowMenuUid(null);
                                              handleRowResetProgress(st);
                                            }}
                                            className="w-full px-3 py-1.5 text-left text-amber-700 hover:bg-amber-50 flex items-center gap-2 cursor-pointer"
                                          >
                                            <RotateCcw size={12} />
                                            <span>Reset Progress</span>
                                          </button>

                                          <div className="px-3 py-1 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                                            Level Unlock Override:
                                          </div>
                                          {[2, 3].map(lvl => {
                                            const isUnlocked = st.unlockedLevels?.includes(lvl);
                                            return (
                                              <button
                                                key={lvl}
                                                onClick={() => {
                                                  setActiveRowMenuUid(null);
                                                  handleRowToggleUnlock(st, lvl);
                                                }}
                                                className="w-full px-3 py-1 text-left text-neutral-700 hover:bg-neutral-100 flex items-center justify-between cursor-pointer"
                                              >
                                                <span>Level {lvl} Override</span>
                                                <span className="text-[10px] font-mono font-medium">
                                                  {isUnlocked ? 'Unlocked' : 'Locked'}
                                                </span>
                                              </button>
                                            );
                                          })}
                                        </div>

                                        {/* Group 2: Account Status */}
                                        <div className="py-1">
                                          <button
                                            onClick={() => {
                                              setActiveRowMenuUid(null);
                                              handleRowToggleSuspend(st);
                                            }}
                                            className={`w-full px-3 py-1.5 text-left flex items-center gap-2 cursor-pointer ${
                                              st.isSuspended ? 'text-emerald-700 hover:bg-emerald-50' : 'text-rose-700 hover:bg-rose-50'
                                            }`}
                                          >
                                            {st.isSuspended ? <UserCheck size={12} /> : <UserX size={12} />}
                                            <span>{st.isSuspended ? 'Reactivate Account' : 'Suspend Account'}</span>
                                          </button>
                                        </div>

                                        {/* Group 3: Role Change */}
                                        <div className="py-1">
                                          <div className="px-3 py-1 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                                            Change Role:
                                          </div>
                                          {(['student', 'staff', 'admin'] as UserRole[]).map(r => (
                                            <button
                                              key={r}
                                              disabled={st.role === r}
                                              onClick={() => {
                                                setActiveRowMenuUid(null);
                                                handleRowChangeRole(st, r);
                                              }}
                                              className="w-full px-3 py-1 text-left text-neutral-700 hover:bg-neutral-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-between cursor-pointer"
                                            >
                                              <span className="capitalize">{r === 'admin' ? 'Sub-Admin' : r}</span>
                                              {st.role === r && <span className="text-[10px] font-mono text-emerald-600">Current</span>}
                                            </button>
                                          ))}
                                        </div>

                                        {/* Group 4: Delete */}
                                        <div className="py-1">
                                          <button
                                            onClick={() => {
                                              setActiveRowMenuUid(null);
                                              handleRowDeleteStudent(st);
                                            }}
                                            className="w-full px-3 py-1.5 text-left text-rose-700 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                                          >
                                            <Trash2 size={12} />
                                            <span>Delete Account</span>
                                          </button>
                                        </div>

                                      </div>
                                    </>
                                  )}
                                </div>

                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
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
                  disabled={!canChangeSettings}
                  title={canChangeSettings ? undefined : 'Only Sub-Admins and above can change evaluation policies'}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
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
                      disabled={!canChangeSettings}
                      title={canChangeSettings ? undefined : 'Only Sub-Admins and above can change evaluation policies'}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                        settings.hiddenTestCasesVisibility === 'strictly_hidden'
                          ? 'bg-neutral-900 text-white shadow-2xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Concealed (Exam Mode)
                    </button>
                    <button
                      onClick={() => handleUpdateSetting('hiddenTestCasesVisibility', 'allow_reveal')}
                      disabled={!canChangeSettings}
                      title={canChangeSettings ? undefined : 'Only Sub-Admins and above can change evaluation policies'}
                      className={`flex-1 py-1 text-xs font-medium rounded transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
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
                    {availableLevels.map(lvl => {
                      const isLocked = settings.lockedLevels?.includes(lvl);
                      return (
                        <button
                          key={lvl}
                          onClick={() => handleToggleLevelLock(lvl)}
                          disabled={!canChangeSettings}
                          title={canChangeSettings ? undefined : 'Only Sub-Admins and above can change evaluation policies'}
                          className={`py-1 px-2 text-xs font-medium rounded border transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1 ${
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

                {/* Control 3: Role-Based Access Control Summary - Developer & Primary Admin Only (Hidden from Sub-Admin & Staff) */}
                {canManageRoles && (
                  <div className="p-3 bg-neutral-50/60 border border-neutral-200/80 rounded-lg sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} className="text-neutral-700" />
                        <span className="text-xs font-semibold text-neutral-900">
                          Role-Based Access Management
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          isDeveloper ? 'bg-neutral-900 text-amber-300' : 'bg-purple-900 text-purple-200'
                        }`}>
                          {isDeveloper ? 'Developer Console' : 'Primary Admin Console'}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        {isDeveloper
                          ? 'Assign Primary Admin, Sub-Admins, and Staff permissions.'
                          : 'Assign Sub-Admins and Staff roles, and remove staff permissions.'}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('roles')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer self-start sm:self-auto shrink-0"
                    >
                      <UserCog size={13} className="text-neutral-500" />
                      <span>Manage Roles ({Object.keys(settings.roleAssignments || {}).filter(e => isDeveloper || e.toLowerCase() !== DEVELOPER_EMAIL.toLowerCase()).length})</span>
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
                  {availableLevels.map(lvl => (
                    <option key={lvl} value={lvl}>Level {lvl}</option>
                  ))}
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
        {/* 4. ROLE-BASED ACCESS CONTROL TAB (DEVELOPER & PRIMARY ADMIN ONLY) */}
        {/* ========================================================================= */}
        {activeTab === 'roles' && canManageRoles && (() => {
          const roleAssignments = settings.roleAssignments || {};
          
          // STRICT PRIVACY: If operator is NOT developer, NEVER show developer email or root account
          const assignedEntries = Object.entries(roleAssignments).filter(([email]) => {
            if (!isDeveloper && email.toLowerCase() === DEVELOPER_EMAIL.toLowerCase()) {
              return false;
            }
            return true;
          });
          
          // Candidate students/users for role management (never include developer)
          const allUsers = displayStudents
            .filter(s => isDeveloper || s.email.trim().toLowerCase() !== DEVELOPER_EMAIL.toLowerCase())
            .map(s => {
              const assigned = roleAssignments[s.email.trim().toLowerCase()];
              const sSolved = new Set(s.solvedProblems || []);
              return {
                uid: s.uid,
                displayName: s.displayName,
                email: s.email,
                role: (assigned || 'student') as UserRole,
                department: s.department,
                rollNumber: s.rollNumber,
                solvedCount: problems.filter(p => sSolved.has(p.id)).length
              };
            });

          const totalPrimaryAdmins = allUsers.filter(u => u.role === 'primary_admin').length;
          const totalSubAdmins = allUsers.filter(u => u.role === 'admin').length;
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
                      {isDeveloper ? (
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-neutral-900 text-amber-300 rounded-full flex items-center gap-1">
                          <Sparkles size={11} className="text-amber-400" />
                          Master Developer
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[11px] font-semibold bg-purple-100 text-purple-800 rounded-full flex items-center gap-1">
                          <ShieldCheck size={11} className="text-purple-600" />
                          Primary Administrator
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 max-w-2xl">
                      {isDeveloper
                        ? 'Access to the administrative portal is determined strictly by account role. As Master Developer, you can assign Primary Administrators (who have permissions to assign sub-admins and remove staff roles), assign Sub-Admins and Staff, or revert accounts to default Student status.'
                        : 'As Primary Administrator, you have delegated administrative authority to assign Sub-Admins and Staff roles, and remove the staff role. Unassigned college accounts default to Student status.'}
                    </p>
                  </div>

                  {/* Summary Metric Chips */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isDeveloper && (
                      <div className="px-3 py-1.5 bg-purple-50/60 border border-purple-200/70 rounded-lg text-center">
                        <div className="text-[10px] text-purple-600 font-medium uppercase tracking-wider">Primary Admin</div>
                        <div className="text-xs font-bold text-purple-900">{totalPrimaryAdmins}</div>
                      </div>
                    )}
                    <div className="px-3 py-1.5 bg-blue-50/60 border border-blue-200/70 rounded-lg text-center">
                      <div className="text-[10px] text-blue-600 font-medium uppercase tracking-wider">Sub-Admins</div>
                      <div className="text-xs font-bold text-blue-900">{totalSubAdmins}</div>
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

              {/* Role Assignment Card */}
              <div className="bg-white border border-neutral-200/90 rounded-xl p-5 shadow-2xs space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <UserPlus size={16} className="text-neutral-700" />
                    <h3 className="text-sm font-semibold text-neutral-900">
                      {isDeveloper ? 'Assign Primary Admin, Sub-Admin, or Staff Role' : 'Assign Sub-Admin or Staff Role'}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {isDeveloper
                      ? 'Grant elevated access to any college account by assigning Primary Admin, Sub-Admin, or Staff roles.'
                      : 'Grant elevated access to any college account by assigning Sub-Admin or Staff roles.'}
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
                        onChange={(e) => setRoleAssignType(e.target.value as UserRole)}
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-medium text-neutral-800 focus:outline-none focus:border-neutral-400 cursor-pointer"
                      >
                        {isDeveloper && (
                          <option value="primary_admin">Primary Admin (Can manage Sub-Admins & Staff)</option>
                        )}
                        <option value="admin">Sub-Admin (Class & Contest Management)</option>
                        <option value="staff">Staff (Review & Monitor)</option>
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

                  {/* Quick Suggestions Chips from active accounts */}
                  {allUsers.length > 0 && (
                    <div className="pt-2 border-t border-neutral-100 flex items-center flex-wrap gap-1.5">
                      <span className="text-[11px] text-neutral-500 font-medium">
                        Quick-fill from active accounts:
                      </span>
                      {allUsers.slice(0, 5).map((u) => (
                        <button
                          key={u.uid}
                          type="button"
                          onClick={() => setRoleAssignEmail(u.email)}
                          className="px-2 py-0.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] rounded transition-colors cursor-pointer font-mono"
                        >
                          {u.email}
                        </button>
                      ))}
                    </div>
                  )}
                </form>
              </div>

              {/* Assigned Faculty Roles (Primary Admins, Sub-Admins & Staff) */}
              <div className="bg-white border border-neutral-200/90 rounded-xl divide-y divide-neutral-100 overflow-hidden shadow-2xs">
                <div className="p-4 bg-neutral-50/75 border-b border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-neutral-900">
                      Assigned Faculty Roles (Primary Admins, Sub-Admins & Staff)
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
                              {role === 'primary_admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                                  <ShieldCheck size={11} className="text-purple-600" />
                                  Primary Admin
                                </span>
                              ) : role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <Shield size={11} />
                                  Sub-Admin
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <GraduationCap size={11} />
                                  Staff
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-neutral-500 text-[11px]">
                              {role === 'primary_admin'
                                ? 'Master Dev Assigned'
                                : role === 'admin'
                                ? 'Sub-Admin Authority'
                                : 'Staff Reviewer'}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {isDeveloper ? (
                                  <>
                                    <select
                                      value={role}
                                      onChange={(e) => handleRoleChange(email, e.target.value as UserRole)}
                                      className="px-2 py-1 bg-white border border-neutral-200 rounded text-[11px] font-medium text-neutral-700 focus:outline-none cursor-pointer"
                                    >
                                      <option value="primary_admin">Role: Primary Admin</option>
                                      <option value="admin">Role: Sub-Admin</option>
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
                                  </>
                                ) : isPrimaryAdmin ? (
                                  role === 'primary_admin' ? (
                                    <span className="text-[11px] text-neutral-400 italic">Protected (Primary Admin)</span>
                                  ) : role === 'staff' ? (
                                    <>
                                      <button
                                        onClick={() => handleRoleChange(email, 'admin')}
                                        className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-neutral-200 hover:border-blue-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        Promote to Sub-Admin
                                      </button>
                                      <button
                                        onClick={() => handleRoleChange(email, 'student')}
                                        title="Remove Staff Role (Revert to Student)"
                                        className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        <UserMinus size={11} />
                                        <span>Remove Staff Role</span>
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => handleRoleChange(email, 'staff')}
                                        className="px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-neutral-200 hover:border-emerald-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        Demote to Staff
                                      </button>
                                      <button
                                        onClick={() => handleRoleChange(email, 'student')}
                                        title="Revert to Student access"
                                        className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </>
                                  )
                                ) : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })}

                      {assignedEntries.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-neutral-400 text-xs">
                            No faculty accounts currently assigned as Primary Admin, Sub-Admin, or Staff. All accounts default to Student status.
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
                        {isDeveloper
                          ? 'Search any student or faculty to promote them to Primary Admin, Sub-Admin, Staff, or revert to Student.'
                          : 'Search any student or faculty to promote to Sub-Admin or Staff, or remove staff role.'}
                      </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex items-center gap-1 bg-white border border-neutral-200 p-0.5 rounded-lg text-xs self-start sm:self-auto">
                      {(isDeveloper
                        ? (['all', 'primary_admin', 'admin', 'staff', 'student'] as const)
                        : (['all', 'admin', 'staff', 'student'] as const)
                      ).map((r) => (
                        <button
                          key={r}
                          onClick={() => setRoleDirectoryFilter(r)}
                          className={`px-2 py-0.5 rounded font-medium transition-colors cursor-pointer ${
                            roleDirectoryFilter === r
                              ? 'bg-neutral-900 text-white'
                              : 'text-neutral-600 hover:text-neutral-900'
                          }`}
                        >
                          {r === 'primary_admin' ? 'Primary Admin' : r === 'admin' ? 'Sub-Admin' : r.charAt(0).toUpperCase() + r.slice(1)}
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
                              {user.role === 'primary_admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200">
                                  <ShieldCheck size={11} className="text-purple-600" />
                                  Primary Admin
                                </span>
                              ) : user.role === 'admin' ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                                  <Shield size={11} />
                                  Sub-Admin
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
                                {/* User is Student */}
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
                                      + Make Sub-Admin
                                    </button>
                                    {isDeveloper && (
                                      <button
                                        onClick={() => handleRoleChange(user.email, 'primary_admin')}
                                        className="px-2 py-1 bg-white hover:bg-purple-50 text-purple-700 border border-neutral-200 hover:border-purple-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        + Primary Admin
                                      </button>
                                    )}
                                  </>
                                )}

                                {/* User is Staff */}
                                {user.role === 'staff' && (
                                  <>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'admin')}
                                      className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-neutral-200 hover:border-blue-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Promote to Sub-Admin
                                    </button>
                                    {isDeveloper && (
                                      <button
                                        onClick={() => handleRoleChange(user.email, 'primary_admin')}
                                        className="px-2 py-1 bg-white hover:bg-purple-50 text-purple-700 border border-neutral-200 hover:border-purple-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        Make Primary Admin
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'student')}
                                      className="inline-flex items-center gap-1 px-2 py-1 bg-white hover:bg-rose-50 text-rose-700 border border-neutral-200 hover:border-rose-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      title="Remove staff role"
                                    >
                                      <UserMinus size={11} />
                                      <span>Remove Staff Role</span>
                                    </button>
                                  </>
                                )}

                                {/* User is Sub-Admin */}
                                {user.role === 'admin' && (
                                  <>
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'staff')}
                                      className="px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 border border-neutral-200 hover:border-emerald-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Demote to Staff
                                    </button>
                                    {isDeveloper && (
                                      <button
                                        onClick={() => handleRoleChange(user.email, 'primary_admin')}
                                        className="px-2 py-1 bg-white hover:bg-purple-50 text-purple-700 border border-neutral-200 hover:border-purple-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                      >
                                        Make Primary Admin
                                      </button>
                                    )}
                                    <button
                                      onClick={() => handleRoleChange(user.email, 'student')}
                                      className="px-2 py-1 bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                    >
                                      Revert to Student
                                    </button>
                                  </>
                                )}

                                {/* User is Primary Admin */}
                                {user.role === 'primary_admin' && (
                                  <>
                                    {isDeveloper ? (
                                      <>
                                        <button
                                          onClick={() => handleRoleChange(user.email, 'admin')}
                                          className="px-2 py-1 bg-white hover:bg-blue-50 text-blue-700 border border-neutral-200 hover:border-blue-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                        >
                                          Demote to Sub-Admin
                                        </button>
                                        <button
                                          onClick={() => handleRoleChange(user.email, 'student')}
                                          className="px-2 py-1 bg-white hover:bg-neutral-100 text-neutral-600 border border-neutral-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                                        >
                                          Revert to Student
                                        </button>
                                      </>
                                    ) : (
                                      <span className="text-[11px] text-neutral-400 italic">Primary Admin (Protected)</span>
                                    )}
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

      {/* Add Student Modal */}
      <AddStudentModal
        isOpen={showAddStudentModal}
        batches={batches}
        onClose={() => setShowAddStudentModal(false)}
        onSuccess={() => {
          setShowAddStudentModal(false);
          refreshData();
        }}
      />

      {/* CSV Import Modal */}
      <CSVImportModal
        isOpen={showCSVImportModal}
        onClose={() => setShowCSVImportModal(false)}
        onSuccess={() => {
          setShowCSVImportModal(false);
          refreshData();
        }}
      />

      {/* Batch Management Modal */}
      <BatchManageModal
        isOpen={showBatchModal}
        batches={batches}
        students={students}
        onClose={() => setShowBatchModal(false)}
        onRefresh={refreshData}
      />

      {/* Announcement Modal */}
      <AnnouncementModal
        isOpen={showAnnouncementModal}
        announcements={announcements}
        students={students}
        batches={batches}
        initialTargetUids={announcementTargets}
        currentUserEmail={currentUser.email}
        onClose={() => setShowAnnouncementModal(false)}
        onRefresh={refreshData}
      />

      {/* Confirmation Modal (bulk reset/delete + row actions) */}
      <ConfirmationModal
        isOpen={confirmModalState.isOpen}
        title={confirmModalState.title}
        message={confirmModalState.message}
        confirmText={confirmModalState.confirmText}
        confirmVariant={confirmModalState.confirmVariant}
        requireTextMatch={confirmModalState.requireTextMatch}
        onConfirm={confirmModalState.onConfirm}
        onClose={() => setConfirmModalState(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Bulk Assign Batch Modal */}
      {bulkBatchModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-neutral-200 rounded-xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-5 py-4 border-b border-neutral-100 bg-neutral-50/70">
              <h3 className="font-semibold text-sm text-neutral-900">Assign Batch</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Assign <span className="font-bold text-neutral-900">{selectedUids.size} selected student(s)</span> to a batch
              </p>
            </div>
            <div className="p-5 space-y-4">
              <select
                value={bulkBatchChoice}
                onChange={(e) => setBulkBatchChoice(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm text-neutral-800 focus:outline-none cursor-pointer"
              >
                <option value="">Select a batch…</option>
                {batches.map(b => (
                  <option key={b.name} value={b.name}>{b.name}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setBulkBatchModalOpen(false)}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAssignBatchSubmit}
                  disabled={!bulkBatchChoice}
                  className="px-3.5 py-2 text-xs font-medium rounded-lg bg-neutral-900 text-white hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Assign Batch
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Similarity Review Modal */}
      <SimilarityReviewModal
        isOpen={showSimilarityModal}
        problems={problems}
        students={students}
        onClose={() => setShowSimilarityModal(false)}
      />

    </div>
  );
};
