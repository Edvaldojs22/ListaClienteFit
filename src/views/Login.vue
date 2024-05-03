<script setup>
import Logo from "../assets/img/imgLogo.png";
</script>

<template>
  <div class="painel_login">
    <div class="cor_top"></div>
    <div class="cor_bottom"></div>
    <form action="" class="login">

      <div class="painel_logoText">
        <img :src="Logo" alt="" />
        <p>Lista Cliente Fit</p>
      </div>

      <div class="caixa_ipunt">
        <p>Nome:</p>
        <input type="text" />
      </div>

      <div class="caixa_ipunt">
        <p>Senha:</p>
        <input type="password" />
      </div>

      <button id="botao_login">LOGIN</button>
    </form>
  </div>
</template>

<style scoped>
.painel_login {
  width: 100%;
  max-width: 700px;
  margin: auto;
  height: 700px;
  background-image: url("../assets/img/imgLogin.png");
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.cor_top {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: #0d2a14;
  border-bottom-right-radius: 100%;
}

.cor_bottom {
  position: absolute;
  background-color: #00852c;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
  border-top-left-radius: 100%;
}

.login {
  width: 300px;
  height: 350px;
  background-color: #11991321;
  border-radius: 10px;
  backdrop-filter: blur(20px);
  color: #174118;
  padding-bottom: 30px;
}

.login{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
}
.painel_logoText{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.painel_logoText img {
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.painel_logoText p{
font-family: 'itim';
text-align: center;
}


.caixa_ipunt{
    display: flex;
    border-bottom: solid 2px #00852c;
}

.caixa_ipunt p{
    font-family: 'itim';
    font-size: 20px;
}

.caixa_ipunt input{
    border: none;
    background-color: transparent;
    outline: none;
    width: 200px;
    padding-left: 20px;
}

#botao_login{
    padding: 6px 25px;
    font-size: 25px;
    border: none;
    border-radius:10px ;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: 100;
    background-image: linear-gradient( 290deg,  #55EE99,#174118);
    color: white;
    margin-top: 20px;
    cursor: pointer;
}

#botao_login:hover{
    transform: scale(1.1);
}








































@media screen and (max-height: 900px) {
  .painel_login {
    height: 100vh;
  }
}

@media screen and (min-height: 1000px) {
  .painel_login {
    height: 800px;
  }
}
</style>
