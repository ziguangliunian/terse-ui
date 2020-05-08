import Vue from 'vue'
import App from './App.vue'
import radio from "./components/radio/radio";
import radioGroup from "./components/radio/radioGroup";
import radioButton from "./components/radio/radioButton";
import checkboxGroup from "./components/checkbox/checkboxGroup";
import checkbox from "./components/checkbox/checkbox";
import tag from './components/tag/tag'
import divider from "./components/divider/divider";
import dialog from "./components/dialog/dialog";
import button from "./components/button/button";
import './components/loading'
import('./assets/base.css')
Vue.component(radio.name,radio)
Vue.component(radioGroup.name,radioGroup)
Vue.component(radioButton.name,radioButton)
Vue.component(checkbox.name,checkbox)
Vue.component(checkboxGroup.name,checkboxGroup)
Vue.component(tag.name,tag)
Vue.component(divider.name,divider)
Vue.component(dialog.name,dialog)
Vue.component(button.name,button)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
