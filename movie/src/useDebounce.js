import { useState, useEffect } from "react";

export function useDebounce(value) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, 300);

        return () => clearTimeout(timeout);
    }, [value]);

    return debouncedValue;
}
