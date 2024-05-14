<script setup>
import { useRouter } from "vue-router";

const route = useRouter()
const voltar = () => {
  route.push({ name: "home" });
};
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
        <textarea name="novaMensagem"></textarea>
        <button class="botaoSalvar">Salvar</button>
      </form>
       <i @click="voltar" class="pi pi-times"></i>
    </div>
  </div>
</template>

<style>

</style>