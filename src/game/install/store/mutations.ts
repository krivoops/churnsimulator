export default {
    saveGameInitStates(state: any, {
        game,
        HTMLElement,
    }: any) {
        state.game = game;
        state.mountedElement = HTMLElement
    },
}
