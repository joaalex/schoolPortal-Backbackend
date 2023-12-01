'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      transaction_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false
      },
      student_id: {
        type: Sequelize.UUID,
        references:{
          model: 'Students',
          key: 'student_id'
        }
      },
      request_id: {
        type: Sequelize.UUID,
        references:{
          model: 'Requests',
          key: 'request_id'
        }
      },
      payment_id: {
        type: Sequelize.UUID,
        references :{
          model: 'Payments',
          key: 'payment_id'
        }
      },
      amount:{
        type: Sequelize.DOUBLE(10,2),
        allowNull: false
      },
      comments:{
        type: Sequelize.TEXT,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};