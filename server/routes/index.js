const express = require("express");
const route = express.Router();
const userRoute = require("./userRoute");
const kanbanRoute  = require("./kanbanRoute");

route.use("/user", userRoute);
route.use("/kanban", kanbanRoute);

module.exports = route;

