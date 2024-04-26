<script setup>
import Header from "./components/Header.vue";
import Cliente from "./components/Cliente.vue";
import RodaPe from "./components/RodaPe.vue";
import {onMounted} from "vue";

 onMounted(() => {
 const tela = document.querySelector('.campo_pesquisa_cliente');

 const lupa = document.querySelector('.pi-search').addEventListener('click', () =>{
    tela.style.display = "flex";
  })
 const botaoPesquisa = document.querySelector('.botaoPesquisa').addEventListener('click', () =>{
    tela.style.display = "none";
  })


 })


</script>

<template>
  <div class="tt">
    <Header />
    <main class="lista_clientes">
      <Cliente />
    </main>
    <RodaPe />
  </div>
</template>

<style scoped>


.lista_clientes {
  height: 500px;
  width: 100%;
  max-width: 800px;
  margin: 35px auto;
  font-family: "itim";
  color: #00852c;
}
</style>
