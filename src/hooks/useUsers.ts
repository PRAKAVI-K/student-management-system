import { useState, useEffect, useCallback } from 'react';
import type { User } from '../config/schema';
import { MockApi } from '../services/mockApi';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await MockApi.getUsers();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const addUser = async (user: Omit<User, 'id'>) => {
        try {
            const newUser = await MockApi.createUser(user);
            setUsers(prev => [newUser, ...prev]);
            return newUser;
        } catch (err) {
            setError('Failed to create user');
            throw err;
        }
    };

    const updateUser = async (id: string, user: Partial<User>) => {
        try {
            const updatedUser = await MockApi.updateUser(id, user);
            setUsers(prev => prev.map(u => u.id === id ? updatedUser : u));
            return updatedUser;
        } catch (err) {
            setError('Failed to update user');
            throw err;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await MockApi.deleteUser(id);
            setUsers(prev => prev.filter(u => u.id !== id));
        } catch (err) {
            setError('Failed to delete user');
            throw err;
        }
    };

    return { users, loading, error, addUser, updateUser, deleteUser, refresh: fetchUsers };
};
