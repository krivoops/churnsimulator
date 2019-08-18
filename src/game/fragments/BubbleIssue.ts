import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';
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
    ['Gtfo', -2],
    ['Okay', 2],
    ['Finally', 1],
    ['Thanks a lot', 4],
];

class Issues extends GameFragmentClass {
    constructor(data: GameFragment) {
        super(data);
    }

    public generateIssue(name: string) {
        const isbigIssue = randomIntFromInterval(1,100);

        let issueValue:any= randomIntFromInterval(-0.9,0.3, false);
        if (isbigIssue > this.config.game.hardness) {
            const issue = issues[randomIntFromInterval(0,9)];
            issueValue = issue[1];
        }

        return issueValue
    }

    public addBubbleHealth() {
        return addHealth[randomIntFromInterval(0,4)][1];
    }
}

export default Issues
