function toHex(input) {
    let hex = "";
    for (let i = 0; i < input.length; i++) {
        hex += input.charCodeAt(i).toString(16).padStart(2, "0");
    }
    return hex;
}

function pad(length) {
    return length.toString(16).padStart(64, "0");
}

export default function encode(strings) {
    let offsets = "",
        data = "",
        headSize = strings.length * 32;

    for (let i = 0; i < strings.length; i++) {
        let hexString = toHex(strings[i]);
        let hexLength = pad(strings[i].length);
        let paddedData = hexString.padEnd(64, "0");

        offsets += pad(headSize);
        data += hexLength + paddedData;

        headSize += 32 + Math.ceil(strings[i].length / 32) * 32;
    }

    return offsets + data;
}
