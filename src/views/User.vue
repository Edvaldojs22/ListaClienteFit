<script setup>
import { useRouter } from "vue-router";
import IconsUser from "../assets/img/user.png";
import api from "../api/api.js";
import { ref, onMounted } from "vue";

const usuario = ref("");
const anoAtual = ref("");
const mesAtual = ref("");
const nomeMesAtual = ref();
let faturamentoMesAtual = ref("");
let entradasMesAtual = ref("");
let saidasMesAtual = ref("");
let gastos = ref("");
let lucro = ref("");

const route = useRouter();

const voltar = () => {
  route.push({ name: "home" });
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  route.push({ name: "login" });
};

const carregarRelatorioMes = async () => {
  const dataAtual = new Date();
  anoAtual.value = dataAtual.getFullYear();
  mesAtual.value = dataAtual.getMonth() + 1;

  try {
    const response = await api.get("/mes/usuario", {
      params: {
        year: anoAtual.value,
        monthNumber: mesAtual.value,
      },
    });
    entradasMesAtual.value = response.data.entradasAtual;
    saidasMesAtual.value = response.data.saidasAtual;
    faturamentoMesAtual.value = response.data.faturamentoAtual;
    nomeMesAtual.value = response.data.nomeMesAtual;
    gastos.value = response.data.gastos;
    lucro.value = parseFloat(faturamentoMesAtual.value - gastos.value.total);
  } catch (erro) {
    console.error("Erro ao carregar buscar relatorio do mes:", erro);
  }
};

const atualizarGastosMensais = async () => {
  const expenses = {
    personal: gastos.value.personal,
    energy: gastos.value.energia,
    water: gastos.value.agua,
    site: gastos.value.site,
    other: gastos.value.outros,
  };
  try {
    const response = await api.put("/mes/gastos", {
      params: {
        year: anoAtual.value,
        monthNumber: mesAtual.value,
        expenses: expenses,
      },
    });
    lucro.value = parseFloat(faturamentoMesAtual.value - gastos.value.total);
  } catch (erro) {
    console.error("Erro ao atualizar gastos do mes:", erro);
  }
};

onMounted(() => {
  if (!usuario.value) {
    usuario.value = localStorage.getItem("user");
  }

  carregarRelatorioMes();
});
</script>

<template>
  <div class="painel_login">
    <div class="cor_top"></div>
    <div class="cor_bottom"></div>
    <div action="" class="painel_user">
      <div class="painel_imgP">
        <img :src="IconsUser" alt="" />
        <p>{{ usuario }}</p>
      </div>

      <div class="painel_infosMes">
        <p class="painel_nomeMes">{{ nomeMesAtual }}:</p>
        <p>Renda Bruta: $ {{ faturamentoMesAtual }}</p>
        <form class="painel_gastos">
          <p>Gastos</p>
          <div class="painel_campoGastos">
            <div class="addValue">
              <p>Personal: $</p>
              <input v-model="gastos.personal" type="number" />
            </div>
            <div class="addValue">
              <p>Site: $</p>
              <input v-model="gastos.site" type="number" />
            </div>
            <div class="addValue">
              <p>Energia: $</p>
              <input v-model="gastos.energia" type="number" />
            </div>
            <div class="addValue">
              <p>Àgua: $</p>
              <input v-model="gastos.agua" type="number" />
            </div>
            <div class="addValue">
              <p>Outros: $</p>
              <input v-model="gastos.outros" type="number" />
            </div>
          </div>
          <div class="painel_buotaoLucro">
            <button @click.prevent="atualizarGastosMensais" class="botaoGastos">
              atualizar
            </button>
            <div class="painel_lucro">
              <p>Lucro: $</p>
              <p>{{ lucro }}</p>
            </div>
          </div>
        </form>
      </div>

      <div class="painel_sair">
        <p>Sair</p>
        <i @click="logout" class="pi pi-sign-out"></i>
      </div>

      <i @click="voltar" class="pi pi-times"></i>
    </div>
  </div>
</template>

<style>
.painel_user {
  font-family: "itim";
  width: calc(100% - 50px);
  max-width: 500px;
  height: calc(100% - 50px);
  max-height: 600px;
  background-color: #11991321;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  color: #000000;
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
}

.painel_imgP {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.painel_imgP img {
  margin-top: 30px;
  width: 80px;
  height: 80px;
}

.painel_imgP p {
  font-size: 20px;
}

.painel_infosMes {
  width: calc(100% - 30px);
  max-width: 350px;
  height: 300px;
  background-color: #5e9d406c;
  border-bottom: solid 6px #0d2a14;
  border-left: solid 6px #0d2a14;
  border-radius: 20px;
  position: relative;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;
  z-index: 1;
}
.painel_nomeMes {
  text-transform: uppercase;
}

.painel_infosMes > p:nth-child(1) {
  margin-top: 5px;
  margin-left: 10px;
}
.painel_infosMes > p:nth-child(2) {
  margin-top: 20px;
  text-align: center;
}

.painel_gastos {
  height: 200px;
  margin-top: 25px;
}
.painel_gastos p:nth-child(1) {
  text-align: center;
}

.painel_campoGastos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-left: 15px;
  margin-top: 20px;
}

.addValue {
  height: 30px;
}

.addValue p {
  display: inline-block;
  font-size: 15px;
}

.addValue input {
  width: 40px;
  background-color: transparent;
  border: none;
  border-bottom: solid 1px black;
  padding-left: 5px;
  outline: none;
}

.painel_buotaoLucro {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 10px;
}
.botaoGastos {
  background-color: #174118;
  border: none;
  color: white;
  width: 90px;
  height: 25px;
  border-radius: 5px;
  font-size: 13px;
}

.painel_buotaoLucro p {
  font-size: 16px;
}

.painel_lucro {
  display: flex;
  gap: 5px;
}

.painel_sair {
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: flex;
  align-items: center;
}

.painel_sair i {
  font-size: 25px;
  cursor: pointer;
}

.painel_sair i:hover {
  transform: scale(1.1);
}

.painel_sair p {
  font-size: 20px;
  margin-right: 15px;
}
</style>
