import config from './config'
import * as gameFragments from './fragments'
import { GameConfig, GameFragments } from '@/game/index';

class ChurnSimulator {
    public config: GameConfig = config;
    public playground: Element;
    public fragments: GameFragments = {};

    constructor(playground: Element) {
        this.playground = playground;

        this.init()
    }

    private init() {
        this.setupView();
        this.installParts(gameFragments);
        // @ts-ignore
        this.fragments.Bubbles.init();
        // @ts-ignore
        this.fragments.Score.init();
        // @ts-ignore
        this.fragments.BubbleActions.init();
    }

    public setupView () {
        (this.playground as any).style.position = 'relative';
        // @ts-ignore
        const resize = () => {
            const width = window.innerWidth * 0.8;
            const height = window.innerHeight * 0.7;
            (this.playground as any).style.width = width + 'px'; // TODO fix as any
            (this.playground as any).style.height = height + 'px';

            this.config = {
                ...this.config,
                width,
                height
            }
        };

        resize();
        window.addEventListener('resize', resize); // TODO handle on destroy
    }

    private installParts(fragments: any) { // TODO define
        Object.keys(fragments).forEach(fragmentKey => {
            const Fragment = new fragments[fragmentKey]({
                playground: this.playground,
                config: this.config,
                connector: this.fragments,
            });
            this.fragments[fragmentKey] = Fragment;
        })
    }
}

export default ChurnSimulator
