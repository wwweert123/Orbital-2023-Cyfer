import useLocalStorage from "./useLocalStorage";

const useToggle = (key, initValue) => {
    const [value, setvalue] = useLocalStorage(key, initValue);

    const toggle = (value) => {
        setvalue((prev) => {
            return typeof value === "boolean" ? value : !prev;
        });
    };

    return [value, toggle];
};

export default useToggle;
