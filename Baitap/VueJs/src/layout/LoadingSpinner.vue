<template>
  <div class="loader-model">
      <div class="loader"></div>
  </div>
</template>
<script>
export default {
  name: "BaseSpinner"
}
</script>
<style>
.loader-model {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 4px solid #e9ebee;
  border-radius: 50%;
  border-top: 4px solid #019160;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>