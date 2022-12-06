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

exports.getList = (req, res) => {
    try {
        const { search, page, perPage } = req.query;
        const condition = search
            ? {
                  [Op.or]: [
                      {
                          title: {
                              [Op.like]: `%${search}%`,
                          },
                      },
                      {
                          description: {
                              [Op.like]: `%${search}%`,
                          },
                      },
                  ],
              }
            : null;
console.log({condition});
        const items = Todo.findAndCountAll({
            where: condition,
            offset: parseInt(perPage) * parseInt(page),
            limit: parseInt(perPage),
            order: [["id", "DESC"]],
        });

        return res.status(200).send({
            success: true,
            message: "success",
            data: items,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Have an error. Please contact to admin!",
        });
    }
};
