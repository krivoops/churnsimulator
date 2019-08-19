<template>
  <div class="min-h-screen w-full">
    <h1 class="text-3xl my-5 text-center">Churn Simulator</h1>
    <div class="flex justify-center flex-column w-auto mt-3 height shadow-lg mx-10">
      <div class="border-r-0 rounded-r-none flex-0 w-48 border-2 rounded-lg px-3 py-3">
        <div class="text-center uppercase">Dashboard</div>
      </div>
      <churn-simulator class="flex-1 border-2 w-full overflow-hidden height overflow-hidden">
        <game-manage-screen></game-manage-screen>
      </churn-simulator>
      <GameMessages class="border-l-0 rounded-l-none flex-0 w-48 border-2 rounded-lg px-3 py-3 overflow-hidden" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import GameManageScreen from '@/components/GameManageScreen.vue';
  import GameMessages from '@/components/GameMessages.vue';

  @Component({
    components: {
      GameManageScreen,
      GameMessages,
    },
  })
  export default class Game extends Vue {}
</script>

<style lang="scss">
  .height {
    height: 82vh;
  }
</style>
