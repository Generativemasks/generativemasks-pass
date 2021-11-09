/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import { TypedEventFilter, TypedEvent, TypedListener } from "./commons";

interface MockGMsPassInterface extends ethers.utils.Interface {
  functions: {
    "GMS_SUPPLY_AMOUNT()": FunctionFragment;
    "MAX_GMs_TOKEN_ID()": FunctionFragment;
    "MAX_MULTI_MINT_AMOUNT()": FunctionFragment;
    "METADATA_INDEX()": FunctionFragment;
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "generativemasks()": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getTokenIdFromMaskNumber(uint256)": FunctionFragment;
    "getTokenIdListFromMaskNumbers(uint256[])": FunctionFragment;
    "gmsHoldersMintsAvailable()": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "maxTokenId()": FunctionFragment;
    "maxTotalSupply()": FunctionFragment;
    "mint(uint256)": FunctionFragment;
    "mintWithGMsMaskNumber(uint256)": FunctionFragment;
    "mintWithGMsTokenId(uint256)": FunctionFragment;
    "mintedCount()": FunctionFragment;
    "multiMintWithGMsMaskNumbers(uint256[])": FunctionFragment;
    "multiMintWithGMsTokenIds(uint256[])": FunctionFragment;
    "name()": FunctionFragment;
    "onlyGMsHolders()": FunctionFragment;
    "openMintsAvailable()": FunctionFragment;
    "owner()": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "priceForGMsHoldersInWei()": FunctionFragment;
    "priceForOpenMintInWei()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "reserveMinted()": FunctionFragment;
    "reservedAllowance()": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "symbol()": FunctionFragment;
    "tokenURI(uint256)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "withdrawAll()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "GMS_SUPPLY_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_GMs_TOKEN_ID",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MAX_MULTI_MINT_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "METADATA_INDEX",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "generativemasks",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenIdFromMaskNumber",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenIdListFromMaskNumbers",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "gmsHoldersMintsAvailable",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(
    functionFragment: "maxTokenId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxTotalSupply",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "mintWithGMsMaskNumber",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintWithGMsTokenId",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mintedCount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multiMintWithGMsMaskNumbers",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(
    functionFragment: "multiMintWithGMsTokenIds",
    values: [BigNumberish[]]
  ): string;
  encodeFunctionData(functionFragment: "name", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "onlyGMsHolders",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "openMintsAvailable",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "priceForGMsHoldersInWei",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "priceForOpenMintInWei",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reserveMinted",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "reservedAllowance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "tokenURI",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawAll",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "GMS_SUPPLY_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_GMs_TOKEN_ID",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MAX_MULTI_MINT_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "METADATA_INDEX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "generativemasks",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenIdFromMaskNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenIdListFromMaskNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "gmsHoldersMintsAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "maxTokenId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxTotalSupply",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "mintWithGMsMaskNumber",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintWithGMsTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mintedCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiMintWithGMsMaskNumbers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "multiMintWithGMsTokenIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onlyGMsHolders",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "openMintsAvailable",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "priceForGMsHoldersInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "priceForOpenMintInWei",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveMinted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reservedAllowance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawAll",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export class MockGMsPass extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: MockGMsPassInterface;

  functions: {
    GMS_SUPPLY_AMOUNT(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_GMs_TOKEN_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    MAX_MULTI_MINT_AMOUNT(overrides?: CallOverrides): Promise<[BigNumber]>;

    METADATA_INDEX(overrides?: CallOverrides): Promise<[BigNumber]>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    generativemasks(overrides?: CallOverrides): Promise<[string]>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getTokenIdFromMaskNumber(
      maskNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getTokenIdListFromMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<[BigNumber[]]>;

    gmsHoldersMintsAvailable(overrides?: CallOverrides): Promise<[BigNumber]>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    maxTokenId(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxTotalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;

    mint(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintWithGMsMaskNumber(
      maskNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintWithGMsTokenId(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    mintedCount(overrides?: CallOverrides): Promise<[BigNumber]>;

    multiMintWithGMsMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    multiMintWithGMsTokenIds(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    name(overrides?: CallOverrides): Promise<[string]>;

    onlyGMsHolders(overrides?: CallOverrides): Promise<[boolean]>;

    openMintsAvailable(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    priceForGMsHoldersInWei(overrides?: CallOverrides): Promise<[BigNumber]>;

    priceForOpenMintInWei(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    reserveMinted(overrides?: CallOverrides): Promise<[number]>;

    reservedAllowance(overrides?: CallOverrides): Promise<[number]>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    symbol(overrides?: CallOverrides): Promise<[string]>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  GMS_SUPPLY_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_GMs_TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

  MAX_MULTI_MINT_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

  METADATA_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

  generativemasks(overrides?: CallOverrides): Promise<string>;

  getApproved(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getTokenIdFromMaskNumber(
    maskNumber: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getTokenIdListFromMaskNumbers(
    maskNumbers: BigNumberish[],
    overrides?: CallOverrides
  ): Promise<BigNumber[]>;

  gmsHoldersMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  maxTokenId(overrides?: CallOverrides): Promise<BigNumber>;

  maxTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

  mint(
    tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintWithGMsMaskNumber(
    maskNumber: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintWithGMsTokenId(
    tokenId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  mintedCount(overrides?: CallOverrides): Promise<BigNumber>;

  multiMintWithGMsMaskNumbers(
    maskNumbers: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  multiMintWithGMsTokenIds(
    tokenIds: BigNumberish[],
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  name(overrides?: CallOverrides): Promise<string>;

  onlyGMsHolders(overrides?: CallOverrides): Promise<boolean>;

  openMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  priceForGMsHoldersInWei(overrides?: CallOverrides): Promise<BigNumber>;

  priceForOpenMintInWei(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  reserveMinted(overrides?: CallOverrides): Promise<number>;

  reservedAllowance(overrides?: CallOverrides): Promise<number>;

  "safeTransferFrom(address,address,uint256)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  symbol(overrides?: CallOverrides): Promise<string>;

  tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  withdrawAll(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    GMS_SUPPLY_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_GMs_TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_MULTI_MINT_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    METADATA_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    generativemasks(overrides?: CallOverrides): Promise<string>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getTokenIdFromMaskNumber(
      maskNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenIdListFromMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber[]>;

    gmsHoldersMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    maxTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    maxTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    mint(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    mintWithGMsMaskNumber(
      maskNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintWithGMsTokenId(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    mintedCount(overrides?: CallOverrides): Promise<BigNumber>;

    multiMintWithGMsMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    multiMintWithGMsTokenIds(
      tokenIds: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<void>;

    name(overrides?: CallOverrides): Promise<string>;

    onlyGMsHolders(overrides?: CallOverrides): Promise<boolean>;

    openMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    ownerOf(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    priceForGMsHoldersInWei(overrides?: CallOverrides): Promise<BigNumber>;

    priceForOpenMintInWei(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    reserveMinted(overrides?: CallOverrides): Promise<number>;

    reservedAllowance(overrides?: CallOverrides): Promise<number>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    symbol(overrides?: CallOverrides): Promise<string>;

    tokenURI(tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawAll(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;
  };

  estimateGas: {
    GMS_SUPPLY_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_GMs_TOKEN_ID(overrides?: CallOverrides): Promise<BigNumber>;

    MAX_MULTI_MINT_AMOUNT(overrides?: CallOverrides): Promise<BigNumber>;

    METADATA_INDEX(overrides?: CallOverrides): Promise<BigNumber>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(owner: string, overrides?: CallOverrides): Promise<BigNumber>;

    generativemasks(overrides?: CallOverrides): Promise<BigNumber>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenIdFromMaskNumber(
      maskNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenIdListFromMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    gmsHoldersMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    maxTokenId(overrides?: CallOverrides): Promise<BigNumber>;

    maxTotalSupply(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintWithGMsMaskNumber(
      maskNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintWithGMsTokenId(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    mintedCount(overrides?: CallOverrides): Promise<BigNumber>;

    multiMintWithGMsMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    multiMintWithGMsTokenIds(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    name(overrides?: CallOverrides): Promise<BigNumber>;

    onlyGMsHolders(overrides?: CallOverrides): Promise<BigNumber>;

    openMintsAvailable(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    priceForGMsHoldersInWei(overrides?: CallOverrides): Promise<BigNumber>;

    priceForOpenMintInWei(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    reserveMinted(overrides?: CallOverrides): Promise<BigNumber>;

    reservedAllowance(overrides?: CallOverrides): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    symbol(overrides?: CallOverrides): Promise<BigNumber>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    GMS_SUPPLY_AMOUNT(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_GMs_TOKEN_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    MAX_MULTI_MINT_AMOUNT(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    METADATA_INDEX(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    approve(
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      owner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    generativemasks(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getApproved(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenIdFromMaskNumber(
      maskNumber: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenIdListFromMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    gmsHoldersMintsAvailable(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      owner: string,
      operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    maxTokenId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxTotalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintWithGMsMaskNumber(
      maskNumber: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintWithGMsTokenId(
      tokenId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    mintedCount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    multiMintWithGMsMaskNumbers(
      maskNumbers: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    multiMintWithGMsTokenIds(
      tokenIds: BigNumberish[],
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    name(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    onlyGMsHolders(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    openMintsAvailable(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ownerOf(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceForGMsHoldersInWei(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    priceForOpenMintInWei(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    reserveMinted(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    reservedAllowance(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      operator: string,
      approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    tokenURI(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    transferFrom(
      from: string,
      to: string,
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    withdrawAll(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
