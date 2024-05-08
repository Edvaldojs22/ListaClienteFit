<script setup>
import Logo from "../assets/img/imgLogo.png";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRouter();


const getIdFromPath = () => {
    const path = route.currentRoute.value.fullPath;
    const id = path.split('/').pop(); // Isso pega o último segmento da URL
    return id;
};
const idCliente = getIdFromPath();

const carregarDadosCliente = async () => {
    const response = await fetch(`http://localhost:3000/clientes/${idCliente}`);
    if (response.ok) {
        const dados = await response.json();
        cliente.value = { ...dados };
    } else {
        console.error('Erro ao carregar os dados do cliente');
    }
};
onMounted(carregarDadosCliente);






const cliente = ref({
    name: '',
    phone: '',
    birthdate: '',
    enrollmentDate: '',
    dueDay: '',
    active: true
});

const editarCliente = async () => {
    // Preparar os dados do cliente para envio
    const clienteData = {
        name: cliente.value.name,
        phone: cliente.value.phone,
        birthdate: cliente.value.birthdate,
        enrollmentDate: cliente.value.enrollmentDate,
        exitDate: cliente.value.exitDate,
        dueDay: cliente.value.dueDay,
        active: cliente.value.active
    };
  

    // Fazer a requisição PUT para o servidor
    const response = await fetch(`http://localhost:3000/clientes/${idCliente}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteData)
    });

    if (response.ok) {
        // Tratamento de sucesso
        route.push({ name: 'home' });
        console.log('Sucesso')
    } else {
        // Tratamento de erro
        console.error('Erro ao editar o cliente');
    }
      console.log(cliente.value.name)
};


</script>




<template>
    <div class="painel_login">
        <div class="cor_top"></div>
        <div class="cor_bottom"></div>
        <form @submit.prevent="editarCliente" action="" class="painel_add">
            <div class="painel_logoText">
                <img :src="Logo" alt="" />
                <p>Lista Cliente Fit</p>
            </div>

            <div class="caixa_ipuntAdd">
                <p>Nome:</p>
                <input v-model="cliente.name" id="username" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Telefone:</p>
                <input  v-model="cliente.phone" id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Data Nascimento:</p>
                <input v-model="cliente.birthdate" id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Data Entrada:</p>
                <input  v-model="cliente.enrollmentDate" id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Vencimento:</p>
                <input  v-model="cliente.dueDay" id="password" type="text" />
            </div>
            <div class="caixa_ipuntAdd">
                <p>Ativo:</p>
                <input  v-model="cliente.active" id="password" type="text" />
            </div>




            <button type="submit" id="botao_add">
                Editar
            </button>
        </form>
    </div>
</template>

<style>
.painel_add {
    width: calc(100% - 20px);
    max-width: 350px;
    height: calc(100% - 30px);
    max-height: 500px;
    background-color: #11991321;
    border-radius: 10px;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding: 20px;
}

.caixa_ipuntAdd {
    display: flex;
    border-bottom: solid 1px #00852c;
}

.caixa_ipuntAdd p {
    font-family: "itim";
    font-size: 18px;
}

.caixa_ipuntAdd input {
    border: none;
    background-color: transparent;
    outline: none;
    width: 170px;
    padding-left: 20px;
    margin-top: 5px;
    font-size: 15px;
    font-weight: bold;
}

.painel_add .caixa_ipuntAdd:nth-child(5) input {
    width: 150px;
}

.painel_add .caixa_ipuntAdd:nth-child(6) {
    width: 160px;
    margin: 0 auto;

}

#botao_add {
    width: 100%;
    height: 35px;
    margin-top: 40px;
    font-size: 19px;
    border: none;
    border-radius: 10px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    font-weight: 100;
    background-image: linear-gradient(290deg, #55ee99, #174118);
    color: white;
}

#botao_add:hover {
    transform: scale(1.1);
}
</style>