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

    public emitEvent(name: string, payload = false) {
        if (!payload) {
            document.dispatchEvent(this.events[name]);
        }

        if (payload) {
            this.events[name] = new CustomEvent(`CSG.${name}`,{ detail: payload });
            document.dispatchEvent(this.events[name]);
        }
    }
}

export default Events
