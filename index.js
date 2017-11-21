const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const port=5050;
const api=require('./routes');
const path='C:/opt/sfereaSystems/biossman/pdf/';
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Headers
app.use((req, res, next)=>{
	res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'POST, OPTIONS, PUT, DELETE');
    res.setHeader('Content-Type', 'application/pdf');
		res.setHeader("Content-Transfer-Encoding", "binary");
		if(req.param('id')!==undefined){
				let id=req.param('id').replace('&','');
				let filename=id+'reporte.pdf';
				res.setHeader('Content-Disposition', 'attachment; filename='+filename+'');
		}

    next();
});

app.get('/getFile/:id',function(req,res){
	let id=req.param('id').replace('&','');
	let finalpath=path+id+'reporte.pdf';
	console.log(finalpath)
  res.sendFile(finalpath);
});
app.use(api);
app.listen(port);
console.log("API ESCUCHADO EN EL PUERTO \n"+port+" \n usar rutas /api/createFile");
module.exports = app;
