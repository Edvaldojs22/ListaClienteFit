<script setup>
import Logo from "../assets/img/imgLogo.png";
import { useRouter } from "vue-router";
import { ref } from "vue";

const route = useRouter();

const cliente = ref({
    name: '',
    phone: '',
    birthdate: '',
    enrollmentDate: '',
    dueDay: '',
    active: true
});

const adicionarCliente = async () => {
    // Preparar os dados do cliente para envio
    const clienteData = {
        name: cliente.value.name,
        phone: cliente.value.phone,
        birthdate: cliente.value.birthdate,
        enrollmentDate: cliente.value.enrollmentDate,
        dueDay: cliente.value.dueDay,
        active: cliente.value.active
    };

    // Fazer a requisição POST para o servidor
    const response = await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteData)
    });

    if (response.ok) {
        // Tratamento de sucesso
    
        route.push({ name: 'home' });
    } else {
        // Tratamento de erro
        console.error('Erro ao adicionar o cliente');
    }
};
</script>
<template>
    <div class="painel_login">
        <div class="cor_top"></div>
        <div class="cor_bottom"></div>
        <form @submit.prevent="adicionarCliente" action="" class="painel_add">
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
                <input v-model="cliente.phone"  id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Data Nascimento:</p>
                <input v-model="cliente.birthdate" id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Data Entrada:</p>
                <input v-model="cliente.enrollmentDate"   id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Vencimento:</p>
                <input  v-model="cliente.dueDay" id="password" type="text" />
            </div>
            <div class="caixa_ipuntAdd">
                <p>Ativo:</p>
                <input  v-model="cliente.active" id="password" type="text" />
            </div>


            <button @click="handleHome" type="submit" id="botao_add">
                Editar
            </button>
        </form>
    </div>
</template>
