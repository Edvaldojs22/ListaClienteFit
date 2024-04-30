<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import IconUser from "../assets/img/user.png";
import IconMuscle from "../assets/img/muscle.png";
import IconArrow from "../assets/img/arrow.png";

const clientes = ref([]);
const totalClientes = ref();
const clientesAtivos = ref([]);
const clientesInativos = ref([]);

const clientesAtivosFiltrados = ref([]);

let pocicao0 = ref(0);
let pocicao6 = ref(6);

const carregarClientes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/clientes");
    clientes.value = response.data;
    totalClientes.value = clientes.value.length;
 

    clientesAtivos.value = clientes.value //Clientes Ativos
      .filter((cliente) => cliente.active)
      .slice(pocicao0.value, pocicao6.value); 
      
  } catch (erro) {
    console.error("Erro ao carregar clientes:", erro);
  }
};
carregarClientes();


const proximaPagina = (event) => {
  const arrwId = event.target.id;
  if (arrwId === "arrowRigth") {
    if (totalClientes.value > pocicao0.value) {
      pocicao0.value += 6;
      pocicao6.value += 6;
      carregarClientes();
    }
  } else if (arrwId === "arrowLeft") {
    if (pocicao0.value > 0) {
      pocicao0.value -= 6;
      pocicao6.value -= 6;
      carregarClientes();
    }
  }
};
</script>


<template>
  <div class="painel_clientes">
    <div
      class="painel_img_infos"
      v-for="cliente in clientesAtivos"
      :key="cliente.id"
    >
      <img class="img_user" :src="IconUser" alt="" />
      <div>
        <p>{{ cliente.name }}</p>
        <p>{{ cliente.phone }}</p>
      </div>
      <p class="vencimento">{{ cliente.dueDay }}</p>
    </div>

    <div class="painel_paginacao">
      <div class="painel_array_pag">
        <img
          id="arrowLeft"
          @click="proximaPagina"
          class="arrowLeft"
          :src="IconArrow"
          alt=""
        />

        <div class="pag"></div>

        <img
          id="arrowRigth"
          @click="proximaPagina"
          class="arrowRigth"
          :src="IconArrow"
          alt=""
        />
      </div>

      <div class="painel_icon_text">
        <img :src="IconMuscle" alt="" />
        <p>VIVA EN MOVIMENTO</p>
      </div>
    </div>
  </div>
</template>



<style scoped>
.painel_clientes {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.img_user {
  widows: 45px;
  height: 45px;
  margin-left: 5px;
}
.painel_img_infos {
  position: relative;
  border-bottom: solid 2px #00852c;
}

.painel_img_infos div {
  display: inline-block;
  vertical-align: top;
  margin: 0 0 0 10px;
  font-size: 16px;
}

.painel_img_infos div p:nth-child(1) {
  margin-bottom: 5px;
  font-size: 17px;
}

.vencimento {
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: 1.5rem;
}

.painel_paginacao {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 85px;
}

.painel_array_pag {
  display: flex;
  gap: 10px;
  position: relative;
}

.painel_array_pag div {
  background-color: #154621;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-content: center;
  color: white;
}

.painel_array_pag img {
  position: absolute;
  top: -5px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  padding: 6px;
  border-radius: 50%;
}
.painel_array_pag img:hover {
  background-color: #3594553b;
}

.arrowLeft {
  left: -80px;
  transform: rotate(180deg);
}

.arrowRigth {
  right: -80px;
}

.painel_icon_text {
  color: #0d2a14;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 8px auto 0;
  font-size: 12px;
}

.painel_icon_text img {
  width: 40px;
  height: 28px;
}
</style>