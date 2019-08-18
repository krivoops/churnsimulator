import GameFragmentClass from './common'
import { GameBubbles, GameFragment } from '@/game';

class Mover extends GameFragmentClass {
    public bubbles: any = {};
    public oneXPixel = 0;
    public oneYPixel = 0;

    public looperEnabled = false;
    public ticksDone = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init(bubbles: GameBubbles) {
        this.bubbles = bubbles;
        this.initMovement(false);

        this.createLooper();
    }

    private initMovement(move = true) {
        this.oneXPixel = this.config.width / this.config.game.renewal;
        // TODO idk why 3
        this.oneYPixel = (this.config.height / this.config.game.lastContact) - 3;

        Object.keys(this.bubbles).forEach((bubbleId) => {
            if (move) {
                // @ts-ignore
                this.connector.Bubbles.doTick(this.bubbles[bubbleId]);
            }
            this.setUpPos(this.bubbles[bubbleId], false)
        });
    }

    private setUpPos(bubble: any, move = true) {
        const {
            node: element,
            config: setup
        } = bubble;

        element.style.left = `${this.oneXPixel * (Math.abs(setup.renewal - this.config.game.renewal))}px`;
        element.style.top = `${this.oneYPixel * setup.lastContact}px`;
    }

    private createLooper() {
        this.looperEnabled = true;
        this.doLoop();
    }

    private doLoop() {
        if (!this.looperEnabled || this.ticksDone >= this.config.game.ticksToEnd) {
            return false;
        }

        Promise.resolve(
            new Promise((resolve) => {
                this.tick();

                setTimeout(() => {
                    resolve(true)
                }, 1000 / this.config.game.ticksPerSecond)
            }).then(res => {
                this.doLoop();
            })
        )
    }

    private tick() {
        this.ticksDone += 1;
        console.log(this.ticksDone);
        this.initMovement();
    }
}

export default Mover
