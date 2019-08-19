<template>
  <div class="flex justify-center min-h-full flex-column w-full mt-3">
    <div>
      <h1 class="text-3xl mb-3 text-center">Churn Simulator</h1>
      <div class="flex">
        <div>
          <churn-simulator>
            <game-manage-screen></game-manage-screen>
          </churn-simulator>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import GameManageScreen from '@/components/GameManageScreen.vue';

  @Component({
    components: {
      GameManageScreen,
    },
  })
  export default class Game extends Vue {}
</script>
