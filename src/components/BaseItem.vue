<template>
        <router-link @click.native="toggleChosen" tag="div" :to="{path : link}" active-class="active" class="navbar-item-text " :class="['navbar-item',{'toggle-navbar' : toggle.isToggleNavbar}]" ><div class="navbar-icon" :class="classItem"></div> <div :class="[toggle.isToggleNavbar ? 'hide' : 'show']" v-if="!toggle.isToggleNavbar">{{content}}</div></router-link>
</template>

<script>
export default {
    props: ['classItem','content','isChosen','link','classItemActive'],
    created(){
    },
    data(){
        return{
        }
    },
    methods: {
        toggleChosen(){
            this.$store.commit('TOGGLE_ITEM_ACTIVE',this.classItem);
            localStorage.setItem('active',this.classItem);
        }
    },
    computed: {
        toggle() {
            return this.$store.state.toggle;
        },
    }
}
</script>

<style scoped>
    .active{
        background-color: #5d5e61 !important;
        color: #ffffff !important;
        border-left-color: #2ca01c !important;
        font-weight: 700;
    }
    /* .hide{
        animation: disappear 1s ease-out;
    }
    .show{
        animation: slide 1s ease-out;
    } */
</style>