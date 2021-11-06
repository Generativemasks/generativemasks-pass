// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./GMsPassCore.sol";

/**
 * @title GMsPass contract
 * @author wildmouse
 * @notice This contract provides basic functionalities to allow minting using the GMsPass
 * @dev This is hardcoded to the correct address of the Generativemasks smart contract on the Ethereum mainnet
 *      This SHOULD be used for mainnet deployments
 */
abstract contract GMsPass is GMsPassCore {

    /**
     * @notice Construct an GMsPass instance
     * @param name Name of the token
     * @param symbol Symbol of the token
     * @param onlyGMsHolders True if only GMs tokens holders can mint this token
     * @param maxTotalSupply Maximum number of tokens that can ever be minted
     * @param reservedAllowance Number of tokens reserved for GMs token holders
     * @param priceForGMsHoldersInWei Price GMs token holders need to pay to mint
     * @param priceForOpenMintInWei Price open minter need to pay to mint
     */
    constructor(
        string memory name,
        string memory symbol,
        bool onlyGMsHolders,
        uint256 maxTotalSupply,
        uint16 reservedAllowance,
        uint256 priceForGMsHoldersInWei,
        uint256 priceForOpenMintInWei
    )
    GMsPassCore(
        name,
        symbol,
        IERC721(0x80416304142Fa37929f8A4Eee83eE7D2dAc12D7c),
        onlyGMsHolders,
        maxTotalSupply,
        reservedAllowance,
        priceForGMsHoldersInWei,
        priceForOpenMintInWei
    )
    {}
}
