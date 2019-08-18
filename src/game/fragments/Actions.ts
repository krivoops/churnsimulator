import GameFragmentClass from './common'
import {GameBubble, GameBubbleActionsTypes, GameFragment} from '@/game';

class Actions extends GameFragmentClass {
    public actionsCounter = {
        click: 0
    };

    public actionsMap = {
        click: (id: number) => {
            return (e: any) => {
                if (!e.altKey) {
                    this.updateLastContact(id);
                } else {
                    this.addBubbleHealthAction(id)
                }
            }
        }
    };

    public addBubbleHealthCD = 0;

    constructor(data: GameFragment) {
        super(data);
    }

    public init() {
        (this.connector.Events as any).createEvent('CD')
    }

    public subscribe(bubble: GameBubble, action: GameBubbleActionsTypes) {
        bubble.node.addEventListener(action, this.initAction(action, bubble.id))
    }

    public initAction(action: GameBubbleActionsTypes, bubbleId: number) {
        this.actionsCounter[action] += 1;
        return this.actionsMap[action](bubbleId)
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
            // @ts-ignore
            this.connector.Bubbles.bubbles[id].config.health += this.connector.Issue.addBubbleHealth((this.connector.Bubbles as any).bubbles[id]);
            this.addBubbleHealthCD = new Date().getTime();
        } else {
            (this.connector.Events as any).emitEvent('CD')
        }
    }
}

export default Actions
