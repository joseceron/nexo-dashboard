const sequelize_integrador = require('../db/sequelize_integrador')
var Sequelize = require('sequelize');


var Relevo = sequelize_integrador.define('r',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fechaHora: {
        type: Sequelize.DATE
    },   

},{
  tableName: 'relevo',
  
},

)

module.exports = Relevo