'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      student_id:{
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      othernames: {
        type: Sequelize.STRING,
        allowNull: false
      },
      matric_no:{
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      gender: {
        type: Sequelize.ENUM("male", "famale"),
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      image_url:{
        type: Sequelize.STRING,
        allowNull: false
      },
      phone:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      dob:{
        type: Sequelize.DATE,
        allowNull: false
      },
      faculty:{
        type: Sequelize.STRING,
        allowNull: false
      },
      department:{
        type: Sequelize.STRING,
        allowNull: false
      },
      school:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password_hash:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password_salt:{
        type: Sequelize.STRING,
        allowNull: false
      },
      state_of_origin:{
        type: Sequelize.STRING,
        allowNull: true
      },
      address_no:{
        type: Sequelize.STRING,
        allowNull: true
      },
      address_street:{
        type: Sequelize.STRING,
        allowNull: true
      },
      address_lga:{
        type: Sequelize.STRING,
        allowNull: true
      },
      state:{
        type: Sequelize.STRING,
        allowNull: true
      },
      gaudian_or_parent_surname:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gaudian_or_parent_othernames:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gaudian_or_parent_address_no:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gaudian_or_parent_address_street:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gaudian_or_parent_lga:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      gaudian_or_parent_phone:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_otp_verified:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};