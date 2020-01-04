interface Style {
  marginLeft?: string
  marginRight?: string
}

import '../theme-chalk/row.scss'

export default {
  name: 'ElRow',
  componentName: 'ElRow',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start',
    },
    align: {
      type: String,
      default: 'top',
    },
  },
  computed: {
    style() {
      const ret: Style = {}
      if (this.gutter) {
        // 第一个marginleft和子元素col的paddingleft抵消，内容才能正常显示
        ret.marginLeft = `-${this.gutter / 2}px`
        ret.marginRight = ret.marginLeft
      }
      return ret
    },
  },
  render(h) {
    return h(
      this.tag,
      {
        class: [
          'el-row',
          this.justify !== 'start' ? `is-justify-${this.justify}` : '',
          this.align !== 'top' ? `is-align-${this.align}` : '',
          { 'el-row--flex': this.type === 'flex' },
        ],
        style: this.style,
      },
      this.$slots.default,
    )
  },
}
