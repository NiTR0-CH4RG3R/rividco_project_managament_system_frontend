import { useState, createContext } from "react";
import { useXContext } from "./Contexts";

export const TopbarContext = createContext({});

export function TopbarContextProvider({ children }) {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    return (
        <TopbarContext.Provider value={{ title, subtitle, setTitle, setSubtitle }}>
            {children}
        </TopbarContext.Provider>
    );
}

export function useTopbarContext() { return useXContext(TopbarContext); }