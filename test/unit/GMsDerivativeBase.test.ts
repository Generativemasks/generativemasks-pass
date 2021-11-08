/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { expect } from "chai";
import { Contracts, setupIntegration as setupMockGMsDerivative, User } from "../fixtures";

describe("GMsDerivativeBase", function () {
  let contracts: Contracts;
  let deployer: User;
  let users: User[];

  beforeEach(async () => {
    ({ contracts, deployer, users } = await setupMockGMsDerivative());
  });

  describe("gmHoldersMintsAvailable", () => {
    it("returns 10000 initially", async () => {
      expect(await contracts.GMsDerivative.nHoldersMintsAvailable()).to.equal(10000);
    });

    it("returns decremented allowance after minted", async () => {
      await users[0].NFT.claim(0);
      await users[0].GMsDerivative.mintWithGMsTokenId(0);
      expect(await contracts.GMsDerivative.nHoldersMintsAvailable()).to.equal(9999);

      await users[0].NFT.claim(1);
      await users[0].GMsDerivative.multiMintWithGMsTokenIds([1]);
      expect(await contracts.GMsDerivative.nHoldersMintsAvailable()).to.equal(9998);
    });
  });

  describe("mintedCount", () => {
    it("incremented by mintWithGMsTokenId");

    it("incremented by multiMintWithGMsTokenIds");
  });

  describe("maxTokenId", () => {
    it("returns 9999", async () => {
      expect((await contracts.GMsDerivative.maxTokenId()).toNumber()).to.equal(9999);
    });
  });

  describe("derivedFrom", () => {
    it("returns derived NFT address", async () => {
      expect(await contracts.GMsDerivative.derivedFrom()).to.equal(contracts.NFT.address);
    });
  });

  describe("mintWithGMsTokenId", () => {
    describe("by token id", () => {
      it("token id = 0", async () => {
        await users[0].NFT.claim(0);
        await users[0].GMsDerivative.mintWithGMsTokenId(0);
        expect(await contracts.GMsDerivative.ownerOf(0)).to.equal(users[0].address);
      });

      it("token id = 1", async () => {
        await users[0].NFT.claim(1);
        await users[0].GMsDerivative.mintWithGMsTokenId(1);
        expect(await contracts.GMsDerivative.ownerOf(1)).to.equal(users[0].address);
      });

      it("token id = 9998", async () => {
        await users[0].NFT.claim(9998);
        await users[0].GMsDerivative.mintWithGMsTokenId(9998);
        expect(await contracts.GMsDerivative.ownerOf(9998)).to.equal(users[0].address);
      });

      it("token id = 9999", async () => {
        await users[0].NFT.claim(9999);
        await users[0].GMsDerivative.mintWithGMsTokenId(9999);
        expect(await contracts.GMsDerivative.ownerOf(9999)).to.equal(users[0].address);
      });

      it("increment mintedCount");

      it("claim all tokens");

      it("throws an error if msg.sender has no token", async () => {
        await expect(users[0].GMsDerivative.mintWithGMsTokenId(0)).to.be.revertedWith(
          "ERC721: owner query for nonexistent token",
        );
      });

      it("throws an error if token id is 10000", async () => {
        await users[0].NFT.claim(10000);
        await expect(users[0].GMsDerivative.mintWithGMsTokenId(10000)).to.be.revertedWith("GMsPass:INVALID_ID");
      });
    });

    describe("by mask number", () => {
      it("mask number = 0", async () => {
        await users[0].NFT.claim(0);
        await users[0].GMsDerivative.mintWithGMsMaskNumber(3799);
        expect(await contracts.GMsDerivative.ownerOf(0)).to.equal(users[0].address);
      });

      it("mask number = 1", async () => {
        await users[0].NFT.claim(1);
        await users[0].GMsDerivative.mintWithGMsMaskNumber(3800);
        expect(await contracts.GMsDerivative.ownerOf(1)).to.equal(users[0].address);
      });

      it("mask number = 9998", async () => {
        await users[0].NFT.claim(9998);
        await users[0].GMsDerivative.mintWithGMsMaskNumber(3797);
        expect(await contracts.GMsDerivative.ownerOf(9998)).to.equal(users[0].address);
      });

      it("mask number = 9999", async () => {
        await users[0].NFT.claim(9999);
        await users[0].GMsDerivative.mintWithGMsMaskNumber(3798);
        expect(await contracts.GMsDerivative.ownerOf(9999)).to.equal(users[0].address);
      });

      it("claim all tokens");

      it("throws an error if msg.sender has no token", async () => {
        await expect(users[0].GMsDerivative.mintWithGMsTokenId(0)).to.be.revertedWith(
          "ERC721: owner query for nonexistent token",
        );
      });

      it("throws an error if token id is 10000", async () => {
        await users[0].NFT.claim(10000);
        await expect(users[0].GMsDerivative.mintWithGMsTokenId(10000)).to.be.revertedWith("GMsPass:INVALID_ID");
      });
    });
  });

  describe("multiMintWithGMsTokenIds", () => {});

  describe("mint", () => {
    it("always reverted");
  });

  describe("nHoldersMintsAvailable", () => {
    it("returns 10000");

    it("returns decremented value after minted ");

    it("returns 0 after all tokens are minted");
  });

  describe("openMintsAvailable", () => {
    it("returns 0");
  });

  describe("tokenURI", () => {
    it("suffix is 3799 when token id is 0", async () => {
      await users[0].NFT.claim(0);
      await users[0].GMsDerivative.mintWithGMsMaskNumber(3799);
      expect(await contracts.GMsDerivative.tokenURI(0)).to.equal("https://example.com/3799");
    });

    it("suffix is 3800 when token id is 1", async () => {
      await users[0].NFT.claim(1);
      await users[0].GMsDerivative.mintWithGMsMaskNumber(3800);
      expect(await contracts.GMsDerivative.tokenURI(1)).to.equal("https://example.com/3800");
    });

    it("suffix is 3797 when token id is 9998", async () => {
      await users[0].NFT.claim(9998);
      await users[0].GMsDerivative.mintWithGMsMaskNumber(3797);
      expect(await contracts.GMsDerivative.tokenURI(9998)).to.equal("https://example.com/3797");
    });

    it("suffix is 3798 when token id is 9999", async () => {
      await users[0].NFT.claim(9999);
      await users[0].GMsDerivative.mintWithGMsMaskNumber(3798);
      expect(await contracts.GMsDerivative.tokenURI(9999)).to.equal("https://example.com/3798");
    });
  });

  describe("updateBaseURI", () => {
    it("update base URI");

    it("can be called by only owner");
  });
});
