<template>
    <div class="navbar">
        <div class="logo-site" >
            <div class="toggle-icon" @click="toggleNavbar"></div>
            <div class="misa-logo"></div>
        </div>
       
        <div class="navbar-content" :class="{'toggle-navbar-content' : toggle.isToggleNavbar}">
            <BaseItem  v-for="(navbar,index) in navbarItems" :classItem="navbar.classItem" :content="navbar.content" :isChosen="navbar.isChosen" :link="navbar.link" :key="index">
            </BaseItem>
            <BaseButton @click="toggleNavbar" class="m-m-btn-resize-container"
                :class="{'m-btn-reverse' : toggle.isToggleNavbar }" classList="m-btn-resize" hasIcon="true"
                urlIcon="left-arrow.png" />
        </div>
    </div>
</template>

<script>
    //import $ from 'jquery'
    import BaseItem from '../components/BaseItem.vue'
    import BaseButton from '../components/BaseButton.vue'
    export default {
        data() {
            return {
                
            }
        },
        mounted() {
            if(window.innerWidth <= 1024){
                this.$store.commit('TOGGLE_NAVBAR');
            }
            console.log("Hi")
        }
        ,
        components: {
            BaseButton,
            BaseItem
        },
        methods: {
            /**
             * Gọi mutation toggle navbar trong store
             * Created by TBN 21/7/2021
             */
            toggleNavbar: function () {
                this.$store.commit('TOGGLE_NAVBAR');
            }
        },
        computed: {
            toggle() {
                return this.$store.state.toggle;
            },
            navbarItems(){
                return this.$store.state.navbarItems;
            }
        }
    }
</script>

<style scoped>
    .toggle-navbar-content {
        width: 52px !important;
    }
    .toggle-icon{
        position: absolute;
        width: 24px;
        height: 24px;
        left: 16px;
        top: 12px;
        cursor: pointer;
    }
</style>