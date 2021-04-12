"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");

var _users = _interopRequireDefault(require("../controllers/users"));
var _auth = _interopRequireDefault(require("../middlewares/auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var router = (0, _express.Router)();

router.get('/me', _auth.default.authorize, _users.default.getMyProfile);

// router.put('/me', AuthMiddleware.authorize, UserController.updateUserProfile);

router.get('/list', _auth.default.authorize, _auth.default.only_admins, _users.default.getUserList);

router.post('/login', _users.default.login);

router.post('/register', _users.default.registerUser, _users.default.login);

router.delete('/', _auth.default.authorize, _auth.default.only_admins, _users.default.deleteUser);var _default =

router;exports.default = _default;