import { GameConfig } from '@/game';

const randomIntFromInterval = (min: number, max: number, floor = true) => {
    const random = Math.random() * (max - min + 1) + min;
    return floor ? Math.floor(random) : Math.floor(random * 100) / 100;
};

const randomCompanies = [
    'Google',
    'Facebook',
    'Planhat',
    'VK',
    'Heisenberg',
    'Los Polos',
    'Apple',
    'Sem & Bros',
    'Youtube',
    'Instagram',
    'Your Mom',
];

const randomIndustries = [
    'Fakers',
    'Music',
    'Gamers',
    'Noobs',
    'Sons',
    'Coin',
    'Inc.',
    'Trouble',
    'Lovers',
    'Funs',
    'Army'
];

const usedNames:any = [];
const createName = (): any => {
    const name = `${randomCompanies[randomIntFromInterval(0, 10)]} ${randomIndustries[randomIntFromInterval(0, 10)]}`;
    if (!usedNames.find((x:string) => x === name)) {
        usedNames.push(name);
        return name;
    }
    return createName()
};

const getRandomBubblesPos = (config: GameConfig) => {
    const randomizer = config.randomizer.bubble;
    return {
        paying: randomIntFromInterval(randomizer.paying[0], randomizer.paying[1]),
        health: randomIntFromInterval(randomizer.health[0], randomizer.health[1], false),
        lastContact: randomIntFromInterval(randomizer.lastContact[0], randomizer.lastContact[1]),
        renewal: randomIntFromInterval(randomizer.renewal[0], randomizer.renewal[1]),
        name: createName()
    }
};

export {
    getRandomBubblesPos,
}
