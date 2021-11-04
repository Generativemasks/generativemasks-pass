// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GMPassCore contract
 * @author wildmouse
 * @notice This contract provides basic functionalities to allow minting using the GMPass
 * @dev This contract should be used only for testing or testnet deployments
 */
abstract contract GMPassCore is ERC721Enumerable, ReentrancyGuard, Ownable {
    uint256 public constant MAX_MULTI_MINT_AMOUNT = 32;
    uint256 public constant GM_SUPPLY_AMOUNT = 10000;
    uint256 public constant MAX_GM_TOKEN_ID = 9999;
    uint256 public constant METADATA_INDEX = 3799;

    IERC721 public immutable gm;
    bool public immutable onlyGMHolders;
    uint16 public immutable reservedAllowance;
    uint16 public reserveMinted;
    uint256 public immutable maxTotalSupply;
    uint256 public immutable priceForNHoldersInWei;
    uint256 public immutable priceForOpenMintInWei;

    /**
     * @notice Construct an GMPassCore instance
     * @param name Name of the token
     * @param symbol Symbol of the token
     * @param gm_ Address of your n instance (only for testing)
     * @param onlyGMHolders_ True if only n tokens holders can mint this token
     * @param maxTotalSupply_ Maximum number of tokens that can ever be minted
     * @param reservedAllowance_ Number of tokens reserved for n token holders
     * @param priceForNHoldersInWei_ Price n token holders need to pay to mint
     * @param priceForOpenMintInWei_ Price open minter need to pay to mint
     */
    constructor(
        string memory name,
        string memory symbol,
        IERC721 gm_,
        bool onlyGMHolders_,
        uint256 maxTotalSupply_,
        uint16 reservedAllowance_,
        uint256 priceForNHoldersInWei_,
        uint256 priceForOpenMintInWei_
    ) ERC721(name, symbol) {
        require(maxTotalSupply_ > 0, "GMPass:INVALID_SUPPLY");
        require(!onlyGMHolders_ || (onlyGMHolders_ && maxTotalSupply_ <= MAX_GM_TOKEN_ID), "GMPass:INVALID_SUPPLY");
        require(maxTotalSupply_ >= reservedAllowance_, "GMPass:INVALID_ALLOWANCE");
        // If restricted to gm token holders we limit max total supply
        gm = gm_;
        onlyGMHolders = onlyGMHolders_;
        maxTotalSupply = maxTotalSupply_;
        reservedAllowance = reservedAllowance_;
        priceForNHoldersInWei = priceForNHoldersInWei_;
        priceForOpenMintInWei = priceForOpenMintInWei_;
    }
    
    function getTokenIdFromMaskNumber(uint256 maskNumber) public pure returns(uint256) {
        require(maskNumber <= MAX_GM_TOKEN_ID, "Invalid mask number");
        return ((maskNumber + GM_SUPPLY_AMOUNT) - METADATA_INDEX) % GM_SUPPLY_AMOUNT;
    }
    
    function getTokenIdListFromMaskNumbers(uint256[] calldata maskNumbers) public pure returns(uint256[] memory) {
        uint256[] memory tokenIdList = new uint256[](maskNumbers.length);
        
        for (uint256 i = 0; i < maskNumbers.length; i++) { 
            require(maskNumbers[i] <= MAX_GM_TOKEN_ID, "Invalid mask number");
            tokenIdList[i] = getTokenIdFromMaskNumber(maskNumbers[i]);
        }
        
        return tokenIdList;
    }

    /**
     * @notice Allow a n token holder to bulk mint tokens with id of their n tokens' id
     * @param maskNumbers numbers to be converted to token ids to be minted
     */
    function multiMintWithGMMaskNumbers(uint256[] calldata maskNumbers) public payable virtual nonReentrant {
        multiMintWithGMTokenIds(getTokenIdListFromMaskNumbers(maskNumbers));
    }
    
    /**
     * @notice Allow a n token holder to mint a token with one of their n token's id
     * @param maskNumber numberto be converted to token id to be minted
     */
    function mintWithGMMaskNumber(uint256 maskNumber) public payable virtual nonReentrant {
        mintWithGMTokenId(getTokenIdFromMaskNumber(maskNumber));
    }

    /**
     * @notice Allow a n token holder to bulk mint tokens with id of their n tokens' id
     * @param tokenIds Ids to be minted
     */
    function multiMintWithGMTokenIds(uint256[] memory tokenIds) public payable virtual nonReentrant {
        uint256 maxTokensToMint = tokenIds.length;
        require(maxTokensToMint <= MAX_MULTI_MINT_AMOUNT, "GMPass:TOO_LARGE");
        require(
            // If no reserved allowance we respect total supply contraint
            (reservedAllowance == 0 && totalSupply() + maxTokensToMint <= maxTotalSupply) ||
                reserveMinted + maxTokensToMint <= reservedAllowance,
            "GMPass:MAX_ALLOCATION_REACHED"
        );
        require(msg.value == priceForNHoldersInWei * maxTokensToMint, "GMPass:INVALID_PRICE");
        // To avoid wasting gas we want to check all preconditions beforehand
        for (uint256 i = 0; i < maxTokensToMint; i++) {
            require(gm.ownerOf(tokenIds[i]) == msg.sender, "GMPass:INVALID_OWNER");
        }

        // If reserved allowance is active we track mints count
        if (reservedAllowance > 0) {
            reserveMinted += uint16(maxTokensToMint);
        }
        for (uint256 i = 0; i < maxTokensToMint; i++) {
            _safeMint(msg.sender, tokenIds[i]);
        }
    }

    /**
     * @notice Allow a n token holder to mint a token with one of their n token's id
     * @param tokenId Id to be minted
     */
    function mintWithGMTokenId(uint256 tokenId) public payable virtual nonReentrant {
        require(
            // If no reserved allowance we respect total supply contraint
            (reservedAllowance == 0 && totalSupply() < maxTotalSupply) || reserveMinted < reservedAllowance,
            "GMPass:MAX_ALLOCATION_REACHED"
        );
        require(gm.ownerOf(tokenId) == msg.sender, "GMPass:INVALID_OWNER");
        require(msg.value == priceForNHoldersInWei, "GMPass:INVALID_PRICE");

        // If reserved allowance is active we track mints count
        if (reservedAllowance > 0) {
            reserveMinted++;
        }
        _safeMint(msg.sender, tokenId);
    }

    /**
     * @notice Allow anyone to mint a token with the supply id if this pass is unrestricted.
     *         n token holders can use this function without using the n token holders allowance,
     *         this is useful when the allowance is fully utilized.
     * @param tokenId Id to be minted
     */
    function mint(uint256 tokenId) public payable virtual nonReentrant {
        require(!onlyGMHolders, "GMPass:OPEN_MINTING_DISABLED");
        require(openMintsAvailable() > 0, "GMPass:MAX_ALLOCATION_REACHED");
        require(
            (tokenId > MAX_GM_TOKEN_ID && tokenId <= maxTokenId()) || gm.ownerOf(tokenId) == msg.sender,
            "GMPass:INVALID_ID"
        );
        require(msg.value == priceForOpenMintInWei, "GMPass:INVALID_PRICE");

        _safeMint(msg.sender, tokenId);
    }

    /**
     * @notice Calculate the maximum token id that can ever be minted
     * @return Maximum token id
     */
    function maxTokenId() public view returns (uint256) {
        uint256 maxOpenMints = maxTotalSupply - reservedAllowance;
        return MAX_GM_TOKEN_ID + maxOpenMints;
    }

    /**
     * @notice Calculate the currently available number of reserved tokens for n token holders
     * @return Reserved mint available
     */
    function nHoldersMintsAvailable() external view returns (uint256) {
        return reservedAllowance - reserveMinted;
    }

    /**
     * @notice Calculate the currently available number of open mints
     * @return Open mint available
     */
    function openMintsAvailable() public view returns (uint256) {
        uint256 maxOpenMints = maxTotalSupply - reservedAllowance;
        uint256 currentOpenMints = totalSupply() - reserveMinted;
        return maxOpenMints - currentOpenMints;
    }

    /**
     * @notice Allows owner to withdraw amount
     */
    function withdrawAll() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
