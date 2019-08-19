<template>
    <div>
        <div class="absolute top-0 right-0 mx-3 my-3">
            <transition-group name="fade" tag="div">
                <div :key="cooldown.key" v-for="cooldown in cooldowns" class="bg-red-200 py-2 px-2 rounded-lg">
                    {{ cooldown.name }}: {{ cooldown.time }}
                </div>
            </transition-group>
        </div>
        <div v-if="!isPlaying" class="overlayScreen flex items-center justify-center height">
            <div v-if="isGameOver">
                <h2 class="text-center text-6xl">Well done!</h2>

                <h2 class="text-center text-4xl">Your score is: {{ score }}</h2>
                <div v-if="!isSaved" class="py-2 text-center mt-3">
                    Enter your name:
                    <input class="bg-white focus:outline-none mt-3 focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                           v-model="name">
                    <button class="focus:outline-none bg-green-400 px-6 py-2 shadow-md mt-6 rounded-lg hover:bg-green-300 hover:shadow-lg transition"
                            @click="save">
                        Save
                    </button>
                </div>
                <div v-else class="py-2 text-center mt-3">
                    <div class="text-center text-2xl">Thank you for your score!</div>
                </div>
                <div class="text-center mt-4">
                    <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition"
                            @click="restart">
                        Try again
                    </button>
                </div>
            </div>

            <div v-if="!isPlaying && !isGameOver && !isGamePaused && !displayAbout">
                <div class="text-center">
                    <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition"
                            @click="startGame">
                        Start
                    </button>
                </div>
            </div>

            <div v-if="isGamePaused && !displayAbout">
                <div class="text-center">
                    <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition"
                            @click="resumeGame">
                        Resume
                    </button>
                </div>
            </div>

            <div v-if="displayAbout && !isGameOver" class="px-4 py-4">
                <div class="text-center">
                    Imagine you have a software company providing a service online.
                    Users can buy one year of this service access, and with credit card pay the daily cost between $5 - 20 per day depending on which plan they're on.  If users are happy with the software/service after one year, then they will renew the service for another year and keep paying daily.
                    Some customer will love your service (we say they are happy and have "good health"), other customers may be disappointed with the service and have "bad health". Customers with bad health typically don't renew their subscription when it's ending after one year.
                    <br><br>
                    Click on bubble to update last contact. Alt + click to communicate with bubble to increase his health
                    <br><br>
                    <button class="focus:outline-none bg-green-400 px-6 py-2 shadow rounded-lg hover:bg-green-300 hover:shadow-lg transition"
                            @click="closeAbout">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { Action, Getter } from 'vuex-class';

    const gameNamespace = 'churn-simulator';
    const dashboardNamespace = 'dashboard';

    @Component({
        props: {
            displayAbout: {
                type: Boolean,
            }
        }
    })
    export default class GameManageScreen extends Vue {
        name = '';
        isSaved = false;

        @Action('start', { namespace: gameNamespace }) startGame;
        @Action('restart', { namespace: gameNamespace }) restartGame;
        @Action('resume', { namespace: gameNamespace }) resumeGame;
        @Action('pause', { namespace: gameNamespace }) pauseGame;

        @Action('saveScore', { namespace: dashboardNamespace }) saveScore;

        @Getter('isPlaying', { namespace: gameNamespace }) isPlaying;
        @Getter('isGameOver', { namespace: gameNamespace }) isGameOver;
        @Getter('isGamePaused', { namespace: gameNamespace }) isGamePaused;
        @Getter('currentScore', { namespace: gameNamespace }) score;
        @Getter('cooldowns', { namespace: gameNamespace }) cooldowns;

        save() {
            this.saveScore({
                name: this.name,
                score: this.score
            });

            this.isSaved = true;
        }

        restart() {
            this.restartGame();

            this.isSaved = false;
        }

        closeAbout() {
            this.$emit('closeAbout')
        }

        @Watch('displayAbout')
        onDisplayAbout(value) {
            if (value && this.isPlaying) {
                this.pauseGame();
            } else if (this.score > 0) {
                this.resumeGame()
            }
        }
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

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;

    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        transition: opacity .2s;
        opacity: 0;
    }
</style>
