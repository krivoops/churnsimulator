import Vue from 'vue';
import Firebase from 'firebase'
let config = {
    apiKey: 'AIzaSyBre1jfpBSeaCmcXrw7NfDU-nQJjpUajX8',
    authDomain: 'project-1004742871477',
    databaseURL: 'https://churn-simulator.firebaseio.com/'
};

export default (store: any) => {
    const app = Firebase.initializeApp(config);
    const db = app.database();

    const module = {
        namespaced: true,
        state: {
            scores: []
        },
        mutations: {
            addScores(state: any, payload: any) {
                const array = Object.keys(payload).reduce((arr, key) => {
                    const score = payload[key];

                    arr.push({
                        //@ts-ignore
                        key,
                        ...score,
                    });

                    return arr
                }, []);

                array.forEach((score: any) => {
                    state.scores.push(score);
                });

                state.scores.sort((a: any, b: any) => {
                    return a.score > b.score ? -1 : 1
                });

                const exists:any = {};
                state.scores = state.scores.filter((x:any) => {
                    const exist = exists[x.key];
                    exists[x.key] = true;
                    return !exist && payload[x.key]
                })
            }
        },
        actions: {
            saveScore({ commit, state }: any, payload: any) {
                db.ref(`scores/${new Date().getTime()}`).set({
                    name: payload.name,
                    score: payload.score,
                });
            }
        },
        getters: {
            scores(state: any) {
                return state.scores
            }
        },
    };

    store.registerModule('dashboard', module);

    db.ref(`scores`).orderByChild("score").limitToLast(9).on('value', (result) => {
        const data = result.toJSON();
        store.commit('dashboard/addScores', data)
    });
}
