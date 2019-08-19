export default {
    isPlaying(state: any) {
        return state.isPlaying
    },

    isGameOver(state: any) {
        return state.gameOver
    },

    isGamePaused(state: any) {
        return state.paused
    },

    currentScore(state: any) {
        return state.score
    },

    messages(state: any) {
        return state.messages
    }
}
