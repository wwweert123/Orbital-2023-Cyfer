import { useState, useEffect } from "react";

// use this function to get and set values from local storage
const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(
        JSON.parse(localStorage.getItem(key)) || initValue
    );

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;
