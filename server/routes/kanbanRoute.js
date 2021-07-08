const express = require("express");
const route = express.Router();
const KanbanController = require("../controller/KanbanController");
const authentication = require("../middlewares/authentication");

route.get("/", KanbanController.showKanban);

route.use(authentication);
route.post("/", KanbanController.addKanban);
route.get("/:id", KanbanController.getOneKanban);
route.put("/:id", KanbanController.editKanban);
route.delete("/:id", KanbanController.delKanban);

module.exports = route;