const sequelize = require('../db/sequelize.js')
var Sequelize = require('sequelize');

var Relevo = sequelize.distribuidora('solar').define('r', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechaHora: {
        type: Sequelize.DATE
    },

}, {
    tableName: 'relevo',

})


module.exports =
    Relevo


