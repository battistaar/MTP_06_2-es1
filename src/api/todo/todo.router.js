const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');

//definizione dele api relative ai todo
router.post('/', todoController.create);
router.get('/', todoController.list);
router.patch('/:id/check', todoController.check);
router.patch('/:id/uncheck', todoController.uncheck);

module.exports = router;