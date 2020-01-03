import { action } from '@storybook/addon-actions'

import ElButton from '../../../components/element-ui/button/button.vue'

export default {
  title: 'Element-ui|Button',
}

export const baseButton = () => ({
  components: { ElButton },
  template: '<ElButton @click="action">默认按钮</ElButton>',
  methods: {
    action: action('clicked'),
  },
})

baseButton.story = {
  parameters: {
    info: {},
  },
}
