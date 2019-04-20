import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import apollo from './apolloClient';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './index.css';

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;
Vue.use(BootstrapVue);

new Vue({
    render: h => h(App),
}).$mount('#app');
