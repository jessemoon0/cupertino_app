'use strict';

import User from '../api/user/user.model';

/**
 * Created by sango265.
 */

exports.jsonToString = function(json){
    return exports.jsonToStringAux(json, "");
}

exports.jsonToStringAux = function self(json, str){//console.log("SSS\n\n" + str);
    for(var exKey in json) {//console.log("\n\n\nIN\n\n" + "key " + exKey);
        //console.log("\n\n\nIN\n\n" + "key " + exKey + " val " + json[exKey] +  " str " + str);
        if(typeof json[exKey]=='object'){//Si tiene objetos anidados, los sacamos
            //console.log("\nIF\n\n" + "key " + exKey + " val " + json[exKey] + " str " + str);
            str += (exKey +":"+ self(json[exKey], "") + "\n");
        } else {//console.log("\nELSE\n\n" + "key " + exKey + " val " + json[exKey] + " str " + str);
            str += (exKey +":"+ json[exKey] + "\n");
        }
    }//console.log("OUT\n\n" + str);
    return str;
}

exports.removeAccents = function(str){
    var ns = "";
    for(var i = 0; i < str.length; i++){
        ns += exports.removeAccentsSingle(str[i]);
    }
    return ns;
}

exports.removeAccentsSingle = function(chr){
    var r=chr.toLowerCase();
    r = r.replace(new RegExp(/[àáâãäå]/g),"a");
    r = r.replace(new RegExp(/æ/g),"ae");
    r = r.replace(new RegExp(/ç/g),"c");
    r = r.replace(new RegExp(/[èéêë]/g),"e");
    r = r.replace(new RegExp(/[ìíîï]/g),"i");
    r = r.replace(new RegExp(/ñ/g),"n");                
    r = r.replace(new RegExp(/[òóôõö]/g),"o");
    r = r.replace(new RegExp(/œ/g),"oe");
    r = r.replace(new RegExp(/[ùúûü]/g),"u");
    r = r.replace(new RegExp(/[ýÿ]/g),"y");
    return r;
}

exports.getUser = function (userId) {

    var user = User.findById(userId, function (err, user) {
        if (err) return console.error(err);
        console.log("AA" + user.email);
        return user.email;
    })
console.log("USRR" + user.email);
 return user.email;
}