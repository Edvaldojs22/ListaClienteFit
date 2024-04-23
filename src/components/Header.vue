<script >
import axios from "axios";
import IconFilter from "../assets/img/filter.png";

export default {
  data() {
    return {
      IconFilter: IconFilter,
      mesAtual: "",
      diaAtual: "",
      nomePesquisado:"",
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
    enviarFormulario() {
      console.log(this.nomePesquisado);
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
        <div class="campo_pesquisa_cliente">
          <input
            class="pesquisa_cliente"
            type="text"
            name=""
            id="pesquiseCliente"
            placeholder="Pesquisa Cliente"
            v-model="nomePesquisado"
          />
          <label class="botaoPesquisa" for="pesquiseCliente" @click="enviarFormulario">Enviar</label>
        </div>

        <img class="img_filter" :src="IconFilter" alt="" />
      </div>
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

<style scoped>
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

.campo_pesquisa_cliente {
  background-color: rgba(102, 102, 102, 0.876);
  backdrop-filter: blur(5px);
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 1;
  font-family: "itim";
}

.campo_pesquisa_cliente label {
  margin-top: 30px;
  padding: 4px 20px;
  background-color: #0d2a14;
  border-radius: 5px;
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

.painel_icons {
  margin: 15px 10px 0 0;
}
.painel_icons i {
  margin-right: 20px;
  font-size: 25px;
}

.img_filter {
  width: 25px;
  height: 25px;
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


