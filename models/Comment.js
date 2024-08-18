const { DataTypes } = require('sequelize');
const client = require('../config/connection');


const Comment = client.define('Comment',
    {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW
        }
    }

)

module.exports = Comment