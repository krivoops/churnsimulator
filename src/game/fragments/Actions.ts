import GameFragmentClass from './common'
import {GameBubble, GameBubbleActionsCoolDownTypes, GameBubbleActionsTypes, GameFragment} from '@/game';

const actionsCounterInit = {
    click: 0
};

const coolDownStore = {
    click: 0,
    altClick: 0,
};

class Actions extends GameFragmentClass {
    public actionsCounter = actionsCounterInit;

    public coolDownStore = coolDownStore;

    public actionsMap = {
        click: (id: number) => {
            return (e: any) => {
                if (!e.altKey) {
                    if (this.checkCoolDown('click')) {
                        this.putCoolDown('click', 0);
                        this.connector.Bubbles.updateLastContact(id)
                    }
                } else {
                    if (this.checkCoolDown('altClick')) {
                        this.putCoolDown('altClick', this.config.game.clickCD);
                        this.connector.Bubbles.addHealth(id);
                    }
                }
            }
        }
    };

    constructor(data: GameFragment) {
        super(data);
    }

    public subscribe(bubble: GameBubble, action: GameBubbleActionsTypes) {
        bubble.node.addEventListener(action, this.initAction(action, bubble.id))
    }

    public initAction(action: GameBubbleActionsTypes, bubbleId: number) {
        this.actionsCounter[action] += 1;
        return this.actionsMap[action](bubbleId)
    }

    public putCoolDown(name: GameBubbleActionsCoolDownTypes, coolDown: number) {
        this.coolDownStore[name] = new Date().getTime() + coolDown;
    };

    public checkCoolDown(name: string) {
        // @ts-ignore
        const time = this.coolDownStore[name];
        const currentTime = new Date().getTime();

        if (currentTime - time > 0) {
            return true
        }

        this.connector.Events.emitEvent(`CD_${name}`, {
            timeLeft: time - currentTime
        });
        return false
    }

    public restart() {
        return new Promise(resolve => {
            this.actionsCounter = actionsCounterInit;
            this.coolDownStore = coolDownStore;

            resolve(true)
        })
    }
}

export default Actions
