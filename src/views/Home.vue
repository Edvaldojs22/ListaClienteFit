<script setup>
import axios, { Axios } from "axios";
import { onMounted, ref } from "vue";
import IconZap from "../assets/img/zap.png";
import IconAdd from "../assets/img/add.png";
import IconUserFooter from "../assets/img/userFooter .png";
import IconUser from "../assets/img/user.png";
import IconMuscle from "../assets/img/muscle.png";
import IconArrow from "../assets/img/arrow.png";
import IconFilter from "../assets/img/filter.png";
import { useRouter } from "vue-router";
import api from "../api/api.js";

//Codigo para obter data e Hora
let anoAtual = ref("");
let mesAtual = ref("");
let mesAtualInteger = ref("");
let diaAtual = ref("");
let mesAnterior = ref("");
let proximoMes = ref("");
let clienteId = ref("");

const obterDataHora = async () => {
  try {
    const resposta = await axios.get("https://worldtimeapi.org/api/ip");
    const dataHora = new Date(resposta.data.datetime);
    const mes = dataHora.toLocaleString("default", { month: "long" });
    const dia = dataHora.getDate();
    mesAtual.value = mes;
    mesAtualInteger.value = dataHora.getMonth() + 1;
    diaAtual.value = dia;
    anoAtual.value = dataHora.getFullYear();

    // Obtendo o mês anterior
    const mesAnteriorData = new Date(dataHora);
    mesAnteriorData.setMonth(mesAnteriorData.getMonth() - 1);
    mesAnterior = mesAnteriorData.toLocaleString("default", { month: "long" });

    // Obtendo o próximo mês
    const proximoMesData = new Date(dataHora);
    proximoMesData.setMonth(proximoMesData.getMonth() + 1);
    proximoMes = proximoMesData.toLocaleString("default", { month: "long" });

    carregarRelatorioMes();
  } catch (erro) {
    console.error("Erro ao obter data e hora:", erro);
  }
};
obterDataHora();

// ----------------------------------------------------->

const clientesAtivos = ref([]);
let nomePesquisado = "";
let ativoInativo = "ativos";
let exiberCliente = ref([]);
let quantidadesAtivo = "";
let clienteNumber = ref();

let isActive = true;
let pagina = 1;
let limit = 6;
let numeroPagina = pagina;
let next = "";
let previous = "";
let qtdEntradasMes = ref();
let qtdSaidasMes = ref();

//carrega dados do mes atual
const carregarRelatorioMes = async () => {
  try {
    const response = await api.get("/mes", {
      params: {
        year: anoAtual.value,
        monthNumber: mesAtualInteger.value,
      },
    });
    qtdEntradasMes.value = response.data.newClients;
    qtdSaidasMes.value = response.data.clientsLeft;
  } catch (erro) {
    console.error("Erro ao carregar buscar relatorio do mes:", erro);
  }
};

//
//Carrega clientes ativos inicialmente
const carregarClientes = async () => {
  try {
    const response = await api.get("/clientes", {
      params: {
        page: pagina,
        limit: limit,
        search: nomePesquisado,
        isActive: isActive,
      },
    });

    exiberCliente.value = response.data.results;
    next = response.data.next;
    previous = response.data.previous;
    quantidadesAtivo = response.data.results.length;
  } catch (erro) {
    console.error("Erro ao carregar clientesAtivos:", erro);
  }
};
carregarClientes();

//Codigo ativa botões para selecionar lista
let filter;
onMounted(() => {
  const telaPesquisa = document.querySelector(".campo_pesquisa_cliente");
  telaLista = document.querySelector(".campo_pesquisa_lista");
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
  filter = document.querySelector(".img_filter");
  filter.addEventListener("click", () => {
    telaLista.style.display = "flex";
  });
});

// ----------------------------------------------------------------->

//Pesquia Cliente
const enviarFormulario = () => {
  buscaClientePeloNome(nomePesquisado);
};

const buscaClientePeloNome = async (nome) => {
  nomePesquisado = nome;
  carregarClientes();
};

// -------------------------------------------------------->

//Codigo responsavel por mudar a lista
let valorP_tipoLista;
let telaLista;

onMounted(() => {
  valorP_tipoLista = document.querySelector(".tipoLista");
});

const mudarLista = (event) => {
  telaLista = document.querySelector(".campo_pesquisa_lista");
  ativoInativo = event.target.id;
  if (ativoInativo == "ativos") {
    valorP_tipoLista.innerHTML = "Clientes Ativos";
    isActive = true;
    carregarClientes();
    telaLista.style.display = "none";
  } else if (ativoInativo == "inativos") {
    valorP_tipoLista.innerHTML = "Clientes Inativos";
    isActive = false;
    carregarClientes();
    telaLista.style.display = "none";
  }
};
// ---------------------------------------------------------->

// Proxima pagina
const proximaPagina = (event) => {
  let arrowPositin = event.target.id;
  if (arrowPositin === "arrowRigth") {
    pagina = next.page;
    limit = next.limit;
    numeroPagina = pagina;
    carregarClientes();
  } else if (arrowPositin == "arrowLeft") {
    pagina = previous.page;
    limit = previous.limit;
    numeroPagina = pagina;
    carregarClientes();
  }
};

let valorP_botaoValor;
let painelOpcoes;
onMounted(() => {
  valorP_botaoValor = document.querySelector(".valorP");
});

let cliente = "";
let numeroCliente = ref();
const exibirOpcoes = (clienteId, clienteName, clienteEstado, clienteNumero) => {
  if (clienteEstado) {
    valorP_botaoValor.innerHTML = "Cancelar Cliente";
    valorP_botaoValor.style.backgroundColor = "#851000";
  } else {
    valorP_botaoValor.style.backgroundColor = "#028500";
    valorP_botaoValor.innerHTML = "Confirma Cliente";
  }
  numeroCliente.value = clienteNumero;
  const nomeCliente = document.querySelector("#nomeCliente");
  nomeCliente.innerHTML = clienteName;
  painelOpcoes = document.querySelector(".campo_cliente_opcoes");
  painelOpcoes.style.display = "flex";
  cliente = clienteId;
};

onMounted(() => {
  const botaoEditar = document
    .querySelector("#editar")
    .addEventListener("click", () => {
      route.push({ name: "editarCliente", params: { id: cliente } });
    });
});

const mudarStatusCliente = async () => {
  try {
    const response = await api.get(`/clientes/${cliente}`);
    if (response.data.active) {
      await api.delete(`/clientes/${cliente}`);
    } else {
      await api.put(`/clientes/ativar/${cliente}`);
    }
    carregarClientes();
    carregarRelatorioMes();
  } catch (erro) {
    console.log("Erro ao cancelar Cliente", erro);
  }
};

//Route para pagina Add
const route = useRouter();
const handleAdd = () => {
  route.push({ name: "novoCliente" });
};

//Route para pagina Mensagens
let campo_mensagem;
let botaoMsg;
onMounted(() => {
  campo_mensagem = document.querySelector(".campo_pesquisa_mensagem");
  botaoMsg = document.querySelector(".iconMensagem");
});

const opcoesMensagem = () => {
  campo_mensagem.style.display = "flex";
};

const tipoMensagem = (event) => {
  let tipo = event.target.id;
  if (tipo == "cobranca") {
    route.push({ name: "mensagem" });
  } else if (tipo == "aniversario") {
    route.push({ name: "mensagemAniversario" });
  }
};

//Route para pagina User
const handleUser = () => {
  route.push({ name: "user" });
};

//Fechar conteudos
const fechaConteudos = () => {
  if (painelOpcoes) {
    painelOpcoes.style.display = "none";
  }
  if (telaLista) {
    telaLista.style.display = "none";
  }
  if (campo_mensagem) {
    campo_mensagem.style.display = "none";
  }
  if (botaoPagamento) {
    botaoPagamento.style.display = "none";
    botaoConfirma.style.display = "none";
  }
};

//Acionar botão de pagamento
let botaoLabel;
let botaoPagamento;
let botaoConfirma;
onMounted(() => {
  botaoLabel = document.querySelector(".labelPagamento");
  botaoPagamento = document.querySelector("#pagamento");
  botaoConfirma = document.querySelector(".botaoPagamento");
});

const ativarBotao = () => {
  botaoLabel.addEventListener("click", () => {
    botaoPagamento.style.display = "flex";
    botaoConfirma.style.display = "flex";
  });
};

//Codigo para enviar o valor pago
const pagamentoCliente = async () => {
  console.log(botaoPagamento.value);
  console.log(cliente);
  try {
    const enviarPagamento = await api.post("/clientes/confirmarPagamento", {
      params: {
        clientId: cliente,
        amount: botaoPagamento.value,
      },
    });
    carregarClientes();
  } catch (erro) {
    console.log("Erro ao alterar status de pagamento do cliente", erro);
  }
};
</script>

<template>
  <div>
    <header>
      <div class="painel_text_icons">
        <p>Clientes</p>
      </div>
      <div class="painel_icons">
        <i class="pi pi-search"></i>
        <img class="img_filter" :src="IconFilter" alt="" />
      </div>

      <div class="painel_data_number">
        <div class="entradas_saidas">
          <p>{{ qtdEntradasMes }}</p>
          <p>Entradas</p>
        </div>
        <div class="ativos">
          <p>{{ mesAtual }}</p>
          <p>{{ quantidadesAtivo }}</p>
          <p>Ativos</p>
        </div>
        <div class="entradas_saidas">
          <p>{{ qtdSaidasMes }}</p>
          <p>Saidas</p>
        </div>
      </div>
      <p class="tipoLista">Clientes Ativos</p>
      <p class="dia_atual">Dia: {{ diaAtual }}</p>
    </header>

    <!-- Lista de Clientes ------------------------------------------------------------------>
    <main class="lista_clientes">
      <div class="painel_clientesAtivos">
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
        <!-- Escolhe tipo lista  -->
        <div class="campo_pesquisa_lista">
          <p @click="mudarLista" id="ativos">Clientes Ativos</p>
          <p @click="mudarLista" id="inativos">Clientes Inativos</p>
          <i @click="fechaConteudos" class="pi pi-times"></i>
        </div>
        <!-- ---------------------- -->

        <!--Opções cliente -->
        <div class="campo_cliente_opcoes">
          <p id="nomeCliente"></p>

          <label @click="ativarBotao" for="pagamento" class="labelPagamento"
            >Realizar pagamento</label
          >
          <input id="pagamento" type="number" placeholder="Valor" />
          <button class="botaoPagamento" @click="pagamentoCliente">
            Confirmar
          </button>
          <p @click="mudarStatusCliente" class="valorP"></p>
          <a :href="'https://wa.me/+55' + numeroCliente">Enviar Mensagem</a>
          <p id="editar" @click="handleAdd">Editar</p>
          <i @click="fechaConteudos" class="pi pi-times"></i>
        </div>
        <!-- ---------------------- -->
        <div
          @click="
            exibirOpcoes(
              cliente.id,
              cliente.nickname,
              cliente.active,
              cliente.phone
            )
          "
          class="painel_img_infos"
          v-for="cliente in exiberCliente"
          :key="cliente.id"
        >
          <img class="img_user" :src="IconUser" alt="" />
          <div>
            <p>{{ cliente.nickname }}</p>
            <p>{{ cliente.phone }}</p>
             <p id="diaPagamento" v-if="cliente.lastPaymentDate">
            Pago dia: {{ cliente.lastPaymentDate }}
          </p>
          </div>
         
          <div>
            <p class="vencimento">{{ cliente.dueDay }}</p>
          </div>
        </div>

        <div class="painel_paginacao">
          <div class="painel_array_pag">
            <img
              v-if="previous"
              id="arrowLeft"
              @click="proximaPagina"
              class="arrowLeft"
              :src="IconArrow"
              alt=""
            />

            <div class="pag">{{ numeroPagina }}</div>

            <img
              v-if="next"
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
    </main>
    <!-- ---------------------------------------------------------------->

    <!-- Escolha que tipo de Mensagem -->
    <div class="campo_pesquisa_mensagem">
      <p @click="tipoMensagem" id="cobranca">Mensagem Cobrança</p>
      <p @click="tipoMensagem" id="aniversario">Mensagem Aniversário</p>
      <i @click="fechaConteudos" class="pi pi-times"></i>
    </div>
    <!-- ----------------------------------------- -->

    <footer>
      <img class="IconMensagem" @click="opcoesMensagem" :src="IconZap" alt="" />
      <img @click="handleAdd" :src="IconAdd" alt="" />
      <img @click="handleUser" :src="IconUserFooter" alt="" />
    </footer>
  </div>
</template>

<style>
@import "primeicons/primeicons.css";
.pi-times {
  position: absolute;
  top: 15px;
  right: 10px;
  font-size: 20px;
  font-weight: 1000;
  color: #0d2a14;
  cursor: pointer;
}

#diaPagamento {
  font-size: 15px;
  display: inline-block;
  margin-left: 30px;
}

.lista_clientes {
  height: 500px;
  width: 100%;
  max-width: 800px;
  margin: 35px auto;
  font-family: "itim";
  color: #00852c;
}

header {
  width: 100%;
  max-width: 800px;
  height: 135px;
  margin: 0 auto;
  background-color: #0d2a14;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  position: relative;
}

.pesquisa_cliente {
  margin-top: 200px;
  width: 300px;
  height: 40px;
  border-radius: 4px;
  border: none;
  outline: none;
  text-align: center;
}

.painel_text_icons {
  color: white;
  display: flex;
  justify-content: space-between;
}

.painel_text_icons p {
  margin: 20px 20px;
  font-weight: 200;
  font-size: 20px;
  font-style: normal;
  font-family: "Quicksand", sans-serif;
}

.painel_data_number {
  display: flex;
  justify-content: space-around;
  margin: 0 auto;
  height: 30px;
  width: 100%;
  max-width: 600px;
  color: white;
  margin-top: 20px;
}

.ativos,
.entradas_saidas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 2px;
  font-family: "itim";
}

.ativos {
  font-size: 17px;
}

.ativos p:nth-child(1) {
  text-transform: uppercase;
}
.ativos p:nth-child(2) {
  font-size: 22px;
}

.entradas_saidas {
  font-size: 17px;
}
.tipoLista {
  font-family: "itim";
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: -25px;
}
.dia_atual {
  font-family: "itim";
  position: absolute;
  right: 20px;
  bottom: -25px;
}

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

.campo_pesquisa_lista,
.campo_cliente_opcoes,
.campo_pesquisa_mensagem {
  background-color: rgba(102, 102, 102, 0.608);
  backdrop-filter: blur(5px);
  position: absolute;
  left: 50%;
  top: 200px;
  transform: translate(-50%);
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
  width: 300px;
  border-radius: 20px;
  z-index: 1;
  font-family: sans-serif;
  padding: 10px 0;
}

.campo_pesquisa_lista p,
.campo_pesquisa_mensagem p {
  border-radius: 15px;
  width: calc(100% - 80px);
  padding: 10px 0;
  max-width: 300px;
  text-align: center;
  color: #ffffff;
  cursor: pointer;
  font-family: "itim";
}
.campo_pesquisa_mensagem p {
  background-color: #00852c;
}

.campo_pesquisa_lista p:nth-child(1) {
  background-color: #028500;
}
.campo_pesquisa_lista p:nth-child(2) {
  background-color: #851000;
}

.campo_cliente_opcoes {
  font-family: "itim";
}

.campo_cliente_opcoes p {
  width: 240px;
  height: 35px;
  padding: 7px 0;
  border: solid 1px;
  text-align: center;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.campo_cliente_opcoes a {
  text-decoration: none;
  width: 240px;
  height: 35px;
  padding: 7px 0;
  border: solid 1px;
  text-align: center;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #005085;
}

.campo_cliente_opcoes label {
  background-color: #028500;
  width: 240px;
  height: 35px;
  padding: 7px 0;
  border: solid 1px;
  text-align: center;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

#pagamento {
  border: none;
  border-radius: 50px;
  width: 100px;
  height: 30px;
  text-align: center;
  display: none;
  outline: none;
}

.botaoPagamento {
  padding: 5px 20px;
  border: none;
  border-radius: 20px;
  display: none;
  background-color: #00852c;
  color: white;
}

.campo_cliente_opcoes p:nth-child(7) {
  background-color: #005085;
  width: 100px;
}

#nomeCliente {
  background-color: transparent;
  text-transform: uppercase;
  color: #0d2a14;
  font-size: 25px;
  font-weight: 600;
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
  border-radius: 5px;
  cursor: pointer;
}

.painel_img_infos div {
  display: inline-block;
  vertical-align: top;
  margin: 0 0 0 10px;
  font-size: 16px;
}

.painel_img_infos div p:nth-child(1) {
  margin-bottom: 5px;
  font-size: 20px;
}
.painel_img_infos div p:nth-child(2) {
  display: inline-block
}

.painel_img_infos div:nth-child(3) p {
  background-color:#00852c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;
}


.vencimento {
  position: absolute;
  font-size: 30px;
  right: 5px;
  bottom: -3px;
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

footer {
  background-color: #0d2a14;
  width: 100%;
  max-width: 800px;
  height: 80px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

footer img {
  width: 30px;
  height: 30px;
}

footer img:nth-child(2) {
  width: 45px;
  height: 45px;
}

footer img:hover {
  transform: scale(1.1);
}
</style>
