const express = require('express')
const Relevo = require('./src/models/relevo.js')
const Visita = require('./src/models/visita.js')
const relevo_integrador = require('./src/models/relevo_integrador.js')
const visita_integrador = require('./src/models/visita_integrador.js')
const constantes = require('./src/utilities/constantes.js')

const chalk = require('chalk')
var Sequelize = require('sequelize');
var sequelize_integrador = require('./src/db/sequelize_integrador.js');
var sequelize_lavisa = require('./src/db/sequelize_lavisa');
const Op = Sequelize.Op

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())




let asoLavisa = 0


app.get('/desfasefechas', async (req, res) => {
    const id_distribuidora = req.query.id

    try {
        if (asoLavisa === 0) {
            Relevo.belongsTo(Visita, { as: 'v' })
            asoLavisa = 1
        }

        const relevos = await Relevo.count({
            where: {
                codActividad: 3,
                idPedido: { [Op.notLike]: '' },
                fechaHora: { [Op.ne]: Sequelize.col("v.fechaInicio") },

            },
            include: [{
                model: Visita,
                as: 'v',
                on: {
                    col1: Sequelize.where(Sequelize.col("r.idVisita"), "=", Sequelize.col("v.id"))
                },
                // attributes: ['fechaInicio'],
                where: {
                }
            }],
            // attributes: ['id', 'fechaHora']
        })

        let dataRelevosJson = JSON.stringify(relevos)
        console.log(chalk.green.inverse(dataRelevosJson))

        res.status(200).send(dataRelevosJson)
    } catch (e) {
        console.log(chalk.red.inverse(e))
        res.status(400).send(e)
    }
})

app.post('/updaterelevos', async (req, res) => {

    try {
        const relevos_integr_obj = await sequelize_integrador.query(constantes.updateRelsIntegr, { type: Sequelize.QueryTypes.UPDATE })
        const relevos_lavisa_obj = await sequelize_lavisa.query(constantes.updateRelsIntegr, { type: Sequelize.QueryTypes.UPDATE })

        const rta = {
            integrador: relevos_integr_obj[1],
            distribuidora: relevos_lavisa_obj[1]
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




