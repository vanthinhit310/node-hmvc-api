module.exports = (app) => {
    const todoController = require("../controllers/todo.controller");
    const router = require("express").Router();

    const { createRules, validate } = require("../validators/index");

    router.get("/", todoController.getList);
    router.post("/", validate(createRules), todoController.create);

    app.use("/api/todos", router);
};
