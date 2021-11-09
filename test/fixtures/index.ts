import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { ERC721Mock, GenerativemasksDerivative, GMsDerivativeBase } from "../../typechain";
import { GMsPass } from "../../typechain";
import { ETH } from "../../utils/utils";
import { setupUser, setupUsers } from "./users";

export interface Contracts {
  NFT: ERC721Mock;
  GMsDerivative: GMsDerivativeBase;
  MockGMsDerivative: GMsPass;
  MockGMsDerivativeRestricted: GMsPass;
  MockGMsDerivativeWithAllowance: GMsPass;
  MockGMsDerivativeWithPrice: GMsPass;
}

export interface User extends Contracts {
  address: string;
}

export const setupIntegration = deployments.createFixture(async ({ ethers }) => {
  const { deployer } = await getNamedAccounts();

  const nftContractFactory = await ethers.getContractFactory("ERC721Mock");
  const nftContract = (await nftContractFactory.deploy()) as ERC721Mock;
  const nftAddress = nftContract.address;

  const GMsDerivativeFactory = await ethers.getContractFactory("GMsDerivativeBase");
  const GMsDerivative = (await GMsDerivativeFactory.deploy(
    "GMsD",
    "GMsD",
    "https://example.com/",
    nftAddress,
    nftAddress,
  )) as GMsDerivativeBase;

  const mockGMsPassFactory = await ethers.getContractFactory("MockGMsPass");
  const mockGMsDerivative = (await mockGMsPassFactory.deploy(
    "GMsD",
    "GMsD",
    nftAddress,
    false,
    8888,
    0,
    0,
    0,
  )) as GMsPass;
  const mockGMsDerivativeRestricted = (await mockGMsPassFactory.deploy(
    "GMsDR",
    "GMsDR",
    nftAddress,
    true,
    8888,
    0,
    0,
    0,
  )) as GMsPass;
  const mockGMsDerivativeWithAllowance = (await mockGMsPassFactory.deploy(
    "GMsDA",
    "GMsDA",
    nftAddress,
    false,
    10,
    5,
    0,
    0,
  )) as GMsPass;
  const mockGMsDerivativeWithPrice = (await mockGMsPassFactory.deploy(
    "GMsD",
    "GMsD",
    nftAddress,
    false,
    8888,
    0,
    ETH(1),
    ETH(5),
  )) as GMsPass;

  const contracts: Contracts = {
    GMsDerivative,
    MockGMsDerivative: mockGMsDerivative,
    MockGMsDerivativeRestricted: mockGMsDerivativeRestricted,
    MockGMsDerivativeWithAllowance: mockGMsDerivativeWithAllowance,
    MockGMsDerivativeWithPrice: mockGMsDerivativeWithPrice,
    NFT: nftContract,
  };
  const users: User[] = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    contracts,
    deployer: <User>await setupUser(deployer, contracts),
    users,
  };
});
