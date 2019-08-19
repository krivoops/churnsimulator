const getDefaultGameState = (state: any) => {
    state.isPlaying = true;
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
        state.messages.push(payload)
    },

    setCooldown(state:any, payload: any) {
        state.cooldowns[payload.type] = payload.time
    }
}
