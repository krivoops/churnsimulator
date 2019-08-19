<template>
    <div class="flex items-center justify-center h-full overlayScreen" v-if="!isPlaying">
        <div v-if="isGameOver">
            <h2 class="text-center text-6xl">Well done!</h2>

            <h2 class="text-center text-4xl">Your score is: {{ score }}</h2>
            <div class="py-2 text-center mt-3">
                Enter your name:
                <input class="bg-white focus:outline-none mt-3 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                       >
                <button class="focus:outline-none bg-green-400 px-6 py-2 shadow-md mt-6 rounded-lg hover:bg-green-300 hover:shadow-lg transition">
                    Save
                </button>
            </div>
            <div class="text-center mt-4">
                <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition" @click="restartGame">
                    Try again
                </button>
            </div>
        </div>

        <div v-if="!isPlaying && !isGameOver">
            <div class="text-center">
                <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition" @click="startGame">
                    Start
                </button>
            </div>
        </div>

        <div v-if="isGamePaused">
            <div class="text-center">
                <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition" @click="startGame">
                    Start
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';

    const gameNamespace = 'churn-simulator';

    @Component
    export default class ManageScreen extends Vue {
        @Action('start', { namespace: gameNamespace }) startGame;
        @Action('restart', { namespace: gameNamespace }) restartGame;

        @Getter('isPlaying', { namespace: gameNamespace }) isPlaying;
        @Getter('isGameOver', { namespace: gameNamespace }) isGameOver;
        @Getter('isGamePaused', { namespace: gameNamespace }) isGamePaused;
        @Getter('currentScore', { namespace: gameNamespace }) score;
    }
</script>

<style lang="scss">
    .overlayScreen {
        position: relative;
        z-index: 1;
        background: rgba(255,255,255, 0.9);
    }

    .transition {
        transition: all .3s;
    }
</style>
