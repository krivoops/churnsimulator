import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';
import {randomIntFromInterval} from "@/game/utils/randomizer";

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

class Issues extends GameFragmentClass {
    public events: any = {};

    constructor(data: GameFragment) {
        super(data);
    }

    public generateIssue(name: string) {
        const isbigIssue = randomIntFromInterval(1,100);

        let issueValue:any= randomIntFromInterval(-0.5,0.1, false);
        if (isbigIssue > this.config.game.hardness) {
            const issue = issues[randomIntFromInterval(0,9)];
            issueValue = issue[1];
        }

        return issueValue
    }
}

export default Issues
