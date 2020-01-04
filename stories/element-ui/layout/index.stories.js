import { action } from '@storybook/addon-actions'

import Layout from '../../../components/element-ui/layout/index.vue'

export default {
  title: 'Element-ui|layout',
}

export const layout = () => ({
  components: { Layout },
  template: `
    <Layout />
  `,
})

layout.story = {
  parameters: {
    info: {},
  },
}
