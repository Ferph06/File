'use strict'
const htmltopdf=require('html-to-pdf')
const fs = require('fs');
const pathnormalize=('path');
const util=require('../Utils/Utils');
const requestify=require('requestify');
const pdf = require('html-pdf');
/**
* con esta function se crea el pdf
*@param req
*@return res
*/
const createHtml =(req,res) => {
  let data=req.body;
  let pathn='reporte.pdf'
    if(data.html==undefined  || data.path==undefined || data.id==undefined || data.style==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      requestify.get(data.style).then((result) => {
          let css=result.body;
          let html="<html><head><meta charset=\"utf8\"><style>"+css+" </style></head><body>"+data.html+"</body></html>";
          util.verifyDirectory(data.path).then(dir => {
              let finalname=(data.id.replace('&','').split('&').length>1)?data.id.replace('&','').split('&')[0]+"indicador":data.id.replace('&','');
              finalname=dir.path+finalname+pathn;
              pdf.create(html).toFile(finalname, (err,result) =>{
                  if(err) return res.status(500).send("ERROR");
                  fs.readFile(finalname,(error,ok) => {
                    var file = fs.createReadStream(finalname);
                    var stat = fs.statSync(finalname);
                    res.setHeader('Content-Length', stat.size);
                    res.setHeader('Content-Type', 'application/pdf');
                    res.send(ok);
                    res.end();
                  });
                });
            }).catch(err =>{
            res.status(500).send("ERROR");
          });
      }).catch((err) => {
       res.status(500).send("ERROR");
    });
}
module.exports={
  createHtml
}
