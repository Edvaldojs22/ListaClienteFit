<script >
import axios from "axios";
import IconFilter from "../assets/img/filter.png";

export default {
  data() {
    return {
      IconFilter: IconFilter,
      mesAtual: "",
      diaAtual: "",
    };
  },
  mounted() {
    this.obterDataHora();
  },

  methods: {
    async obterDataHora() {
      try {
        const resposta = await axios.get("https://worldtimeapi.org/api/ip");
        const dataHora = new Date(resposta.data.datetime);
        const mes = dataHora.toLocaleString("default", { month: "long" });
        const dia = dataHora.getDate();
        this.mesAtual = mes;
        this.diaAtual = dia;
      } catch (erro) {
        console.error("Erro ao obter data e hora:", erro);
      }
    },
  },
};
</script>

<template>
  <header>
    <div class="painel_text_icons">
      <p>Clientes</p>
      <div class="painel_icons">
        <i class="pi pi-search"></i>
        <img class="img_filter" :src="IconFilter" alt="" />
      </div>
    </div>
    <div class="painel_data_number">
      <div class="entradas_saidas">
        <p>{{mesAtual}}</p>
        <p>8</p>
        <p>Entradas</p>
      </div>
      <div class="ativos">
         <p>{{mesAtual}}</p>
        <p>50</p>
        <p>Ativos</p>
      </div>
      <div class="entradas_saidas">
        <p>{{mesAtual}}</p>
        <p>2</p>
        <p>Saidas</p>
      </div>
    </div>
    <p class="dia_atual">Dia: {{diaAtual}}</p>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  max-width: 800px;
  height: 170px;
  margin: 0 auto;
  background-color: #1b372a;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
}

.painel_text_icons {
  color: white;
  display: flex;
  justify-content: space-between;
}

.painel_text_icons p {
  margin: 20px 20px;
  font-weight: 200;
  font-size: 25px;
  font-style: normal;
  font-family: "Quicksand", sans-serif;
}

.painel_icons {
  margin: 20px 20px 0 0;
}
.painel_icons i {
  margin-right: 20px;
  font-size: 30px;
}

.img_filter {
  width: 30px;
  height: 30px;
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
  gap: 5px;
  font-family: "itim";
}

.ativos {
font-size: 17px;
}

.ativos p:nth-child(1){
  font-size: 23px;
}

.entradas_saidas {
  font-size: 12px;
  margin-top: 20px;
}

.dia_atual{
  font-family: "itim";
  position: absolute;
  right: 20px;
  bottom: -30px;
}
</style>


