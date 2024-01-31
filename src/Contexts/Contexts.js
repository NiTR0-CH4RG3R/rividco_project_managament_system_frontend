import { useContext } from "react";

export function useXContext(Context) {
    const context = useContext(Context);

    if (!context) {
        throw new Error(
            `use${Context.displayName} must be used within a ${Context.displayName}Provider`
        );
    }

    return context;
}