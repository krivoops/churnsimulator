import GameFragmentClass from './common'
// @ts-ignore
import {GameFragment} from '@/game';

class Score extends GameFragmentClass {
    public score = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init() {
        (this.connector.Events as any).createEvent('over')
    }

    public checkGameOver() {
        const isOver = (this.connector.Mover as any).ticksDone >= this.config.game.ticksToEnd
            || (this.connector.Bubbles as any).bubblesDeleted === this.config.bubbles.count;

        if (isOver) {
            (this.connector.Events as any).emitEvent('over')
        }

        return isOver
    }
}

export default Score
