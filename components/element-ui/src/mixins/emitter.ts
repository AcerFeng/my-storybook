import { Component, Vue } from 'vue-property-decorator'

function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.componentName

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params))
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]))
    }
  })
}

@Component
// @ts-ignore
export default class Emitter extends Vue {
  dispatch(conponentName, eventName, params) {
    let parent = this.$parent || this.$root
    let name = (parent.$options as any).componentName

    while (parent && (!name || name !== conponentName)) {
      parent = parent.$parent

      if (parent) {
        name = (parent.$options as any).conponentName
      }
    }
    if (parent) {
      // 用父级emit事件 如：radio => radio-group => ElFormItem(el.form.change)
      parent.$emit.apply(parent, [eventName].concat(params))
    }
  }

  broadcast(conponentName, eventName, params) {
    broadcast.call(this, conponentName, eventName, params)
  }
}
