module.exports = (app) => {
    const todoController = require("../controllers/todo.controller");
    const router = require("express").Router();

    const { createRules, validate } = require("../validators/index");

    router.post("/", createRules(), validate, todoController.create);

    app.use("/api/todos", router);
};
