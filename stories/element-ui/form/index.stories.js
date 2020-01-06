import { action } from '@storybook/addon-actions'

import RadioDemo from '../../../components/element-ui/radio/demo.vue'

export default {
  title: 'Element-ui|form',
}

export const radio = () => ({
  components: { RadioDemo },
  template: `
    <RadioDemo />
  `,
})

radio.story = {
  parameters: {
    info: {},
  },
}
