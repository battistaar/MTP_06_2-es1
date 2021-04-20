const todoModel = require('./todo.model');

module.exports.list = async (req, res, next) => {
    try {
        const showCompleted = req.query.showCompleted === 'true';
        const results = await todoModel.getList(showCompleted);
        res.json(results);
    } catch(err) {
        next(err);
    }
};

module.exports.create = async (req, res, next) => {
    try {
        const todo = await todoModel.create(req.body);
        res.status(201);
        res.json(todo);
    } catch(err) {
        next(err);
    }
};

module.exports.check = async (req, res, next) => {
    try {
        const exists = await todoModel.exists(req.params.id);
        if (!exists) {
            return next(new Error('Not Found'));
        }
        const todo = await todoModel.setCheck(req.params.id, true);
        res.json(todo);
    } catch(err) {
        next(err);
    }
}

module.exports.uncheck = async (req, res, next) => {
    try {
        const exists = await todoModel.exists(req.params.id);
        if (!exists) {
            return next(new Error('Not Found'));
        }
        const todo = await todoModel.setCheck(req.params.id, false);
        res.json(todo);
    } catch(err) {
        next(err);
    }
}