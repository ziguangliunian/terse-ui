import Vue from 'vue'
import message from './message'

const messageConstructor = Vue.extend(message)
let seed = 1
let instance
let instances = []
const Message = function (options = {}) {
  if (typeof options === 'string') {
    options = {message: options}
  }
  const id = ++seed
  const userClose = options.onClose
  options.onClose = function () {
    Message.close(id, userClose)
  }
  let verticalOffset = options.offset || 20
  instances.forEach(vNode => {
    verticalOffset += vNode.$el.offsetHeight + 16
  })
  options.verticalOffset = verticalOffset
  options.isVisiable = true
  instance = new messageConstructor({data: options})
  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instances.push(instance)
  return instance
}
Message.close = function (id, close) {
  let len = instances.length
  let index = -1
  let clientHeight
  for (let i = 0; i < len; i++) {
    if (instances[i].id === id) {
      index = i
      clientHeight = instances[i].$el.clientHeight
      if (typeof close === 'function') {
        close(instances[i])
      }
      instances.splice(index, 1)
      break
    }
  }
  if (len <= 1 || index >= instances.length || index === -1) return
  for (let i = index; i < instances.length; i++) {
    const dom = instances[i].$el;
    dom.style.top = parseInt(dom.style.top) - clientHeight - 16 + 'px'
  }
}
Message.closeAll = function () {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].onClose()
  }
}
;['info', 'success', 'danger', 'warning'].forEach(type => {
  Message[type] = function (options = {}) {
    if (typeof options === 'string') {
      options = {
        type,
        message: options
      }
    }
    Message(options)
  }
})
export default Message