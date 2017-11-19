'use strict'
const Q=require('q');
const os = require('os');
const fs=require('fs');

const version=process.versions.node.split('.')[0];
/*
*sistemas que trae el metodo
*'aix'
*'darwin'
*'freebsd'
*'linux'
*'openbsd'
*'sunos'
*'win32'
*/
module.exports={
	 adminAccess:function(path){
		if(version<6){
			let permiss=[fs.F_OK,fs.R_OK,fs.W_OK];
		switch(os.platform()){
			case "win32":
				return permiss;
			break;
			case "linux":
			return permiss;
			break;
		}
	}else{
			let permiss=[fs.constants.F_OK,fs.constants.R_OK,fs.constants.W_OK];
			switch(os.platform()){
			case "win32":
			return permiss;
			break;
			case "linux":
			return permiss;
			break;
		}
	}
}

}