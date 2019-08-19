import Vue from 'vue';

const getDefaultGameState = (state: any) => {
    state.isPlaying = true;
    state.gameOver = false;
    state.pause = false;
    state.messages = [];
    state.score = 0;
};

export default {
    saveGameInitStates(state: any, {
        game,
        HTMLElement,
    }: any) {
        state.game = game;
        state.mountedElement = HTMLElement
    },

    setSubscribedEvents(state: any, { events }: any) {
        state.subscribedEvents = events
    },

    startGame(state: any) {
        getDefaultGameState(state);
        state.game.init(state.eventNamespace)
    },

    restartGame(state: any) {
        getDefaultGameState(state);
        state.game.restart();
    },

    setGameOver(state: any, payload: any) {
        state.isPlaying = false;
        state.gameOver = true;
        state.score = payload.score
    },

    setScore(state: any, payload: any) {
        state.score = payload.score
    },

    setMessage(state: any, payload: any) {
        state.messages.unshift({
            ...payload,
            key: Math.random() * 1000
        })
    },

    setCooldown(state:any, payload: any) {
        if (!state.cooldowns[payload.actionType]) {
            Vue.set(state.cooldowns, payload.actionType, {
                name: payload.actionType === 'altClick' ? 'Communication cooldown' : '',
                time: payload.timeLeft / 1000,
                key: Math.random() * 1000,
            });

            setTimeout(() => {
                Vue.delete(state.cooldowns, payload.actionType);
            }, payload.timeLeft)
        } else {
            state.cooldowns[payload.actionType].time = payload.timeLeft
        }
    }
}
