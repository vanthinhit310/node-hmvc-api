module.exports = (app) => {
    const todoController = require("../controllers/todo.controller");
    const router = require("express").Router();

    router.post("/", todoController.create);

    app.use("/api/todos", router);
};
