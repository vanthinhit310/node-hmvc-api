const db = require("../../../config/baseModel");
const Todo = db.todos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const params = req.body;
    console.log({params, req});
    return res.status(200).send({
        success: true,
        message: "success"
    })
};
