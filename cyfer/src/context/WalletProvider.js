import { createContext, useState } from "react";

const WalletContext = createContext({});

export const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState("");
    // const [persist, setPersist] = useState(
    //     JSON.parse(localStorage.getItem("persist")) || false
    // );
    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export default WalletContext;
