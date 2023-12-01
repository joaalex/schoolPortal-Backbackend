'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Request.init({
    request_id: DataTypes.UUID,
    student_id: DataTypes.UUID,
    email: DataTypes.STRING,
    matric_no: DataTypes.STRING,
    price: DataTypes.STRING,
    request_status: DataTypes.ENUM('pending', 'processing', 'completed'),
    request_type: DataTypes.ENUM('transcript', 'transfer', 'clearance' )
  }, {
    sequelize,
    modelName: 'Request',
  });
  return Request;
};