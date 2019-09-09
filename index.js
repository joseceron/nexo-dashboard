const express = require('express')
const Relevo = require('./src/models/relevo.js')
const Visita = require('./src/models/visita.js')

const relevo_integrador = require('./src/models/relevo_integrador.js')
const visita_integrador = require('./src/models/visita_integrador.js')

const relevo_kanazawa = require('./src/models/relevo_kanazawa.js')
const visita_kanazawa = require('./src/models/visita_kanazawa.js')

const relevo_sercorisac = require('./src/models/relevo_sercorisac.js')
const visita_sercorisac  = require('./src/models/visita_sercorisac.js')

const relevo_vertical = require('./src/models/relevo_vertical.js')
const visita_vertical = require('./src/models/visita_vertical.js')

const relevo_solar = require('./src/models/relevo_solar.js')
const visita_solar = require('./src/models/visita_solar')

const relevo_digepul = require('./src/models/relevo_digepul.js')
const visita_digepul = require('./src/models/visita_digepul.js')

const relevo_selvapits = require('./src/models/relevo_selvapits.js')
const visita_selvapits = require('./src/models/visita_selvapits.js')

const relevo_sanisidro = require('./src/models/relevo_sanisidro.js')
const visita_sanisidro = require('./src/models/visita_sanisidro.js')

const constantes = require('./src/utilities/constantes.js')

const chalk = require('chalk')
var Sequelize = require('sequelize');

var sequelize = require('./src/db/sequelize');
const Op = Sequelize.Op

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let asoLavisa = 0

app.get('/desfasefechas', async (req, res) => {
    
    try {
        if (asoLavisa === 0) {
            Relevo.belongsTo(Visita, { as: 'v' })
            relevo_sercorisac.belongsTo(visita_sercorisac, {as: 'v'})
            relevo_kanazawa.belongsTo(visita_kanazawa, {as: 'v'})
            relevo_vertical.belongsTo(visita_vertical, {as: 'v'})
            relevo_solar.belongsTo(visita_solar,{as: 'v'})
            relevo_digepul.belongsTo(visita_digepul, {as: 'v'})
            relevo_selvapits.belongsTo(visita_selvapits, {as: 'v'})
            relevo_sanisidro.belongsTo(visita_sanisidro, {as: 'v'})
            relevo_integrador.belongsTo(visita_integrador, {as: 'v'})
            asoLavisa = 1
        }

        where = {
            codActividad: 3,
            idPedido: { [Op.notLike]: '' },
            fechaHora: { [Op.ne]: Sequelize.col("v.fechaInicio") },

        }
        include = [{
            model: Visita,
            as: 'v',
            on: {
                col1: Sequelize.where(Sequelize.col("r.idVisita"), "=", Sequelize.col("v.id"))
            },
            // attributes: ['fechaInicio'],
            where: {
            }
        }]

        const lavisa = await Relevo.count({ where, include })
        const kanazawa = await relevo_kanazawa.count({ where, include })
        const sercorisac = await relevo_sercorisac.count({ where, include })
        const vertical = await relevo_vertical.count({ where, include })
        const solar = await relevo_solar.count({where, include})
        const digepul = await relevo_digepul.count({where, include})
        const selvapits = await relevo_selvapits.count({where, include})
        const sanisidro = await relevo_sanisidro.count({where, include})
        const integrador = await relevo_integrador.count({where, include})

        const rta = {
            lavisa,
            kanazawa,
            sercorisac,
            vertical,
            solar,
            digepul,
            selvapits,
            sanisidro,
            integrador,
            
        }
        console.log(rta)
        res.status(200).send(rta)
    } catch (e) {
        console.log(chalk.red.inverse(e))
        res.status(400).send(e)
    }
})

app.post('/updaterelevos', async (req, res) => {

    try {
        const relevos_integr_obj = await sequelize.distribuidora('integrador').query(constantes.updateRelsIntegr, { type: Sequelize.QueryTypes.UPDATE })
        const relevos_lavisa_obj = await sequelize.distribuidora('lavisa').query(constantes.updateSentence('lavisa'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_kanazawa_obj = await sequelize.distribuidora('kanazawa').query(constantes.updateSentence('kanazawa'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_sercorisac_obj = await sequelize.distribuidora('sercorisac').query(constantes.updateSentence('sercorisac'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_vertical_obj = await sequelize.distribuidora('vertical').query(constantes.updateSentence('vertical'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_solar_obj = await sequelize.distribuidora('solar').query(constantes.updateSentence('solar'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_digepul_obj = await sequelize.distribuidora('digepul').query(constantes.updateSentence('digepul'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_selvapits_obj = await sequelize.distribuidora('selvapits').query(constantes.updateSentence('selvapits'), { type: Sequelize.QueryTypes.UPDATE })
        const relevos_sanisidro_obj = await sequelize.distribuidora('sanisidro').query(constantes.updateSentence('sanisidro'), { type: Sequelize.QueryTypes.UPDATE })
        const rta = {
            integrador: relevos_integr_obj[1],
            lavisa: relevos_lavisa_obj[1],
            kanazawa: relevos_kanazawa_obj[1],
            sercorisac: relevos_sercorisac_obj[1],
            vertical: relevos_vertical_obj[1],
            solar: relevos_solar_obj[1],
            digepul: relevos_digepul_obj[1],
            selvapits: relevos_selvapits_obj[1],
            sanisidro: relevos_sanisidro_obj[1]
        }
        res.status(200).send(rta)
    } catch (e) {
        console.log(chalk.red.inverse(e))
        res.status(400).send(e)
    }

})



app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})




