import { TestCase } from '../data/problems';

export type UserRole = 'developer' | 'admin' | 'staff' | 'student';

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
  photoURL?: string;
  solvedProblems: string[];
  attemptedProblems: string[];
  lastActive: string;
  joinedAt: string;
  submissions?: Record<string, StudentSubmission>;
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
  solvedCount: number;
  attemptedCount: number;
  score: number;
  level1Solved: number;
  level2Solved: number;
  level3Solved: number;
  lastActive: string;
  isCurrentUser?: boolean;
}
