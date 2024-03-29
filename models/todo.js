"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    static getTodos() {
      return this.findAll();
    }

    static getOverdueTodos() {
      const formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };

      const dateToday = new Date();
      const today = formattedDate(dateToday);

      return this.findAll({
        where: {
          dueDate: {
            [Op.lt]: today,
          },
        },
      });
    }

    static getDueTodayTodos() {
      const formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };

      const dateToday = new Date();
      const today = formattedDate(dateToday);

      return this.findAll({
        where: {
          dueDate: {
            [Op.eq]: today,
          },
        },
      });
    }

    static getDueLaterTodos() {
      const formattedDate = (d) => {
        return d.toISOString().split("T")[0];
      };

      const dateToday = new Date();
      const today = formattedDate(dateToday);

      return this.findAll({
        where: {
          dueDate: {
            [Op.gt]: today,
          },
        },
      });
    }

    static getTodosCount() {
      return this.count();
    }

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};