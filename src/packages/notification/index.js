import Vue from 'vue'
import notification from "./notification.vue";

const notificationConstructor = Vue.extend(notification)
let instance
let instances = []
let seed = 1
const Notification = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      title: options
    }
  }
  const userClose = options.onClose
  const id = seed++
  options.onClose = function () {
    Notification.onClose(userClose, id)
  }
  let verticalOffset = options.offset || 20
  let position = options.position || 'top-right'
  instances.filter(instance => instance.position === position).forEach(vNode => {
    verticalOffset += vNode.$el.offsetHeight + 16
  })
  options.verticalOffset = verticalOffset
  instance = new notificationConstructor({
    data: options
  })
  instance.id = id
  instance.visiable = true
  instance.$mount()
  document.body.appendChild(instance.$el)
  instances.push(instance)
  return instance

}
Notification.onClose = function (close, id) {
  let position
  let offsetHeight
  let index = -1
  for (let i = 0; i < instances.length; i++) {
    if (instances[i].id === id) {
      position = instances[i].position
      offsetHeight = instances[i].$el.offsetHeight
      index = i
      if (typeof close === 'function') {
        close(instances[i])
      }
      break
    }
  }
  if (index === -1) {
    return;
  }
  instances.splice(index, 1)
  if ((index >= instances.length) || (index === -1) || (!instances.length)) {
    return
  }
  let place = position.indexOf('top') !== -1 ? 'top' : 'bottom'
  for (let i = index; i < instances.length; i++) {
    if (instances[i].position === position) {
      instances[i].$el.style[place] = parseInt(instances[i].$el.style[place]) - offsetHeight - 16 + 'px'
    }
  }

}
Notification.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close()
  }
}
export default Notification