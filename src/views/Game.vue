<template>
  <div class="flex justify-center flex-column w-full mt-3">
    <div>
      <h1 class="flex text-3xl">Churn Simulator</h1>
      <game-holder></game-holder>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GameHolder from '@/components/GameHolder.vue';

@Component({
  components: {
    GameHolder,
  },
})
export default class Home extends Vue {}
</script>
