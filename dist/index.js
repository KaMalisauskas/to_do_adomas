"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _app = require("./app");

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3000;
var server = _http2.default.createServer(_app2.default);
server.listen(PORT, function () {
    console.log("<<<<Server is running on port: " + PORT);
});