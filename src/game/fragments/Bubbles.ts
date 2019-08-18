import GameFragmentClass from './common'
import {GameBubble, GameBubbles, GameFragment} from '@/game';
import { getRandomBubblesPos } from '@/game/utils/randomizer';

class Bubbles extends GameFragmentClass {
    public bubbles: GameBubbles = {};
    public bubblesDeleted = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init() {
        for (let i = 0; i < this.config.bubbles.count; i++) {
            this.create(i)
        }

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
            id,
        };

        this.playground.appendChild(bubble);

        bubble.addEventListener('click', this.bubbleCLickAction(id))
    }

    private doStylesForBubble(setupConfig: any, element: HTMLElement) {
        if (!setupConfig.active) {
            return
        }
        const randomizer = this.config.randomizer.bubble;
        const sizeCoef = ((setupConfig.paying + 5) - randomizer.paying[0]) * this.config.bubbles.sizeCoef;
        const size = this.config.bubbles.minSize * sizeCoef;

        element.className = 'bubble border border-gray-500 rounded-full flex items-center justify-center';
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

    public doTick(bubble: GameBubble) {
        const {
            node: element,
            config: setup,
            id,
        } = bubble;

        if (!setup.active) {
            return
        }

        this.bubbles[id].config.renewal -= 1;
        this.bubbles[id].config.lastContact += 1;

        if (this.bubbles[id].config.renewal <= 0) {
            this.bubbles[id].config.renewal = 360
        }

        this.bubbles[id].config.health += (this.connector.BubbleIssue as any).generateIssue();

        if (this.bubbles[id].config.health > 10) {
            this.bubbles[id].config.health = 10;
        }

        if (this.bubbles[id].config.health < 0) {
            this.bubbles[id].config.health = 0;
        }

        if (this.bubbles[id].config.lastContact >= 90) {
            this.deleteBubble(id);
        }

        if (!this.bubbles[id]) {
            return
        }
        this.doStylesForBubble(this.bubbles[id].config, element)
    }

    private deleteBubble(bubbleId: number) {
        this.bubbles[bubbleId].node.remove();
        this.bubbles[bubbleId].config.active = false;

        this.bubblesDeleted += 1;
    }

    private bubbleCLickAction(id: number) {
        return () => {
            this.bubbles[id].config.lastContact = 0
        }
    }
}

export default Bubbles
