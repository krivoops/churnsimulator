<template>
    <div class="relative">
        <div class="text-center uppercase mb-3 sticky">Messages</div>
        <div class="height-messages overflow-scroll">
            <div v-for="(message, index) in messages">
                <div v-if="index <= 7" class="border-t border-b py-2">
                    <div class="flex justify-between">
                        <span class="text-sm">{{ message.name }}</span>
                        <span class="pin-left text-xs rounded-lg py-1 px-2"
                              :class="{'bg-red-200': message.result <= 0, 'bg-green-200': message.result > 0 }"
                        >
                            {{ message.result > 0 ? '+' : '' }}{{ message.result }}
                        </span>
                    </div>
                    <div>
                        {{ message.message }}
                    </div>
                </div>
            </div>
        </div>
        <div class="text-center absolute w-full mb-3 bottom-0 left-0">
            <span class="bg-green-200 rounded-lg py-1 px-1">Your score: {{ score }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

const gameNamespace = 'churn-simulator';

@Component
export default class GameMessages extends Vue {
    @Action('start', { namespace: gameNamespace }) startGame;
    @Action('restart', { namespace: gameNamespace }) restartGame;

    @Getter('messages', { namespace: gameNamespace }) messages;
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

    .height-messages {
        height: 68vh;
    }
</style>
