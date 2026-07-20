export type Role = 'user' | 'admin' | 'superadmin';

export interface AppUser {
  email: string;
  name: string;
  role: Role;
  password: string;
}

export interface StoredUser {
  email: string;
  name: string;
  role: Role;
  token: string;
}

export const appUsers: AppUser[] = [
  {
    email: 'superadmin@parehurip.id',
    name: 'Super Admin',
    role: 'superadmin',
    password: 'superpass',
  },
  {
    email: 'admin@parehurip.id',
    name: 'Admin',
    role: 'admin',
    password: 'adminpass',
  },
  {
    email: 'user@parehurip.id',
    name: 'Pengguna',
    role: 'user',
    password: 'userpass',
  },
];

export function createToken(user: AppUser) {
  const payload = JSON.stringify({ email: user.email, role: user.role, name: user.name });
  if (typeof window === 'undefined') {
    return Buffer.from(payload).toString('base64');
  }
  return btoa(payload);
}

export function verifyToken(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const raw = typeof window === 'undefined' ? Buffer.from(token, 'base64').toString('utf-8') : atob(token);
    const payload = JSON.parse(raw);
    if (payload?.email && payload?.role && payload?.name) {
      return payload as StoredUser;
    }
  } catch {
    return null;
  }

  return null;
}

let storedUserSnapshot: StoredUser | null = null;

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedUser = window.localStorage.getItem('pareHuripUser');
    const token = window.localStorage.getItem('pareHuripToken');
    if (!storedUser || !token) {
      return null;
    }

    const user = JSON.parse(storedUser) as Omit<StoredUser, 'token'>;
    return { ...user, token };
  } catch {
    return null;
  }
}

export function getStoredUserSnapshot(): StoredUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const storedUser = window.localStorage.getItem('pareHuripUser');
  const token = window.localStorage.getItem('pareHuripToken');
  if (!storedUser || !token) {
    storedUserSnapshot = null;
    return null;
  }

  try {
    const user = JSON.parse(storedUser) as Omit<StoredUser, 'token'>;
    const nextSnapshot = { ...user, token };

    if (
      storedUserSnapshot &&
      storedUserSnapshot.email === nextSnapshot.email &&
      storedUserSnapshot.role === nextSnapshot.role &&
      storedUserSnapshot.name === nextSnapshot.name &&
      storedUserSnapshot.token === nextSnapshot.token
    ) {
      return storedUserSnapshot;
    }

    storedUserSnapshot = nextSnapshot;
    return storedUserSnapshot;
  } catch {
    storedUserSnapshot = null;
    return null;
  }
}

export function saveStoredUser(user: Omit<StoredUser, 'token'>, token: string) {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.setItem('pareHuripUser', JSON.stringify(user));
  window.localStorage.setItem('pareHuripToken', token);
}

export function clearStoredUser() {
  if (typeof window === 'undefined') {
    return;
  }
  window.localStorage.removeItem('pareHuripUser');
  window.localStorage.removeItem('pareHuripToken');
}

export function getUsers() {
  return appUsers.map(getPublicUser);
}

export function promoteUser(email: string) {
  const user = appUsers.find((item) => item.email === email);
  if (!user || user.role === 'superadmin') {
    return null;
  }
  user.role = 'admin';
  return getPublicUser(user);
}

export function getPublicUser(user: AppUser) {
  return {
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
