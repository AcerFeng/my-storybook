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

/** 能否选中文本 */
@mixin utils-user-select($value) {
  user-select: $value;
  -moz-user-select: $value;
  -webkit-user-select: $value;
  -ms-user-select: $value;
}

@mixin button-plain($color) {
  color: $color;
  background: mix($--color-white, $color, 90%);
  border-color: mix($--color-white, $color, 60%);

  &:hover,
  &:focus {
    background: $color;
    border-color: $color;
    color: $--color-white;
  }

  &:active {
    background: mix($--color-black, $color, $--button-active-shade-percent);
    border-color: mix($--color-black, $color, $--button-active-shade-percent);
    color: $--color-white;
    outline: none;
  }

  &.is-disabled {
    &,
    &:hover,
    &:focus,
    &:active {
      color: mix($--color-white, $color, 40%);
      background-color: mix($--color-white, $color, 90%);
      border-color: mix($--color-white, $color, 80%);
    }
  }
}

@mixin button-variant($color, $background-color, $border-color) {
  color: $color;
  background-color: $background-color;
  border-color: $border-color;

  &:hover,
  &:focus {
    background: mix(
      $--color-white,
      $background-color,
      $--button-hover-tint-percent
    );
    border-color: mix(
      $--color-white,
      $border-color,
      $--button-hover-tint-percent
    );
    color: $color;
  }

  &:active {
    background: mix(
      $--color-black,
      $background-color,
      $--button-active-shade-percent
    );
    border-color: mix(
      $--color-black,
      $border-color,
      $--button-active-shade-percent
    );
    color: $color;
    outline: none;
  }

  &.is-active {
    background: mix(
      $--color-black,
      $background-color,
      $--button-active-shade-percent
    );
    border-color: mix(
      $--color-black,
      $border-color,
      $--button-active-shade-percent
    );
    color: $color;
  }

  &.is-disabled {
    &,
    &:hover,
    &:focus,
    &:active {
      color: $--color-white;
      background-color: mix($background-color, $--color-white);
      border-color: mix($border-color, $--color-white);
    }
  }

  &.is-plain {
    @include button-plain($background-color);
  }
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
      position: absolute;
      left: -1px;
      top: -1px;
      right: -1px;
      bottom: -1px;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.35);
    }
  }

  // .is-round
  @include when(round) {
    border-radius: 20px;
    padding: 12px 23px;
  }
  // .is-circle
  @include when(circle) {
    border-radius: 50%;
    padding: $--button-padding-vertical;
  }
  // &--primary
  @include m(primary) {
    @include button-variant(
      $--button-primary-font-color,
      $--button-primary-background-color,
      $--button-primary-border-color
    );
  }

  @include m(success) {
    @include button-variant(
      $--button-success-font-color,
      $--button-success-background-color,
      $--button-success-border-color
    );
  }

  @include m(warning) {
    @include button-variant(
      $--button-warning-font-color,
      $--button-warning-background-color,
      $--button-warning-border-color
    );
  }

  @include m(danger) {
    @include button-variant(
      $--button-danger-font-color,
      $--button-danger-background-color,
      $--button-danger-border-color
    );
  }

  @include m(info) {
    @include button-variant(
      $--button-info-font-color,
      $--button-info-background-color,
      $--button-info-border-color
    );
  }

  @include m(medium) {
    @include button-size(
      $--button-medium-padding-vertical,
      $--button-medium-padding-horizontal,
      $--button-medium-font-size,
      $--button-medium-border-radius
    );

    @include when(circle) {
      padding: $--button-medium-padding-vertical;
    }
  }

  @include m(small) {
    @include button-size(
      $--button-small-padding-vertical,
      $--button-small-padding-horizontal,
      $--button-small-font-size,
      $--button-small-border-radius
    );

    @include when(circle) {
      padding: $--button-small-padding-vertical;
    }
  }

  @include m(mini) {
    @include button-size(
      $--button-mini-padding-vertical,
      $--button-mini-padding-horizontal,
      $--button-mini-font-size,
      $--button-mini-border-radius
    );

    @include when(circle) {
      padding: $--button-mini-padding-vertical;
    }
  }

  @include m(text) {
    border-color: transparent;
    color: $--color-primary;
    background: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover,
    &:focus {
      color: mix(
        $--color-white,
        $--color-primary,
        $--button-hover-tint-percent
      );
      border-color: transparent;
      background-color: transparent;
    }

    &:active {
      color: mix(
        $--color-black,
        $--color-primary,
        $--button-active-shade-percent
      );
      border-color: transparent;
      background-color: transparent;
    }

    &.is-disabled,
    &.is-disabled:hover,
    &.is-disabled:focus {
      border-color: transparent;
    }
  }
}
</style>
