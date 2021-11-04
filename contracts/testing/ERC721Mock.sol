// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721Mock is ERC721 {

    constructor() ERC721("Test", "TEST") {}
    
    function claim(uint256 tokenId) public {
        require(tokenId >= 0 && tokenId <= 10000, "Token ID invalid");
        _safeMint(_msgSender(), tokenId);
    }

}
