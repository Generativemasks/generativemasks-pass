// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "../core/GMPassCore.sol";
import "../interfaces/IN.sol";
import "../interfaces/iGM.sol";

contract MockGMPass is GMPassCore {
    constructor(
        string memory name,
        string memory symbol,
        IN gm,
        // iGM gm,
        bool onlyNHolders,
        uint256 maxTotalSupply,
        uint16 reservedAllowance,
        uint256 priceForNHoldersInWei,
        uint256 priceForOpenMintInWei
    )
        GMPassCore(
            name,
            symbol,
            gm,
            onlyNHolders,
            maxTotalSupply,
            reservedAllowance,
            priceForNHoldersInWei,
            priceForOpenMintInWei
        )
    {}
}
