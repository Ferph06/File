const express = require('express');
const api = express.Router();
const fileController=require('./Controllers/FileUpLoad');
api.post('/api/createPdf',fileController.createHtml);
module.exports = api;
