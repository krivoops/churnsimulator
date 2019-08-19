import { GameConfig } from '@/game/index';

const config: GameConfig = {
    width: 0, // auto filled
    height: 0, // auto filled
    game: {
        renewal: 360,
        lastContact: 90,
        ticksPerSecond: 6,
        ticksToEnd: 720,
        hardness: 95, // 1 - hell / 100 your service is just perfect
        clickCD: 2000
    },
    bubbles: {
        count: 15, // bubbles count
        minSize: 20, // min bubble size
        sizeCoef: 0.35, // just play with it =)
    },
    randomizer: {
        bubble: {
            paying: [5, 20],
            health: [3, 9],
            lastContact: [10, 60],
            renewal: [80, 360],
        }
    },
    defaultEventNamespace: 'CSG',
};

export default config
