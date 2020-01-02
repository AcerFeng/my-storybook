<template>
  <button
    class="el-button"
    @click="handleClick"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'el-button--' + type : '',
      buttonSize ? 'el-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
      },
    ]"
  >
    <i class="el-icon-loading" v-if="loading"></i>
    <i :class="icon" v-if="icon && !loading"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from 'vue-property-decorator'

@Component
export default class ElButton extends Vue {
  name = 'ElButton'

  @Inject({ default: '' }) readonly elForm!: any
  @Inject({ default: '' }) readonly elFormItem!: any

  @Prop({ type: String, default: 'default' }) readonly type!: string
  @Prop(String) readonly size!: string
  @Prop({ type: String, default: '' }) readonly icon!: string
  @Prop({ type: String, default: 'button' }) readonly nativeType!: string
  @Prop(Boolean) readonly loading!: boolean
  @Prop(Boolean) readonly disabled!: boolean
  @Prop(Boolean) readonly plain!: boolean
  @Prop(Boolean) readonly autofocus!: boolean
  @Prop(Boolean) readonly round!: boolean
  @Prop(Boolean) readonly circle!: boolean

  get _elFormItemSize() {
    return (this.elFormItem || {}).elFormItemSize
  }

  get buttonSize() {
    return (
      this.size || this._elFormItemSize || ((this as any).$ELEMENT || {}).size
    )
  }

  get buttonDisabled() {
    return this.disabled || (this.elForm || {}).disabled
  }

  handleClick(evt: Event) {
    this.$emit('click', evt)
  }
}
</script>

<style lang="scss" scoped>
/**
  BEM: 块（Block）、元素（Element）、修饰符（Modifier） css命名规则
  
 */
</style>
