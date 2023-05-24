// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Storage {
    uint256 private IDnumber;
    mapping(uint256 => string) private clients;
    uint256 private clientSize = 0;
    string private header;
    mapping(uint256 => string) private content;
    uint256 private contentSize = 0;

    constructor(uint256 initialID, string memory initialClient, string memory initialHeader, string memory initialContent) {
        store(initialID);
        addClient(initialID, initialClient);
        setHeader(initialHeader);
        addContent(initialContent);
    }

    function store(uint256 num) public {
        IDnumber = num;
    }

    function addClient(uint256 id, string memory newClient) public {
        clients[id] = newClient;
        clientSize += 1;
    }

    function removeClient(uint256 id) public {
        require(bytes(clients[id]).length != 0, "Client does not exist");
        delete clients[id];
        clientSize -= 1;
    }

    function getClient(uint256 id) public view returns (string memory) {
        require(bytes(clients[id]).length != 0, "Client does not exist");
        return clients[id];
    }

    function setHeader(string memory newHeader) public {
        header = newHeader;
    }

    function getHeader() public view returns (string memory) {
        return header;
    }

    function addContent(string memory newContent) public {
        content[contentSize] = newContent;
        contentSize += 1;
    }

    function editHeader(string memory newHeader) public {
        header = newHeader;
    }

    function editContent(uint256 id, string memory newContent) public {
        require(bytes(content[id]).length != 0, "Content does not exist");
        content[id] = newContent;
    }

    function getContent(uint256 id) public view returns (string memory) {
        require(bytes(content[id]).length != 0, "Content does not exist");
        return content[id];
    }

    function retrieve() public view returns (uint256){
        return IDnumber;
    }
}
