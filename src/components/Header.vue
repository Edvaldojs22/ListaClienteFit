<script>
import axios from 'axios';
import IconFilter from "../assets/img/filter.png";

export default {
  data() {
    return {
      currentTime: '',
      IconFilter: IconFilter,
      currentMonth: ''
    };
  },
  mounted() {
    this.fetchDateTime();
  },
  
  methods: {
    async fetchDateTime() {
      try {
        const response = await axios.get('https://worldtimeapi.org/api/ip');
        this.currentTime = response.data.datetime;
        this.currentMonth = new Date(this.currentTime).toLocaleString('default', {month: "long"})
        console.log(this.currentMonth)
      } catch (error) {
        console.error('Erro ao obter data e hora:', error);
      }
    }
  }
};

</script>


<template>
  <header>
    <div class="painel_text_icons">
      <p>Clientes</p>
      <div class="painel_icons">
        <i class="pi pi-search"></i>
        <img class="img_filter" :src="IconFilter" alt="" />
      </div>
      <div>
        Mês: {{currentMonth}}
      </div>
    </div>
  </header>
</template>

<style scoped>

header {
  width: 100%;
  max-width: 800px;
  height: 150px;
  margin: 0 auto;
  background-color: #2e4e3f;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}

.painel_text_icons {
  color: white;
  display: flex;
  justify-content: space-between;
}

.painel_text_icons p{
  margin: 20px 20px;
  font-weight: 200;
  font-size: 25px;
  font-style: normal;
  font-family: "Quicksand", sans-serif;
 
}

.painel_icons{
  margin: 20px 20px 0 0;
}
.painel_icons i{
  margin-right: 20px;
  font-size: 30px;
}

.img_filter {
  width: 30px;
  height: 30px;
}

</style>


