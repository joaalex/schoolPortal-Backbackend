'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Refrence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Refrence.init({
    refrence_id: DataTypes.UUID,
    student_id: DataTypes.UUID,
    refrence: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Refrence',
  });
  return Refrence;
};