"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _constants = require("./../helpers/constants");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

APP_SECRET = process.env.APP_SECRET;var _default =

{
  authorize: function authorize(req, res, next) {
    try {
      var token = req.headers.authorization.split(" ")[1];
      var decoded = _jsonwebtoken.default.verify(token, APP_SECRET);
      req._id = decoded['id'];
      req._role = decoded['role'];
      next();
    } catch (error) {
      res.status(401).json({ err: "Authentication failed." });
    }
  },

  only_students: function only_students(req, res, next) {
    var role = req._role;
    if (role !== _constants.ROLES[0]) {
      res.status(400).json({ err: "Authorized students only." });
    } else {
      next();
    }
  },

  only_teachers: function only_teachers(req, res, next) {
    var role = req._role;
    if (role !== _constants.ROLES[1]) {// ROLES[0] is doctorr
      res.status(400).json({ err: "Authorized teachers only." });
    } else {
      next();
    }
  },

  only_admins: function only_admins(req, res, next) {
    var role = req._role;
    if (role !== _constants.ROLES[2]) {
      res.status(400).json({ err: "Authorized administrators only." });
    } else {
      next();
    }
  } };exports.default = _default;