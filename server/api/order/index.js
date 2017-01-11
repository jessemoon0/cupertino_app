'use strict';

var express = require('express');
var orderController = require('./order.controller');
var userController = require('../user/user.controller');

var router = express.Router();

router.get('/', orderController.index);
router.get('/:id', orderController.show);
router.post('/', orderController.create);
router.post('/repair', userController.createFromRepairOrder, orderController.create);
router.put('/:id', orderController.update);
router.patch('/:id', orderController.update);
router.delete('/:id', orderController.destroy);

module.exports = router;
