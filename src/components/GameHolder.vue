<template>
  <div>
    <div class="flex">
      <div>
        <div ref="target" class="border-2 w-full overflow-hidden shadow-lg">
          <div class="flex items-center justify-center h-full" v-if="gameNotStarted">
            <div>
              <h2 class="text-center text-6xl" v-if="retry">Game over</h2>
              <div class="text-center">
                <button class="bg-green-400 px-6 py-2 shadow" @click="start">
                  {{ retry ? 'Retry' : 'Start' }}
                </button>
              </div>
              <template v-if="retry && scoreNotAdded">
                <div class="py-2 text-center mt-3">
                  Or enter your name to save score:
                  <input class="bg-white focus:outline-none mt-3 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" v-model="name">
                  <button class="bg-green-400 px-6 py-2 shadow mt-6" @click="saveScore">
                    Save
                  </button>
                </div>
              </template>
            </div>
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
        <div class="w-48 overflow-scroll h-screen max-height-66vh" >
          <div v-for="message in messages" class="py-3 px-2 border border-white" :class="{'bg-red-100': message.result <= 0, 'bg-green-100': message.result > 0}">
            <b>{{ message.name }}:</b>
            <div>{{ message.message }}</div>
            <div>Health: {{message.result > 0 ? '+' : ''}}{{ message.result }}</div>
          </div>
        </div>

        <div class="pb-2 mt-8">Dashboard: </div>
        <div class="w-48 overflow-scroll h-screen max-height-66vh text-center" >
          <div v-for="leader in allScores" class="py-3 px-2 border-t-2" :class="{'bg-red-100': message.result <= 0, 'bg-green-100': message.result > 0}">
            <b>{{ leader.name }}:</b>
            <div>{{ leader.score }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  import ChurnSimulator from '@/game/ChurnSimulator'

  import Firebase from 'firebase'
  let config = {
      apiKey: 'AIzaSyBre1jfpBSeaCmcXrw7NfDU-nQJjpUajX8',
      authDomain: 'project-1004742871477',
      databaseURL: 'https://churn-simulator.firebaseio.com/'
  };

  const app = Firebase.initializeApp(config);
  const db = app.database();

  @Component
  export default class Canvas extends Vue {
      message = '';
      game: any = {};
      gameNotStarted = true;
      retry = false;

      name = '';

      score = 0;
      scoreNotAdded = true;
      messages = [];

      allScores = {};

      async start() {
          this.score = 0;
          this.scoreNotAdded = true;
          this.gameNotStarted = false;
          this.game.init();
      }

      public saveScore() {
          this.scoreNotAdded = false;
          db.ref(`scores/${new Date().getTime()}`).set({
              name: this.name,
              score: this.score,
          });
      }

      public setEventsHandlers() {
          document.addEventListener('CSG.gameOver', (e: any) => {
              this.score = e.detail.score;
              this.gameNotStarted = true;
              this.retry = true
          });
          document.addEventListener('CSG.score', (e:any) => {
              this.score = e.detail.score
          });
          document.addEventListener('CSG.message', (e:any) => {
              // @ts-ignore
              this.messages.unshift(e.detail)
          });
          document.addEventListener('CSG.CD_altClick', () => {
              this.message = 'This action is under CD';
              setTimeout(() => {
                  this.message = '';
              }, 2000)
          })
      }

      public getAllScores() {
          // didn't find how to sort in firebase. Unfortunately
          db.ref(`scores`).orderByValue().limitToLast(3).once('value').then(result => {
              this.allScores = result.toJSON() || {}
          });
      }

      public mounted() {
          this.game = new ChurnSimulator((this.$refs.target as Element));
          this.setEventsHandlers();

          this.getAllScores();

          db.ref(`scores`).on('value', () => {
              this.getAllScores();
          });
      }

      public destroyed() {
          // remove events here
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

  .max-height-66vh {
    max-height: 33vh;
  }
</style>
