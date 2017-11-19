'use strict'
const Q=require('q');
const htmltopdf=require('html-to-pdf')
const fs = require('fs');
const requestify = require('requestify');
const util=require('../Utils/Utils');
/**
* con esta function se crea el pdf
*@param req
*@return res
*/
const createHtml =(req,res)=>{
    htmltopdf.setInputEncoding('UTF-8');
    htmltopdf.setOutputEncoding('UTF-8');
 let path='auxpdf.pdf',data=req.body;
  if(data.html==undefined || data.links==undefined || data.css==undefined || data.path==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      util.verifyDirectory(data.path).then(result => {
          if(result.path=='') return res.status(500).send("No se pudo crear el archivo");
            let html="<html> \n <head> \n <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">"
                   +"<link href=\"http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\"> \n  \n </head> \n <body>"+data.html+"</body> \n </html>";
               htmltopdf.convertHTMLString(html,result.path+path,function(error,success){
                        if(error) return res.status(500).send("ERROR");
                        res.sendFile(result.path+path);
              });
        }).catch(err => {
           res.status(500).send(err);
      });

      /**/
}
module.exports={
  createHtml
}
