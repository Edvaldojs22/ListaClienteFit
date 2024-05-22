<script setup>
import { useRouter } from "vue-router";
import IconsUser from "../assets/img/user.png";
import api from "../api/api.js";
import { ref, onMounted } from "vue";

const anoAtual = ref("");
const mesAtual = ref("");
const nomeMesAtual = ref();
const nomeMesAnterior = ref();
let faturamentoMesAtual = ref("");
let faturamentoMesAnterior = ref("");
let entradasMesAtual = ref("");
let saidasMesAtual = ref("");
let entradasMesAnterior = ref("");
let saidasMesAnterior = ref("");

const route = useRouter();

const voltar = () => {
  route.push({ name: "home" });
};

const logout = () => {
  localStorage.removeItem("token");
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
    entradasMesAnterior.value = response.data.entradasAnterior;
    saidasMesAnterior.value = response.data.saidasAnterior;
    faturamentoMesAnterior.value = response.data.faturamentoAnterior;
    nomeMesAnterior.value = response.data.nomeMesAnterior;
    console.log(response.data);
  } catch (erro) {
    console.error("Erro ao carregar buscar relatorio do mes:", erro);
  }
};

onMounted(() => {
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
        <p>José Leandro</p>
      </div>

      <div class="painel_infosMes">
        <p class="painel_nomeMes">{{ nomeMesAtual }}:</p>
        <p>Renda Mensal: R${{ faturamentoMesAtual }}</p>
        <div class="painel_ifoEntradaSaida">
          <p>Entradas: {{ entradasMesAtual }}</p>
          <p>Saidas: {{ saidasMesAtual }}</p>
        </div>
      </div>

      <div class="painel_infosMes" v-if="nomeMesAnterior">
        <p class="painel_nomeMes">{{ nomeMesAnterior }}:</p>
        <p>Renda Mensal: R${{ faturamentoMesAnterior }}</p>
        <div class="painel_ifoEntradaSaida">
          <p>Entradas: {{ entradasMesAnterior }}</p>
          <p>Saidas: {{ saidasMesAnterior }}</p>
        </div>
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
  height: 130px;
  background-color: #5e9d406c;
  border-bottom: solid 6px #0d2a14;
  border-left: solid 6px #0d2a14;
  border-radius: 20px;
  position: relative;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 25px;
}

.painel_infosMes > p:nth-child(1) {
  position: absolute;
  top: 0;
  left: 6px;
}

.painel_ifoEntradaSaida {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
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

.painel_nomeMes {
  text-transform: uppercase;
}
</style>
