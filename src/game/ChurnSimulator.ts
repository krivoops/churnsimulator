import config from './config'
import * as gameFragments from './fragments'
import {GameConfig, GameFragments} from "@/game/index";
import Canvas from "@/components/CanvasHolder.vue";

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
    }

    public setupView () {
        (this.playground as any).style.position = 'relative';
        // @ts-ignore
        const resize = () => {
            const width = window.innerWidth * 0.8;
            const height = window.innerHeight * 0.7;
            (this.playground as any).style.width = width + 'px'; // TODO fix as any
            (this.playground as any).style.height = height * 0.7 + 'px';

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
            this.fragments[fragmentKey] = new fragments[fragmentKey]({
                playground: this.playground,
                config: this.config,
                connector: this.fragments,
            })
        })
    }
}

export default ChurnSimulator
