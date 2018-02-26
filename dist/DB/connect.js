"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require("./config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var user = process.env.username || _config2.default.mongo.username;
var pass = process.env.pass || _config2.default.mongo.pass;
var connect = _mongoose2.default.connect("mongodb://" + user + ":" + pass + "@ds249718.mlab.com:49718/to_do_limsa", function (err) {
    if (err) return err;
    console.log("<<<<Connected to Mongo");
});

exports.default = connect;