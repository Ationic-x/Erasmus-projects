'use strict'
const { buildRouter } = require('express-toolkit')
const multer = require('multer')

const NFTController = require('./NFT.controller.js')
const { auth } = require('../../libs/authorization')
const upload = multer()

// Express toolkit custom endpoints
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

// Personal endpoints

// Webhook
NFTRouter.post('/form', auth, NFTController.Mail)

// Necessary for form-data
const cpUpload = upload.fields([{ name: 'file', maxCount: 1 }])
// Endpoints relationed IPFS and mint NFT
NFTRouter.post('/v0/file', cpUpload, auth, NFTController.PFile)

NFTRouter.post('/v0/metadata', auth, NFTController.PMetada)

NFTRouter.post('/v0/collection', auth, NFTController.PCollection)

NFTRouter.post('/v0/mint', auth, NFTController.PMint)

module.exports = NFTRouter
