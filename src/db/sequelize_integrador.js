var Sequelize = require('sequelize');

var sequelizeIntegrador = new Sequelize('suite_1142_104', 'seratic', 'cl4v3d353r4t1c',{
    host: 'seraticsuite.cjmcnfeqjnfn.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
    define: {
        timestamps: false
    },
    timezone: "America/Bogota"
});



module.exports = sequelizeIntegrador
   


