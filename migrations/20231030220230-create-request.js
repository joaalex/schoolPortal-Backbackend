'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      student_id: {
        type: Sequelize.UUID,
        references:{
          model: 'Students',
          key: 'student_id'
        }
      },
      email : {
        type: Sequelize.STRING,
        allowNull: false,
      },
      matric_no:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      price:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      request_status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed'),
        defaultValue:  null
      },
      request_type: {
        type: Sequelize.ENUM('transcript', 'transfer', 'clearance' ),
        defaultValue: null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Requests');
  }
};