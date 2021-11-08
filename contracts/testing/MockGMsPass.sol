// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "../core/GMsPassCore.sol";

contract MockGMsPass is GMsPassCore {
    constructor(
        string memory name,
        string memory symbol,
        IERC721 gm,
        bool onlyNHolders,
        uint256 maxTotalSupply,
        uint16 reservedAllowance,
        uint256 priceForGMsHoldersInWei,
        uint256 priceForOpenMintInWei
    )
    GMsPassCore(
        name,
        symbol,
        gm,
        onlyNHolders,
        maxTotalSupply,
        reservedAllowance,
        priceForGMsHoldersInWei,
        priceForOpenMintInWei
    )
    {}
}
