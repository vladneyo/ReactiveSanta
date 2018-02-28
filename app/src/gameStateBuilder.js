import {ReactiveSantaRaceState} from './states/reactiveSantaState';

export class GameStateBuilder {
    static createReactiveSantaRace(game) {
        return new ReactiveSantaRaceState(game);
    }
};

