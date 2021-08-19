<template>
  <div class="loader-model">
      <!-- <div class="loader"></div> -->
      <object :data="spinnerSVG" type=""></object>
  </div>
</template>
<script>
export default {
  name: "BaseSpinner"
  ,data(){
    return{
      spinnerSVG: require("../assets/icon/loading.svg")
    }
  }
}
</script>
<style>
.loader-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: #fff; */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

/* .loader {
  border: 5px dotted #9cd49a;
  border-radius: 50%;
  border-top: 5px dotted rgb(44, 160, 28);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
} 

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
} */
</style>