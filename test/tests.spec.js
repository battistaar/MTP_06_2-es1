var app = require('../src/app');
var chai = require('chai');
var request = require('supertest');
const mongoose = require('mongoose');
const Todo = require('../src/api/todo/todo.schema');

var expect = chai.expect;
var points = 100;

before((done) => {
    mongoose.connect('mongodb://localhost:27017/its21_todo', { useNewUrlParser: true, useUnifiedTopology: true }, _ => {
        Todo.deleteMany({}).then(_ => done());
    })
});

describe('API Tests', function() {
    let checkId;
    calcPoints(10, it('deve gestire l\'inserimento (10)', function(done) {
        request(app)
          .post('/api/todos')
          .send({title: 'task1', dueDate: new Date()})
          .end(function(err, res) {
            expect(res.body).to.be.an('object');
            expect(res.body).to.haveOwnProperty('title', 'task1');
            checkId = res.body._id;
            done();
          });
      }));

    calcPoints(10, it('deve tornare un array (10)', function(done) {
        request(app)
            .get('/api/todos')
            .end(function(err, res) {
            expect(res.body).to.be.an('array');
            expect(res.body).to.be.lengthOf(1);
            const found = res.body.find(el => el._id === checkId);
            expect(found).to.exist;
            done();
            });
    }));

    calcPoints(10, it('elemento inserito deve avere completed a false di default (5)', function(done) {
        request(app)
            .get('/api/todos')
            .end(function(err, res) {
            expect(res.body).to.be.an('array');
            expect(res.body).to.be.lengthOf(1);
            const found = res.body.find(el => el._id === checkId);
            expect(found.completed).to.be.false;
            done();
            });
    }));

    calcPoints(10, it('deve settare il task come completato (10)', function(done) {
        request(app)
            .patch(`/api/todos/${checkId}/check`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.completed).to.be.true;
                done();
            });
    }));

    calcPoints(5, it('deve tornare 404 se il record non esiste (5)', function(done) {
        const id = mongoose.Types.ObjectId().toHexString();
        request(app)
            .patch(`/api/todos/${id}/check`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(404);
                done();
            });
    }));

    calcPoints(5, it('deve tornare 404 se il record non esiste (5)', function(done) {
        const id = mongoose.Types.ObjectId().toHexString();
        request(app)
            .patch(`/api/todos/${id}/uncheck`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(404);
                done();
            });
    }));

    calcPoints(10, it('deve settare il task come da completare (10)', function(done) {
        request(app)
            .patch(`/api/todos/${checkId}/uncheck`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('object');
                expect(res.body.completed).to.be.false;
                done();
            });
    }));

    calcPoints(10, it('deve tornare la lista con solo gli elementi da completare (10)', function(done) {
        insertTestData()
        .then(_ => {
            request(app)
            .get(`/api/todos`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.be.lengthOf(2);
                done();
            });
        });
    }));

    calcPoints(10, it('deve tornare la lista con tutti gli elementi (10)', function(done) {
        insertTestData()
        .then(_ => {
            request(app)
            .get(`/api/todos?showCompleted=true`)
            .end(function(err, res) {
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.be.lengthOf(5);
                done();
            });
        });
    }));

});

after(function(done) {
    console.log('Score:', points);
    done();
})

function calcPoints(points, fn) {
    fn.addListener('fail', () => {
        points -= points;
    })
}

function insertTestData() {
    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            title: `task${i}`,
            dueDate: new Date(),
            completed: i % 2 === 0
        });
    }
    return Todo.deleteMany({}).then(_ => Todo.insertMany(data));
}

