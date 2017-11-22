const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const port= 5050;
const api=require('./routes');
const http = require('http');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Headers
app.use((req, res, next)=>{
		res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'POST, OPTIONS, PUT, DELETE');
		if(req.params.id!==undefined){
				res.setHeader("Content-Transfer-Encoding", "binary");
			  res.setHeader('Content-Type', 'application/pdf');
				let id=req.params.id.replace('&','');
				console.log(id);
				let finalname=(id.split('&').length>1)?id.replace('&','').split('&')[0]+"indicador":id.replace('&','');
				let filename=finalname+'reporte.pdf';
				res.setHeader('Content-Disposition', 'attachment; filename='+filename+'');
		}

    next();
});
app.use(api);
app.listen(port);
http.createServer(app);
console.log("API ESCUCHADO EN EL PUERTO \n"+port+" \n"+process.env.PORT);
module.exports = app;
