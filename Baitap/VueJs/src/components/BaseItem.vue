<template>
        <router-link @click.native="toggleActive()" tag="div" :to="{path : link}" active-class="active" class="navbar-item-text " :class="['navbar-item',classItem,{'toggle-navbar' : toggle.isToggleNavbar}]" ><div :class="[toggle.isToggleNavbar ? 'hide' : 'show']" v-if="!toggle.isToggleNavbar">{{content}}</div></router-link>
</template>

<script>
export default {
    props: ['classItem','content','isChosen','link']
    ,data(){
        return{
        }
    }
    ,
    methods: {
        toggleActive: function () {
            // sessionStorage.setItem('active',this.classItem)
            // this.$store.commit('TOGGLE_ITEM_ACTIVE',this.classItem)
        }
    },
    computed: {
        toggle() {
            return this.$store.state.toggle;
        }
    }
}
</script>

<style scoped>
    .active{
        background-color: #019160 !important;
        color: #ffffff !important;
    }
    /* .hide{
        animation: disappear 1s ease-out;
    }
    .show{
        animation: slide 1s ease-out;
    } */
</style>