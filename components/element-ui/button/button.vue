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
@import '../theme-chalk/common/var.scss';
@import '../theme-chalk/mixins/mixins.scss';

/**
  BEM: 块（Block）、元素（Element）、修饰符（Modifier） css命名规则

*/

$namespace: 'el';

/** 能否选中文本 */
@mixin utils-user-select($value) {
  user-select: $value;
  -moz-user-select: $value;
  -webkit-user-select: $value;
  -ms-user-select: $value;
}

/** 按钮大小 */
@mixin button-size(
  $padding-vertical,
  $padding-horizontal,
  $font-size,
  $border-radius
) {
  padding: $padding-vertical $padding-horizontal;
  font-size: $font-size;
  border-radius: $border-radius;

  &.is-round {
    padding: $padding-vertical $padding-horizontal;
  }
}

/** 块（Block） */
@mixin b($block) {
  $B: $namespace + '-' + $block;

  .#{$B} {
    @content;
  }
}

@include b(button) {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: $--button-default-background-color;
  border: $--border-base;
  border-color: $--button-default-border-color;
  color: $--button-default-font-color;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: $--button-font-weight;

  @include utils-user-select(none);

  /** 兄弟节点间隔10px */
  & + & {
    margin-left: 10px;
  }

  @include button-size(
    $--button-padding-vertical,
    $--button-padding-horizontal,
    $--button-font-size,
    $--button-border-radius
  );

  &::-moz-focus-inner {
    border: 0;
  }

  &:hover,
  &:focus {
    color: $--color-primary;
    border-color: $--color-primary-light-7;
    background-color: $--color-primary-light-9;
  }

  &:active {
    color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
  }

  // 按钮中的图标
  & [class*='el-icon-'] {
    & + span {
      margin-left: 5px;
    }
  }

  // .is-plain
  @include when(plain) {
    &:hover,
    &:focus {
      background: $--color-white;
      border-color: $--color-primary;
      color: $--color-primary;
    }

    &:active {
      background: $--color-white;
      border-color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      outline: none;
    }
  }

  // .is-active
  @include when(active) {
    color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
    border-color: mix(
      $--color-black,
      $--color-primary,
      $--button-active-shade-percent
    );
  }

  // .is-disabled
  @include when(disabled) {
    &,
    &:hover,
    &:focus {
      color: $--button-disabled-font-color;
      cursor: not-allowed;
      background-image: none;
      background-color: $--button-disabled-background-color;
      border-color: $--button-disabled-border-color;
    }

    &.el-button--text {
      background-color: transparent;
    }

    &.is-plain {
      &,
      &:hover,
      &:focus {
        background-color: $--color-white;
        border-color: $--button-disabled-border-color;
        color: $--button-disabled-font-color;
      }
    }
  }

  // .is-loading
  @include when(loading) {
    position: relative;

    /*
      元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events
      属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，
      鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。
    */
    pointer-events: none;

    &::before {
      pointer-events: none;
      content: '';
    }
  }
}
</style>
