/**
 * Created by marcochavezf on 4/18/15.
 * Updated by sango265
 */


'use strict';
var http = require('http'),
    https = require('https'),
    querystring = require('querystring');

    var fun = require('./funcs.tool.js');

exports.getRequest = function(host, path, callback){
    var options = {
        host: host,
        path: path,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };
    // Set up the request
    var postReq = https.request(options, function(resReq) {
        var str = '';
        resReq.on('data', function (chunk) {
            str += chunk;
        });
        resReq.on('end', function (err) {
            if(callback) {
                callback(err, JSON.parse(str));
            }
        });
    });
    postReq.on('error', function(err) {
        if(callback) {
            callback(err);
        }
    });
    postReq.end();
};

exports.postRequest = function(host, path, data, callback){
    exports.postRequestWithContentType(host, path, data, 'application/json', 'https', callback);
};

exports.postRequestWithContentType = function(host, path, data, contentType, protocolType, callback){
    var msg = "";
    msg = "NUEVA COTIZACION\n\n" + fun.removeAccents( fun.jsonToString(JSON.parse(JSON.stringify(data))) );

    //var dd = JSON.stringify({"channel": "#general", "username": "dummy:V", "text": msg});
    var dd = JSON.stringify({"username": "dummy cotizador :V", "text": msg});
       //var dd = data;//JSON.parse({data});//JSON.stringify({data});
    var options = {
        host: host,
        path: path,
        method: 'POST',
        //json: true,
        headers: {
            'Content-Type': contentType,
            'Content-Length':dd.length//postData.length
        }
    };
    //console.log('JSON ' + dd)
    var protocol = https;
    if(protocolType === 'http'){
        protocol = http;
    }
    // Set up the request
    var postReq = protocol.request(options, function(resReq) {
        var str = '';
        resReq.on('data', function (chunk) {
            str += chunk;
        });
        resReq.on('end', function (err) {
            if(callback) {
                callback(err, str);
            }
        });
    });
    postReq.on('error', function(err) {
        if(callback) {
            callback(err);
        }
    });
    postReq.write(dd);//postData);
    postReq.end();
};
