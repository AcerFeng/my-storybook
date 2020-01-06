<template>
  <div class="el-button-group">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class ElButtonGroup extends Vue {
  name = 'ElButtonGroup'
}
</script>
