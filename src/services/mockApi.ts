import type { User } from '../config/schema';

// Minimal API Interface
export interface ApiService {
    getUsers: () => Promise<User[]>;
    getUser: (id: string) => Promise<User | undefined>;
    createUser: (user: Omit<User, 'id'>) => Promise<User>;
    updateUser: (id: string, user: Partial<User>) => Promise<User>;
    deleteUser: (id: string) => Promise<void>;
}

// Mock Implementation using LocalStorage
const STORAGE_KEY = 'nexus_crud_users';
const DELAY_MS = 600; // Simulate network latency

const mockUsers: User[] = [
    { id: '1', firstName: 'Alice', lastName: 'Skywalker', email: 'alice@nexus.io', phone: '555-0101' },
    { id: '2', firstName: 'Bob', lastName: 'Cyber', email: 'bob@nexus.io', phone: '555-0102' },
    { id: '3', firstName: 'Charlie', lastName: 'Datastream', email: 'charlie@nexus.io', phone: '555-0103' },
];

// Helper to simulate async delay
const delay = <T>(data: T): Promise<T> =>
    new Promise((resolve) => setTimeout(() => resolve(data), DELAY_MS));

export const MockApi: ApiService = {
    getUsers: async () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUsers));
            return delay(mockUsers);
        }
        return delay(JSON.parse(stored));
    },

    getUser: async (id) => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const user = users.find((u: User) => u.id === id);
        return delay(user);
    },

    createUser: async (userData) => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const newUser = { ...userData, id: crypto.randomUUID() }; // Generate ID
        const updatedUsers = [newUser, ...users];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
        return delay(newUser);
    },

    updateUser: async (id, userData) => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const index = users.findIndex((u: User) => u.id === id);
        if (index === -1) throw new Error('User not found');

        const updatedUser = { ...users[index], ...userData };
        users[index] = updatedUser;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        return delay(updatedUser);
    },

    deleteUser: async (id) => {
        const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const filteredUsers = users.filter((u: User) => u.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredUsers));
        return delay(undefined);
    }
};
