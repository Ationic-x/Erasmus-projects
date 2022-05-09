# API with Express Toolkit + Solidity + Hardhat

- REST-API that recieve data from a form (webhook), make and store a user with her authentication in the database and send a confirmation email, after that with the auth can in postman store metadata files and images (using NFT.Storage), and after make a collection and mint the nfts.

# Requirements

- Mongodb (at localhost)
- Postman or similar (e.g Insomnia)
- Node.js
- Ngrok
- Gmail (you can use another mail but require a little configuration)

# Used programs

- OS W10 Pro x64
- Microsoft Visual Studio Code v.1.66.0
- Postman v.9.15.2
- Node.js v.16.14.2
  - Express v.4.18.0
  - Mongoose v.6.3.1
  - uuid v.8.3.2
  - nodemailer v.6.7.5
  - dotenv v.16.0.0
  - express-toolkit v.0.8.1
  - multer v.1.4.4
  - nft.storage v.6.2.0
  - hardhat v.2.9.3
  - @nomiclabs/hardhat-ethers v.2.0.5
  - @openzeppelin/contracts v.4.6.0
- MongoDB v.5.0.6
- MongoDB Compass v.1.30.1
- ngrok (free, the latest in 6/05/22)

# How to use
# Base
1. Important before all you should make 2 folders inside another one (this happens because github don't allow publish empty folders), the first folder is called **Temporary** and inside **img** and **metadata**.
1. Start **Node.js**, **Mongo.db** and **ngrok** the last with **ngrok http (port used (in my API 5000 default))**
1. Go to your website form, choose webhook option and add the given url by ngrok + **/nfts/port**
1. Go to the file **.env**, fill the parameters with the corresponding (at this moment you don't have contract address).
1. Let's deploy the contract using hardhat **npx hardhat run scripts/deploy-contract.js --network PolygonMumbai** (I'm using Mumbai tesnet so you should change it or get mumbai tokens in some faucets)
1. Copy the returned addres of the contract and end with **.env**.
1. Let's run your API, write **node app.js** at this point you don't need touch more terminals, only if you want see status and console logs.
1. You can acces to the basic website with information in **localhost:5000/nfts** (you also can use the url given by ngrok)
1. Before nothing go to the path **/scripts/mail.js** and change the email for one of your own.
1. Go to your form and submit like a client the form (important, the form model that I'm using have 6 options and the amount to mint and email (with her IDs) this should change for you form model)
1. At this point the email putted was mailed and you have store her data in mongoDB, copy the uuid (that we use like API-Key)
1. Go to postman in **Authorization** uses type **API Key** with Key **APIO_KEY**(or whatever you have) and the value the **uuid**, you have 4 endpoints
   - Store file in IPFS and NFT.Storage **POST http://localhost:5000/nfts/v0/file**
   - Store metada in IPFS and NFT.Storage **POST http://localhost:5000/nfts/v0metadata**
   - Create your collection **POST http://localhost:5000/nfts/v0/collection**
   - Mint your nft **POST http://localhost:5000/nfts/v0/mint**
# Client
Actually when you deploy the **Node.js** with **node app.js** you can see a client guide with images like a docs, in the path **localhost:5000/nfts**, the idea is like is the front-end website for the cliente, but also is useful to learn how works the API.

**[For more explained information visit the wiki](https://github.com/Ationic-x/Erasmus-projects/wiki/Week-5-Mint-NFT-Form-Rest-API)**
