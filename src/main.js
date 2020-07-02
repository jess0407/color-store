import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import ColorStore from "./components/ColorStore";
import FontStore from "./components/FontStore";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/font", component: FontStore },
  { path: "", component: ColorStore }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
