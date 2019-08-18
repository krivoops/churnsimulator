import GameFragmentClass from './common'
import { GameBubbles, GameFragment } from '@/game';

class Mover extends GameFragmentClass {
    public oneXPixel = 0;
    public oneYPixel = 0;

    public looperEnabled = false;
    public ticksDone = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init(bubbles: GameBubbles) {
        this.initMovement(false);

        this.createLooper();
    }

    private initMovement(move = true) {
        this.oneXPixel = this.config.width / this.config.game.renewal;
        this.oneYPixel = this.config.height / this.config.game.lastContact;

        Object.keys((this.connector.Bubbles as any).bubbles).forEach((bubbleId) => {
            if (move) {
                // @ts-ignore
                this.connector.Bubbles.onTick(this.connector.Bubbles.bubbles[bubbleId]);
            }
            this.setUpPos(this.connector.Bubbles.bubbles[bubbleId])
        });
    }

    private setUpPos(bubble: any) {
        const {
            node: element,
            config: setup
        } = bubble;

        const modifyLeft = element.clientWidth / this.config.game.renewal;
        const modifyTop = element.clientHeight / this.config.game.lastContact;
        element.style.left = `${(this.oneXPixel - modifyLeft) * (Math.abs(setup.renewal - this.config.game.renewal))}px`;
        element.style.top = `${(this.oneYPixel - modifyTop) * setup.lastContact}px`;
    }

    private createLooper() {
        this.looperEnabled = true;
        this.doLoop();
    }

    private doLoop() {
        if (!this.looperEnabled || (this.connector.Score as any).checkGameOver()) {
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
        this.initMovement();
    }
}

export default Mover
