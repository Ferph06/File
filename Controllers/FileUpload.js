'use strict'
const Q=require('q');
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

  let imgcc=".re-circle{width: 150px; height: 150px; box-sizing: border-box; float: left;padding-top: 5px; margin: 15px 30%;background: url(\"http://13.66.58.238:60617/Biossmann/resources/template/img/verificaciones/circle.png\") no-repeat;background-size: 100% 100%; text-align: center;} .re-left-div{width: 95%; min-height: 130px;box-sizing: border-box; float: right;margin: 0; padding: 0;}"

  let data=req.body;
  let pathn='reporte.pdf'

    if(data.html==undefined  || data.path==undefined || data.id==undefined || data.style==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      requestify.get(data.style).then(datab => {
          let cssR=data.body;
          let html="<html><head><meta charset=\"utf8\"> <style>"+cssR+" \n "+imgcc+"</style></head><body>"+data.html+"</body></html>";

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
        }).catch( err => {
          res.status(500).send("ERROR");
      });
}

const  filePreHtml=(req,res) => {
let data=req.body;
let pathfinalname="";
if(data.html==undefined || data.id==undefined || data.path==undefined) return res.status(400).send("Hacen falta datos en la peticion");
util.verifyDirectory(data.path).then(result => {
    if(result.path=='') return res.status(500).send("ERROR");
      let finalname=data.id.replace('&','');
      finalname=data.path+finalname+"ReporteEjecutivo.pdf";
      pdf.create(data.html).toFile(finalname,(err,ok) => {
          if (err) return res.status(500).send("ERROR");
          let urlfile={
            url:"http://13.66.58.238:5050/api/ReporteEjecutivo/"+data.id
          }
          res.status(200).send(urlfile);
      });
  }).catch(err => {
    return res.status(500).send("ERROR");
});

}


module.exports={
  filePreHtml,
  createHtml
}
