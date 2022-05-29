<template>
<h1>Bitcoin Earn:</h1>
  <ul>
        <table class="table">
          <thead>
            <tr>
              <th colspan="1">Fecha: </th>
              <!-- <th colspan="1"> Criptomoneda:</th> -->
              <th colspan="1"> Cantidad(Cripto):</th>
              <th colspan="1"> Valor cripto:</th>
              <th colspan="1"> Cantidad(Euro):</th>
              <th colspan="1"> Retorno Anual:</th>
              <th colspan="1"> Periodo</th>
              <th colspan="1"> Tipo</th>
              <th colspan="1"> Retorno esperado</th>
              <th colspan="1"> Cantidad ganada(Cripto)</th>
              <th colspan="1"> Cantidad ganada(Euro)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ fecha, cantidadCripto, valorCripto, cantidadEuro, retornoAnual, periodo, tipo } , index) in earnBTC" :key="index">
              <td v-text="fecha" colspan="1"></td>
              <!-- <td v-text="criptomoneda" colspan="1"></td> -->
              <td v-text="cantidadCripto" colspan="1"></td>
              <td v-text="valorCripto" colspan="1"></td>
              <td v-text="cantidadEuro" colspan="1"></td>
              <td  colspan="1"> {{retornoAnual}}%</td>
              <td  colspan="1"> {{periodo}} días</td>
              <td v-text="tipo" colspan="1"></td>
              <td colspan="1"> {{ (retornoAnual*periodo)/360}} % </td>
              <td colspan="1"> {{ (((retornoAnual*periodo)/36000)*cantidadCripto).toFixed(8)}}  </td>
              <td colspan="1"> {{ (((retornoAnual*periodo)/36000)*cantidadEuro).toFixed(8)}}  </td>
            </tr>
          </tbody>
        </table>  
  </ul>
</template>


<script>
import {earnBTC} from '../../data/transactions'

export default {
  
  data() {
    
    return {
      earnBTC, // Array con las transacciones de Earn de Euro
    }
  },
  methods: {
    

  },
  computed: {
    
  }
}
</script>

<style>

</style>