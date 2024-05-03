<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";


let mesAtual = ref("");
let diaAtual = ref("");
const clientesInativos = ref([]);

const obterDataHora = async () => {
  try {
    const resposta = await axios.get("https://worldtimeapi.org/api/ip");
    const dataHora = new Date(resposta.data.datetime);
    const mes = dataHora.toLocaleString("default", { month: "long" });
    const dia = dataHora.getDate();
    mesAtual.value = mes;
    diaAtual.value = dia;
  } catch (erro) {
    console.error("Erro ao obter data e hora:", erro);
  }
};
obterDataHora();

</script>

<template>
  <header>
    <div class="painel_text_icons">
      <p>Clientes</p>
    
    </div>
    <div class="painel_data_number">
      <div class="entradas_saidas">
        <p>{{ mesAtual }}</p>
        <p>8</p>
        <p>Entradas</p>
      </div>
      <div class="ativos">
        <p>{{ mesAtual }}</p>
        <p>50</p>
        <p>Ativos</p>
      </div>
      <div class="entradas_saidas">
        <p>{{ mesAtual }}</p>
        <p>2</p>
        <p>Saidas</p>
      </div>
    </div>
    <p class="dia_atual">Dia: {{ diaAtual }}</p>
  </header>
</template>

<style >
header {
  width: 100%;
  max-width: 800px;
  height: 135px;
  margin: 0 auto;
  background-color: #0d2a14;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
}


.pesquisa_cliente {
  margin-top: 200px;
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-align: center;
}

.painel_text_icons {
  color: white;
  display: flex;
  justify-content: space-between;
}

.painel_text_icons p {
  margin: 20px 20px;
  font-weight: 200;
  font-size: 20px;
  font-style: normal;
  font-family: "Quicksand", sans-serif;
}


.painel_data_number {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  color: white;
}

.ativos,
.entradas_saidas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  font-family: "itim";
}

.ativos {
  font-size: 17px;
}

.ativos p:nth-child(1) {
  font-size: 17px;
}

.entradas_saidas {
  font-size: 12px;
}

.dia_atual {
  font-family: "itim";
  position: absolute;
  right: 20px;
  bottom: -30px;
}
</style>


