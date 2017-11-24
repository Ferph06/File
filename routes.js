const express = require('express');
const api = express.Router();
const path='C:/opt/sfereaSystems/biossman/pdf/';
const fileController=require('./Controllers/FileUpLoad');
api.post('/api/createPdf',fileController.createHtml);

api.get('/',(req,res)=>{

  res.send("SERVER POWERED BY SFEREA...");

});


api.get('/api/ReporteEjecutivo/:id', (req,res) => {
    let id=req.params.id.replace('&','');
    let filesend=path+id+"ReporteEjecutivo.pdf";
    res.sendFile(filesend);
});

api.post('/api/FileHtmlPredefined',fileController.filePreHtml);

api.get('/getFile/:id', (req,res) => {
	let id=req.params.id.replace('&','');
  let finalname=(id.split('&').length==2)?id.split('&')[0]+"indicador":id.replace('&','');
  let filesend=path+finalname+'reporte.pdf';
    res.sendFile(filesend);
});

module.exports = api;
