const db = require("../../../config/baseModel");
const Todo = db.todos;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        const item = await Todo.create({
            title,
            description,
            deadline,
        });

        await item.reload();

        return res.status(200).send({
            success: true,
            message: "success",
            data: item,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Have an error. Please contact to admin!",
        });
    }
};
