<script setup>
import IconUser from "../assets/img/user.png";
import IconMuscle from "../assets/img/muscle.png";
import IconArrow from "../assets/img/arrow.png"

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
  {
    id: 7,
    nome: "Rafael",
    telefone: "(31) 98765-4321",
    vencimento: "22",
  },
  {
    id: 8,
    nome: "Camila",
    telefone: "(41) 91234-5678",
    vencimento: "10",
  },
  {
    id: 9,
    nome: "Lucas",
    telefone: "(51) 99876-5432",
    vencimento: "05",
  },
  {
    id: 10,
    nome: "Mariana",
    telefone: "(62) 92332-121",
    vencimento: "15",
  },
  {
    id: 11,
    nome: "Gustavo",
    telefone: "(71) 98765-1234",
    vencimento: "25",
  },
  {
    id: 12,
    nome: "Fernanda",
    telefone: "(81) 99876-5432",
    vencimento: "18",
  },
  {
    id: 13,
    nome: "Rodrigo",
    telefone: "(32) 91234-5678",
    vencimento: "22",
  },
  {
    id: 14,
    nome: "Amanda",
    telefone: "(42) 98765-4321",
    vencimento: "10",
  },
  {
    id: 15,
    nome: "Gabriel",
    telefone: "(52) 92332-121",
    vencimento: "05",
  },
  {
    id: 16,
    nome: "Isabela",
    telefone: "(61) 98765-1234",
    vencimento: "15",
  },
  {
    id: 17,
    nome: "Leonardo",
    telefone: "(72) 99876-5432",
    vencimento: "25",
  },
  {
    id: 18,
    nome: "Juliana",
    telefone: "(82) 91234-5678",
    vencimento: "18",
  },
];

let indexInicio = 0 ;
let indexFim = 6;


const proximaPagina = () =>{
  indexInicio = indexInicio + 6;
  indexFim = indexFim + 6;
  console.log(indexFim)
}



</script>


<template>
  <div class="painel_clientes">
    <div
      class="painel_img_infos"
      v-for="(cliente, index) in listaClientes.slice(indexInicio, indexFim)"
      :key="cliente.id"
    >
      <img class="img_user" :src="IconUser" alt="" />
      <div>
        <p>{{ cliente.nome }}</p>
        <p>{{ cliente.telefone }}</p>
      </div>
      <p class="vencimento">{{ cliente.vencimento }}</p>
    </div>

    <div class="painel_paginacao">
      <div class="painel_array_pag">
        <img class="arrowLeft" :src="IconArrow" alt="">
        <div class="pag">1</div>
        <div v-on:click="proximaPagina" class="pag">2</div>
        <img class="arrowRigth" :src="IconArrow" alt="">
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
}

.img_user {
  widows: 55px;
  height: 55px;
  margin-left: 5px;
}
.painel_img_infos {
  position: relative;
  font-size: 18px;
  border-bottom: solid 2px #00852c;
  margin-bottom: 10px;
}

.painel_img_infos div {
  display: inline-block;
  vertical-align: top;
  margin: 0 0 0 10px;
  font-size: 18px;
}

.painel_img_infos div p:nth-child(1) {
  margin-bottom: 5px;
  font-size: 20px;
}

.vencimento {
  position: absolute;
  right: 10px;
  bottom: 5px;
  font-size: 20px;
}



.painel_paginacao{
display: flex;
flex-direction: column;
align-items: center;
}

.painel_array_pag{
  display: flex;
  gap: 20px;
  position: relative;
}

.painel_array_pag div{
  border: solid 1px #0d2a14;
  padding: 1px 5px;
  border-radius: 3px;
}

.painel_array_pag img{
  position: absolute;
  width: 25px;
  height: 25px;
}

.arrowLeft{
  left: -30px;
  transform: rotate(180deg);
}

.arrowRigth{
  right: -30px;
}

.painel_icon_text{
  color: #0d2a14;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.painel_icon_text img{
  width: 50px;
  height: 38px;
}
</style>