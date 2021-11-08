//SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/utils/Strings.sol";
import "../core/GMsPassCore.sol";

contract GenerativemasksDerivative is GMsPassCore {

    using Strings for uint256;

    address public derivedFrom;
    string private __baseURI;

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        address _generativemasks,
        address _derivedFrom
    )
    GMsPassCore(name, symbol, IERC721(_generativemasks), true, 10000, 10000, 0, 0)
    {
        __baseURI = baseURI;
        derivedFrom = _derivedFrom;
    }

    function _baseURI() internal override view virtual returns (string memory) {
        return __baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

        string memory baseURI = _baseURI();

        if (MAX_GMs_TOKEN_ID < tokenId) {
            return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, tokenId.toString())) : "";
        }

        uint256 maskNumber = (tokenId + METADATA_INDEX) % GMS_SUPPLY_AMOUNT;
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, maskNumber.toString())) : "";
    }

    function updateBaseURI(string calldata newBaseURI) external onlyOwner {
        __baseURI = newBaseURI;
    }
}
