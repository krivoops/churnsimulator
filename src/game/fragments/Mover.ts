import GameFragmentClass from './common'
import {GameBubbles, GameFragment} from '@/game';

class Mover extends GameFragmentClass {
    public bubbles: any = {};
    public oneXPixel = 0;
    public oneYPixel = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init(bubbles: GameBubbles) {
        this.bubbles = bubbles;
        this.initMovement();
    }

    private initMovement() {
        this.oneXPixel = this.config.width / this.config.game.renewal;
        this.oneYPixel = this.config.height / this.config.game.lastContact;
        Object.keys(this.bubbles).forEach((bubbleId) => {
            this.setUpPos(this.bubbles[bubbleId])
        });
    }

    private setUpPos(bubble: any) {
        const {
            node: element,
            config: setup
        } = bubble;

        console.log(this.oneXPixel, this.oneYPixel);
        element.style.left = `${this.oneXPixel * setup.renewal}px`;
        element.style.top = `${this.oneYPixel * setup.lastContact}px`;
    }
}

export default Mover
