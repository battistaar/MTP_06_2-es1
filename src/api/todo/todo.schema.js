const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    // definizione delle proprietà
});

module.exports = mongoose.model('Todo', TodoSchema);
