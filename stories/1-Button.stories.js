import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import MyButton from './MyButton'
import BaseButton from '../components/button/BaseButton.vue'
import TypescriptButton from '../components/button/TypescriptButton.vue'
import { withKnobs } from '@storybook/addon-knobs'

export default {
  title: 'Button',
}

export const text = () => ({
  components: { MyButton },
  template: '<my-button @click="action">Hello Button</my-button>',
  methods: { action: action('clicked') },
})

text.story = {
  parameters: {
    jest: ['button.spec.ts'],
    info: {},
  },
}

export const jsx = () => ({
  components: { MyButton },
  render(h) {
    return <my-button onClick={this.action}>With JSX</my-button>
  },
  methods: { action: linkTo('clicked') },
})

jsx.story = {
  parameters: {
    info: {},
  },
}

export const emoji = () => ({
  components: { MyButton },
  template: '<my-button @click="action">😀 😎 👍 💯</my-button>',
  methods: { action: action('clicked') },
})

emoji.story = {
  parameters: {
    info: {},
  },
}

export const baseButton = () => ({
  components: { BaseButton },
  template: `<base-button @click="action">baseButton</base-button>`,
  methods: { action: action('clicked') },
})

baseButton.story = {
  parameters: {
    info: {},
  },
}

export const typescriptButton = () => ({
  components: { TypescriptButton },
  template: `<TypescriptButton @click="action">TypescriptButton</TypescriptButton>`,
  methods: { action: linkTo('Button|baseButton') },
})

typescriptButton.story = {
  parameters: {
    notes: 'test notes',
    info: {},
  },
}
