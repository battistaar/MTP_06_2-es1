const Todo = require('./todo.schema');

// per aggiungere una proprietà a un oggetto tornato da mongoose:
// const obj = returnedObj.toObject();
// obj.expired = ...

module.exports.getList = async (showCompleted) => {
    let q = {};
    if (!showCompleted) {
        q.completed=  {$ne: true};
    }
    return Todo.find(q);
}

module.exports.create = async (data) => {
    data.completed = false;
    return Todo.create(data);
}

module.exports.setCheck = async (id, checked) => {
    const todo = await Todo.findById(id);
    todo.completed = checked;
    return todo.save();
}

module.exports.exists = async (id) => {
    const todo = await Todo.findById(id);
    return !!todo;
}