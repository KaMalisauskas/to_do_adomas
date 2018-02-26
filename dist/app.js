"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connect = require("./DB/connect");

var _connect2 = _interopRequireDefault(_connect);

var _ToDoModel = require("./DB/ToDoModel");

var _ToDoModel2 = _interopRequireDefault(_ToDoModel);

require("babel-polyfill");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded());
app.use(_bodyParser2.default.json());

app.get('/', function (req, res) {
    res.status(200).json({
        success: true,
        message: "Welcome to to-do API"
    });
});

app.post('/addTask', function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var userId, name, tasks, array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task, userToDo;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        userId = req.body.userId;
                        name = req.body.name;
                        tasks = req.body.task;
                        array = [];
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context.prev = 7;


                        for (_iterator = tasks[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            task = _step.value;

                            array.push({ task: task, finished: false });
                        }
                        _context.next = 15;
                        break;

                    case 11:
                        _context.prev = 11;
                        _context.t0 = _context["catch"](7);
                        _didIteratorError = true;
                        _iteratorError = _context.t0;

                    case 15:
                        _context.prev = 15;
                        _context.prev = 16;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 18:
                        _context.prev = 18;

                        if (!_didIteratorError) {
                            _context.next = 21;
                            break;
                        }

                        throw _iteratorError;

                    case 21:
                        return _context.finish(18);

                    case 22:
                        return _context.finish(15);

                    case 23:
                        tasks = array;
                        _context.prev = 24;
                        _context.next = 27;
                        return _ToDoModel2.default.create({ userId: userId, name: name, tasks: tasks });

                    case 27:
                        userToDo = _context.sent;

                        res.status(200).json({
                            success: true,
                            data: userToDo.toJson()
                        });
                        _context.next = 34;
                        break;

                    case 31:
                        _context.prev = 31;
                        _context.t1 = _context["catch"](24);

                        res.status(400).json({
                            success: false,
                            error: _context.t1
                        });

                    case 34:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[7, 11, 15, 23], [16,, 18, 22], [24, 31]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

app.post('/getTask', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var userTasks, len, temp, part;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _ToDoModel2.default.findOne({ userId: req.body.userId });

                    case 3:
                        userTasks = _context2.sent;

                        if (!userTasks) res.status(404).json({
                            success: false,
                            error: "Task with this user ID doesn't exist"
                        });
                        console.log(userTasks.tasks);
                        len = userTasks.tasks.length;
                        temp = 0;
                        part = 100 / len;

                        userTasks.tasks.map(function (task) {
                            return task.finished ? temp++ : "";
                        });
                        res.status(200).json({
                            success: true,
                            data: userTasks,
                            finished: temp * part
                        });
                        _context2.next = 16;
                        break;

                    case 13:
                        _context2.prev = 13;
                        _context2.t0 = _context2["catch"](0);

                        res.status(400).json({
                            success: false,
                            error: _context2.t0
                        });

                    case 16:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 13]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

app.post("/updateTask", function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var userTasks, i, userTask;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        _context3.next = 3;
                        return _ToDoModel2.default.findOne({ userId: req.body.userId });

                    case 3:
                        userTasks = _context3.sent;

                        if (!userTasks) res.status(404).json({
                            success: false,
                            error: "Task with this user ID doesn't exist"
                        });
                        for (i = 0; i < userTasks.tasks.length; i++) {
                            if (userTasks.tasks[i].task == req.body.taskName) userTasks.tasks[i].finished = true;
                        }
                        userTasks.markModified('tasks');
                        _context3.next = 9;
                        return userTasks.save();

                    case 9:
                        userTask = _context3.sent;

                        res.status(200).json({
                            success: true,
                            data: userTask
                        });
                        _context3.next = 16;
                        break;

                    case 13:
                        _context3.prev = 13;
                        _context3.t0 = _context3["catch"](0);

                        res.status(400).json({
                            success: false,
                            error: _context3.t0
                        });

                    case 16:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 13]]);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

exports.default = app;