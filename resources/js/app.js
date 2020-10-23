require('./bootstrap');
import VueTheMask from 'vue-the-mask';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


window.Vue = require('vue');

Vue.use(VueTheMask);
Vue.use(VueSweetalert2);

Vue.component('formulario-component', require('./components/FormularioComponent.vue').default);

const app = new Vue({
    el: '#app',
});