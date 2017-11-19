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
 // let path='C:\\opt\\sfereaSystems\\biossman\\pdf\\report.pdf';
  let data=req.body;
  console.log(data);
  let css={
    general:"http://13.66.58.238:60617/Biossmann/resources/template/css/general.css",
    prime:"http://13.66.58.238:60617/Biossmann/javax.faces.resource/components.css.bsmn?ln=primefaces&v=6.0"
  }
  if(data.html==undefined || data.links==undefined || data.css==undefined || data.path==undefined) res.status(400).send("Hacen falta datos para procesar la peticion");
      util.verifyDirectory(data.path).then(result => {
        res.json(result);
        }).catch(err => {
           res.status(500).send(err);
      });

      /*Q.all([requestify.get(css.general),
          requestify.get(css.prime)
        ]).then(result=>{
            let datatreturn=[result[0].body,result[1].body];
            let html="<html> \n <head> \n <meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">"
                +"<link href=\"http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\"> \n <style>"+datatreturn+"</style> \n </head> \n <body>"+data+"</body> \n </html>";
                htmltopdf.setInputEncoding('UTF-8');
                htmltopdf.setOutputEncoding('UTF-8');
                htmltopdf.convertHTMLString(html,path,function(error,success){
                    if(error) return res.status(500).send("ERROR");
                    let file = fs.createReadStream(path);
                  let stat = fs.statSync(path);
                  res.setHeader('Content-Length', stat.size);
                  res.setHeader('Content-Type', 'application/pdf');
                  res.setHeader('Content-Disposition', 'attachment; filename=reporte_indicador.pdf');
                  file.pipe(res);
                  res.end(file);
                });
        }).catch(err=>{
          res.status(500).send(err);
        });*/
}
module.exports={
  createHtml
}
