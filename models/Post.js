const { DataTypes } = require('sequelize');
const client = require('../config/connection');

const Post = client.define('post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT, // Use TEXT if content can be longer
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE, // Use DATE to store a timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
});


module.exports = Post