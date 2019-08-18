import { GameConfig } from '@/game/index';

const config: GameConfig = {
    width: 0, // auto filled
    height: 0, // auto filled
    game: {
        renewal: 360,
        lastContact: 90,
    },
    bubbles: {
        count: 10, // bubbles count
        minSize: 20, // min bubble size
    },
    randomizer: {
        bubble: {
            paying: [5, 20],
            health: [3, 9],
            lastContact: [10, 80],
            renewal: [20, 340],
        }
    }
};

export default config
