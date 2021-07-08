'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Kanban.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }
      }
    },
    due_date: {
      type : DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Kanban',
  });
  return Kanban;
};