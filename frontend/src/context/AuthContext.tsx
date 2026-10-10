import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

export type Role = 'SYSTEM_ADMIN' | 'APPLICATION_ADMIN' | 'TECHNOLOGY_ADMIN' | 'PROCESS_ADMIN' | 'BUSINESS_ADMIN';

export interface User {
    username: string;
    role: Role;
    token?: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password?: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (username: string, password?: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const newUser = response.data;
            setUser(newUser);
            localStorage.setItem('user', JSON.stringify(newUser));
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
