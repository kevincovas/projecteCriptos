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
            <tr v-for="({ fecha, valorCompra, cantidadCompra } , index) in ethereum" :key="index">
              <td v-text="fecha" colspan="1"></td>
              <td v-text="valorCompra" colspan="1"></td>
              <td v-text="cantidadCompra" colspan="1"></td>
              <td colspan="1"> {{porcentajeCompraCriptomoneda[index] }} % </td>
              <td  v-if="cantidadActual.length > 0" colspan="1"> {{ cantidadActual[index].cantidadActual }}  </td>
              <td  v-if="cantidadActual.length > 0" colspan="1"> {{ (((cantidadActual[index].cantidadActual/cantidadCompra)-1)*100).toFixed(1) }}%  </td>
            </tr>
            <tr>
              <td colspan="1"> <b>TOTAL ETHEREUM </b> </td>
              <td colspan="1"> <b>{{ ponderadoEthereum }}€ </b></td>
              <td colspan="1"><b>{{ cantidadCompraEthereum }}€ </b></td>
              <td colspan="1"> <b>100% </b></td>
              <td v-if="cantidadActual.length > 0" colspan="1"> <b>{{ cantidadActualEthereum }}€ </b> </td>
              <td v-if="cantidadActual.length > 0" colspan="1"> <b> {{ (((cantidadActualEthereum/cantidadCompraEthereum)-1)*100).toFixed(1) }}% </b> </td>
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
        <td colspan="1"><button v-on:click="addEthereumPurchase"> Introducir compra </button> </td>
      </tr>
    </table>
  </ul>

  <img 
    src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
    v-on:click="getEthereumValue"
  > 
  
  <h2 v-if="ethereumAPI">Ethereum Value:  {{ ethereumAPI}} € </h2>
  <h2 v-if="ethereumAth">Ethereum Ath:  {{ ethereumAth}} € </h2>
  <h2 v-if="errors.length">Error: {{ this.errors[0] }} </h2>
</template>


<script>
//Importamos las funciones de getCoinGecko
import * as moment from 'moment';
import { pingCall, ethereumCall } from '../../helpers/getCoinGecko'
import {ethereum} from '../../data/transactions'
import {calcularPorcentaje, calcularcantidadCompra, ponderarCompras, calcularCantidadActual} from '../../helpers/calculosCriptomonedas'


export default {
  
  data() {
    
    return {
      ethereumAPI: null,
      ethereumAPIOLD: null,
      ethereumAth: null,
      ethereum,

      //Datos calculados con los datos de las transacciones
      cantidadCompraEthereum: null,
      cantidadActualEthereum: null,
      ponderadoEthereum: null,
      
      //Datos calculados al obtener el valor de la API
      cantidadActual: [],
      porcentajeCompraCriptomoneda: [],

      //Datos de insertar nueva compra
      fechaCompra: null,
      valorCompra: null,
      cantidadComprada: null,

      errors: []
    }
  },
  methods: {
    async getEthereumValue(){
      
      console.log("Ethereum API: ", this.ethereumAPI)
      
  
      if(this.ethereumAPI === null){ //Si quremos obtener el valor por primera vez
        
        
        //Llamamos a la API
        const { market_data} =  await ethereumCall()
        this.ethereumAth = market_data.ath.eur
        this.ethereumAPI = market_data.current_price.eur

        //Calculamos la cantidad actual tras obtener el precio actual
        const {array, totalActual} = calcularCantidadActual(this.ethereum,this.ethereumAPI)
        this.cantidadActual = array
        this.cantidadActualEthereum = totalActual.toFixed(0)
        
        this.ethereumAPIOLD = this.ethereumAPI;
        console.log("Ethereum API OLD: ", this.ethereumAPIOLD)

      } else{
        
        //Llamamos a la API
        const { market_data} =  await ethereumCall()
        this.ethereumAth = market_data.ath.eur
        this.ethereumAPI = market_data.current_price.eur

        if(this.ethereumAPI !== this.ethereumAPIOLD){
          this.cantidadActual = []
          
          //Calculamos la cantidad actual tras obtener el precio actual
          const {array, totalActual} = calcularCantidadActual(this.ethereum,this.ethereumAPI)
          this.cantidadActual = array
          this.cantidadActualEthereum = totalActual.toFixed(0)

          this.ethereumAPIOLD = this.ethereumAPI;
          console.log("Ethereum API OLD: ", this.ethereumAPIOLD)
        }
      }
    },
    addEthereumPurchase(){

      //Comprobamos los datos introducidos
        let error = this.checkInputs()

        if(error === false ){
          console.log("No hay errores")
          let nuevaCompra = {
            fecha: this.fechaCompra,
            valorCompra: Number(this.valorCompra),
            cantidadCompra: Number(this.cantidadComprada)
          }

          if(this.ethereumAPI == null){
            this.ethereum.push(nuevaCompra)

          }else{
            this.ethereum.push(nuevaCompra) //Añademos el registro de nueva compra
            //this.cantidadActual = []

            //Calculamos la cantidad actual tras obtener el precio actual
            const {array, totalActual} = calcularCantidadActual(this.ethereum,this.ethereumAPI)
            this.cantidadActual = array
            this.cantidadActualEthereum = totalActual.toFixed(0)

            
          }
          //Reseteamos los valores de los inputs
          this.fechaCompra = null
          this.valorCompra = null
          this.cantidadComprada = null

          //Recalculamos los valores totales tras añadir una compra
          this.cantidadCompraEthereum = calcularcantidadCompra(this.ethereum)
          this.ponderadoEthereum = ponderarCompras(this.ethereum,this.cantidadCompraEthereum)
          this.porcentajeCompraCriptomoneda = calcularPorcentaje(this.ethereum,this.cantidadCompraEthereum)
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
    this.cantidadCompraEthereum = calcularcantidadCompra(ethereum)
    this.ponderadoEthereum = ponderarCompras(ethereum,this.cantidadCompraEthereum)
    this.porcentajeCompraCriptomoneda = calcularPorcentaje(ethereum,this.cantidadCompraEthereum)
    
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