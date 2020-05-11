import Vue from 'vue'
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
