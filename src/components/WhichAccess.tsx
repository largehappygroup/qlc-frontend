import React from "react";
import { useAuth } from "../hooks/AuthContext";

interface WhichAccessProps {
    roles: string[];
    includesRoleElement: React.ReactNode;
    excludesRoleElement?: React.ReactNode;
}
const WhichAccess: React.FC<WhichAccessProps> = ({
    roles,
    includesRoleElement,
    excludesRoleElement,
}: WhichAccessProps) => {
    const { user } = useAuth();
    return (
        <>
            {user && roles.includes(user?.role)
                ? { includesRoleElement }
                : excludesRoleElement
                ? excludesRoleElement
                : null}
        </>
    );
};

export default WhichAccess;
