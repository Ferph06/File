'use strict'
const fs = require('fs');
const access=require('../config/access');
module.exports={
	verifyDirectory:function(path){
		let returndata={
			path:'',
			exist:false,
			createdir:false
		};
			return new Promise((resolve,reject) => {
			fs.exists(path, (exists) => {
				if(exists){
					returndata.path=path;
					returndata.exist=exists;
					returndata.createdir=false;
					resolve(returndata);
				}else{

					console.log(access.adminAccess(path));
					returndata.path='';
							returndata.exist=exists;
							returndata.createdir=false;
							reject(returndata);
					/*fs.mkdir(path,(error) => {
						if(error.code) {
							
						}
					});*/
				}
			});
		});
		
	}
}