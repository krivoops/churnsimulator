<template>
  <div>
    <div ref="target" class="border-2 w-full">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ChurnSimulator from '@/game/ChurnSimulator'

@Component
export default class Canvas extends Vue {
  public mounted() {
      new ChurnSimulator((this.$refs.target as Element))
  }
}
</script>

<style lang="scss">
  .bubble {
    text-align: center;
    transition: all .5s;
  }
</style>
