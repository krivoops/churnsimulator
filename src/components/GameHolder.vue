<template>
  <div>
    <div class="flex">
      <div>
        <div ref="target" class="border-2 w-full overflow-hidden shadow-lg">
          <div class="flex items-center justify-center h-full" v-if="gameNotStarted">
            <button class="bg-green-400 px-6 py-2 shadow" @click="start">
              Start
            </button>
          </div>
          <div v-if="message" class="flex bg-red-300 px-2 py-2 shadow text-base absolute right-0 bottom-0">
            {{ message }}</div>
        </div>
        <div class="flex text-center justify-center mt-8 text-2xl .relative">
          <div class="flex">Your score is: <br>{{ score }}</div>
        </div>
      </div>
      <div class="ml-10 mb-16">
        <div class="pb-2">Messages: </div>
        <div class="w-48 overflow-scroll h-screen" >
          <div v-for="message in messages" class="py-3 border border-white" :class="{'bg-red-100': message.result <= 0, 'bg-green-100': message.result > 0}">
            <b>{{ message.name }}:</b>
            <div>{{ message.message }}</div>
            <div>Health: {{message.result > 0 ? '+' : ''}}{{ message.result }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  import ChurnSimulator from '@/game/ChurnSimulator'

  @Component
  export default class Canvas extends Vue {
      message = '';
      game = null;
      gameNotStarted = true;

      score = 0;
      messages = [];

      start() {
          this.gameNotStarted = false;
          this.game.init();
      }

      public mounted() {
          this.game = new ChurnSimulator((this.$refs.target as Element));

          document.addEventListener('CSG.over', function () {
              console.log('over');
          });

          document.addEventListener('CSG.score', (e:any) => {
              this.score = e.detail.score
          });

          document.addEventListener('CSG.message', (e:any) => {

              this.messages.unshift(e.detail)
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
    max-width: 200px;
    max-height: 200px;
    text-align: center;
    transition: all .5s;
    cursor: pointer;
    background: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%,rgba(255,255,255,0) 50%);
    user-select: none;
    &.deleted {
      max-width: 0 !important;
      font-size: 0 !important;
      max-height: 0 !important;
    }
  }
</style>
