'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
    Schema = mongoose.Schema;

var OrderSchema = new mongoose.Schema({
  device: { type: String, required: 'Favor de indicar un dispositivo'},
  model: { type: String, required: 'Favor de indicar un modelo'},
  issue: { type: String, required: 'Favor de indicar una falla'},
  customer: { type: Schema.Types.ObjectId, ref: 'User', required: 'Favor de indicar un usuario' },
  price: {
    amount: Number,
    currency: String
  },
  pickup: {
    lat: Number,
    lng: Number,
    street: String,
    sublocality: String,
    locality: String,
    administrativeArea: String,
    country: String,
    postalCode: String,
    isoCountry: String,
    references: String,
    fullname: String,
    formattedAddress: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Order', OrderSchema);
