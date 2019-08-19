import config from './config'
import * as gameFragments from './fragments'
import { GameConfig, GameFragments } from '@/game/index';

class ChurnSimulator {
    public config: GameConfig = config;
    public playground: HTMLElement;
    // @ts-ignore
    public fragments: GameFragments = {};

    constructor(playground: HTMLElement) {
        this.playground = playground;

        this.setupView();

        return this
    }

    public init(eventNameSpace?: string) {
        this.setupView();
        this.installParts(gameFragments);
        this.fragments.Events.init(eventNameSpace);

        this.fragments.Bubbles.init();
    }

    public async restart() {
        await this.fragments.Bubbles.restart();

        this.init()
    }

    private setupView () {
        this.playground.style.position = 'relative';
        // @ts-ignore
        const resize = () => {
            const width = this.playground.clientWidth;
            const height = this.playground.clientHeight;
            this.playground.style.width = width + 'px';

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
            // @ts-ignore
            this.fragments[fragmentKey] = Fragment;
        })
    }
}

export default ChurnSimulator
