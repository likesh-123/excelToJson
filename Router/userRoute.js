const express = require("express");
const userController = require("../Controller/userController");

const userRouter = express.Router();

userRouter.post('/', userController.upload, userController.createRecordAndExport)

module.exports = userRouter;