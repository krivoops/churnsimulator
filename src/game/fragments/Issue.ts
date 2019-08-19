import GameFragmentClass from './common'
// @ts-ignore
import {GameBubble, GameBubbles, GameFragment} from '@/game';
import {randomIntFromInterval} from '@/game/utils/randomizer';

const issues = [
    [`I'm happy`, 5],
    ['Bad service', -2],
    ['Bug!!', -3],
    ['Bug!!', -3],
    ['Bug!!', -3],
    ['Bug!!', -3],
    [`You are awesome`, 3],
    ['My service is laggy', -1],
    ['Will recommend it', 2],
    ['Nice features', 2.5]
];

const addHealth = [
    [`Nice support there`, 5],
    ['Go away', -2],
    ['Okay', 2],
    ['Finally', 1],
    ['Thanks a lot', 4],
];

class Issues extends GameFragmentClass {
    constructor(data: GameFragment) {
        super(data);
    }

    public generateIssue(bubble: GameBubble) {
        const isbigIssue = randomIntFromInterval(1,100);

        let issueValue:any= randomIntFromInterval(-1,0.3, false);
        if (isbigIssue > this.config.game.hardness && !(this.connector.Mover.ticksDone % 5)) {
            const issue = issues[randomIntFromInterval(0,9)];
            issueValue = issue[1];

            (this.connector.Events as any).emitEvent('message', {
                name: bubble.config.name,
                result: issue[1],
                message: issue[0],
            })
        }

        return issueValue
    }

    public communicateWithCustomer(bubble: GameBubble) {
        const added = addHealth[randomIntFromInterval(0,4)];

        (this.connector.Events as any).emitEvent('message', {
            name: bubble.config.name,
            result: added[1],
            message: added[0],
        });

        return +added[1];
    }
}

export default Issues
