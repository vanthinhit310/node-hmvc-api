const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Todo extends Model {}

    Todo.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            deadline: {
                type: DataTypes.DATEONLY,
                defaultValue: DataTypes.NOW,
            },
            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        { sequelize, modelName: "Todo" }
    );

    return Todo
};
