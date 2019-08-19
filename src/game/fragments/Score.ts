import GameFragmentClass from './common'
// @ts-ignore
import {GameBubble, GameFragment} from '@/game';

class Score extends GameFragmentClass {
    public score = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public checkGameOver() {
        const isOver = this.connector.Mover.ticksDone >= this.config.game.ticksToEnd
            || this.connector.Bubbles.bubblesDeleted === this.config.bubbles.count;

        if (isOver) {
            this.connector.Events.emitEvent('gameOver', {
                score: Math.round(this.score * 100) / 100
            })
        }

        return isOver
    }

    public addScoreForBubble(bubble: GameBubble) {
        this.score += bubble.config.health / 100;

        (this.connector.Events as any).emitEvent('score', {
            score: Math.round(this.score * 100) / 100,
        });
    }
}

export default Score
