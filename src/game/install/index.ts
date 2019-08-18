import actions from './store/actions';
import mutations from './store/mutations';

const gameModule = {
    namespaced: true,
    state: {
        game: {},
        mountedElement: {},
        isPlaying: false,
    },
    mutations: mutations,
    actions: actions,
    getters: {

    },
};

export default (Vue: any, { store }: any) => {
    // document.addEventListener('CSG.gameOver', (e: any) => {
    //     console.log('lolka')
    // });
    // document.addEventListener('CSG.score', (e:any) => {
    //     console.log('lolka3')
    // });
    // document.addEventListener('CSG.message', (e:any) => {
    //     console.log('lolka1')
    // });
    // document.addEventListener('CSG.CD_altClick', () => {
    //     console.log('lolka2')
    // });

    store.registerModule('churn-simulator', gameModule)
}
