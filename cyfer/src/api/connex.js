import Connex from "@vechain/connex";
const NODE = "https://vethor-node-test.vechaindev.com";

const connex = () => {
    return new Connex({ node: NODE, network: "test" });
};

export default connex;
