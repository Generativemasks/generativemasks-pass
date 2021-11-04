/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from "chai";
import { ethers } from "hardhat";
import { GMPass } from "../../typechain";
import { ETH, getEthBalance } from "../../utils/utils";
import { Contracts, setupIntegration as setupGMDerivative, User } from "../fixtures";

const GAS_ADJ = ETH(0.01);

describe("GMPass", function () {
  let contracts: Contracts;
  let deployer: User;
  let users: User[];

  beforeEach(async () => {
    ({ contracts, deployer, users } = await setupGMDerivative());
  });

  describe("Construction", async function () {
    it("reverts on supply = 0", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      await expect(nPassFactory.deploy("ND", "ND", contracts.N.address, true, 0, 0, 0, 0)).to.be.revertedWith(
        "GMPass:INVALID_SUPPLY",
      );
    });

    it("reverts on restricted minting with total supply > n supply", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      await expect(nPassFactory.deploy("ND", "ND", contracts.N.address, true, 10000, 0, 0, 0)).to.be.revertedWith(
        "GMPass:INVALID_SUPPLY",
      );
    });

    it("reverts on minting with total supply < allowance", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      await expect(nPassFactory.deploy("ND", "ND", contracts.N.address, true, 100, 101, 0, 0)).to.be.revertedWith(
        "GMPass:INVALID_ALLOWANCE",
      );
    });
  });

  describe("Unrestricted", async function () {
    it("allows only n owner to call mintWithGM", async function () {
      await users[0].N.claim(2);
      expect(await contracts.N.ownerOf(2)).to.be.equals(users[0].address);
      await expect(deployer.GMDerivative.mintWithGMTokenId(2)).to.be.revertedWith("GMPass:INVALID_OWNER");
      await users[0].GMDerivative.mintWithGMTokenId(2);
      expect(await contracts.GMDerivative.ownerOf(2)).to.be.equals(users[0].address);
    });

    it("forbids non n holder to mint inside n token ids range", async function () {
      await users[0].N.claim(8888);
      await expect(deployer.GMDerivative.mint(8888)).to.be.revertedWith("GMPass:INVALID_ID");
    });

    it("allows anyone to mint out of n token ids range with unrestricted pass", async function () {
      await deployer.GMDerivative.mint(10000);
      expect(await contracts.GMDerivative.ownerOf(10000)).to.be.equals(deployer.address);
    });
  });

  describe("Restricted", async function () {
    it("does not allow anyone to mint inside n token ids range with unrestricted pass", async function () {
      await users[0].N.claim(1000);
      // Different user trying to mint
      await expect(deployer.GMDerivativeRestricted.mint(1000)).to.be.revertedWith("GMPass:OPEN_MINTING_DISABLED");
    });

    it("allows none to mint out of n token ids range with restricted pass", async function () {
      await expect(deployer.GMDerivativeRestricted.mint(9999)).to.be.revertedWith("GMPass:OPEN_MINTING_DISABLED");
    });
  });

  describe("With Allowance", async function () {
    it("allows n minting when allowance available", async function () {
      await deployer.N.claim(2);
      expect(await contracts.N.ownerOf(2)).to.be.equals(deployer.address);
      await deployer.GMDerivativeWithAllowance.mintWithGMTokenId(2);
      expect(await contracts.GMDerivativeWithAllowance.ownerOf(2)).to.be.equals(deployer.address);
    });

    it("allows open minting when allowance available", async function () {
      await deployer.GMDerivativeWithAllowance.mint(10000);
      expect(await contracts.GMDerivativeWithAllowance.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("allows n minting up to the allowance", async function () {
      const allowance = await contracts.GMDerivativeWithAllowance.reservedAllowance();
      for (let i = 0; i < allowance; i++) {
        const tokenId = i + 1;
        await deployer.N.claim(tokenId);
        expect(await contracts.N.ownerOf(tokenId)).to.be.equals(deployer.address);
        await deployer.GMDerivativeWithAllowance.mintWithGMTokenId(tokenId);
        expect(await contracts.GMDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }

      await expect(deployer.GMDerivativeWithAllowance.mintWithGMTokenId(allowance)).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows open minting up to the max total supply respecting allowance", async function () {
      const allowance = await contracts.GMDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.GMDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < openMints; i++) {
        const tokenId = 10000 + i;
        await deployer.GMDerivativeWithAllowance.mint(tokenId);
        expect(await contracts.GMDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }
      await expect(deployer.GMDerivativeWithAllowance.mint(10000 + openMints)).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows open minting up to the max total supply respecting allowance for n token holders", async function () {
      const allowance = await contracts.GMDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.GMDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < openMints; i++) {
        const tokenId = i + 1;
        await deployer.N.claim(tokenId);
        expect(await contracts.N.ownerOf(tokenId)).to.be.equals(deployer.address);
        await deployer.GMDerivativeWithAllowance.mint(tokenId);
        expect(await contracts.GMDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }
      await deployer.N.claim(openMints + 1);
      await expect(deployer.GMDerivativeWithAllowance.mint(openMints + 1)).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows all minting up to the max total supply respecting allowance", async function () {
      const allowance = await contracts.GMDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.GMDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < allowance; i++) {
        const tokenId = i + 1;
        await deployer.N.claim(tokenId);
        await deployer.GMDerivativeWithAllowance.mintWithGMTokenId(tokenId);
      }
      for (let i = 0; i < openMints; i++) {
        const tokenId = 10000 + i;
        await deployer.GMDerivativeWithAllowance.mint(tokenId);
      }
      await expect(deployer.GMDerivativeWithAllowance.mintWithGMTokenId(allowance)).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
      await expect(deployer.GMDerivativeWithAllowance.mint(10000 + openMints)).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
      expect(await contracts.GMDerivativeWithAllowance.totalSupply()).to.be.equals(maxTotalSupply);
    });

    it("forbids open minting when total supply=1 and allowance=1", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      const nDerivative = (await nPassFactory.deploy("ND", "ND", contracts.N.address, false, 1, 1, 0, 0)) as GMPass;
      await expect(nDerivative.mint(10000)).to.be.revertedWith("GMPass:MAX_ALLOCATION_REACHED");
    });

    it("allows n minting when total supply=1 and allowance=1", async function () {
      await deployer.N.claim(1);
      await deployer.N.claim(2);
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      const nDerivative = (await nPassFactory.deploy("ND", "ND", contracts.N.address, false, 1, 1, 0, 0)) as GMPass;
      await nDerivative.mintWithGMTokenId(1);
      expect(await nDerivative.ownerOf(1)).to.be.equals(deployer.address);
      await expect(nDerivative.mintWithGMTokenId(2)).to.be.revertedWith("GMPass:MAX_ALLOCATION_REACHED");
    });

    it("allows open minting when total supply=1 and allowance=0", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      const nDerivative = (await nPassFactory.deploy("ND", "ND", contracts.N.address, false, 1, 0, 0, 0)) as GMPass;
      await nDerivative.mint(10000);
      expect(await nDerivative.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("forbids open minting with token id beyond range", async function () {
      const nPassFactory = await ethers.getContractFactory("MockGMPass");
      const totalSupply = 100;
      const nDerivative = (await nPassFactory.deploy(
        "ND",
        "ND",
        contracts.N.address,
        false,
        totalSupply,
        0,
        0,
        0,
      )) as GMPass;
      const lastAllowedTokenId = 9999 + totalSupply;
      await nDerivative.mint(lastAllowedTokenId);
      expect(await nDerivative.ownerOf(lastAllowedTokenId)).to.be.equals(deployer.address);
      // We could have a more meaningful revert but this does the job
      await expect(nDerivative.mint(lastAllowedTokenId + 1)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token",
      );
    });
  });

  describe("Price", async function () {
    it("requires n token holder to pay correct amount", async function () {
      await deployer.N.claim(1000);
      const price = await contracts.GMDerivativeWithPrice.priceForNHoldersInWei();
      await expect(deployer.GMDerivativeWithPrice.mintWithGMTokenId(1000, { value: price.sub(1) })).to.be.revertedWith(
        "GMPass:INVALID_PRICE",
      );
      await expect(deployer.GMDerivativeWithPrice.mintWithGMTokenId(1000, { value: price.add(1) })).to.be.revertedWith(
        "GMPass:INVALID_PRICE",
      );
      await deployer.GMDerivativeWithPrice.mintWithGMTokenId(1000, { value: price });
      expect(await contracts.GMDerivativeWithPrice.ownerOf(1000)).to.be.equals(deployer.address);
    });

    it("requires open minter to pay correct amount", async function () {
      const price = await contracts.GMDerivativeWithPrice.priceForOpenMintInWei();
      await expect(deployer.GMDerivativeWithPrice.mint(10000, { value: price.sub(1) })).to.be.revertedWith(
        "GMPass:INVALID_PRICE",
      );
      await expect(deployer.GMDerivativeWithPrice.mint(10000, { value: price.add(1) })).to.be.revertedWith(
        "GMPass:INVALID_PRICE",
      );
      await deployer.GMDerivativeWithPrice.mint(10000, { value: price });
      expect(await contracts.GMDerivativeWithPrice.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("allows owner to withdraw", async function () {
      const price = await contracts.GMDerivativeWithPrice.priceForOpenMintInWei();
      await users[0].GMDerivativeWithPrice.mint(10000, { value: price });
      await users[0].GMDerivativeWithPrice.mint(10001, { value: price });
      const initialBalance = await getEthBalance(deployer.address);
      await deployer.GMDerivativeWithPrice.withdrawAll();
      expect(await getEthBalance(deployer.address)).to.be.gte(initialBalance.add(price.mul(2)).sub(GAS_ADJ));
    });

    it("forbids non owner to withdraw", async function () {
      const price = await contracts.GMDerivativeWithPrice.priceForOpenMintInWei();
      await users[0].GMDerivativeWithPrice.mint(10000, { value: price });
      await users[0].GMDerivativeWithPrice.mint(10001, { value: price });
      await expect(users[0].GMDerivativeWithPrice.withdrawAll()).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Multi mint", async function () {
    it("allows to mint multiple owned tokens", async function () {
      await deployer.N.claim(1);
      await deployer.N.claim(2);
      await deployer.N.claim(3);
      expect(await contracts.N.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.N.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.N.ownerOf(3)).to.be.equals(deployer.address);
      await deployer.GMDerivative.multiMintWithGMTokenIds([1, 2, 3]);
      expect(await contracts.GMDerivative.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.GMDerivative.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.GMDerivative.ownerOf(3)).to.be.equals(deployer.address);
    });

    it("allows to mint multiple owned tokens with price", async function () {
      await deployer.N.claim(1);
      await deployer.N.claim(2);
      await deployer.N.claim(3);
      expect(await contracts.N.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.N.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.N.ownerOf(3)).to.be.equals(deployer.address);
      const price = await contracts.GMDerivativeWithPrice.priceForNHoldersInWei();
      await deployer.GMDerivativeWithPrice.multiMintWithGMTokenIds([1, 2, 3], { value: price.mul(3) });
      expect(await contracts.GMDerivativeWithPrice.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.GMDerivativeWithPrice.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.GMDerivativeWithPrice.ownerOf(3)).to.be.equals(deployer.address);
    });

    it("reverts multi mint if one token not owned", async function () {
      await deployer.N.claim(1);
      await deployer.N.claim(2);
      await users[0].N.claim(3);
      expect(await contracts.N.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.N.ownerOf(2)).to.be.equals(deployer.address);
      await expect(deployer.GMDerivative.multiMintWithGMTokenIds([1, 2, 3])).to.be.revertedWith("GMPass:INVALID_OWNER");
    });

    it("reverts multi mint if goes above total supply", async function () {
      await expect(deployer.GMDerivativeWithAllowance.multiMintWithGMTokenIds([1, 2, 3, 4, 5, 6])).to.be.revertedWith(
        "GMPass:MAX_ALLOCATION_REACHED",
      );
    });
    it("reverts multi mint if price wrong", async function () {
      const price = await contracts.GMDerivativeWithPrice.priceForNHoldersInWei();
      await expect(
        deployer.GMDerivativeWithPrice.multiMintWithGMTokenIds([1, 2, 3, 4, 5], { value: price.mul(3) }),
      ).to.be.revertedWith("GMPass:INVALID_PRICE");
    });
  });
});
