'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Student.init({
    student_id: DataTypes.STRING,
    surname: DataTypes.STRING,
    othernames: DataTypes.STRING,
    matric_no: DataTypes.STRING,
    gender: DataTypes.ENUM("male", "famale"),
    email: DataTypes.STRING,
    image_url: DataTypes.STRING,
    phone: DataTypes.STRING,
    dob: DataTypes.DATE,
    faculty: DataTypes.STRING,
    department: DataTypes.STRING,
    school: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_salt: DataTypes.STRING,
    state_of_origin: DataTypes.STRING,
    address_no: DataTypes.STRING,
    address_street: DataTypes.STRING,
    address_lga: DataTypes.STRING,
    state: DataTypes.STRING,
    gaudian_or_parent_othernames: DataTypes.STRING,
    gaudian_or_parent_address_no: DataTypes.STRING,
    gaudian_or_parent_address_street: DataTypes.STRING,
    gaudian_or_parent_lga: DataTypes.STRING,
    gaudian_or_parent_phone: DataTypes.STRING,
    is_otp_verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};