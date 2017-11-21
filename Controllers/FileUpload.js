'use strict'
const htmltopdf=require('html-to-pdf')
const fs = require('fs');
const util=require('../Utils/Utils');
const requestify=require('requestify');
/**
* con esta function se crea el pdf
*@param req
*@return res
*/
const createHtml =(req,res) => {
  let divs=".rdt-div div:nth-child(1){width: 5%; height: 40px; float: left; padding-top: 10px;}.rdt-div div:nth-child(2){width: 12%; height: 40px; float: left; padding-top: 10px;}.rdt-div div:nth-child(3){width: 23%; height: 40px; float: left;text-align: left; padding: 10px 0 0 7.5px;}.rdt-div div:nth-child(4){width: 30%; height: 40px; float: left; padding-top: 10px;}.rdt-div div:nth-child(5){width: 30%; height: 40px; float: left; padding-top: 10px;}.rdetallado-info{width:100%; box-sizing: border-box; float: left; min-height: 40px;background: #f9f9f9; text-align: center;margin: 7.5px 0;}"
  let otherdiv=".rdt-info{width: 100%; float: left; box-sizing: border-box; min-height: 40px; color: black; font-size: 14px;text-align: center; padding: 12px 0;}.rdt-info div:nth-child(1){width: 5%; min-height: 40px; float: left; padding-top: 20px;text-align: left; padding-left: 15px;}.rdt-info div:nth-child(2){width: 12%; min-height: 40px; float: left; padding-top: 10px;}.rdt-info div:nth-child(3){width: 23%; min-height: 40px; float: left; padding-top: 20px;}.rdt-info div:nth-child(4){width: 30%; min-height: 40px; float: left; padding: 20px;text-align: left;}.rdt-info div:nth-child(5){width: 15%; min-height: 40px; float:left;padding-top:20px;}.rdt-info div:nth-child(6){width: 15%; min-height: 40px; float: left; padding-top: 20px;}"
  let circles=".reportesSep{width: 100%; height: 2.5px; background: #a8418d; float: left;box-sizing: border-box;}.c-serv{width: 45px;height: 45px; font-size: 12px;border-radius: 100%; box-sizing: border-box; float: left; margin: 0 25%; padding-top: 14px;}.c-mqs{border: solid 2px #6FCD4D;}.c-kit{border: solid 2px #1CA7DE;}.c-sia{border: solid 2px #B74E93;}.c-sio{border: solid 2px #FF7E49;}.tabla-verificacion thead tr th > input{display: none !important;}";
 let path='auxpdf.pdf',data=req.body;
let imgs =".npsHead{width: 65px; height: 60px; box-sizing: border-box; float: left;margin-left: 34.5%; margin-top: -25.5px;}.pceHead{height: 40px; float: left; box-sizing: border-box;margin-left: 42.5%;}";
let reportes=".reportes{width: 75%; height: auto; float: left; box-sizing: border-box;margin: 80px 12.5%; padding: 0;}.reportes-info-div{width: 100%; min-height: 140px; float: left; box-sizing: border-box;margin: 0; padding: 0;}.reportes-info-line{min-height: 70px; float: left; box-sizing: border-box;padding: 0;}.reportes-info-line:nth-child(1){width: 85%; margin: 10px 7.5%;}.reportes-info-line:nth-child(2){width: 100%; margin: 0;}.reportes-info{width: 20%; min-height: 70px; float: left; box-sizing: border-box;margin: 0; padding: 0;}.reportes-info div{width: 100%; text-align: center; box-sizing: border-box; float: left;}.reportes-info div:nth-child(1){font-weight: bold; margin: 15px 0 20px;}.reportes-info div:nth-child(2){font-weight: normal;}.mt-mq{margin-top: -2.5px !important;}.reporte-detallado-div{width: 95%; min-height: 80px; float: left; box-sizing: border-box;margin: 50px 2.5% 10px;}";
let head=".rdetallado-head{width: 100%; box-sizing: border-box; float: left; height: 40px;background: #a8418d;}.rdetallado-title{width: 100%; box-sizing: border-box; float: left; height: 40px;background: #f9f9f9; text-align: center; padding: 7.5px 0;font-weight: normal; font-size: 18.55px; color: purple;margin: 7.5px 0; border-width:  3px 0 3px 0; border-color: white;}.rdt-div{width: 100%; float: left; box-sizing: border-box; height: 40px;color: white; font-weight: bolder; font-size: 15px;text-align: center;}.rdetallado-main{width: 100%; float: left; box-sizing: border-box; height: 45px;font-weight: bolder; font-size: 23px; text-align: center;color: #a8418d; padding-top: 7.5px;background: #e0e0e0; margin-bottom: 15px;}";
  if(data.html==undefined  || data.path==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      util.verifyDirectory(data.path).then(result => {
          if(result.path=='') return res.status(500).send("No se pudo crear el archivo");
          requestify.get('http://13.66.58.238:60617/Biossmann/resources/template/css/general.css').then((outget) => {
            let html="<html> \n <head> \n <style> \n "+divs+"\n "+otherdiv+" "+circles+"  \n html {font-size: 10px;-webkit-tap-highlight-color: rgba(0,0,0,0);} \n "+reportes+"\n"+head+" "+imgs+" </style> \n</head>\n <body>\n "+data.html+"</body> \n </html>";

              htmltopdf.setInputEncoding('UTF-8');
              htmltopdf.setOutputEncoding('UTF-8');
               htmltopdf.convertHTMLString(html,result.path+path,function(error,success){
                        if(error)res.status(500).send("ERROR");
                        res.sendFile(result.path+path);
              });
    });
          }).catch(err => {
            res.status(500).send(err);
          });
}
module.exports={
  createHtml
}
