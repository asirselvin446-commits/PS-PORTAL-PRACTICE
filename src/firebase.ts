import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const DEVELOPER_EMAIL = 'asirselvin446@gmail.com';
export const COLLEGE_DOMAIN = '@francisxavier.ac.in';
export const COLLEGE_NAME = 'Francis Xavier Engineering College';
export const AUTHORIZED_ADMIN_EMAILS = [
  'asirselvin446@gmail.com',
  'faculty.admin@francisxavier.ac.in'
];

export type UserRole = 'developer' | 'primary_admin' | 'admin' | 'staff' | 'student';

export interface PortalUser {
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
  signedInAt: string;
}

export function isFrancisXavierEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return normalized === DEVELOPER_EMAIL.toLowerCase() || normalized.endsWith(COLLEGE_DOMAIN.toLowerCase());
}

export function isDeveloperEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === DEVELOPER_EMAIL.toLowerCase();
}

export function resolveUserRole(
  email: string | null | undefined,
  roleAssignments?: Record<string, UserRole>
): UserRole {
  if (!email) return 'student';
  const normalized = email.trim().toLowerCase();
  
  // Developer account is hardcoded
  if (normalized === DEVELOPER_EMAIL.toLowerCase()) {
    return 'developer';
  }

  // Check explicit role assignments set by Developer
  if (roleAssignments && roleAssignments[normalized]) {
    return roleAssignments[normalized];
  }

  // Anyone not assigned is default as student
  return 'student';
}

export function isFacultyEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();

  // Explicitly authorized admin/faculty emails
  if (AUTHORIZED_ADMIN_EMAILS.includes(normalized)) {
    return true;
  }

  // Must belong to the institution domain
  if (!normalized.endsWith(COLLEGE_DOMAIN.toLowerCase())) {
    return false;
  }

  const localPart = normalized.slice(0, -COLLEGE_DOMAIN.length);

  // Exact faculty / admin account handles
  if (
    localPart === 'faculty' ||
    localPart === 'admin' ||
    localPart === 'faculty.admin' ||
    localPart === 'admin.faculty' ||
    localPart === 'hod'
  ) {
    return true;
  }

  // Precise prefixes: prof.<name>, dr.<name>, hod.<dept>, faculty.<dept>, admin.<dept>
  if (
    localPart.startsWith('prof.') ||
    localPart.startsWith('dr.') ||
    localPart.startsWith('hod.') ||
    localPart.startsWith('faculty.') ||
    localPart.startsWith('faculty_') ||
    localPart.startsWith('admin.') ||
    localPart.startsWith('admin_')
  ) {
    return true;
  }

  // Precise suffixes: <name>.faculty, <dept>.faculty, <name>.admin, <dept>.admin
  if (
    localPart.endsWith('.faculty') ||
    localPart.endsWith('_faculty') ||
    localPart.endsWith('.admin') ||
    localPart.endsWith('_admin')
  ) {
    return true;
  }

  return false;
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}

// Initial boot connection test
testConnection();

export { signInWithPopup, signOut };
