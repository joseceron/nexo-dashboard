const updateSentence = (dis) => {

    sucursal = 0

    if(dis === 'lavisa'){
        sucursal = 1
    }else if(dis === 'kanazawa'){
        sucursal = 3
    }else if(dis === 'sercorisac'){
        sucursal = 4
    }else if(dis === 'vertical'){
        sucursal = 5
    }else if(dis === 'solar'){
        sucursal = 6
    }else if(dis === 'digepul'){
        sucursal = 7
    }else if(dis === 'selvapits'){
        sucursal = 8
    }else if(dis === 'sanisidro'){
        sucursal = 9
    }
    
    return  'update relevo r ' +
    ' inner join visita v on r.idVisita = v.id' +
    ' set r.fechaHora = v.fechaInicio' +
    ' WHERE r.idPedido is not null' +
    ' and r.codActividad = 3' +
    ' and v.sucursal = ' + sucursal +';'

}


var updateRelsIntegr = 'update relevo r ' +
' inner join visita v on r.idVisita = v.id' +
' set r.fechaHora = v.fechaInicio' +
' WHERE r.idPedido is not null' +
' and r.codActividad = 3;'


module.exports = {
    updateRelsIntegr,
    updateSentence
}