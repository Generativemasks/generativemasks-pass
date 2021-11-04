//SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../interfaces/IN.sol";
import "../interfaces/iGM.sol";
import "../core/GMPassCore.sol";

/**
 * @title GenerativemasksDerivative
 */
contract GenerativemasksDerivative is GMPassCore {

    address public derivedFrom;
    string private __baseURI;

    constructor(
        string memory baseURI,
        string memory name,
        string memory symbol,
        address _generativemasks,
        address _derivedFrom
    )
    GMPassCore(name, symbol, IN(_generativemasks), true, 10000, 10000, 0, 0)
    // GMPassCore(name, symbol, iGM(_generativemasks), true, 10000, 10000, 0, 0)
    {
        __baseURI = baseURI;
        derivedFrom = _derivedFrom;
    }
    
    function _baseURI() internal override view virtual returns (string memory) {
        return __baseURI;
    }
    
    function updateBaseURI(string calldata newBaseURI) external onlyOwner {
        __baseURI = newBaseURI;
    }

}
