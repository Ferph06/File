'use strict'
const Q=require('q');
const htmltopdf=require('html-to-pdf')
const fs = require('fs');
const requestify = require('requestify');
/**
* con esta function se crea el pdf
*@param req
*@return res
*/
const createHtml =(req,res)=>{
  let path='C:\\opt\\sfereaSystems\\biossman\\pdf\\report.pdf';
  let css={
    general:"http://13.66.58.238:60617/Biossmann/resources/template/css/general.css",
    prime:"http://13.66.58.238:60617/Biossmann/javax.faces.resource/components.css.bsmn?ln=primefaces&v=6.0"
  }
  if(req.body==undefined) res.status(400).send("ERROR");
  let data=req.body.html;
      Q.all([requestify.get(css.general),
          requestify.get(css.prime)
        ]).then(result=>{
            let datatreturn=[result[0].body,result[1].body];
            let html="<html><head><meta content=\"text/html; charset=UTF-8\" http-equiv=\"Content-Type\">"
                +"<link href=\"http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css\" rel=\"stylesheet\"><style>"+datatreturn+"</style></head><body>"+data+"</body></html>";
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
        });
}
module.exports={
  createHtml
}
