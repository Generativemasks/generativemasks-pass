/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from "chai";
import { ethers } from "hardhat";
import { GMsPass } from "../../typechain";
import { ETH, getEthBalance } from "../../utils/utils";
import { Contracts, setupIntegration as setupMockGMsDerivative, User } from "../fixtures";

const GAS_ADJ = ETH(0.01);

describe("GMsPass", function () {
  let contracts: Contracts;
  let deployer: User;
  let users: User[];

  beforeEach(async () => {
    ({ contracts, deployer, users } = await setupMockGMsDerivative());
  });

  describe("Construction", async function () {
    it("reverts on supply = 0", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      await expect(gmPassFactory.deploy("GMsD", "GMsD", contracts.NFT.address, true, 0, 0, 0, 0)).to.be.revertedWith(
        "GMsPass:INVALID_SUPPLY",
      );
    });

    it("reverts on restricted minting with total supply > n supply", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      await expect(
        gmPassFactory.deploy("GMsD", "GMsD", contracts.NFT.address, true, 10001, 0, 0, 0),
      ).to.be.revertedWith("GMsPass:INVALID_SUPPLY");
    });

    it("reverts on minting with total supply < allowance", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      await expect(
        gmPassFactory.deploy("GMsD", "GMsD", contracts.NFT.address, true, 100, 101, 0, 0),
      ).to.be.revertedWith("GMsPass:INVALID_ALLOWANCE");
    });
  });

  describe("Unrestricted", async function () {
    it("allows only n owner to call mintWithGMs", async function () {
      await users[0].NFT.claim(2);
      expect(await contracts.NFT.ownerOf(2)).to.be.equals(users[0].address);
      await expect(deployer.MockGMsDerivative.mintWithGMsTokenId(2)).to.be.revertedWith("GMsPass:INVALID_OWNER");
      await users[0].MockGMsDerivative.mintWithGMsTokenId(2);
      expect(await contracts.MockGMsDerivative.ownerOf(2)).to.be.equals(users[0].address);
    });

    it("forbids non n holder to mint inside n token ids range", async function () {
      await users[0].NFT.claim(8888);
      await expect(deployer.MockGMsDerivative.mint(8888)).to.be.revertedWith("GMsPass:INVALID_ID");
    });

    it("allows anyone to mint out of n token ids range with unrestricted pass", async function () {
      await deployer.MockGMsDerivative.mint(10000);
      expect(await contracts.MockGMsDerivative.ownerOf(10000)).to.be.equals(deployer.address);
    });
  });

  describe("Restricted", async function () {
    it("does not allow anyone to mint inside n token ids range with unrestricted pass", async function () {
      await users[0].NFT.claim(1000);
      // Different user trying to mint
      await expect(deployer.MockGMsDerivativeRestricted.mint(1000)).to.be.revertedWith("GMsPass:OPEN_MINTING_DISABLED");
    });

    it("allows none to mint out of n token ids range with restricted pass", async function () {
      await expect(deployer.MockGMsDerivativeRestricted.mint(9999)).to.be.revertedWith("GMsPass:OPEN_MINTING_DISABLED");
    });
  });

  describe("With Allowance", async function () {
    it("allows n minting when allowance available", async function () {
      await deployer.NFT.claim(2);
      expect(await contracts.NFT.ownerOf(2)).to.be.equals(deployer.address);
      await deployer.MockGMsDerivativeWithAllowance.mintWithGMsTokenId(2);
      expect(await contracts.MockGMsDerivativeWithAllowance.ownerOf(2)).to.be.equals(deployer.address);
    });

    it("allows open minting when allowance available", async function () {
      await deployer.MockGMsDerivativeWithAllowance.mint(10000);
      expect(await contracts.MockGMsDerivativeWithAllowance.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("allows n minting up to the allowance", async function () {
      const allowance = await contracts.MockGMsDerivativeWithAllowance.reservedAllowance();
      for (let i = 0; i < allowance; i++) {
        const tokenId = i + 1;
        await deployer.NFT.claim(tokenId);
        expect(await contracts.NFT.ownerOf(tokenId)).to.be.equals(deployer.address);
        await deployer.MockGMsDerivativeWithAllowance.mintWithGMsTokenId(tokenId);
        expect(await contracts.MockGMsDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }

      await expect(deployer.MockGMsDerivativeWithAllowance.mintWithGMsTokenId(allowance)).to.be.revertedWith(
        "GMsPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows open minting up to the max total supply respecting allowance", async function () {
      const allowance = await contracts.MockGMsDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.MockGMsDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < openMints; i++) {
        const tokenId = 10000 + i;
        await deployer.MockGMsDerivativeWithAllowance.mint(tokenId);
        expect(await contracts.MockGMsDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }
      await expect(deployer.MockGMsDerivativeWithAllowance.mint(10000 + openMints)).to.be.revertedWith(
        "GMsPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows open minting up to the max total supply respecting allowance for n token holders", async function () {
      const allowance = await contracts.MockGMsDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.MockGMsDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < openMints; i++) {
        const tokenId = i + 1;
        await deployer.NFT.claim(tokenId);
        expect(await contracts.NFT.ownerOf(tokenId)).to.be.equals(deployer.address);
        await deployer.MockGMsDerivativeWithAllowance.mint(tokenId);
        expect(await contracts.MockGMsDerivativeWithAllowance.ownerOf(tokenId)).to.be.equals(deployer.address);
      }
      await deployer.NFT.claim(openMints + 1);
      await expect(deployer.MockGMsDerivativeWithAllowance.mint(openMints + 1)).to.be.revertedWith(
        "GMsPass:MAX_ALLOCATION_REACHED",
      );
    });

    it("allows all minting up to the max total supply respecting allowance", async function () {
      const allowance = await contracts.MockGMsDerivativeWithAllowance.reservedAllowance();
      const maxTotalSupply = (await contracts.MockGMsDerivativeWithAllowance.maxTotalSupply()).toNumber();
      const openMints = maxTotalSupply - allowance;
      for (let i = 0; i < allowance; i++) {
        const tokenId = i + 1;
        await deployer.NFT.claim(tokenId);
        await deployer.MockGMsDerivativeWithAllowance.mintWithGMsTokenId(tokenId);
      }
      for (let i = 0; i < openMints; i++) {
        const tokenId = 10000 + i;
        await deployer.MockGMsDerivativeWithAllowance.mint(tokenId);
      }
      await expect(deployer.MockGMsDerivativeWithAllowance.mintWithGMsTokenId(allowance)).to.be.revertedWith(
        "GMsPass:MAX_ALLOCATION_REACHED",
      );
      await expect(deployer.MockGMsDerivativeWithAllowance.mint(10000 + openMints)).to.be.revertedWith(
        "GMsPass:MAX_ALLOCATION_REACHED",
      );
      expect(await contracts.MockGMsDerivativeWithAllowance.mintedCount()).to.be.equals(maxTotalSupply);
    });

    it("forbids open minting when total supply=1 and allowance=1", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      const gmDerivative = (await gmPassFactory.deploy(
        "GMsD",
        "GMsD",
        contracts.NFT.address,
        false,
        1,
        1,
        0,
        0,
      )) as GMsPass;
      await expect(gmDerivative.mint(10000)).to.be.revertedWith("GMsPass:MAX_ALLOCATION_REACHED");
    });

    it("allows n minting when total supply=1 and allowance=1", async function () {
      await deployer.NFT.claim(1);
      await deployer.NFT.claim(2);
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      const gmDerivative = (await gmPassFactory.deploy(
        "GMsD",
        "GMsD",
        contracts.NFT.address,
        false,
        1,
        1,
        0,
        0,
      )) as GMsPass;
      await gmDerivative.mintWithGMsTokenId(1);
      expect(await gmDerivative.ownerOf(1)).to.be.equals(deployer.address);
      await expect(gmDerivative.mintWithGMsTokenId(2)).to.be.revertedWith("GMsPass:MAX_ALLOCATION_REACHED");
    });

    it("allows open minting when total supply=1 and allowance=0", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      const gmDerivative = (await gmPassFactory.deploy(
        "GMsD",
        "GMsD",
        contracts.NFT.address,
        false,
        1,
        0,
        0,
        0,
      )) as GMsPass;
      await gmDerivative.mint(10000);
      expect(await gmDerivative.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("forbids open minting with token id beyond range", async function () {
      const gmPassFactory = await ethers.getContractFactory("MockGMsPass");
      const totalSupply = 100;
      const gmDerivative = (await gmPassFactory.deploy(
        "GMsD",
        "GMsD",
        contracts.NFT.address,
        false,
        totalSupply,
        0,
        0,
        0,
      )) as GMsPass;
      const lastAllowedTokenId = 9999 + totalSupply;
      await gmDerivative.mint(lastAllowedTokenId);
      expect(await gmDerivative.ownerOf(lastAllowedTokenId)).to.be.equals(deployer.address);
      // We could have a more meaningful revert but this does the job
      await expect(gmDerivative.mint(lastAllowedTokenId + 1)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token",
      );
    });
  });

  describe("Price", async function () {
    it("requires n token holder to pay correct amount", async function () {
      await deployer.NFT.claim(1000);
      const price = await contracts.MockGMsDerivativeWithPrice.priceForNHoldersInWei();
      await expect(
        deployer.MockGMsDerivativeWithPrice.mintWithGMsTokenId(1000, { value: price.sub(1) }),
      ).to.be.revertedWith("GMsPass:INVALID_PRICE");
      await expect(
        deployer.MockGMsDerivativeWithPrice.mintWithGMsTokenId(1000, { value: price.add(1) }),
      ).to.be.revertedWith("GMsPass:INVALID_PRICE");
      await deployer.MockGMsDerivativeWithPrice.mintWithGMsTokenId(1000, { value: price });
      expect(await contracts.MockGMsDerivativeWithPrice.ownerOf(1000)).to.be.equals(deployer.address);
    });

    it("requires open minter to pay correct amount", async function () {
      const price = await contracts.MockGMsDerivativeWithPrice.priceForOpenMintInWei();
      await expect(deployer.MockGMsDerivativeWithPrice.mint(10000, { value: price.sub(1) })).to.be.revertedWith(
        "GMsPass:INVALID_PRICE",
      );
      await expect(deployer.MockGMsDerivativeWithPrice.mint(10000, { value: price.add(1) })).to.be.revertedWith(
        "GMsPass:INVALID_PRICE",
      );
      await deployer.MockGMsDerivativeWithPrice.mint(10000, { value: price });
      expect(await contracts.MockGMsDerivativeWithPrice.ownerOf(10000)).to.be.equals(deployer.address);
    });

    it("allows owner to withdraw", async function () {
      const price = await contracts.MockGMsDerivativeWithPrice.priceForOpenMintInWei();
      await users[0].MockGMsDerivativeWithPrice.mint(10000, { value: price });
      await users[0].MockGMsDerivativeWithPrice.mint(10001, { value: price });
      const initialBalance = await getEthBalance(deployer.address);
      await deployer.MockGMsDerivativeWithPrice.withdrawAll();
      expect(await getEthBalance(deployer.address)).to.be.gte(initialBalance.add(price.mul(2)).sub(GAS_ADJ));
    });

    it("forbids non owner to withdraw", async function () {
      const price = await contracts.MockGMsDerivativeWithPrice.priceForOpenMintInWei();
      await users[0].MockGMsDerivativeWithPrice.mint(10000, { value: price });
      await users[0].MockGMsDerivativeWithPrice.mint(10001, { value: price });
      await expect(users[0].MockGMsDerivativeWithPrice.withdrawAll()).to.be.revertedWith(
        "Ownable: caller is not the owner",
      );
    });
  });

  describe("Multi mint", async function () {
    it("allows to mint multiple owned tokens", async function () {
      await deployer.NFT.claim(1);
      await deployer.NFT.claim(2);
      await deployer.NFT.claim(3);
      expect(await contracts.NFT.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.NFT.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.NFT.ownerOf(3)).to.be.equals(deployer.address);
      await deployer.MockGMsDerivative.multiMintWithGMsTokenIds([1, 2, 3]);
      expect(await contracts.MockGMsDerivative.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.MockGMsDerivative.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.MockGMsDerivative.ownerOf(3)).to.be.equals(deployer.address);
    });

    it("allows to mint multiple owned tokens with price", async function () {
      await deployer.NFT.claim(1);
      await deployer.NFT.claim(2);
      await deployer.NFT.claim(3);
      expect(await contracts.NFT.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.NFT.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.NFT.ownerOf(3)).to.be.equals(deployer.address);
      const price = await contracts.MockGMsDerivativeWithPrice.priceForNHoldersInWei();
      await deployer.MockGMsDerivativeWithPrice.multiMintWithGMsTokenIds([1, 2, 3], { value: price.mul(3) });
      expect(await contracts.MockGMsDerivativeWithPrice.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.MockGMsDerivativeWithPrice.ownerOf(2)).to.be.equals(deployer.address);
      expect(await contracts.MockGMsDerivativeWithPrice.ownerOf(3)).to.be.equals(deployer.address);
    });

    it("reverts multi mint if one token not owned", async function () {
      await deployer.NFT.claim(1);
      await deployer.NFT.claim(2);
      await users[0].NFT.claim(3);
      expect(await contracts.NFT.ownerOf(1)).to.be.equals(deployer.address);
      expect(await contracts.NFT.ownerOf(2)).to.be.equals(deployer.address);
      await expect(deployer.MockGMsDerivative.multiMintWithGMsTokenIds([1, 2, 3])).to.be.revertedWith(
        "GMsPass:INVALID_OWNER",
      );
    });

    it("reverts multi mint if goes above total supply", async function () {
      await expect(
        deployer.MockGMsDerivativeWithAllowance.multiMintWithGMsTokenIds([1, 2, 3, 4, 5, 6]),
      ).to.be.revertedWith("GMsPass:MAX_ALLOCATION_REACHED");
    });
    it("reverts multi mint if price wrong", async function () {
      const price = await contracts.MockGMsDerivativeWithPrice.priceForNHoldersInWei();
      await expect(
        deployer.MockGMsDerivativeWithPrice.multiMintWithGMsTokenIds([1, 2, 3, 4, 5], { value: price.mul(3) }),
      ).to.be.revertedWith("GMsPass:INVALID_PRICE");
    });
  });
});
