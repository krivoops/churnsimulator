<template>
  <div class="min-h-screen w-full">
    <h1 class="text-3xl my-5 text-center">
      Churn Simulator
    </h1>
    <div class="flex justify-center flex-column w-auto mt-3 height shadow-lg mx-10">
      <game-dashboard class="border-r-0 rounded-r-none flex-0 w-48 border-2 rounded-lg px-3 py-3" />
      <churn-simulator class="flex-1 border-2 w-full overflow-hidden height overflow-hidden">
        <game-manage-screen :displayAbout="displayAbout" @closeAbout="closeAbout"></game-manage-screen>
      </churn-simulator>
      <GameMessages class="border-l-0 rounded-l-none flex-0 w-48 border-2 rounded-lg px-3 py-3 overflow-hidden" />
    </div>
    <div class="my-5 text-center">
      <button class="text-sm mr-auto focus:outline-none bg-grey-400 px-6 py-2 shadow rounded-lg hover:bg-grey-300 hover:shadow-lg transition"
              @click="showAbout">
        About and How to play
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import GameManageScreen from '@/components/GameManageScreen.vue';
  import GameMessages from '@/components/GameMessages.vue';
  import GameDashboard from '@/components/GameDashboard.vue';

  @Component({
    components: {
      GameManageScreen,
      GameMessages,
      GameDashboard,
    },
  })
  export default class Game extends Vue {
      displayAbout = false;

      showAbout() {
          this.displayAbout = true
      }

      closeAbout() {
          this.displayAbout = false
      }
  }
</script>

<style lang="scss">
  .height {
    height: 78vh;
  }
</style>
