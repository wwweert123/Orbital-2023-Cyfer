// main.js
window.onload = function() {

    const abi = [
        {
            "inputs": [],
            "name": "data",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [], 
            "name": "get",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "x",
                    "type": "uint256"
                }
            ],
            "name": "set",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newValue",
                    "type": "uint256"
                }
            ],
            "name": "DataChanged",
            "type": "event"
        }
    ];

    const contractAddress = '0xb453e8f36a67795d8574528aec298488c393ff25';
    const account = '0x5033B739954d3c6337dda2E643Dd71Df67A0917C';
    console.log('Contract address: ', contractAddress);
    console.log('Account: ', connex.thor.account(contractAddress));
    console.log('Account code: ', connex.thor.account(contractAddress).code);

    if (typeof connex !== 'undefined') {
        const vendor = connex.vendor;
        const contract = connex.thor.account(contractAddress).method(abi);
        const historyElement = document.getElementById('history');

        document.getElementById('setButton').addEventListener('click', function() {
            const number = parseInt(document.getElementById('numberInput').value);
            document.getElementById('status').innerText = 'Setting number...';
            setNumber(contract, vendor, account, number).then(() => {
                const listItem = document.createElement('li');
                listItem.innerText = `Set number to ${number}`;
                historyElement.appendChild(listItem);
            });
        });

        contract.event('DataChanged').filter({order: 'desc', range: {unit: 'block', from: 1, to: 'best'}})
            .then(events => {
                events.forEach(event => {
                    const listItem = document.createElement('li');
                    listItem.innerText = `Number was set to ${event.decoded.newValue}`;
                    historyElement.appendChild(listItem);
                });
            });
    } else {
        console.log('No Connex? You should consider trying Sync!');
        document.getElementById('status').innerText = 'No Connex found.';
    }
};

function setNumber(contract, vendor, account, number) {
    const clause = contract.method('set').asClause(number);
    const signingService = vendor.sign('tx');
    return signingService.signer(account).request([{...clause, value: '0x0'}])
        .then(response => {
            console.log(response);
            document.getElementById('status').innerText = 'Number set successfully!';
        })
        .catch(error => {
            console.error(error);
            document.getElementById('status').innerText = 'Error setting number.';
        });
}

