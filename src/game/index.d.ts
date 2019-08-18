import * as G from "glob";

interface GameConfig {
    width: number,
    height: number,
    bubbles: {
        count: number,
        minSize: number,
    },
    randomizer: {
        bubble: {
            paying: [number, number],
            health: [number, number],
            lastContact: [number, number],
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
}
