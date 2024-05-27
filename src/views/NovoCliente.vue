<script setup>
import Logo from "../assets/img/imgLogo.png";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import api from "../api/api.js";
import axios from "axios";

let dataAtual = ref("");

const obterDataHora = async () => {
  try {
    const resposta = await axios.get("https://worldtimeapi.org/api/ip");
    const dataHora = new Date(resposta.data.datetime);
    dataAtual.value = dataHora.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    cliente.value.enrollmentDate = dataAtual.value;
  } catch (erro) {
    console.error("Erro ao obter data e hora:", erro);
  }
};

obterDataHora();

const route = useRouter();

const voltar = () => {
  route.push({ name: "home" });
};

const cliente = ref({
  name: "",
  phone: "",
  birthdate: "",
  enrollmentDate: "",
  dueDay: "",
  active: true,
});

const adicionarCliente = async () => {
   if (!cliente.value.birthdate) {
    cliente.value.birthdate = "";
  }
  // Preparar os dados do cliente para envio
  const clienteData = {
    name: cliente.value.name,
    nickname: cliente.value.nickname,
    phone: cliente.value.phone,
    birthdate: cliente.value.birthdate,
    enrollmentDate: cliente.value.enrollmentDate,
    dueDay: cliente.value.dueDay,
    active: cliente.value.active,
  };

  // Fazer a requisição POST para o servidor
  try {
    const response = await api.post("/clientes", clienteData);
    voltar();
    cardSucesso.style.display = "flex";
    setTimeout(fechaCard, 2000);
  } catch (error) {
    cardErro.style.display = "flex";
    setTimeout(fechaCard(cardErro), 2000);
    console.log("Erro ao adicionar novo cliente", error);
  }
};

let cardSucesso;
let cardErro;
onMounted(() => {
  cardSucesso = document.querySelector(".sucesso");
  cardErro = document.querySelector(".erro");
});

const fechaCard = () => {
  cardSucesso.style.display = "none";
  cardErro.style.display = "none";
};
</script>
<template>
  <div class="painel_login">
    <!-- //Card para tratamento -->
    <div class="card sucesso">
      <p>Operação realizada com sucesso</p>
      <i class="pi pi-check"></i>
    </div>

    <div class="card erro">
      <p>Erro na operação</p>
      <i class="pi pi-times-circle"></i>
    </div>

    <!-- -------------------------------- -->
    <div class="cor_top"></div>
    <div class="cor_bottom"></div>
    <form @submit.prevent="adicionarCliente" action="" class="painel_add">
      <div class="painel_logoText">
        <img :src="Logo" alt="" />
        <p>Lista Cliente Fit</p>
      </div>

      <div class="caixa_ipuntAdd">
        <p>Nome:</p>
        <input v-model="cliente.name" id="username" type="text" />
      </div>
      <div class="caixa_ipuntAdd">
        <p>Apelido:</p>
        <input v-model="cliente.nickname" id="nickname" type="text" />
      </div>

      <div class="caixa_ipuntAdd">
        <p>Telefone:</p>
        <input
          v-model="cliente.phone"
          id="phone"
          type="number"
          maxlength="11"
        />
      </div>

      <div class="caixa_ipuntAdd">
        <p>Data Nascimento:</p>
        <input v-model="cliente.birthdate" id="dataNascimenti" type="text" />
      </div>

      <div class="caixa_ipuntAdd">
        <p>Data Entrada:</p>
        <input v-model="cliente.enrollmentDate" id="dataEntrada" type="text" />
      </div>

      <div class="caixa_ipuntAdd">
        <p>Vencimento:</p>
        <input v-model="cliente.dueDay" id="vencimento" type="text" />
      </div>

      <button @click="handleHome" type="submit" id="botao_add">Salvar</button>
      <i @click="voltar" class="pi pi-times"></i>
    </form>
  </div>
</template>
