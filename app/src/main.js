import { GameStateBuilder } from './gameStateBuilder';
import { StateConstants } from './constants/stateConstants'

// Initialize Phaser, and create a 400px by 490px game
const game = new Phaser.Game(1000, 600, Phaser.AUTO, 'canvas');
const reactiveSantaState = GameStateBuilder.createReactiveSantaRace(game);


// Add and start the 'main' state to start the game
game.state.add(StateConstants.MainState.name, reactiveSantaState, true);