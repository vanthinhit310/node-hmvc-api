const db = require("../../../config/baseModel");
const Todo = db.todos;
const Op = db.Sequelize.Op;
const helpers = require("../../../helpers");

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

exports.getList = async (req, res) => {
    try {
        const { search, page, perPage } = req.query;
        const { limit, offset } = helpers.getPagination(page, perPage);
        console.log({ limit, offset });
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

        const items = await Todo.findAndCountAll({
            where: condition,
            offset: parseInt(limit) * parseInt(offset),
            limit: parseInt(limit),
            order: [["id", "DESC"]],
        });
        console.log({ items });
        return res.status(200).send({
            success: true,
            message: "success",
            data: helpers.getPagingData(items, offset, limit),
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Have an error. Please contact to admin!",
        });
    }
};
