const sequelize = require('../db/sequelize.js')
var Sequelize = require('sequelize');


var Visita = sequelize.distribuidora('sanisidro').define('visita', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fechaInicio: {
    type: Sequelize.DATE
  },

}, {
  tableName: 'visita',
})

module.exports = Visita
