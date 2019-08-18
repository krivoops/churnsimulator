import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';

class Events extends GameFragmentClass {
    constructor(data: GameFragment) {
        super(data);
    }

    public emitEvent(name: string, payload?: any) {
        const Event = new CustomEvent(`CSG.${name}`,{ detail: payload });
        document.dispatchEvent(Event);
    }
}

export default Events
