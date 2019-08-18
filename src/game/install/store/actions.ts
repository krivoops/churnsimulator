import ChurnSimulator from '../../ChurnSimulator';

export default {
    init({ commit, state }: any, HTMLElement: HTMLElement) {
        const game = new ChurnSimulator(HTMLElement);

        commit('saveGameInitStates', {
            game,
            HTMLElement,
        })
    }
}
