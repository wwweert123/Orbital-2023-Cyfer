pragma solidity >=0.7.0 <0.9.0;

contract SimpleStorage {
    uint public data;

    // Declare the event
    event DataChanged(uint newValue);

    function set(uint x) public {
        data = x;
        // Emit the event every time the data changes
        emit DataChanged(x);
    }

    function get() public view returns (uint) {
        return data;
    }
}
