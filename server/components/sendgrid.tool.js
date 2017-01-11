'use strict';

/**
 * Created by sango265
 */

//console.log("SEND");

var sendgrid  = require('sendgrid')('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');//('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');

var fun = require('./funcs.tool.js');

exports.sendOrderConfirmationToCustomer = function(params, callback){

 // console.log("MET");

    var data = JSON.parse(JSON.stringify(params));

  //console.log("Mail " + params.email);

/*
  //CLIENT
  sendgrid.send({
    to:       params.customerEmail,
    from:     'info@cupertino.mx',
    subject:  'Hello World',
    text:     'My first email through SendGrid.'
  }, function(err, json) {
      if (err) { return console.error(err); }
      console.log(json);
      console.log("SUC");
  });
*/
  //CUPER
  var email     = new sendgrid.Email();
  email.addTo('mail@dominio.com');
  email.setFrom('info@cupertino.mx');
  email.setSubject('Hola');
  email.setText('Maillll o');
  email.addFilter('templates', 'enable', 1);
  email.addFilter('templates', 'template_id', )
  email.setFilters({
      'templates': {
        'settings': {
          'enable': 1,
          'template_id': 'e1323980-02b0-45ae-aac6-a65b24340923'
        }
      }
  });

  sendgrid.send(email , function(err, json) {
      if (err) { return console.error(err); } else {     // console.log("AAA" + JSON.stringify(json));
      //console.log("SUC");
    }
  });


};