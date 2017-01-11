'use strict';
var chalk = require('chalk'),
    config = require ('../config/environment');

/**
 * Created by marcochavezf on 2/10/15.
 */

var raygun = require('raygun');
var raygunClient = new raygun.Client().init({ apiKey: '' });

exports.error = function(err){
    if(typeof err === 'undefined' || err === null) {
        return;
    }
    if(typeof err === 'string') {
        err = new Error(err);
    }
    console.log(chalk.red('*** err begins ***'));
    console.log(err);
    console.log(chalk.red('*** err ends ***'));
    if(config.env === 'production') {
        raygunClient.send(err);
    }
};

exports.warning = function(message){
    if(config.env === 'production') {
        if(typeof message === 'string') {
            message = new Error(message);
        }
        console.log(message);
        raygunClient.send(message);
    } else {
        console.log(chalk.yellow(message));
    }
};

exports.info = function(message){
    if(config.env !== 'production') {
        console.log(chalk.white(message));
    } else {
        console.log(message);
    }
};

exports.debug = function(message){
    if(config.env !== 'production') {
        console.log(chalk.green(message));
    } else {
        console.log(message);
    }
};
