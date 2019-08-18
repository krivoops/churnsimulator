<template>
  <div>
    <div ref="target" class="border-2 w-full overflow-hidden">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ChurnSimulator from '@/game/ChurnSimulator'

@Component
export default class Canvas extends Vue {
  public mounted() {
      new ChurnSimulator((this.$refs.target as Element));

      document.addEventListener('CSG.over', function () {
          console.log('over');
      })
  }
}
</script>

<style lang="scss">
  .bubble {
    text-align: center;
    transition: all .5s;
    cursor: pointer;
    background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(255,255,255,0) 50%);
  }
</style>
