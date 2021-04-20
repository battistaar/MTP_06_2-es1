const mongoose = require('mongoose');

let TodoSchema = mongoose.Schema({
    title: {type: String, required: true},
    dueDate: Date,
    completed: {type: Boolean, default: false}
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

TodoSchema.virtual('expired')
    .get(function() {
        return !!this.dueDate && (this.dueDate < Date.now());
    });

module.exports = mongoose.model('Todo', TodoSchema);
