<template>

  <ul>
        <table class="table">
          <thead>
            <tr>
              <th colspan="1">Fecha: </th>
              <th colspan="1"> Criptomoneda:</th>
              <th colspan="1"> Cantidad:</th>
              <th colspan="1"> Valor cripto:</th>
              <th colspan="1"> Retorno Anual:</th>
              <th colspan="1"> Periodo</th>
              <th colspan="1"> Tipo</th>
              <th colspan="1"> Retorno esperado</th>
              <th colspan="1"> Cantidad ganada</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="({ fecha, criptomoneda, cantidad, valorCripto, retornoAnual, periodo, tipo } , index) in earnEUR" :key="index">
              <td v-text="fecha" colspan="1"></td>
              <td v-text="criptomoneda" colspan="1"></td>
              <td v-text="cantidad" colspan="1"></td>
              <td v-text="valorCripto" colspan="1"></td>
              <td  colspan="1"> {{retornoAnual}}%</td>
              <td v-text="periodo" colspan="1"></td>
              <td v-text="tipo" colspan="1"></td>
              <td colspan="1"> {{ (retornoAnual*periodo)/360}} % </td>
              <td colspan="1"> {{ (((retornoAnual*periodo)/36000)*cantidad).toFixed(1)}}  </td>
            </tr>
          </tbody>
        </table>  
  </ul>
</template>


<script>
import {earnEUR} from '../../data/transactions'

export default {
  
  data() {
    
    return {
      earnEUR, // Array con las transacciones de Earn de Euro
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