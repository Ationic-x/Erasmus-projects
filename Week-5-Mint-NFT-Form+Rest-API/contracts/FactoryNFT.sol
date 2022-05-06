// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./ContractNFT.sol";
import "hardhat/console.sol";

contract FactoryNFT{
    ContractNFT[] private _nft;

    //Create a new ContractNFT inside of array
    function Collection(string memory name, string memory symbol) public returns(uint256){
        ContractNFT nft = new ContractNFT(name, symbol);
        _nft.push(nft);
        return _nft.length;
    }

    //Call contract inside the array with the index, an call function mint externally
    function Fmint(uint256 _nftIndex, address wallet, uint256 maxSupply, string memory tokenURI) public{
        ContractNFT(address(_nft[_nftIndex])).mint(wallet, tokenURI, maxSupply);
    }
}