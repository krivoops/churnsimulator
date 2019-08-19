import ChurnSimulator from '../../ChurnSimulator';

const registerEvent = (state:any, event: string, cb: (payload: any) => any) => {
    const fn = (e: any) => {
        cb(e)
    };
    document.addEventListener(`${state.eventNamespace}.${event}`, fn);

    return () => {
        document.removeEventListener(`${state.eventNamespace}.${event}`, fn)
    }
};

export default {
    init({ commit, state }: any, HTMLElement: HTMLElement) {
        const game = new ChurnSimulator(HTMLElement);

        const events = [
            registerEvent(state,'gameOver', (payload: any) => {
                commit('setGameOver', payload)
            }),
            registerEvent(state,'score', (payload: any) => {
                commit('setScore', payload)
            }),
            registerEvent(state,'message', (payload: any) => {
                commit('setMessage', payload)
            }),
            registerEvent(state,'cooldown', (payload: any) => {
                commit('setCooldown', payload)
            })
        ];

        commit('saveGameInitStates', {
            game,
            HTMLElement,
        });

        commit('setSubscribedEvents', events)
    },

    start({ commit }: any) {
        commit('startGame')
    },

    restart({ commit }: any) {
        commit('restartGame')
    },

    destroy({ state }: any) {
        state.subscribedEvents.forEach((event: any) => {
           event();
        })
    }
}
