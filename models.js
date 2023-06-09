const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING, unique: true},
    key_API: {type: DataTypes.STRING},
    paidUpTo: {type: DataTypes.DATE},
})

module.exports = User;
