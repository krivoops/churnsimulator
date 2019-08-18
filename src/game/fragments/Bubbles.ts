import GameFragmentClass from './common'
import { GameFragment } from '@/game';
import { getRandomBubblesPos } from '@/game/utils/randomizer';

class Bubbles extends GameFragmentClass {
    public bubbles: any = {};

    constructor(data: GameFragment) {
        super(data);

        this.init();

        console.log(this.bubbles)
    }

    private init() {
        for (let i = 0; i < this.config.bubbles.count; i++) {
            this.create(i)
        }
    }

    private create(id: number) {
        const setupConfig = getRandomBubblesPos(this.config);
        const bubble = document.createElement(`span`);
        bubble.innerHTML = `<div>${setupConfig.name}</div>`;

        this.doStylesForBubble(setupConfig, bubble);
        this.bubbles[id] = bubble;

        this.playground.appendChild(bubble)
    }

    private doStylesForBubble(setupConfig: any, bubble: HTMLElement) {
        const randomizer = this.config.randomizer.bubble;
        const sizeCoef = ((setupConfig.paying + 5) - randomizer.paying[0]) * 0.2;
        const size = this.config.bubbles.minSize * sizeCoef;

        const color = 127.5;
        const healfCoef = setupConfig.health / this.config.randomizer.bubble.health[1];
        const redCoef = healfCoef > 0.75 ? 0 : 255 * (1 / healfCoef);
        const greenCoef = healfCoef < 0.35 ? 0 : 255 * healfCoef;

        const backgroundColor = `rgb(${redCoef},${greenCoef},0)`;

        bubble.className += 'bubble border border-gray-500 rounded-full flex items-center justify-center';
        // @ts-ignore
        bubble.style['font-size'] = `${0.15 * sizeCoef}em`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.position = 'absolute';
        console.log(backgroundColor, setupConfig.health);
        // @ts-ignore
        bubble.style['background-color'] = backgroundColor;
    }
}

export default Bubbles
