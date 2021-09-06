// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./NPassCore.sol";
import "../interfaces/IN.sol";

/**
 * @title NPass contract
 * @author Tony Snark
 * @notice This contract provides basic functionalities to allow minting using the NPass
 * @dev This is hardcoded to the correct address of the n smart contract on the Ethereum mainnet
 *      This SHOULD be used for mainnet deployments
 */
abstract contract NPass is NPassCore {
    /**
     * @notice Construct an NPass instance
     * @param name Name of the token
     * @param symbol Symbol of the token
     * @param onlyNHolders True if only n tokens holders can mint this token
     * @param maxTotalSupply Maximum number of tokens that can ever be minted
     * @param reservedAllowance Number of tokens reserved for n token holders
     */
    constructor(
        string memory name,
        string memory symbol,
        bool onlyNHolders,
        uint256 maxTotalSupply,
        uint16 reservedAllowance
    )
        NPassCore(
            name,
            symbol,
            IN(0x05a46f1E545526FB803FF974C790aCeA34D1f2D6),
            onlyNHolders,
            maxTotalSupply,
            reservedAllowance
        )
    {}
}
