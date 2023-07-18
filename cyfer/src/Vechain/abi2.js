export const ABI2 = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newDescription",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "addAuthorizedAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newName",
				"type": "string"
			}
		],
		"name": "changeName",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractType",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDescription",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getForVotes",
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
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNoVotes",
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
		"name": "getProposal",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProposalIndex",
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
		"name": "getProposer",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRequiredVotes",
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
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "hasVoted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isAuthorized",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeAuthorizedAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			}
		],
		"name": "retrieve",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newDescription",
				"type": "string"
			}
		],
		"name": "setDescription",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "num",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "text",
				"type": "string"
			}
		],
		"name": "store",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voteFor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voteNo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

export const byteCode2 = '0x608060405260008060006101000a81548160ff02191690831515021790555060646001556000600c553480156200003557600080fd5b50604051620022853803806200228583398181016040528101906200005b919062000354565b33602160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600a6000602160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600b339080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600c60008282546200018e919062000412565b925050819055508160089081620001a691906200068e565b508060099081620001b891906200068e565b50505062000775565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6200022a82620001df565b810181811067ffffffffffffffff821117156200024c576200024b620001f0565b5b80604052505050565b600062000261620001c1565b90506200026f82826200021f565b919050565b600067ffffffffffffffff821115620002925762000291620001f0565b5b6200029d82620001df565b9050602081019050919050565b60005b83811015620002ca578082015181840152602081019050620002ad565b60008484015250505050565b6000620002ed620002e78462000274565b62000255565b9050828152602081018484840111156200030c576200030b620001da565b5b62000319848285620002aa565b509392505050565b600082601f830112620003395762000338620001d5565b5b81516200034b848260208601620002d6565b91505092915050565b600080604083850312156200036e576200036d620001cb565b5b600083015167ffffffffffffffff8111156200038f576200038e620001d0565b5b6200039d8582860162000321565b925050602083015167ffffffffffffffff811115620003c157620003c0620001d0565b5b620003cf8582860162000321565b9150509250929050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200041f82620003d9565b91506200042c83620003d9565b9250828201905080821115620004475762000446620003e3565b5b92915050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680620004a057607f821691505b602082108103620004b657620004b562000458565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b600060088302620005207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620004e1565b6200052c8683620004e1565b95508019841693508086168417925050509392505050565b6000819050919050565b60006200056f620005696200056384620003d9565b62000544565b620003d9565b9050919050565b6000819050919050565b6200058b836200054e565b620005a36200059a8262000576565b848454620004ee565b825550505050565b600090565b620005ba620005ab565b620005c781848462000580565b505050565b5b81811015620005ef57620005e3600082620005b0565b600181019050620005cd565b5050565b601f8211156200063e576200060881620004bc565b6200061384620004d1565b8101602085101562000623578190505b6200063b6200063285620004d1565b830182620005cc565b50505b505050565b600082821c905092915050565b6000620006636000198460080262000643565b1980831691505092915050565b60006200067e838362000650565b9150826002028217905092915050565b62000699826200044d565b67ffffffffffffffff811115620006b557620006b4620001f0565b5b620006c1825462000487565b620006ce828285620005f3565b600060209050601f831160018114620007065760008415620006f1578287015190505b620006fd858262000670565b8655506200076d565b601f1984166200071686620004bc565b60005b82811015620007405784890151825560018201915060208501945060208101905062000719565b868310156200076057848901516200075c601f89168262000650565b8355505b6001600288020188555050505b505050505050565b611b0080620007856000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80637b788b7f116100ad578063e1ff178a11610071578063e1ff178a146102d2578063e5920ab5146102ee578063e9790d021461030c578063fe9fbb801461032a578063ffaa36081461035a57610121565b80637b788b7f1461022c5780638f88708b1461024a57806390c3f38f1461027a578063b9e2bea014610296578063c51a29e0146102b457610121565b806341c12a70116100f457806341c12a70146101b057806342f1181e146101ba5780635353a2d8146101d657806370712939146101f2578063776618291461020e57610121565b806309eef43e1461012657806317d7de7c146101565780631a092541146101745780633605b63e14610192575b600080fd5b610140600480360381019061013b919061107b565b610364565b60405161014d91906110c3565b60405180910390f35b61015e6103ba565b60405161016b919061116e565b60405180910390f35b61017c61044c565b604051610189919061116e565b60405180910390f35b61019a6104de565b6040516101a791906111a9565b60405180910390f35b6101b86104e8565b005b6101d460048036038101906101cf919061107b565b61067e565b005b6101f060048036038101906101eb91906112f9565b6107c3565b005b61020c6004803603810190610207919061107b565b61081e565b005b61021661095e565b60405161022391906111a9565b60405180910390f35b610234610968565b60405161024191906111a9565b60405180910390f35b610264600480360381019061025f919061136e565b610972565b604051610271919061116e565b60405180910390f35b610294600480360381019061028f91906112f9565b610a19565b005b61029e610a74565b6040516102ab919061116e565b60405180910390f35b6102bc610b06565b6040516102c991906111a9565b60405180910390f35b6102ec60048036038101906102e7919061139b565b610b0f565b005b6102f6610c71565b60405161030391906111a9565b60405180910390f35b610314610c7b565b6040516103219190611406565b60405180910390f35b610344600480360381019061033f919061107b565b610ca5565b60405161035191906110c3565b60405180910390f35b610362610cfb565b005b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b6060600880546103c990611450565b80601f01602080910402602001604051908101604052809291908181526020018280546103f590611450565b80156104425780601f1061041757610100808354040283529160200191610442565b820191906000526020600020905b81548152906001019060200180831161042557829003601f168201915b5050505050905090565b60606009805461045b90611450565b80601f016020809104026020016040519081016040528092919081815260200182805461048790611450565b80156104d45780601f106104a9576101008083540402835291602001916104d4565b820191906000526020600020905b8154815290600101906020018083116104b757829003601f168201915b5050505050905090565b6000600554905090565b6104f133610ca5565b610530576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610527906114cd565b60405180910390fd5b606460015403610575576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161056c90611539565b60405180910390fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610602576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f9906115a5565b60405180910390fd5b60016006600082825461061591906115f4565b925050819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061067c610e91565b565b61068733610ca5565b6106c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106bd906114cd565b60405180910390fd5b6001600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600b819080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600c600082825461079491906115f4565b925050819055506064600154146107c0576001600460008282546107b891906115f4565b925050819055505b50565b6107cc33610ca5565b61080b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610802906114cd565b60405180910390fd5b806008908161081a91906117d4565b5050565b61082733610ca5565b610866576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161085d906114cd565b60405180910390fd5b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506001600c60008282546108d191906118a6565b9250508190555060646001541415801561093b575060001515600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515145b1561095b5760016004600082825461095391906118a6565b925050819055505b50565b6000600154905090565b6000600454905090565b6060600d8260148110610988576109876118da565b5b01805461099490611450565b80601f01602080910402602001604051908101604052809291908181526020018280546109c090611450565b8015610a0d5780601f106109e257610100808354040283529160200191610a0d565b820191906000526020600020905b8154815290600101906020018083116109f057829003601f168201915b50505050509050919050565b610a2233610ca5565b610a61576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a58906114cd565b60405180910390fd5b8060099081610a7091906117d4565b5050565b606060028054610a8390611450565b80601f0160208091040260200160405190810160405280929190818152602001828054610aaf90611450565b8015610afc5780601f10610ad157610100808354040283529160200191610afc565b820191906000526020600020905b815481529060010190602001808311610adf57829003601f168201915b5050505050905090565b60006002905090565b610b1833610ca5565b610b57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b4e906114cd565b60405180910390fd5b606460015414610b9c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b9390611955565b60405180910390fd5b816001819055508060029081610bb291906117d4565b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600c5460048190555060016005819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055506000600681905550610c6d610e91565b5050565b6000600654905090565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600a60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b610d0433610ca5565b610d43576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d3a906114cd565b60405180910390fd5b606460015403610d88576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d7f90611539565b60405180910390fd5b600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615610e15576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0c906115a5565b60405180910390fd5b600160056000828254610e2891906115f4565b925050819055506001600760003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610e8f610e91565b565b60006005549050600281610ea59190611975565b90506004548110610f05576002600d60015460148110610ec857610ec76118da565b5b019081610ed591906119e2565b506064600181905550610ee6610f4c565b60016000806101000a81548160ff021916908315150217905550610f49565b600454600654600554610f1891906115f4565b03610f48576064600181905550610f2d610f4c565b60008060006101000a81548160ff0219169083151502179055505b5b50565b60005b600b8054905081101561100657600060076000600b8481548110610f7657610f756118da565b5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600181610fff91906115f4565b9050610f4f565b50565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006110488261101d565b9050919050565b6110588161103d565b811461106357600080fd5b50565b6000813590506110758161104f565b92915050565b60006020828403121561109157611090611013565b5b600061109f84828501611066565b91505092915050565b60008115159050919050565b6110bd816110a8565b82525050565b60006020820190506110d860008301846110b4565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156111185780820151818401526020810190506110fd565b60008484015250505050565b6000601f19601f8301169050919050565b6000611140826110de565b61114a81856110e9565b935061115a8185602086016110fa565b61116381611124565b840191505092915050565b600060208201905081810360008301526111888184611135565b905092915050565b6000819050919050565b6111a381611190565b82525050565b60006020820190506111be600083018461119a565b92915050565b600080fd5b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61120682611124565b810181811067ffffffffffffffff82111715611225576112246111ce565b5b80604052505050565b6000611238611009565b905061124482826111fd565b919050565b600067ffffffffffffffff821115611264576112636111ce565b5b61126d82611124565b9050602081019050919050565b82818337600083830152505050565b600061129c61129784611249565b61122e565b9050828152602081018484840111156112b8576112b76111c9565b5b6112c384828561127a565b509392505050565b600082601f8301126112e0576112df6111c4565b5b81356112f0848260208601611289565b91505092915050565b60006020828403121561130f5761130e611013565b5b600082013567ffffffffffffffff81111561132d5761132c611018565b5b611339848285016112cb565b91505092915050565b61134b81611190565b811461135657600080fd5b50565b60008135905061136881611342565b92915050565b60006020828403121561138457611383611013565b5b600061139284828501611359565b91505092915050565b600080604083850312156113b2576113b1611013565b5b60006113c085828601611359565b925050602083013567ffffffffffffffff8111156113e1576113e0611018565b5b6113ed858286016112cb565b9150509250929050565b6114008161103d565b82525050565b600060208201905061141b60008301846113f7565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061146857607f821691505b60208210810361147b5761147a611421565b5b50919050565b7f556e617574686f72697a65642061636365737300000000000000000000000000600082015250565b60006114b76013836110e9565b91506114c282611481565b602082019050919050565b600060208201905081810360008301526114e6816114aa565b9050919050565b7f6e6f2070726f706f73616c7320617661696c61626c6500000000000000000000600082015250565b60006115236016836110e9565b915061152e826114ed565b602082019050919050565b6000602082019050818103600083015261155281611516565b9050919050565b7f616c726561647920766f74656421000000000000000000000000000000000000600082015250565b600061158f600e836110e9565b915061159a82611559565b602082019050919050565b600060208201905081810360008301526115be81611582565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006115ff82611190565b915061160a83611190565b9250828201905080821115611622576116216115c5565b5b92915050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261168a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261164d565b611694868361164d565b95508019841693508086168417925050509392505050565b6000819050919050565b60006116d16116cc6116c784611190565b6116ac565b611190565b9050919050565b6000819050919050565b6116eb836116b6565b6116ff6116f7826116d8565b84845461165a565b825550505050565b600090565b611714611707565b61171f8184846116e2565b505050565b5b818110156117435761173860008261170c565b600181019050611725565b5050565b601f8211156117885761175981611628565b6117628461163d565b81016020851015611771578190505b61178561177d8561163d565b830182611724565b50505b505050565b600082821c905092915050565b60006117ab6000198460080261178d565b1980831691505092915050565b60006117c4838361179a565b9150826002028217905092915050565b6117dd826110de565b67ffffffffffffffff8111156117f6576117f56111ce565b5b6118008254611450565b61180b828285611747565b600060209050601f83116001811461183e576000841561182c578287015190505b61183685826117b8565b86555061189e565b601f19841661184c86611628565b60005b828110156118745784890151825560018201915060208501945060208101905061184f565b86831015611891578489015161188d601f89168261179a565b8355505b6001600288020188555050505b505050505050565b60006118b182611190565b91506118bc83611190565b92508282039050818111156118d4576118d36115c5565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f70726f706f73616c7320617661696c61626c6500000000000000000000000000600082015250565b600061193f6013836110e9565b915061194a82611909565b602082019050919050565b6000602082019050818103600083015261196e81611932565b9050919050565b600061198082611190565b915061198b83611190565b925082820261199981611190565b915082820484148315176119b0576119af6115c5565b5b5092915050565b6000815490506119c681611450565b9050919050565b60008190508160005260206000209050919050565b8181036119f0575050611ac8565b6119f9826119b7565b67ffffffffffffffff811115611a1257611a116111ce565b5b611a1c8254611450565b611a27828285611747565b6000601f831160018114611a565760008415611a44578287015490505b611a4e85826117b8565b865550611ac1565b601f198416611a64876119cd565b9650611a6f86611628565b60005b82811015611a9757848901548255600182019150600185019450602081019050611a72565b86831015611ab45784890154611ab0601f89168261179a565b8355505b6001600288020188555050505b5050505050505b56fea2646970667358221220a969800f12fd857cecaa04bbf46dd294d88a2fff0cd6fa8bef00dff62e3b00d764736f6c63430008120033'