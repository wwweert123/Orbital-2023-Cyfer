import { useState, useEffect } from "react";

// Connex
import Connex from "../api/connex";

// ABI
import { ABICombined } from "../Vechain/abicombined";

export default function useGetContractType(contractAddress) {
    const connex = Connex();
    const [contractType, setContractType] = useState(null);
    useEffect(() => {
        const getContractType = ABICombined[1].find(
            ({ name }) => name === "getContractType"
        );
        const getContractTypeFunc = async () => {
            try {
                const result = await connex.thor
                    .account(contractAddress)
                    .method(getContractType)
                    .call();
                setContractType(result.decoded[0]);
                console.log(contractAddress);
                console.log(result.decoded[0]);
            } catch (err) {
                console.log(err);
                console.log("useGetContractType failed");
            }
        };
        getContractTypeFunc();
        // eslint-disable-next-line
    }, [contractAddress]);
    return contractType;
}
