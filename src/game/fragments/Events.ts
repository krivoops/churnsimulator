import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';

class Events extends GameFragmentClass {
    public events: any = {};

    constructor(data: GameFragment) {
        super(data);
    }

    public createEvent(name: string) {
        this.events[name] = new Event(`CSG.${name}`);
    }

    public emitEvent(name: string) {
        document.dispatchEvent(this.events[name]);
    }
}

export default Events
