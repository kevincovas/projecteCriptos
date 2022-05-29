<template>

  <ul>
        <table class="table">
          <thead>
            <tr>
              <th colspan="1">Fecha: </th>
              <th colspan="1"> Valor de compra:</th>
              <th colspan="1"> Cantidad comprada:</th>
              <th colspan="1">  % Cantidad comprada:</th>
              <th v-if="cantidadActual.length > 2" > Cantidad actual:</th>
              <th v-if="cantidadActual.length > 2" > % Beneficio:</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ fecha, valorCompra, cantidadCompra } , index) in bitcoin" :key="index">
              <td v-text="fecha" colspan="1"></td>
              <td v-text="valorCompra" colspan="1"></td>
              <td v-text="cantidadCompra" colspan="1"></td>
              <td colspan="1"> {{porcentajeCompraCriptomoneda[index] }} % </td>
              <td  v-if="cantidadActual.length > 0" colspan="1"> {{ cantidadActual[index].cantidadActual }}  </td>
              <td  v-if="cantidadActual.length > 0" colspan="1"> {{ (((cantidadActual[index].cantidadActual/cantidadCompra)-1)*100).toFixed(1) }}%  </td>
            </tr>
            <tr>
              <td colspan="0"> <b>TOTAL BITCOIN </b> </td>
              <td colspan="1"> <b>{{ ponderadoBitcoin }}€ </b></td>
              <td colspan="1"><b>{{ cantidadCompraBitcoin }}€ </b></td>
              <td colspan="1"> <b>100% </b></td>
              <td v-if="cantidadActual.length > 0" colspan="1"> <b>{{ cantidadActualBitcoin }}€ </b> </td>
              <td v-if="cantidadActual.length > 0" colspan="1"> <b> {{ (((cantidadActualBitcoin/cantidadCompraBitcoin)-1)*100).toFixed(1) }}% </b> </td>
            </tr>
          </tbody>
        </table>  
  </ul>
  <ul>
    <table class="table">
      <tr>
        <td colspan="1"> Fecha:</td>
        <td colspan="1"><input v-model="fechaCompra" placeholder="fecha"></td>
        <td colspan="1"><input v-model="valorCompra" placeholder="valor de compra"></td>
        <td colspan="1"><input v-model="cantidadComprada" placeholder="Cantidad comprada"></td>
        <td colspan="1"><button v-on:click="addBitcoinPurchase"> Introducir compra </button> </td>
      </tr>
    </table>
  </ul>
  
  <img 
    src="https://assets.coingecko.com/coins/images/1/small/bitcoin.png?1547033579"
    v-on:click="getBitcoinValue"
  > 
  
  <h2 v-if="bitcoinAPI">Bitcoin Value:  {{ bitcoinAPI}} € </h2>
  <h2 v-if="bitcoinAth">Bitcoin Ath:  {{ bitcoinAth}} € </h2>
  <h2 v-if="errors.length">Error: {{ this.errors[0] }} </h2>
</template>


<script>
//Importamos las funciones de getCoinGecko
import * as moment from 'moment';
import { pingCall, bitcoinCall } from '../CoinGecko.vue'
import {bitcoin} from '../../data/transactions'
import {calcularPorcentaje, calcularcantidadCompra, ponderarCompras, calcularCantidadActual} from '../../helpers/calculosCriptomonedas'


export default {
  
  data() {
    
    return {
      bitcoinAPI: null, //Valor de Bitcoin al llamar a la API
      bitcoinAPIOLD: null, //Valor de Bitcoin de la última llamada a la API
      bitcoinAth: null, //Valor Ath Bitcoin al llamar a la API
      bitcoin, // Array con las transacciones de compra de Bitcoin
      // fecha: null,
      // hora: null,

      //Datos calculados con los datos de las transacciones
      cantidadCompraBitcoin: null, //Cantidad total comprada de Bitcoin calculada por calcularcantidadCompra
      cantidadActualBitcoin: null, //Cantidad actual de Bitcoin calculada por calcularcantidadActual
      ponderadoBitcoin: null, //Cantidad de compra ponderada calculada por ponderarCompras

      //Datos calculados al obtener el valor de la API
      cantidadActual: [], //Array donde guardaremos la cantidad actual de cada transacción
      porcentajeCompraCriptomoneda: [],
      
      //Datos de insertar nueva compra
      fechaCompra: null,
      valorCompra: null,
      cantidadComprada: null,

      errors: []

    }
  },
  methods: {
    async getBitcoinValue(){
      
      console.log("Bitcoin API: ", this.bitcoinAPI)
      
  
      if(this.bitcoinAPI === null){ //Si quremos obtener el valor por primera vez
        
        
        //Llamamos a la API
        const { market_data} =  await bitcoinCall()
        this.bitcoinAth = market_data.ath.eur
        this.bitcoinAPI = market_data.current_price.eur

        //Calculamos la cantidad actual tras obtener el precio actual
        const {array, totalActual} = calcularCantidadActual(this.bitcoin,this.bitcoinAPI)
        this.cantidadActual = array
        this.cantidadActualBitcoin = totalActual.toFixed(0)
        
        this.bitcoinAPIOLD = this.bitcoinAPI;
        console.log("Bitcoin API OLD: ", this.bitcoinAPIOLD)

      } else{
        
        //Llamamos a la API
        const { market_data} =  await bitcoinCall()
        this.bitcoinAth = market_data.ath.eur
        this.bitcoinAPI = market_data.current_price.eur

        if(this.bitcoinAPI !== this.bitcoinAPIOLD){
          this.cantidadActual = []
          
          //Calculamos la cantidad actual tras obtener el precio actual
          const {array, totalActual} = calcularCantidadActual(this.bitcoin,this.bitcoinAPI)
          this.cantidadActual = array
          this.cantidadActualBitcoin = totalActual.toFixed(0)

          this.bitcoinAPIOLD = this.bitcoinAPI;
          console.log("Bitcoin API OLD: ", this.bitcoinAPIOLD)
        }
      }
    },
    addBitcoinPurchase(){

      //Comprobamos los datos introducidos
        let error = this.checkInputs()

        if(error === false ){
          console.log("No hay errores")
          let nuevaCompra = {
            fecha: this.fechaCompra,
            valorCompra: Number(this.valorCompra),
            cantidadCompra: Number(this.cantidadComprada)
          }

          if(this.bitcoinAPI == null){
            this.bitcoin.push(nuevaCompra)


          }else{
            this.bitcoin.push(nuevaCompra) //Añademos el registro de nueva compra
            //this.cantidadActual = []

            //Calculamos la cantidad actual tras obtener el precio actual
            const {array, totalActual} = calcularCantidadActual(this.bitcoin,this.bitcoinAPI)
            this.cantidadActual = array
            this.cantidadActualBitcoin = totalActual.toFixed(0)

            
          }
          //Reseteamos los valores de los inputs
          this.fechaCompra = null
          this.valorCompra = null
          this.cantidadComprada = null

          //Recalculamos los valores totales tras añadir una compra
          this.cantidadCompraBitcoin = calcularcantidadCompra(this.bitcoin)
          this.ponderadoBitcoin = ponderarCompras(this.bitcoin,this.cantidadCompraBitcoin)
          this.porcentajeCompraCriptomoneda = calcularPorcentaje(this.bitcoin,this.cantidadCompraBitcoin)
      }
     
      

    },
    checkInputs(){

      let error = false
      this.errors = []
      
      
      if(!this.fechaCompra){
        error = true
        this.errors.push('La fecha es obligatoria!!')
      }
      else if(moment(this.fechaCompra,'DD/MM/YY',false).isValid() == false){
        error = true
        this.errors.push('El formato de la fecha es incorrecto!!')
      }
      else if(!this.valorCompra){
        error = true
        this.errors.push('El valor de compra es obligatorio!!')
      }
      else if(isNaN(this.valorCompra)){
        error = true
        this.errors.push('El valor de compra es incorrecto!!')
      }
      else if(!this.cantidadComprada){
        error = true
        this.errors.push('La cantidad de compra es obligatoria!!')
      }
      else if(isNaN(this.cantidadComprada)){
        error = true
        this.errors.push('La cantidad de compra es incorrecta!!')
      }
      
      return error
    },
  },
  mounted() {
    //Calculamos los valores totales 
    this.cantidadCompraBitcoin = calcularcantidadCompra(bitcoin)
    this.ponderadoBitcoin = ponderarCompras(bitcoin,this.cantidadCompraBitcoin)
    this.porcentajeCompraCriptomoneda = calcularPorcentaje(bitcoin,this.cantidadCompraBitcoin)
    
  },
  computed: {
    getHour(){
        let hoy = new Date();
        this.fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
        this.hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        
    }
  }
}
</script>

<style>

</style>