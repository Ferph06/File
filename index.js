const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const port=5050;
const api=require('./routes');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//Headers
app.use((req, res, next)=>{
    req.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Requested-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'POST, OPTIONS, PUT, DELETE');
     res.setHeader('Content-Type', 'application/pdf');
    next();
});

app.get('/',function(req,res){
  res.status(200).send("SERVER API");
});
app.use(api);
app.listen(port);
console.log("API ESCUCHADO EN EL PUERTO \n"+port+" \n usar rutas /api/createFile");
module.exports = app;
