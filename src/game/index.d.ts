import * as G from "glob";

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
    randomizer: {
        bubble: {
            paying: [number, number],
            health: [number, number],
            lastContact: [number, number],
            renewal: [number, number],
        }
    }
}

interface GameFragments {
    [s: string]: GameFragment
}

interface GameFragment {
    playground: Element,
    config: GameConfig,
    connector: GameFragments,
    init?: (params?: any) => {},
}

interface GameBubbles {
    [s: string]: GameBubble,
}

interface GameBubbleConfig {
    paying: number,
    health: number,
    lastContact: number,
    renewal: number,
    active: boolean,
}

interface GameBubble {
    node: HTMLElement,
    config: GameBubbleConfig,
    id: number,
}
