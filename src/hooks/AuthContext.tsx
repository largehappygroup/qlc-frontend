import axios from "axios";
import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect,
} from "react";

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    vuNetId: string;
    role: string;
    termSeason?: string;
    termYear?: number;
    studyParticipation?: boolean;
    studyGroup?: string;
}

export interface WithUser {
    user?: User | null;
}

export interface WithUserId {
    userId?: string;
}

interface AuthContextType {
    user: User | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children?: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

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
        <AuthContext.Provider value={{ user, login, logout }}>
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
