import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { ERC721Mock } from "../../typechain";
import { GMPass } from "../../typechain";
import { ETH } from "../../utils/utils";
import { setupUser, setupUsers } from "./users";

export interface Contracts {
  NFT: ERC721Mock;
  GMDerivative: GMPass;
  GMDerivativeRestricted: GMPass;
  GMDerivativeWithAllowance: GMPass;
  GMDerivativeWithPrice: GMPass;
}

export interface User extends Contracts {
  address: string;
}

export const setupIntegration = deployments.createFixture(async ({ ethers }) => {
  const { deployer } = await getNamedAccounts();

  const nftContractFactory = await ethers.getContractFactory("ERC721Mock");
  const nftContract = (await nftContractFactory.deploy()) as ERC721Mock;
  const nftAddress = nftContract.address;

  const gmPassFactory = await ethers.getContractFactory("MockGMPass");
  const nDerivative = (await gmPassFactory.deploy("GMD", "GMD", nftAddress, false, 8888, 0, 0, 0)) as GMPass;
  const nDerivativeRestricted = (await gmPassFactory.deploy("GMDR", "GMDR", nftAddress, true, 8888, 0, 0, 0)) as GMPass;
  const nDerivativeWithAllowance = (await gmPassFactory.deploy(
    "GMDA",
    "GMDA",
    nftAddress,
    false,
    10,
    5,
    0,
    0,
  )) as GMPass;
  const nDerivativeWithPrice = (await gmPassFactory.deploy(
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
    GMDerivative: nDerivative,
    GMDerivativeRestricted: nDerivativeRestricted,
    GMDerivativeWithAllowance: nDerivativeWithAllowance,
    GMDerivativeWithPrice: nDerivativeWithPrice,
    NFT: nftContract,
  };
  const users: User[] = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    contracts,
    deployer: <User>await setupUser(deployer, contracts),
    users,
  };
});
