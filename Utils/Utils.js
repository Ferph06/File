'use strict'
const fs = require('fs');
const mkdirp=require('mkdirp');
module.exports={
	verifyDirectory:function(path){
		let returndata={
			path:'',
			exist:false,
			createdir:false
		};
		return new Promise((resolve,reject) => {
			fs.exists(path, (exists) => {
				if(exists) returndata.path=path;returndata.exist=exists;returndata.createdir=false;returndata.createdir=false;resolve(returndata);
					mkdirp(path,(err) => {
							if(err=undefined)returndata.path='';returndata.exist=null;returndata.createdir=null;reject(returndata);
							
								returndata.path=path;
								returndata.exist=false;
								returndata.createdir=true;
								resolve(returndata);
					});
			});
		});
			
		
	}
}