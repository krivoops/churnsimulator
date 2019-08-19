import actions from './store/actions';
import mutations from './store/mutations';
import getters from './store/getters';

import playground from './Playground.vue'

import config from '../config'

const gameModule = {
    namespaced: true,
    state: {
        eventNamespace: config.defaultEventNamespace,
        game: {},
        mountedElement: {},
        isPlaying: false,
        subscribedEvents: {},
        gameOver: false,
        paused: false,
        score: 0,
        messages: [],
        cooldowns: {},
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
};

export default (Vue: any, { store, eventNamespace }: any) => {
    if (eventNamespace) {
        gameModule.state.eventNamespace = eventNamespace
    }

    Vue.component('ChurnSimulator', playground);
    store.registerModule('churn-simulator', gameModule);
}
