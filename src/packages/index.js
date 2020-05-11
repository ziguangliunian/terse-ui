import './fonts/iconfont.css'
import alert from "./alert/alert";
import aside from "./aside/aside";
import badge from "./badge/badge";
import breadcrumb from "./breadcrumb/breadcrumb";
import breadcrumbItem from "./breadcrumb/breadcrumbItem";
import button from "./button/button";
import buttonGroup from "./buttonGroup/buttonGroup";
import card from "./card/card";
import checkbox from "./checkbox/checkbox";
import checkboxGroup from "./checkbox/checkboxGroup";
import container from "./container/container";
import datePicker from "./datePicker/datePicker";
import dialog from "./dialog/dialog";
import divider from "./divider/divider";
import drawer from "./drawer/drawer";
import footer from "./footer/footer";
import header from "./header/header";
import icon from "./icon/icon";
import link from "./link/link";
import main from "./main/main";
import radio from "./radio/radio";
import radioButton from "./radio/radioButton";
import radioGroup from "./radio/radioGroup";
import Switch from './switch/switch'
import tabPane from "./tabs/tabPane";
import tabs from "./tabs/tabs";
import tag from './tag/tag'
import Message from "./message";
import Notification from "./notification";
const components = [
  alert, aside, badge, breadcrumb, breadcrumbItem, buttonGroup, button, card, checkbox, checkboxGroup, container,
  datePicker, dialog, divider, drawer, footer, header, icon, link, main,
  radio, radioButton, radioGroup, Switch, tag, tabs, tabPane
]
const install = (Vue) => {
  components.forEach(com => {
    Vue.component(com.name, com)
    Vue.prototype.$message = Message
    Vue.prototype.$notification = Notification
  })
  const init = () => {
    let instance
    const fragment = document.createElement('div')
    fragment.style = 'position:absolute;left:0px;top:0px;width:100%;height:100%;z-index:100;background:#fff'
    const img = document.createElement('img')
    img.src = "https://ae01.alicdn.com/kf/H47d73fb38a72414fb623fcdf8a8cc9das.jpg"
    fragment.appendChild(img)
    img.style = 'position:absolute;width:50%;left:50%;top:50%;transform:translate(-50%,-50%)'
    instance = fragment
    return instance
  }
  Vue.directive('loading', {
    bind(el, binding) {
      const instance = init()
      if (binding.arg && typeof binding.arg === 'string') {
        const p = document.createElement('p')
        p.innerText = binding.arg
        p.style = 'position:absolute;width:100%;text-align:center;top:50%;margin:0px;margin-top:10px;color:#606266'
        instance.appendChild(p)
      }
      el.appendChild(instance)
      el.instance = instance
      if (binding.value) {
        instance.style.display = 'block'
      } else {
        instance.style.display = 'none'
      }
    },
    update(el, binding) {
      if (binding.value) {
        el.instance.style.display = 'block'
      } else {
        el.instance.style.display = 'none'
      }
    }
  })
}
export default {
  install
}