<template>
  <div class="home">
    
<date-pick v-model="data"></date-pick>
    
  </div>
</template>

<script>
  import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

export default {
  components:{
    DatePick
  },
  data(){
    return{
      data: null
    }
  }
}
</script>

<style scoped>

  @font-face {
    font-family: 'GoogleSans-Regular';
    src: url('../../../static/font/GoogleSans-Regular.otf') format('opentype');
  }
  .home{
    box-sizing: border-box;
    position: absolute;
    top: 61px;  
    left: 221px;
    width: calc(100% - 221px);
    height: calc(100vh - 61px);
  }
  .title{

  }
</style>