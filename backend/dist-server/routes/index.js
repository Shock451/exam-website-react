"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _express = require("express");




var _users = _interopRequireDefault(require("./users"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} // import doctorsRouter from "./doctors";
// import patientsRouter from "./patients";
// import chatsRouter from "./chats";
// import appointmentsRouter from './appointments';
// import medsRefillRouter from './meds-refill';
// import RadiologyRouter from './radiology';
var router = (0, _express.Router)();
router.get('/', function (req, res) {
  res.status(200).json({
    data: "Welcome to Exam website v1" });

});

// router.use("/appointments", appointmentsRouter);
// router.use("/doctors", doctorsRouter);
router.use("/users", _users.default);
// router.use("/patients", patientsRouter);
// router.use("/chats", chatsRouter);
// router.use("/meds-refill", medsRefillRouter);
// router.use("/radiology", RadiologyRouter);
var _default =
router;exports.default = _default;