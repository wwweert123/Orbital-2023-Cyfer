import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
    //SSR Next.js
    if (typeof window === "undefined") {
        return initValue;
    }
    //if a value is already stored
    const localValue = JSON.parse(localStorage.getItem(key));
    if (localValue) return localValue;

    //return result of a a function
    if (initValue instanceof Function) return initValue();

    return initValue;
};

// use this function to get and set values from local storage
const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
