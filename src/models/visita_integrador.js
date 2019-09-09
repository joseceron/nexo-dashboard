const sequelize = require('../db/sequelize_integrador')
var Sequelize = require('sequelize');


var Visita = sequelize.define('visita',{
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