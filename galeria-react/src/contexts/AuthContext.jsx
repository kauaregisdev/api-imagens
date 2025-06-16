import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [access, setAccess] = useState(localStorage.getItem('access'));
    const [refresh, setRefresh] = useState(localStorage.getItem('refresh'));

    const isAuthenticated = !!access;

    function login(accessToken, refreshToken) {
        setAccess(accessToken);
        setRefresh(refreshToken);
        localStorage.setItem('access', accessToken);
        localStorage.setItem('refresh', refreshToken);
    }

    function logout() {
        setAccess(null);
        setRefresh(null);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        window.location.href = '/login';
    }

    return (
        <AuthContext.Provider value={{ access, refresh, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}