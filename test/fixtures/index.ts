import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { ERC721Mock, GenerativemasksDerivative } from "../../typechain";
import { GMPass } from "../../typechain";
import { ETH } from "../../utils/utils";
import { setupUser, setupUsers } from "./users";

export interface Contracts {
  NFT: ERC721Mock;
  GMDerivative: GenerativemasksDerivative;
  MockGMDerivative: GMPass;
  MockGMDerivativeRestricted: GMPass;
  MockGMDerivativeWithAllowance: GMPass;
  MockGMDerivativeWithPrice: GMPass;
}

export interface User extends Contracts {
  address: string;
}

export const setupIntegration = deployments.createFixture(async ({ ethers }) => {
  const { deployer } = await getNamedAccounts();

  const nftContractFactory = await ethers.getContractFactory("ERC721Mock");
  const nftContract = (await nftContractFactory.deploy()) as ERC721Mock;
  const nftAddress = nftContract.address;

  const GMPassFactory = await ethers.getContractFactory("GenerativemasksDerivative");
  const GMDerivative = (await GMPassFactory.deploy(
    "https://example.com/",
    "GMD",
    "GMD",
    nftAddress,
    nftAddress,
  )) as GenerativemasksDerivative;

  const mockGMPassFactory = await ethers.getContractFactory("MockGMPass");
  const mockGMDerivative = (await mockGMPassFactory.deploy("GMD", "GMD", nftAddress, false, 8888, 0, 0, 0)) as GMPass;
  const mockGMDerivativeRestricted = (await mockGMPassFactory.deploy(
    "GMDR",
    "GMDR",
    nftAddress,
    true,
    8888,
    0,
    0,
    0,
  )) as GMPass;
  const mockGMDerivativeWithAllowance = (await mockGMPassFactory.deploy(
    "GMDA",
    "GMDA",
    nftAddress,
    false,
    10,
    5,
    0,
    0,
  )) as GMPass;
  const mockGMDerivativeWithPrice = (await mockGMPassFactory.deploy(
    "GMD",
    "GMD",
    nftAddress,
    false,
    8888,
    0,
    ETH(1),
    ETH(5),
  )) as GMPass;

  const contracts: Contracts = {
    GMDerivative,
    MockGMDerivative: mockGMDerivative,
    MockGMDerivativeRestricted: mockGMDerivativeRestricted,
    MockGMDerivativeWithAllowance: mockGMDerivativeWithAllowance,
    MockGMDerivativeWithPrice: mockGMDerivativeWithPrice,
    NFT: nftContract,
  };
  const users: User[] = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    contracts,
    deployer: <User>await setupUser(deployer, contracts),
    users,
  };
});
