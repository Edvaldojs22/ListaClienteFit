<script setup>
import IconZap from "../assets/img/zap.png";
import IconAdd from "../assets/img/add.png";
import IconUserFooter from "../assets/img/userFooter .png";

</script>

<template>
  <footer>
    <img :src="IconZap" alt="" />
    <img :src="IconAdd" alt="" />
    <img :src="IconUserFooter" alt="" />
  </footer>
</template>

<style scoped>

footer{
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

footer img{
    width: 30px;
    height: 30px;
}

footer img:nth-child(2){
    width: 45px;
    height: 45px;
}
</style>
