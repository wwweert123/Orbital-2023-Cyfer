export function dataShort(data) {
    if (typeof data === "string") {
        return (
            `${data}`.slice(0, 10) +
            "..." +
            `${data}`.slice(`${data}`.length - 64)
        );
    } else {
        //throw new Error("Invalid format: " + typeof data);
    }
}

function fromHex(hex) {
    let str = "";
    for (let i = 0; i < hex.length; i += 2) {
        let temp = String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        str += temp;
    }
    return str;
}

export function decode(encoded, functionName) {
    let strings = [];
    if (
        functionName === "Set Clause(clause number, string)" ||
        functionName === "set Clause"
    ) {
        let intVariable = encoded.slice(0, 64);
        strings.push(parseInt(intVariable, 16));
        strings.push(", ");
        let dataStart = parseInt(encoded.slice(64, 128), 16);
        let stringVariable = fromHex(
            encoded.slice(dataStart + 64, encoded.length)
        );
        strings.push(stringVariable);
    } else if (
        functionName === "Add Editor(address)" ||
        functionName === "added an editor"
    ) {
        strings.push("0x" + encoded.slice(24, 64));
    } else {
        for (let i = 64; i < encoded.length; i += 64) {
            let offset = parseInt(encoded.slice(i, i + 64), 16) * 2;
            let length = parseInt(encoded.slice(offset, offset + 64), 16) * 2;
            let data = encoded.slice(offset + 64, offset + 64 + length);
            strings.push(fromHex(data));
        }
    }
    return strings;
}
