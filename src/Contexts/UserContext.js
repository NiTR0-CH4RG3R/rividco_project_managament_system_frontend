import { createContext, useState } from "react";
import { useXContext } from "./Contexts";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [roles, setRoles] = useState([]);

    return (
        <UserContext.Provider value={{
            userId, setUserId,
            username, setUsername,
            password, setPassword,
            roles, setRoles
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() { return useXContext(UserContext); }