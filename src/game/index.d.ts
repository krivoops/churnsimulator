import * as G from "glob";

interface GameConfig {
    width: number,
    height: number,
    game: {
        renewal: 360,
        lastContact: 90,
    }
    bubbles: {
        count: number,
        minSize: number,
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
    renewal: number
}

interface GameBubble {
    node: HTMLElement,
    config: GameBubbleConfig,
}
