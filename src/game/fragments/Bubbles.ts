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

    public onTick(bubble: GameBubble) {
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

        bubble.config.active = false;
        this.bubblesDeleted += 1;

        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                bubble.node.remove();
                resolve(true)
            }, 500);
        })
    }

    public updateLastContact(bubbleId: number) {
        const bubble = this.bubbles[bubbleId];

        bubble.config.lastContact = 0;
    }

    public addHealth(bubbleId: number) {
        const bubble = this.bubbles[bubbleId];

        bubble.config.health += this.connector.Issue.communicateWithCustomer(bubble);
    }

    public async restart() {
        const promiseArray:any = [];
        for (let i = 0; i < this.config.bubbles.count; i++) {
            promiseArray.push(this.deleteBubble(i));
        }

        return await Promise.all(promiseArray);
    }
}

export default Bubbles
