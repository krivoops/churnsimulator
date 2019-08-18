<template>
  <div>
    <div ref="target" class="border-2 w-full overflow-hidden shadow-lg">
    </div>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import ChurnSimulator from '@/game/ChurnSimulator'

@Component
export default class Canvas extends Vue {
    message = '';

  public mounted() {
      new ChurnSimulator((this.$refs.target as Element));

      document.addEventListener('CSG.over', function () {
          console.log('over');
      });

      document.addEventListener('CSG.CD', () => {
          this.message = 'This action is under CD';
          setTimeout(() => {
              this.message = '';
          }, 2000)
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
    user-select: none;
  }
</style>
