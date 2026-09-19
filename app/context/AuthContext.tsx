// Tracks current token identity and logged-in states
// app/context/AuthContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthContextType {
    token: string | null;
    isAuthenticated: boolean;
    login: (jwtToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() =>
        typeof window !== "undefined"
            ? localStorage.getItem("garden_jwt")
            : null,
    );

    const login = (jwtToken: string): void => {
        localStorage.setItem("garden_jwt", jwtToken);
        setToken(jwtToken);
    };

    const logout = (): void => {
        localStorage.removeItem("garden_jwt");
        setToken(null);
    };

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuth must be wrapped within an AuthProvider structural tree.",
        );
    }
    return context;
};
