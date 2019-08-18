import GameFragmentClass from './common'
import {GameBubble, GameBubbleConfig, GameBubbles, GameFragment} from '@/game';

import * as helpers from './helpers/bubble'

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

        this.connector.Mover.init(this.bubbles)
    }

    private create(id: number) {
        const bubbleElement = document.createElement(`span`);

        const bubbleConfig = helpers.createConfig(this.config);
        bubbleElement.innerHTML = helpers.createTemplate(bubbleConfig);

        this.doStylesForBubble(bubbleConfig, bubbleElement);
        this.bubbles[id] = {
            node: bubbleElement,
            config: bubbleConfig,
            id,
        };

        this.playground.appendChild(bubbleElement);

        this.connector.Actions.subscribe(this.bubbles[id], 'click')
    }

    private doStylesForBubble(config: GameBubbleConfig, bubbleElement: HTMLElement) {
        if (!config.active) {
            return
        }

        helpers.countPosition(this.config, config, bubbleElement);
        helpers.countColor(this.config, config, bubbleElement);
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

        let shouldDelete = 0;
        shouldDelete += helpers.editRenewal(bubble);
        shouldDelete += helpers.editLastContact(bubble, this.config);

        const addHealthValue = this.connector.Issue.generateIssue(bubble);
        helpers.editHealth(bubble, addHealthValue);

        if (shouldDelete) {
            this.deleteBubble(id);
            return
        }

        this.connector.Score.addScoreForBubble(bubble);
        this.doStylesForBubble(bubble.config, element)
    }

    private deleteBubble(bubbleId: number) {
        const bubble = this.bubbles[bubbleId];
        bubble.node.className += ' deleted';

        setTimeout(() => {
            bubble.node.remove();
        }, 500);

        bubble.config.active = false;
        this.bubblesDeleted += 1;
    }
}

export default Bubbles
