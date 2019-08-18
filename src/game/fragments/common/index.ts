import { GameConfig, GameFragments } from '@/game';

export default abstract class GameFragment implements GameFragment {
    public playground: Element;
    public config: GameConfig;
    public connector: GameFragments;

    constructor({
                    playground,
                    config,
                    connector,
                }: GameFragment) {
        this.playground = playground;
        this.config = config;
        this.connector = connector;

        return this;
    }
}
