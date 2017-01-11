/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/orders              ->  index
 * POST    /api/orders              ->  create
 * POST    /api/orders/repair       ->  create
 * GET     /api/orders/:id          ->  show
 * PUT     /api/orders/:id          ->  update
 * DELETE  /api/orders/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
var Order = require('./order.model'),
    //mailchimpTool = require('../../components/mailchimp.tool'),
    sendgridTool = require('../../components/sendgrid.tool'),
    slackTool = require('../../components/slack.tool'),
    googleapi = require('../../components/googleapi.tool');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function notifyUsers(req, entity){
  //TODO notify via slack
  //var slackMsg = 'prueba';
  //console.log(req.body)
  //var slackMsg = ':mega: Orden *'+ orderId + '* generada por ' + orderObj.customer.firstName + ' email:' + orderObj.customer.email + ' tel:' + orderObj.customer.phoneNumber + ' ' + urlToOpenOrder + ' ';
  slackTool.remoteControl(req.body, 'ordenes-generadas', function(err, res){
    //console.log('AAAA')
    //console.log(err);
    //console.log(res);
    //console.log('BBBBB')
  });
//console.log("PPPP " + req.body.customer);
  sendgridTool.sendOrderConfirmationToCustomer(req.body);

  googleapi.addToSpreadsheet(req, function(err, res){
    //console.log('AAAA')
    //console.log(err);
    //console.log(res);
    //console.log('BBBBB')
  });


  //mailchimpTool.sendOrderConfirmationToCustomer(req.body);
 
  //TODO notify via mailchimp both admin and customer
  /*
  mailchimpTool.sendOrderConfirmationToCustomer({
    orderId: orderId,
    manifest: orderObj.items,
    pickupFormattedAddress: orderObj.pickup.formattedAddress,
    dropoffFormattedAddress: orderObj.dropoff.formattedAddress,
    customerEmail: orderObj.customer.email,
    urlCancelOrder: urlToCancel
  });
  */
  return entity;
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Orders
export function index(req, res) {
  Order.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Gets a single Order from the DB
export function show(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Creates a new Order in the DB
export function create(req, res) {
  Order.createAsync(req.body)
    .then(notifyUsers(req))
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Order in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
}

// Deletes a Order from the DB
export function destroy(req, res) {
  Order.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
