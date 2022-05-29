

export const calcularPorcentaje = (criptomoneda,cantidadCompra)=>{
    
    let porcentajeCriptomoneda = []
    for(let i = 0; i < criptomoneda.length; i++){
      porcentajeCriptomoneda[i] =  ((criptomoneda[i].cantidadCompra/cantidadCompra)*100).toFixed(0)
    }
    return porcentajeCriptomoneda
  }

export const calcularcantidadCompra = (criptomoneda)=>{
    
    let cantidadCompraCriptomoneda = 0
    for(let i = 0; i < criptomoneda.length; i++){
      cantidadCompraCriptomoneda = cantidadCompraCriptomoneda + criptomoneda[i].cantidadCompra
    }
    return cantidadCompraCriptomoneda 
}

export const ponderarCompras = (nombreCriptomoneda,cantidadCompraCriptomoneda)=>{
    
    let criptomonedaPonderada = 0
    for(let i = 0; i < nombreCriptomoneda.length; i++){
      criptomonedaPonderada =   criptomonedaPonderada + nombreCriptomoneda[i].cantidadCompra * nombreCriptomoneda[i].valorCompra
    }
    return (criptomonedaPonderada/cantidadCompraCriptomoneda).toFixed(0)
}

export const calcularCantidadActual = (nombreCriptomoneda,valorActual) => {
  
  let valoractual = 0
  let totalActual = 0
  let array = []

  for(let i=0; i < nombreCriptomoneda.length; i++){
    
    valoractual = (valorActual/nombreCriptomoneda [i].valorCompra) * nombreCriptomoneda[i].cantidadCompra
    totalActual = totalActual + valoractual
    valoractual = valoractual.toFixed(0)
    array.push({cantidadActual: Number(valoractual)})
  }
  return {array , totalActual}
}