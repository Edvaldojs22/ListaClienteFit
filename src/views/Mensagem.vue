<script setup>
import { useRouter } from "vue-router";

const route = useRouter()
const voltar = () => {
  route.push({ name: "home" });
};

const salvarMensagem = (event) => {
  event.preventDefault();
  const novaMensagem = document.querySelector("[name=novaMensagem]").value;
  console.log("Nova mensagem:", novaMensagem);
}
</script>

<template>
  <div class="painel_login">
    <div class="cor_top"></div>
    <div class="cor_bottom"></div>
    <div class="painel_msg">
      <div class="painel_msgAtual">
        <p>Mensagem Atual</p>
        <textarea name="msgAtual"></textarea>
      </div>
      <form action="" class="formMsg">
        <label for="novaMensagem">Nova Mensagem</label>
        <textarea name="novaMensagem">$cliente$ $diaVencimento$</textarea>
        <button type="sumbit" @click="salvarMensagem"  class="botaoSalvar">Salvar</button>
      </form>
       <i @click="voltar" class="pi pi-times"></i>
    </div>
  </div>
</template>

<style >

.painel_msg {
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
  justify-content: space-between;
  font-family: 'itim';
}
.painel_msgAtual, .formMsg{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.painel_msg p, .formMsg label{
    margin: 10px 0 10px;
    font-size: 20px;
}



textarea{
    width:calc(100% - 30px);
    max-width: 400px;
    height: 200px;
    border: none;
    border-radius: 10px;
     outline: none;
     padding: 5px;
  
}

.botaoSalvar {
  width: calc(100% - 100px);
  padding: 7px;
  height: 50px;
  margin-top: 40px;
  font-size: 19px;
  border: none;
  border-radius: 10px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-weight: 100;
  background-image: linear-gradient(290deg, #55ee99, #174118);
  color: white;
}

.botaoSalvar:hover{
    transform: scale(1.1);
}
</style>
