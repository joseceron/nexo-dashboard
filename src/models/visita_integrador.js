const sequelize = require('../db/sequelize')
var Sequelize = require('sequelize');


var Visita = sequelize.distribuidora('integrador').define('visita',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechaInicio: {
        type: Sequelize.DATE
    },   

},{
  tableName: 'visita',
  
  
},

  )

module.exports = Visita