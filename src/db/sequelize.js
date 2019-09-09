var Sequelize = require('sequelize');


const distribuidora = (dis) => {

    bd = ''

    if(dis === 'lavisa'){
        bd = 'suite_1192_134'
    }else if(dis === 'kanazawa'){
        bd = 'suite_1194_137'
    }else if(dis === 'sercorisac'){
        bd = 'suite_1219_159'
    }else if(dis === 'vertical'){
        bd = 'suite_1188_128'
    }else if(dis === 'solar'){
        bd = 'suite_1214_144'
    }else if(dis === 'digepul'){
        bd = 'suite_1191_132'
    }else if(dis === 'selvapits'){
        bd = 'suite_1190_131'
    }else if(dis === 'sanisidro'){
        bd = 'suite_1213_138'
    }else if(dis === 'integrador'){
        bd = 'suite_1142_104'
    }

    
    return new Sequelize(bd, 'seratic', 'cl4v3d353r4t1c',{
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
    

}

module.exports = {    
    distribuidora,
}







