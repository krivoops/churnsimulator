import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';

class Events extends GameFragmentClass {
    public eventNameSpace: string = 'CSG';

    constructor(data: GameFragment) {
        super(data);
    }

    public init(eventNameSpace?: string) {
        if (eventNameSpace) {
            this.eventNameSpace = eventNameSpace
        }
    }

    public emitEvent(name: string, payload?: any) {
        const Event = new CustomEvent(`CSG.${name}`,{ detail: payload });
        document.dispatchEvent(Event);
    }
}

export default Events
