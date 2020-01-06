<template>
  <div>
    <h3>{{ radio }}</h3>
    <ElRadio v-model="radio" label="1" border>备选项</ElRadio>
    <ElRadio v-model="radio" label="2" border>备选项2</ElRadio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ElRadio from './radio.vue'

@Component({
  components: {
    ElRadio,
  },
})
export default class Demo extends Vue {
  name = 'Demo'

  radio = '1'
}
</script>
