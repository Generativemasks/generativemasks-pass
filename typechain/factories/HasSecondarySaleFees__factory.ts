/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  utils,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  HasSecondarySaleFees,
  HasSecondarySaleFeesInterface,
} from "../HasSecondarySaleFees";

const _abi = [
  {
    inputs: [
      {
        internalType: "address payable[]",
        name: "_commonRoyaltyAddresses",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_commonRoyaltiesWithTwoDecimals",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address payable[]",
        name: "royaltyAddresses",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "royaltiesWithTwoDecimals",
        type: "uint256[]",
      },
    ],
    name: "ChangeCommonRoyalty",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address payable[]",
        name: "royaltyAddresses",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "royaltiesWithTwoDecimals",
        type: "uint256[]",
      },
    ],
    name: "ChangeRoyalty",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "commonRoyaltiesWithTwoDecimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "commonRoyaltyAddresses",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getFeeBps",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "getFeeRecipients",
    outputs: [
      {
        internalType: "address payable[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000d2538038062000d258339810160408190526200003491620002e7565b62000040828262000048565b5050620004f5565b80518251146200009f5760405162461bcd60e51b815260206004820152601960248201527f696e707574206c656e677468206d7573742062652073616d650000000000000060448201526064015b60405180910390fd5b60005b8251811015620001425760006001600160a01b0316838281518110620000cc57620000cc620004c9565b60200260200101516001600160a01b031614156200012d5760405162461bcd60e51b815260206004820152601860248201527f4d757374206e6f74206265207a65726f2d616464726573730000000000000000604482015260640162000096565b8062000139816200049f565b915050620000a2565b50815162000158906002906020850190620001ae565b5080516200016e90600390602084019062000218565b507f5d2bfbaa8b7f0a1c8af86340416cb6051131510959c7fd9ab84a1c75fed9464f8282604051620001a2929190620003cb565b60405180910390a15050565b82805482825590600052602060002090810192821562000206579160200282015b828111156200020657825182546001600160a01b0319166001600160a01b03909116178255602090920191600190910190620001cf565b506200021492915062000256565b5090565b82805482825590600052602060002090810192821562000206579160200282015b828111156200020657825182559160200191906001019062000239565b5b8082111562000214576000815560010162000257565b600082601f8301126200027f57600080fd5b8151602062000298620002928362000479565b62000446565b80838252828201915082860187848660051b8901011115620002b957600080fd5b60005b85811015620002da57815184529284019290840190600101620002bc565b5090979650505050505050565b60008060408385031215620002fb57600080fd5b82516001600160401b03808211156200031357600080fd5b818501915085601f8301126200032857600080fd5b815160206200033b620002928362000479565b8083825282820191508286018a848660051b89010111156200035c57600080fd5b600096505b84871015620003975780516001600160a01b03811681146200038257600080fd5b83526001969096019591830191830162000361565b5091880151919650909350505080821115620003b257600080fd5b50620003c1858286016200026d565b9150509250929050565b604080825283519082018190526000906020906060840190828701845b828110156200040f5781516001600160a01b031684529284019290840190600101620003e8565b5050508381038285015284518082528583019183019060005b81811015620002da5783518352928401929184019160010162000428565b604051601f8201601f191681016001600160401b0381118282101715620004715762000471620004df565b604052919050565b60006001600160401b03821115620004955762000495620004df565b5060051b60200190565b6000600019821415620004c257634e487b7160e01b600052601160045260246000fd5b5060010190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b61082080620005056000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80631196a0c4116100505780631196a0c4146100dd578063b9c4d9fb146100fe578063c3a983b21461011e57600080fd5b806301ffc9a71461006c5780630ebd4c7f146100bd575b600080fd5b6100a861007a3660046106b7565b7fffffffff0000000000000000000000000000000000000000000000000000000016632dde656160e21b1490565b60405190151581526020015b60405180910390f35b6100d06100cb366004610700565b610149565b6040516100b49190610766565b6100f06100eb366004610700565b6103c4565b6040519081526020016100b4565b61011161010c366004610700565b6103e5565b6040516100b49190610719565b61013161012c366004610700565b61068d565b6040516001600160a01b0390911681526020016100b4565b6000818152600160208181526040808420548452838252808420815160608181018452825460ff1615158252948201805484518187028101870190955280855295969591949293858401939092908301828280156101d057602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116101b2575b505050505081526020016002820180548060200260200160405190810160405280929190818152602001828054801561022857602002820191906000526020600020905b815481526020019060010190808311610214575b5050505050815250509050806000015161029557600380548060200260200160405190810160405280929190818152602001828054801561028857602002820191906000526020600020905b815481526020019060010190808311610274575b5050505050915050919050565b6040810151516003546000916102aa9161079e565b905060008167ffffffffffffffff8111156102c7576102c76107fd565b6040519080825280602002602001820160405280156102f0578160200160208202803683370190505b50905060005b60035481101561034d5760038181548110610313576103136107e7565b9060005260206000200154828281518110610330576103306107e7565b602090810291909101015280610345816107b6565b9150506102f6565b5060005b8360400151518110156103bb5783604001518181518110610374576103746107e7565b6020026020010151826002805490508361038e919061079e565b8151811061039e5761039e6107e7565b6020908102919091010152806103b3816107b6565b915050610351565b50949350505050565b600381815481106103d457600080fd5b600091825260209091200154905081565b6000818152600160208181526040808420548452838252808420815160608181018452825460ff16151582529482018054845181870281018701909552808552959695919492938584019390929083018282801561046c57602002820191906000526020600020905b81546001600160a01b0316815260019091019060200180831161044e575b50505050508152602001600282018054806020026020016040519081016040528092919081815260200182805480156104c457602002820191906000526020600020905b8154815260200190600101908083116104b0575b5050505050815250509050806000015161053a57600280548060200260200160405190810160405280929190818152602001828054801561028857602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610510575050505050915050919050565b60208101515160025460009161054f9161079e565b905060008167ffffffffffffffff81111561056c5761056c6107fd565b604051908082528060200260200182016040528015610595578160200160208202803683370190505b50905060005b60025481101561061257600281815481106105b8576105b86107e7565b9060005260206000200160009054906101000a90046001600160a01b03168282815181106105e8576105e86107e7565b6001600160a01b03909216602092830291909101909101528061060a816107b6565b91505061059b565b5060005b8360200151518110156103bb5783602001518181518110610639576106396107e7565b60200260200101518260028054905083610653919061079e565b81518110610663576106636107e7565b6001600160a01b039092166020928302919091019091015280610685816107b6565b915050610616565b6002818154811061069d57600080fd5b6000918252602090912001546001600160a01b0316905081565b6000602082840312156106c957600080fd5b81357fffffffff00000000000000000000000000000000000000000000000000000000811681146106f957600080fd5b9392505050565b60006020828403121561071257600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561075a5783516001600160a01b031683529284019291840191600101610735565b50909695505050505050565b6020808252825182820181905260009190848201906040850190845b8181101561075a57835183529284019291840191600101610782565b600082198211156107b1576107b16107d1565b500190565b60006000198214156107ca576107ca6107d1565b5060010190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fdfea164736f6c6343000806000a";

export class HasSecondarySaleFees__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _commonRoyaltyAddresses: string[],
    _commonRoyaltiesWithTwoDecimals: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<HasSecondarySaleFees> {
    return super.deploy(
      _commonRoyaltyAddresses,
      _commonRoyaltiesWithTwoDecimals,
      overrides || {}
    ) as Promise<HasSecondarySaleFees>;
  }
  getDeployTransaction(
    _commonRoyaltyAddresses: string[],
    _commonRoyaltiesWithTwoDecimals: BigNumberish[],
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _commonRoyaltyAddresses,
      _commonRoyaltiesWithTwoDecimals,
      overrides || {}
    );
  }
  attach(address: string): HasSecondarySaleFees {
    return super.attach(address) as HasSecondarySaleFees;
  }
  connect(signer: Signer): HasSecondarySaleFees__factory {
    return super.connect(signer) as HasSecondarySaleFees__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HasSecondarySaleFeesInterface {
    return new utils.Interface(_abi) as HasSecondarySaleFeesInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HasSecondarySaleFees {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as HasSecondarySaleFees;
  }
}
