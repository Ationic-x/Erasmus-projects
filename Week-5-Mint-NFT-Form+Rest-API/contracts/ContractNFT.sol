// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ContractNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    //Basic mint function with a max supply, you can't mint higher than this
    function mint(address _recipient, string memory _tokenURI, uint256 _maxSupply) public onlyOwner
    {
        supply.increment();
        uint256 newItemId = supply.current();
        require(newItemId <= _maxSupply);
        _mint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
    }
}