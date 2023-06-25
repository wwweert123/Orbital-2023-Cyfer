import { useContext } from "react";
import WalletContext from "../context/WalletProvider";

const useAuth = () => {
    return useContext(WalletContext);
};

export default useAuth;
