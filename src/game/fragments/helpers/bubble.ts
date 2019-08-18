import { GameBubble, GameBubbleConfig, GameConfig } from '@/game';
import { randomIntFromInterval, createName } from '@/game/utils/randomizer';

const createConfig = (config: GameConfig): GameBubbleConfig => {
    const randomizer = config.randomizer.bubble;
    return {
        paying: randomIntFromInterval(randomizer.paying[0], randomizer.paying[1]),
        health: randomIntFromInterval(randomizer.health[0], randomizer.health[1], false),
        lastContact: randomIntFromInterval(randomizer.lastContact[0], randomizer.lastContact[1]),
        renewal: randomIntFromInterval(randomizer.renewal[0], randomizer.renewal[1]),
        name: createName(),
        active: true,
    }
};

const createTemplate = (setup: GameBubbleConfig) => {
    return `<div>${setup.name}</div>`
};

const countPosition = (config: GameConfig, setup: GameBubbleConfig, bubbleElement: HTMLElement) => {
    const randomizer = config.randomizer.bubble;
    const sizeCoef = ((setup.paying + 5) - randomizer.paying[0]) * config.bubbles.sizeCoef;
    const size = config.bubbles.minSize * sizeCoef;

    bubbleElement.className = 'bubble border border-gray-500 rounded-full flex items-center justify-center shadow-md';
    // @ts-ignore
    bubbleElement.style['font-size'] = `${0.15 * sizeCoef}em`;
    bubbleElement.style.width = `${size}px`;
    bubbleElement.style.height = `${size}px`;
    bubbleElement.style.position = 'absolute';
};

const countColor = (config: GameConfig, setup: GameBubbleConfig, bubbleElement: HTMLElement) => {
    const healfCoef = setup.health / config.randomizer.bubble.health[1];
    const redCoef = healfCoef > 0.75 ? 0 : 255 * (1 / healfCoef);
    const greenCoef = healfCoef < 0.35 ? 0 : 255 * healfCoef;

    // @ts-ignore
    bubbleElement.style['background-color'] = `rgb(${redCoef},${greenCoef},0)`;
};

const editRenewal = (bubble: GameBubble) => {
    bubble.config.renewal -= 1;

    if (bubble.config.renewal <= 0 && bubble.config.health > 3.5) {
        bubble.config.renewal = 360
    } else if (bubble.config.health <= 3.5 && bubble.config.renewal <= 0) {
        return 1
    }

    return 0
};

const editLastContact = (bubble: GameBubble, config: GameConfig) => {
    const {
        config: setup,
    } = bubble;

    let additionalLastContact = 0;
    if (setup.lastContact < config.game.lastContact / 3) {
        additionalLastContact = bubble.config.lastContact === 0 ? 0 : 2 // 1 default and 2 additional
    }

    bubble.config.lastContact += 1 + additionalLastContact;

    if (bubble.config.lastContact >= 90) {
        return 1
    }

    return 0
};

const editHealth = (bubble: GameBubble, value: number) => {
    bubble.config.health += value;

    bubble.config.health = bubble.config.health > 10
        ? 10 : bubble.config.health < 0
            ? 0 : bubble.config.health;
};

export {
    createConfig,
    createTemplate,
    countPosition,
    countColor,
    editRenewal,
    editLastContact,
    editHealth,
}
