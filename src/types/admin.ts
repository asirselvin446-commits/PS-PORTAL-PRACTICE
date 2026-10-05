import { TestCase } from '../data/problems';

export type UserRole = 'developer' | 'primary_admin' | 'admin' | 'staff' | 'student';

export type HiddenTestVisibilityMode = 'strictly_hidden' | 'allow_reveal' | 'always_visible';
export type LevelUnlockMode = 'open' | 'progressive' | 'locked';

export interface AdminSettings {
  hiddenTestCasesVisibility: HiddenTestVisibilityMode;
  levelUnlockMode: LevelUnlockMode;
  minProblemsToUnlockLevel: Record<number, number>; // e.g. { 2: 5, 3: 15 }
  lockedLevels: number[]; // e.g. [3]
  leaderboardFrozen: boolean;
  leaderboardVisibleToStudents: boolean;
  excludedLeaderboardUids: string[];
  examModeEnabled: boolean;
  disableCopyPaste: boolean;
  adminPasscode?: string;
  announcement?: string;
  roleAssignments?: Record<string, UserRole>; // email -> role mapping
  updatedAt?: string;
}

export interface StudentSubmission {
  code: string;
  passedAt?: string;
  passedCount: number;
  totalCount: number;
  language?: string;
}

export interface StudentProfile {
  uid: string;
  email: string;
  displayName: string;
  rollNumber: string;
  department: string;
  role: UserRole;
  batch?: string;
  isSuspended?: boolean;
  unlockedLevels?: number[];
  photoURL?: string;
  solvedProblems: string[];
  attemptedProblems: string[];
  lastActive: string;
  joinedAt: string;
  submissions?: Record<string, StudentSubmission>;
}

export interface Batch {
  id: string;
  name: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  createdBy?: string;
  targetUids?: string[]; // Empty or contains 'all' = all students
  active: boolean;
}

export interface CodeSimilarityPair {
  problemId: string;
  problemTitle: string;
  problemLevel: number;
  studentA: {
    uid: string;
    name: string;
    roll: string;
    email: string;
    submittedAt?: string;
    code: string;
  };
  studentB: {
    uid: string;
    name: string;
    roll: string;
    email: string;
    submittedAt?: string;
    code: string;
  };
  similarityScore: number; // 0 to 100
}

export interface ProblemOverride {
  id: string;
  title?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  level?: number;
  description?: string;
  functionName?: string;
  starterCode?: string;
  testCases?: TestCase[];
}

export interface LeaderboardRow {
  rank: number;
  uid: string;
  displayName: string;
  rollNumber: string;
  department: string;
  batch?: string;
  solvedCount: number;
  attemptedCount: number;
  score: number;
  level1Solved: number;
  level2Solved: number;
  level3Solved: number;
  lastActive: string;
  isCurrentUser?: boolean;
}
