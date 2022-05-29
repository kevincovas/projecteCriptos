<template>
  <!-- <h2>{{getBitcoin}}</h2> -->
  <h1 v-if="bitcoin">Bitcoin value:  {{ bitcoinAPI}} </h1>
 
  <ul>
        <table class="table">
          <thead>
            <tr>
              <th colspan="2">Fecha: </th>
              <th colspan="2"> Valor de compra:</th>
              <th colspan="2"> Cantidad comprada:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ fecha, valorCompra, cantidadCompra } , index) in bitcoin" :key="index">
              <td v-text="fecha" colspan="2"></td>
              <td v-text="valorCompra" colspan="2"></td>
              <td v-text="cantidadCompra" colspan="2"></td>
            </tr>
          </tbody>
          
        </table>  
  </ul>
  <ul>
    <table>
          <thead>
            <tr>
              <th colspan="2">Total:</th>
              <th colspan="2"> Valor compra ponderado: </th>
              <th colspan="2"> Catidad comprada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="2"></td>
              <td colspan="2"> </td>
              <td colspan="2"> {{ cantidadCompraBitcoin }} </td>
            </tr>
          </tbody>
        </table>
  </ul>

  <button
    class="btn btn-primary"
    v-on:click="changeBitcoinValue"
    >
    Obtener Valor Bitcoin
  </button>
</template>


<script>
//Importamos las funciones de getCoinGecko
import { pingCall, bitcoinCall } from '../helpers/getCoinGecko'
import {bitcoin} from '../data/transactions'
import {calcularPorcentaje, calcularcantidadCompraBitcoin, ponderarCompras} from '../helpers/calculosCriptomonedas'

//console.log("En script")


export default {
  
  data() {
    //console.log("En data")
    return {
      bitcoinAPI: null,
      bitcoin,
      fecha: null,
      hora: null,
      cantidadCompraBitcoin: null,
      ponderadoBitcoin: null
    }
  },
  methods: {
    changeBitcoinValue(){
      console.log("changeBitcoinValue llamada")
      this.getBitcoin
      console.log("test")
      this.getHour
    },
    // calcularPorcentaje(){
    //   console.log("Porcentaje")
    // },
    // calcularcantidadCompraBitcoin(){
    //   console.log(this.bitcoin.length)
    //   for(let i = 0; i < this.bitcoin.length; i++){
    //     this.cantidadCompraBitcoin = this.cantidadCompraBitcoin + this.bitcoin[i].cantidadCompra
    //   }
    //   return this.cantidadCompraBitcoin 
    // },
    // ponderarCompras(nombreCriptomoneda){
    //   let criptomonedaPonderada = 0
      
    //   console.log("Registros cripto: ", nombreCriptomoneda.length)
    //   for(let i = 0; i < nombreCriptomoneda.length; i++){
    //     criptomonedaPonderada =   criptomonedaPonderada + nombreCriptomoneda[i].cantidadCompra * nombreCriptomoneda[i].valorCompra
    //   }

    //   return this.ponderadoBitcoin = criptomonedaPonderada/this.cantidadCompraBitcoin
    // }
  },
  mounted() {
    //console.log("En mounted")
    console.log("Cantidad comprada de Bitcoin: ", calcularcantidadCompraBitcoin())
    console.log("Bitcoin ponderado: ", ponderarCompras(this.bitcoin))
    
  },
  computed: {
    async getBitcoin(){
      console.log("getBitcoin llamada")
      const { market_data} =  await bitcoinCall()
      
      console.log(market_data.current_price.eur)
      return this.bitcoinAPI = market_data.current_price.eur
    },
    getHour(){
        console.log("getHour called")
        let hoy = new Date();
        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        
    }
  }
}
</script>

<style>

</style>