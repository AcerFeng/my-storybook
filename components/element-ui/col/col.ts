interface Style {
  paddingLeft?: string
  paddingRight?: string
}

import '../theme-chalk/col.scss'

export default {
  name: 'ElCol',
  props: {
    span: {
      type: Number,
      default: 24,
    },
    tag: {
      type: String,
      default: 'div',
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object], // < 768px
    sm: [Number, Object], // >= 768px
    md: [Number, Object], // >= 992px
    lg: [Number, Object], // >= 1200px
    xl: [Number, Object], // >= 1920px
  },
  computed: {
    // 间距
    gutter() {
      let parent = this.$parent
      // 向上找到一个ElRow作为父级
      while (parent && parent.$options.componentName !== 'ElRow') {
        parent = parent.$parent
      }
      return parent ? parent.gutter : 0
    },
  },
  render(h) {
    let classList = []
    let style: Style = {}

    if (this.gutter) {
      // left + right = gutter
      style.paddingLeft = this.gutter / 2 + 'px'
      style.paddingRight = style.paddingLeft
    }
    console.log(this.gutter)
    ;['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `el-col-${prop}-${this[prop]}`
            : `el-col-${this[prop]}`,
        )
      }
    })
    ;['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`el-col-${size}-${this[size]}`)
      } else if (typeof this[size] === 'object') {
        let props = this[size]
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `el-col-${size}-${prop}-${props[prop]}`
              : `el-col-${size}-${props[prop]}`,
          )
        })
      }
    })

    return h(
      this.tag,
      {
        class: ['el-col', classList],
        style,
      },
      this.$slots.default,
    )
  },
}
