<template>
  <label
    class="el-radio"
    :class="[
      border && radioSize ? 'el-radio--' + radioSize : '',
      { 'is-disabled': isDisabled },
      { 'is-focus': focus },
      { 'is-bordered': border },
      { 'is-checked': model === label },
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
    @keydown.space.stop.prevent="model = isDisabled ? model : label"
  >
    <span
      class="el-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': model === label,
      }"
    >
      <span class="el-radio__inner"></span>
      <input
        ref="radio"
        class="el-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        v-model="model"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
      />
    </span>
    <span class="el-radio__label" @keydown.stop>
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script lang="ts">
import { Component, Mixins, Inject, Prop, Vue } from 'vue-property-decorator'
import Emitter from '../src/mixins/emitter'

@Component
export default class ElRadio extends Mixins(Emitter) {
  // name = 'ElRadio'
  componentName = 'ElRadio'

  @Inject({ default: '' }) readonly elForm!: any
  @Inject({ default: '' }) readonly elFormItem!: any

  @Prop() readonly value!: Object
  @Prop({ type: String, default: '' }) readonly label!: Object
  @Prop({ type: Boolean }) readonly disabled!: boolean
  @Prop({ type: String, default: '' }) name!: string
  @Prop({ type: Boolean, default: false }) border!: boolean
  @Prop({ type: String }) readonly size!: string

  focus = false

  _radioGroup: any = undefined

  get isGroup() {
    let parent = this.$parent
    while (parent) {
      if ((parent.$options as any).componentName !== 'ElRadioGroup') {
        parent = parent.$parent
      } else {
        this._radioGroup = parent
        return true
      }
    }
    return false
  }

  get model() {
    return this.isGroup ? this._radioGroup.value : this.value
  }

  set model(val) {
    if (this.isGroup) {
      this.dispatch('ElRadioGroup', 'input', [val])
    } else {
      this.$emit('input', val)
    }
    this.$refs.radio &&
      ((this.$refs.radio as any).checked = this.model === this.label)
  }

  get _elFormItemSize() {
    return (this.elFormItem || {}).elFormItemSize
  }

  get radioSize() {
    const temRadioSize =
      this.size || this._elFormItemSize || ((this as any).$ELEMENT || {}).size
    return this.isGroup
      ? this._radioGroup.radioGroupSize || temRadioSize
      : temRadioSize
  }

  get isDisabled() {
    return this.isGroup
      ? this._radioGroup.disabled ||
          this.disabled ||
          (this.elForm || {}).disabled
      : this.disabled || (this.elForm || {}).disabled
  }

  get tabIndex() {
    return this.isDisabled || (this.isGroup && this.model !== this.label)
      ? -1
      : 0
  }

  handleChange() {
    this.$nextTick(() => {
      this.$emit('change', this.model)
      this.isGroup && this.dispatch('ElRadioGroup', 'handleChange', this.model)
    })
  }
}
</script>
