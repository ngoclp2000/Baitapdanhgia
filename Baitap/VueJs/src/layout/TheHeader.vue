<template>
  <div class="header">
        <BaseCombobox ref="restaurant" class="cbo select-container filter-select"  dataType="restaurantList" />
        <div class="account-info">
            <div class="account-avatar"></div>
            <div class="account-name">Trịnh Bảo Ngọc</div>
            <div class="account-option"></div>
        </div>
    </div>
</template>

<script>
import BaseCombobox from '../components/BaseCombobox.vue'
export default {
    components:{
        BaseCombobox
    },
    mounted(){
        this.$refs.restaurant.setData(this.$store.state.data.restaurantList.map(a => Object.assign({}, a)));
        this.$refs.restaurant.updateInput(this.$store.state.data.restaurantList[0].content);
    }
}
</script>

<style>
</style>