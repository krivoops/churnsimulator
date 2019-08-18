import GameFragmentClass from './common'
// @ts-ignore
import { GameBubbles, GameFragment } from '@/game';

class BubbleActions extends GameFragmentClass {
    public addBubbleHealthCD = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init() {
        (this.connector.Events as any).createEvent('CD')
    }

    public onClick(id: number) {
        return (e: any) => {
            if (!e.altKey) {
                this.updateLastContact(id);
            } else {
                this.addBubbleHealthAction(id)
            }
        }
    }

    public checkCD(name: string) {
        // @ts-ignore
        const time = this[`${name}CD`];
        const currentTime = new Date().getTime();

        if ((currentTime - time > this.config.game.clickCD) || time === 0) {
            // @ts-ignore
            this[`${name}CD`] = 0;
            return true
        }
        return false
    }

    private updateLastContact(id: number) {
        (this.connector.Bubbles as any).bubbles[id].config.lastContact = 0
    }

    private addBubbleHealthAction(id: number) {
        if (this.checkCD('addBubbleHealth')) {
            (this.connector.Bubbles as any).bubbles[id].config.health += (this.connector.BubbleIssue as any).addBubbleHealth();
            this.addBubbleHealthCD = new Date().getTime();
        } else {
            (this.connector.Events as any).emitEvent('CD')
        }
    }
}

export default BubbleActions
