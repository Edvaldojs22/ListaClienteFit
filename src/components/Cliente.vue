<script setup>
import IconUser from "../assets/img/user.png";

const listaClientes = [
  {
    id: 1,
    nome: "Marcos",
    telefone: "(83) 92332-121",
    vencimento: "15",
  },
  {
    id: 2,
    nome: "Ana",
    telefone: "(84) 98765-4321",
    vencimento: "20",
  },
  {
    id: 3,
    nome: "Maria",
    telefone: "(55) 98765-1234",
    vencimento: "25",
  },
  {
    id: 4,
    nome: "João",
    telefone: "(11) 99876-5432",
    vencimento: "10",
  },
  {
    id: 5,
    nome: "Pedro",
    telefone: "(22) 91234-5678",
    vencimento: "05",
  },
  {
    id: 6,
    nome: "Carla",
    telefone: "(27) 99876-5432",
    vencimento: "18",
  },
];
</script>


<template>
  <div class="painel_clientes">
    <div
      class="painel_img_infos"
      v-for="(cliente) in listaClientes"
      :key="cliente.id"
    >
      <img class="img_user" :src="IconUser" alt="" />
      <div>
        <p>{{ cliente.nome }}</p>
        <p>{{ cliente.telefone }}</p>
      </div>
      <p class="vencimento">{{ cliente.vencimento }}</p>
    </div>
  </div>
</template>



<style scoped>
.painel_clientes {
  width: 100%;
  max-width: 600px;
  height: 80px;
  margin: 0 auto;
  padding: 0 5px;
}

.img_user {
  widows: 70px;
  height: 70px;
  margin-left: 5px;
}
.painel_img_infos {
  position: relative;
  font-size: 18px;
  border-bottom: solid 2px #78a420;
  margin-bottom: 10px;
}

.painel_img_infos div {
  display: inline-block;
  vertical-align: top;
  margin: 5px 0 0 14px;
}

.painel_img_infos div p:nth-child(1) {
  margin-bottom: 10px;
  font-size: 23px;
}

.vencimento {
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: 23px;
}
</style>