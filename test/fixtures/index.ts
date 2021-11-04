import { deployments, getNamedAccounts, getUnnamedAccounts } from "hardhat";
import { N } from "../../typechain/N";
import { GMPass } from "../../typechain";
import { ETH } from "../../utils/utils";
import { setupUser, setupUsers } from "./users";

export interface Contracts {
  N: N;
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

  const nContractFactory = await ethers.getContractFactory("N");
  const nContract = (await nContractFactory.deploy()) as N;
  const nAddress = nContract.address;

  const nPassFactory = await ethers.getContractFactory("MockGMPass");
  const nDerivative = (await nPassFactory.deploy("GMD", "GMD", nAddress, false, 8888, 0, 0, 0)) as GMPass;
  const nDerivativeRestricted = (await nPassFactory.deploy("GMDR", "GMDR", nAddress, true, 8888, 0, 0, 0)) as GMPass;
  const nDerivativeWithAllowance = (await nPassFactory.deploy("GMDA", "GMDA", nAddress, false, 10, 5, 0, 0)) as GMPass;
  const nDerivativeWithPrice = (await nPassFactory.deploy(
    "GMD",
    "GMD",
    nAddress,
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
    N: nContract,
  };
  const users: User[] = await setupUsers(await getUnnamedAccounts(), contracts);

  return {
    contracts,
    deployer: <User>await setupUser(deployer, contracts),
    users,
  };
});
