import { createContext, useContext } from "react";

export const UserContext = createContext({
    userId: null,
    username: null,
    password: null,
    roles: [],
} | undefined);

export function useUserContext() {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }

    return context;
}