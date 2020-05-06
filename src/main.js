import Vue from 'vue'
import App from './App.vue'
import Switch from './components/switch/switch'
Vue.component(Switch.name,Switch)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
