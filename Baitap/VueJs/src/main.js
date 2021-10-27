import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import {routes} from './router/index.js'
Vue.config.productionTip = true


const router = new VueRouter({
  mode : 'history',
  routes,
})
/**
 * Chuyển tiêu đề trang
 * Created By TBN (5/8/2021)
 */
const DEFAULT_TITLE = 'Trang chủ';
router.afterEach((to) => {
    Vue.nextTick(() => {
        document.title = to.meta.title || DEFAULT_TITLE;
    });
});

Vue.use(VueRouter)
/**
 * Sự kiện click outside cho combobox
 * Created By TBN (25/7/2021)
 */
Vue.directive("click-outside", {
  bind: function(element, binding, vnode) {
    element.clickOutsideEvent = function(event) {
      //  check that click was outside the el and his children
      if (!(element === event.target || element.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
        // binding.value(); run the arg
      }
    };
    document.body.addEventListener("click", element.clickOutsideEvent);
  },
  unbind: function(element) {
    document.body.removeEventListener("click", element.clickOutsideEvent);
  },
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
