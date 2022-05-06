'use strict'
const { buildRouter } = require('express-toolkit')
const multer = require('multer')

const NFTController = require('./NFT.controller.js')
const upload = multer()

//Express toolkit custom endpoints
const NFTRouter = buildRouter({
  controller: NFTController.NFTController,
    endpoints: {
        find: false,
        findById: false,
        create: false,
        updateById: false,
        updateByQuery: false,
        deleteById: false,
        deleteByQuery: false,
        count: false,
        patchById: false,
        replaceById: false
    }
})

//Personal endpoints
//Website-Docs
NFTRouter.get('/', NFTController.Web)

//Webhook
NFTRouter.post('/form', NFTController.Mail)

//Necessary for form-data
const cpUpload = upload.fields([{ name: 'file', maxCount: 1}])
//Endpoints relationed IPFS and mint NFT
NFTRouter.post('/v0/file', cpUpload, NFTController.PFile)

NFTRouter.post('/v0/metadata', NFTController.PMetada)

NFTRouter.post('/v0/collection', NFTController.PCollection)

NFTRouter.post('/v0/mint', NFTController.PMint)

module.exports = NFTRouter