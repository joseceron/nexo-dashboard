const sequelize_lavisa = require('../db/sequelize_lavisa.js')
var Sequelize = require('sequelize');
const visita = require('./visita.js')

var Relevo = sequelize_lavisa.define('r',{
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