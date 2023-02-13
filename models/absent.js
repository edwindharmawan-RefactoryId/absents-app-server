'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Absent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Absent.init({
    imageUrl: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'Photo is required.'
            }
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: {
                msg: 'User id is required.',
            },
            isNumeric: {
                msg: 'Id is not integer.',
            }
        }
    },
    userEmail: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                msg: 'User email is required.'
            }
        }
    }
  }, {
    sequelize,
    modelName: 'Absent',
  });
  return Absent;
};