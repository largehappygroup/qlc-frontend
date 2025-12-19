import axios from "axios";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import { User } from "../types/User";

interface AuthContextType {
    user: User | null;
    viewAsStudent: boolean;
    setViewAsStudent: (viewAsStudent: boolean) => void;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [viewAsStudent, setViewAsStudent] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                login();
            } catch (error) {
                console.error("Failed to fetch user details", error);
            }
        };

        fetchUser();
    }, []);

    const login = async () => {
        try {
            const response = await axios.post<User>(
                `${import.meta.env.VITE_BACKEND_URL}/users`,
                { withCredentials: true }
            );
            setUser(response.data);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, viewAsStudent, setViewAsStudent }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
