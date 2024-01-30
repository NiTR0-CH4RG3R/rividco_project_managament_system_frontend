import { createContext, useContext } from "react";

export const TopbarContext = createContext({
    title: null,
    setTitle: () => { },

    subtitle: null,
    setSubtitle: () => { },

    previousPage: null,
    setPreviousPage: () => { },
} | undefined);

export function useTopbarContext() {
    const context = useContext(TopbarContext);

    if (context === undefined) {
        throw new Error("useTopbarContext must be used within a TopbarContextProvider");
    }

    return context;
}