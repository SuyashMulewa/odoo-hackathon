import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { authApi } from '../services/authApi'
import type { AuthUser } from '../services/authApi'
type AuthContextValue = { user: AuthUser | null; loading: boolean; login: (email: string, password: string, remember: boolean) => Promise<void>; register: (name: string, email: string, password: string) => Promise<void>; logout: () => void }
const AuthContext = createContext<AuthContextValue | null>(null), key = 'assetnexsus.session'
const readToken = () => localStorage.getItem(key) || sessionStorage.getItem(key)
export function AuthProvider({ children }: { children: ReactNode }) { const [user, setUser] = useState<AuthUser | null>(null), [loading, setLoading] = useState(true); useEffect(() => { const token = readToken(); if (!token) { setLoading(false); return }; authApi.me(token).then(({ user: next }) => setUser(next)).catch(() => { localStorage.removeItem(key); sessionStorage.removeItem(key) }).finally(() => setLoading(false)) }, []); const login = async (email: string, password: string, remember: boolean) => { const { token, user: next } = await authApi.login(email, password, remember); (remember ? localStorage : sessionStorage).setItem(key, token); setUser(next) }; const register = async (name: string, email: string, password: string) => { await authApi.register(name, email, password) }; const logout = () => { localStorage.removeItem(key); sessionStorage.removeItem(key); setUser(null) }; return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider> }
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context }
