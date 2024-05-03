<script setup>
import { onMounted, ref, defineProps } from "vue";
import axios from "axios";
import IconUser from "../assets/img/user.png";
import IconMuscle from "../assets/img/muscle.png";
import IconArrow from "../assets/img/arrow.png";
import IconFilter from "../assets/img/filter.png";

const clientesAtivos = ref([]);
const quantidadeCliente = ref();
let clienteExibido = ref([]);

let pocicao0 = ref(0);
let pocicao6 = ref(6);
let nomePesquisado = "";
let numeroPagina = 1;


const clientesInativos = ref([]);

//Obter dia Atual para filtrar os clientes
let diaAtual = ref("");
const obterDataHora = async () => {
  try {
    const resposta = await axios.get("https://worldtimeapi.org/api/ip");
    const dataHora = new Date(resposta.data.datetime);
    const dia = dataHora.getDate();
    diaAtual.value = dia;
  } catch (erro) {
    console.error("Erro ao obter data e hora:", erro);
  }
};
obterDataHora();




const carregarClientes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/clientes");
    clientesAtivos.value = response.data
      .filter((cliente) => cliente.active)
      .slice(pocicao0.value, pocicao6.value);

    clienteExibido.value = clientesAtivos.value;
    const responseQuantidade = await axios.get(
      "http://localhost:3000/clientes/quantidade"
    );

    quantidadeCliente.value = responseQuantidade.data.activeClients; //Quantidade clientes Ativos
  } catch (erro) {
    console.error("Erro ao carregar clientesAtivos:", erro);
  }
};
carregarClientes();

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
  const filter = document
    .querySelector(".img_filter")
    .addEventListener("click", () => {
      telaLista.style.display = "flex";
    });
});

//Pesquia Cliente
const enviarFormulario = () => {
  buscaClientePeloNome(nomePesquisado)
};

const buscaClientePeloNome = (nome) =>{
 
   clienteExibido.value = clienteExibido.value.filter((cliente) =>
    cliente.name.toLowerCase().includes(nome.toLowerCase()) || 
    cliente.phone.includes(nome)
  );

}



//Codigo responsavel por mudar a lista
const buscaClienteInativos = async (event) => {
  const telaLista = document.querySelector(".campo_pesquisa_lista");
  const ativoInativo = event.target.id;
  if (ativoInativo == "ativos") {
    clienteExibido.value = clientesAtivos.value;
    telaLista.style.display = "none";
  } else if (ativoInativo == "inativos") {
    try {
      const response = await axios.get(
        "http://localhost:3000/clientes/desativados"
      );
      const clientesInativos = response.data;

      clienteExibido.value = clientesInativos;
      telaLista.style.display = "none";
    } catch (erro) {
      console.log("Erro ao carregar clientesAtivos:", erro);
    }
  }
};


//Proxima pagina
const proximaPagina = (event) => {
  const arrwId = event.target.id;
  if (arrwId === "arrowRigth") {
    if (quantidadeCliente.value > pocicao0.value) {
      pocicao0.value += 6;
      pocicao6.value += 6;
      numeroPagina += 1;
       carregarClientes();
      
    }
  } else if (arrwId === "arrowLeft") {
    if (pocicao0.value > 0) {
      pocicao0.value -= 6;
      pocicao6.value -= 6;
      numeroPagina -= 1;
      carregarClientes();
    }
  }
};

//-------------------------------------------
</script>


<template>
  <div class="painel_clientesAtivos">
    <div class="painel_icons">
      <i class="pi pi-search"></i>
      <img @click="opcaoListas" class="img_filter" :src="IconFilter" alt="" />

      <div></div>
    </div>
    <div class="campo_pesquisa_cliente">
      <input
        class="pesquisa_cliente"
        type="text"
        name=""
        id="pesquiseCliente"
        placeholder="Pesquisa Cliente"
        v-model="nomePesquisado"
      />
      <label
        class="botaoPesquisa"
        for="pesquiseCliente"
        @click="enviarFormulario"
        >Enviar</label
      >
    </div>

    <div class="campo_pesquisa_lista">
      <p @click="buscaClienteInativos" id="ativos">Clientes Ativos</p>
      <p @click="buscaClienteInativos" id="inativos">Clientes Inativos</p>
    </div>
    <div
      class="painel_img_infos"
      v-for="cliente in clienteExibido"
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

        <div class="pag">{{ numeroPagina }}</div>

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
.painel_clientesAtivos {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.painel_icons {
  position: absolute;
  top: 20px;
  right: 20px;
}
.painel_icons i {
  margin-right: 20px;
  font-size: 25px;
  color: #ffffff;
}

.painel_icons i,
img {
  cursor: pointer;
}

.img_filter {
  width: 25px;
  height: 25px;
}

.campo_pesquisa_cliente {
  background-color: rgba(102, 102, 102, 0.876);
  backdrop-filter: blur(5px);
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  top: 0;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 1;
  font-family: "itim";
}

.campo_pesquisa_lista {
  background-color: rgba(102, 102, 102, 0.876);
  backdrop-filter: blur(5px);
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 120px;
  border-radius: 20px;
  z-index: 1;
  font-family: sans-serif;
}

.campo_pesquisa_lista p {
  border: solid 1px #0d2a14;
  background-color: #0d2a14;
  border-radius: 15px;
  width: calc(100% - 50px);
  padding: 10px 0;
  max-width: 400px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
}

.campo_pesquisa_cliente label {
  margin-top: 30px;
  padding: 4px 20px;
  background-color: #0d2a14;
  border-radius: 5px;
  cursor: pointer;
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