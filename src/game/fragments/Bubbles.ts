import GameFragmentClass from './common'
import { GameBubbles, GameFragment} from '@/game';
import { getRandomBubblesPos } from '@/game/utils/randomizer';

class Bubbles extends GameFragmentClass {
    public bubbles: GameBubbles = {};

    constructor(data: GameFragment) {
        super(data);
    }

    public init() {
        for (let i = 0; i < this.config.bubbles.count; i++) {
            this.create(i)
        }

        console.log(this.connector)
        // @ts-ignore
        this.connector.Mover.init(this.bubbles)
    }

    private create(id: number) {
        const setupConfig = getRandomBubblesPos(this.config);
        const bubble = document.createElement(`span`);
        bubble.innerHTML = `<div>${setupConfig.name}</div>`;

        this.doStylesForBubble(setupConfig, bubble);
        this.bubbles[id] = {
            node: bubble,
            config: setupConfig,
        };

        this.playground.appendChild(bubble)
    }

    private doStylesForBubble(setupConfig: any, element: HTMLElement) {
        const randomizer = this.config.randomizer.bubble;
        const sizeCoef = ((setupConfig.paying + 5) - randomizer.paying[0]) * 0.2;
        const size = this.config.bubbles.minSize * sizeCoef;

        element.className += 'bubble border border-gray-500 rounded-full flex items-center justify-center';
        // @ts-ignore
        element.style['font-size'] = `${0.15 * sizeCoef}em`;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.position = 'absolute';

        const healfCoef = setupConfig.health / this.config.randomizer.bubble.health[1];
        const redCoef = healfCoef > 0.75 ? 0 : 255 * (1 / healfCoef);
        const greenCoef = healfCoef < 0.35 ? 0 : 255 * healfCoef;

        const backgroundColor = `rgb(${redCoef},${greenCoef},0)`;
        // @ts-ignore
        element.style['background-color'] = backgroundColor;
    }
}

export default Bubbles
