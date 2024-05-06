<script setup>
import Logo from "../assets/img/imgLogo.png";
import { useRouter } from "vue-router";

const route = useRouter();

const handleLogin = () => {


    route.push({ name: "Home" });
    console.log(route);
};

</script>

<template>
    <div class="painel_login">
        <div class="cor_top"></div>
        <div class="cor_bottom"></div>
        <form action="" class="painel_add">
            <div class="painel_logoText">
                <img :src="Logo" alt="" />
                <p>Lista Cliente Fit</p>
            </div>

            <div class="caixa_ipuntAdd">
                <p>Nome:</p>
                <input id="username" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Telefone:</p>
                <input id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Idade:</p>
                <input id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Data Entrada:</p>
                <input id="password" type="text" />
            </div>

            <div class="caixa_ipuntAdd">
                <p>Vencimento:</p>
                <input id="password" type="text" />
            </div>



            <button type="submit" id="botao_add">
                Salvar
            </button>
        </form>
    </div>
</template>

<style>
.painel_add {
    width: calc(100% - 50px);
    height: calc(100% - 30px);
    background-color: #11991321;
    border-radius: 10px;
    backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    padding: 20px;
}

.caixa_ipuntAdd {
    display: flex;
    border-bottom: solid 1px #00852c;
}

.caixa_ipuntAdd p {
    font-family: "itim";
    font-size: 20px;
}

.caixa_ipuntAdd input {
    border: none;
    background-color: transparent;
    outline: none;
    width: 200px;
    padding-left: 20px;
    margin-top: 5px;
}

.painel_add .caixa_ipuntAdd:nth-child(4) {
    width: 130px;
}

.painel_add .caixa_ipuntAdd:nth-child(5) input {
    width: 150px;
}

.painel_add .caixa_ipuntAdd:nth-child(6) {
    width: 190px;
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