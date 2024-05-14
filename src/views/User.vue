<script setup>
import { useRouter } from "vue-router";
import IconsUser from "../assets/img/user.png";

const route = useRouter();

const voltar = () => {
  route.push({ name: "home" });
};

const logout = () =>{
  route.push({name: "login"})
}
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
        <p>Maio:</p>
        <p>Renda Mensal: 800.00$</p>
        <div class="painel_ifoEntradaSaida">
          <p>Entradas: 3</p>
          <p>Saidas: 1</p>
        </div>
      </div>

      <div class="painel_infosMes">
        <p>Abril:</p>
        <p>Renda Mensal: 3.200.00$</p>
        <div class="painel_ifoEntradaSaida">
          <p>Entradas: 8</p>
          <p>Saidas: 3</p>
        </div>
      </div>
      <div class="painel_sair">
        <p>Sair</p>
        <i @click="logout" class="pi pi-sign-out"></i>
      </div>
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

.painel_sair{
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: flex;
  align-items: center;
}

.painel_sair i{
 font-size: 25px;
 cursor: pointer;
}

.painel_sair i:hover{
  transform: scale(1.1);
}

.painel_sair p{
  font-size: 20px;
  margin-right: 15px;
}


</style>
