import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.directive("resize", {
  // bind: function(el, binding) {},
  inserted: function(el, binding) {
    const callback = binding.value
    const direction = binding.arg
    const modifiers = binding.modifiers
    const result = () => {
      return direction === 'vertical'? window.innerHeight : window.innerWidth
    }
    const onResize = () => callback(result())
    window.addEventListener("resize", onResize)
    if (!modifiers || !modifiers.quiet) {
      onResize
    }
    el._onResize = onResize
  },
  unbind: function(el) {
    if(!el._onResize) {
      return
    }
    window.removeEventListener('resize', el._onResize)
    delete el._onResize
  }
})
new Vue({
  render: h => h(App),
}).$mount('#app')
