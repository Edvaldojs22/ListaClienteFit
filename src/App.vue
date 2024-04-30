<script setup>
import Header from "./components/Header.vue";
import Cliente from "./components/Cliente.vue";
import RodaPe from "./components/RodaPe.vue";
import { onMounted } from "vue";

onMounted(() => {
  const telaPesquisa = document.querySelector(".campo_pesquisa_cliente");
  const telaLista = document.querySelector(".campo_pesquisa_lista");

//Tela Pesquisa Clientes
  const lupa = document
    .querySelector(".pi-search")
    .addEventListener("click", () => {
      telaPesquisa.style.display = "flex";
    });
  const botaoPesquisa = document
    .querySelector(".botaoPesquisa")
    .addEventListener("click", () => {
      telaPesquisa.style.display = "none";
    });

//Tela Pesquisa Lista Clientes
const filter = document.querySelector('.img_filter').addEventListener("click", () =>{
  telaLista.style.display = "flex"
})
});
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
