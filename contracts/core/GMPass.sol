// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./GMPassCore.sol";

/**
 * @title GMPass contract
 * @author wildmouse
 * @notice This contract provides basic functionalities to allow minting using the GMPass
 * @dev This is hardcoded to the correct address of the Generativemasks smart contract on the Ethereum mainnet
 *      This SHOULD be used for mainnet deployments
 */
abstract contract GMPass is GMPassCore {

    /**
     * @notice Construct an GMPass instance
     * @param name Name of the token
     * @param symbol Symbol of the token
     * @param onlyGMHolders True if only n tokens holders can mint this token
     * @param maxTotalSupply Maximum number of tokens that can ever be minted
     * @param reservedAllowance Number of tokens reserved for n token holders
     * @param priceForGMHoldersInWei Price n token holders need to pay to mint
     * @param priceForOpenMintInWei Price open minter need to pay to mint
     */
    constructor(
        string memory name,
        string memory symbol,
        bool onlyGMHolders,
        uint256 maxTotalSupply,
        uint16 reservedAllowance,
        uint256 priceForGMHoldersInWei,
        uint256 priceForOpenMintInWei
    )
    GMPassCore(
        name,
        symbol,
        IERC721(0x80416304142Fa37929f8A4Eee83eE7D2dAc12D7c),
        onlyGMHolders,
        maxTotalSupply,
        reservedAllowance,
        priceForGMHoldersInWei,
        priceForOpenMintInWei
    )
    {}
}
