var updateRelsIntegr = 'update relevo r ' +
' inner join visita v on r.idVisita = v.id' +
' set r.fechaHora = v.fechaInicio' +
' WHERE r.idPedido is not null' +
' and v.sucursal = 1;'


module.exports = {
    updateRelsIntegr
}