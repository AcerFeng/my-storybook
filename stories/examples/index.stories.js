import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import { withKnobs, text, boolean } from '@storybook/addon-knobs'

import BaseButton from '../../components/button/BaseButton.vue'
import TypescriptButton from '../../components/button/TypescriptButton.vue'

const localButton = () => ({
  components: { LocalButton: BaseButton },
  props: {
    disabled: {
      default: boolean('disabled', false),
    },
    label: {
      default: text('label', 'test label'),
    },
  },
  template:
    '<local-button :disabled="disabled" :label="label" @click="action"/>',
  methods: { action: action('clicked') },
})

localButton.story = {
  parameters: {
    jest: ['button.spec.ts'],
  },
}

storiesOf('Examples/Base usage', module)
  .add('Simple example', localButton, {
    info: {},
    notes: 'A very simple example of addon notes',
  })
  .add(
    'Show summary',
    () => ({
      components: { BaseButton },
      template: '<base-button @click="action" label="I\'m a button!"/>',
      methods: { action: action('clicked') },
    }),
    {
      info: `
        # This is _summary_

        You can write sumary in [Markdown](https://en.wikipedia.org/wiki/Markdown).

        There is also syntax highlighting powered by [Highlight.js](https://highlightjs.org/).

        \`\`\`js
        export function foo() {
          console.log('Hello, World!')
        }
        \`\`\`
      `,
    },
  )
  .add(
    'Typescript button',
    () => ({
      components: { TypescriptButton },
      template: '<TypescriptButton label="nila!"/>',
    }),
    {
      info: {},
    },
  )
