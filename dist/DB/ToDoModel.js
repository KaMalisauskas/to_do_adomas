"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ToDoModel = new _mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        trim: true
    },
    tasks: {
        type: [_mongoose.Schema.Types.Mixed]
    }

});
ToDoModel.plugin(_mongooseUniqueValidator2.default, {
    message: "{Value} already exist"
});
ToDoModel.methods = {
    toJson: function toJson() {
        return {
            _id: this.id,
            name: this.name,
            tasks: this.tasks
        };
    }
};
exports.default = _mongoose2.default.model("todomodel", ToDoModel);