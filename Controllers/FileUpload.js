'use strict'
const htmltopdf=require('html-to-pdf')
const fs = require('fs');
const util=require('../Utils/Utils');
/**
* con esta function se crea el pdf
*@param req
*@return res
*/
const createHtml =(req,res) => {

 let path='auxpdf.pdf',data=req.body;
  if(data.html==undefined || data.head==undefined || data.path==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      util.verifyDirectory(data.path).then(result => {
          if(result.path=='') return res.status(500).send("No se pudo crear el archivo");
            let html="<html> \n <head> \n"+data.head+" \n</head>\n <body>\n "+data.html+"</body> \n </html>";
            console.log(html);

    htmltopdf.setInputEncoding('UTF-8');
    htmltopdf.setOutputEncoding('UTF-8');
               htmltopdf.convertHTMLString(html,result.path+path,function(error,success){
                        if(error)res.status(500).send("ERROR");
                        res.sendFile(result.path+path);
              });
    });
}
module.exports={
  createHtml
}
