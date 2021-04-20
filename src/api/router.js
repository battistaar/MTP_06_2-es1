const express = require('express');
const router = express.Router();
const todoRouter = require('./todo/todo.router');

router.use('/todos', todoRouter);

module.exports = router;