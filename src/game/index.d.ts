import {
    Bubbles, Mover, Score, Actions, Issue, Events,
} from './fragments'

interface RandomizerConfig {
    bubble: {
        paying: [number, number],
        health: [number, number],
        lastContact: [number, number],
        renewal: [number, number],
    }
}


interface GameConfig {
    width: number,
    height: number,
    game: {
        renewal: number,
        lastContact: number,
        ticksPerSecond: number,
        ticksToEnd: number,
        hardness: number,
        clickCD: number,
    }
    bubbles: {
        count: number,
        minSize: number,
        sizeCoef: number,
    },
    randomizer: RandomizerConfig,
}

interface GameFragments {
    Bubbles: Bubbles,
    Mover: Mover,
    Score: Score,
    Events: Events,
    Actions: Actions,
    Issue: Issue,
}

interface GameFragment {
    playground: Element,
    config: GameConfig,
    connector: GameFragments,
    init?: (params?: any) => {},
    <T>(): T
}

interface GameBubbles {
    [s: string]: GameBubble,
}

interface GameBubbleConfig {
    paying: number,
    health: number,
    lastContact: number,
    renewal: number,
    name: string,
    active: boolean,
}

interface GameBubble {
    node: HTMLElement,
    config: GameBubbleConfig,
    id: number,
}

type GameBubbleActionsTypes = 'click'
type GameBubbleActionsCoolDownTypes = 'click' | 'altClick'
