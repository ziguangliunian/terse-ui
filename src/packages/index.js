import './fonts/iconfont.css'
import './loading'
import './assets/three-dots.svg'
import aside from "./aside/aside";
import button from "./button/button";
import buttonGroup from "./buttonGroup/buttonGroup";
import checkbox from "./checkbox/checkbox";
import checkboxGroup from "./checkbox/checkboxGroup";
import container from "./container/container";
import datePicker from "./datePicker/datePicker";
import dialog from "./dialog/dialog";
import divider from "./divider/divider";
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

const components = [
  aside, buttonGroup, button, checkbox, checkboxGroup, container,
  datePicker, dialog, divider, footer, header, icon, link, main,
 radio, radioButton, radioGroup, Switch, tag, tabs, tabPane
]
const install = (Vue) => {
  components.forEach(com => {
    Vue.component(com.name, com)
    Vue.prototype.$message=Message
  })
}
export default {
  install
}