import { MediaConstants } from '../constants/mediaConstants'
import { AssetsConstants } from '../constants/assetsConstants'
import { ColorConstants } from '../constants/colorConstants'
import { StateConstants } from '../constants/stateConstants'
import { GameState } from './gameState';

export class ReactiveSantaRaceState extends GameState {
    constructor(game) {
        super();
        this._game = game;
    }

    preload() {
        loadMedia(this._game);
    }

    create() {
        //add groups for interaction
        this._houses = this._game.add.group();
        this._clouds = this._game.add.group();
        this._gifts = this._game.add.group();
        setupStage(this._game);
        this._santa = setupSanta(this._game);
        setupControls.call(this, this._game);
        setupAudio.call(this, this._game);

        this._level = 2;
        //random adding houses
        this._timer = this._game.time.events.loop(1500 / this._level, this._addHouse, this);
        //random adding clouds
        this._timer = this._game.time.events.loop(1500 / this._level * 2, this._addCloud, this);
        //constantly increase level
        this._timer = this._game.time.events.loop(1500, this._increaseLevel, this);
        //constantly increase time
        this._timer = this._game.time.events.loop(1000, this._increaseTime, this);

        //default score
        this._score = 0;
        this._labelScore = this._game.add.text(420, 10, "score : 0",
            { font: "30px Arial", fill: "#ffffff" });
        //default time
        this._time = 0;
        this._labelTime = this._game.add.text(20, 10, "time : 0",
            { font: "30px Arial", fill: "#ffffff" });
    }

    update() {
        //if gift dropped down and hitted on the house
        this._game.physics.arcade.overlap(this._gifts, this._houses, this._increaseScore, null, this);
        //if santa crash with cloud
        this._game.physics.arcade.overlap(this._santa, this._clouds, this._clash, null, this);
    }

    _moveUp() {
        // fly up
        if (this._santa.y > 50) {
            this._santamove.play();
            this._santa.y -= 120;
        }
    }

    _moveDown() {
        // fly down
        if (this._santa.y < 290) {
            this._santamove.play();
            this._santa.y += 120;
        }
    }

    _dropGift() {
        //drop the gift
        var gift = this._game.add.sprite(this._santa.x + this._santa.width / 6, this._santa.y + this._santa.height, 'gift');
        gift.scale.x = 0.1;
        gift.scale.y = 0.1;
        this._gifts.add(gift);
        this._game.physics.arcade.enable(gift);

        this._dropped.play();

        gift.body.gravity.y = 2000 * this._level;
        gift.checkWorldBounds = true;
        gift.outOfBoundsKill = true;
    }

    _increaseScore() {
        //console.log(this.gifts);
        for (var i = 0; i < this._gifts.children.length; i++)
            this._gifts.remove(this._gifts.children[i]);

        this._delivered.play();

        this._score++;
        this._labelScore.text = "score : " + this._score;
    }

    _increaseTime() {
        this._time++;
        this._labelTime.text = "time : " + this._time;
    }

    _increaseLevel() {
        this._level += 0.1;
    }

    _clash() {
        this._crash.play();
        this.restartGame();

    }

    restartGame() {
        this._game.state.start(StateConstants.MainState.name);
    }

    _addHouse() {

        var house = this._game.add.sprite((1000 + Math.floor(Math.random() * 700 / (this._level - 1))), 500, 'house');
        this._houses.add(house);
        house.scale.x = 0.35;
        house.scale.y = 0.35;

        // Enable physics on the pipe
        this._game.physics.arcade.enable(house);

        // Add velocity to the pipe to make it move left
        house.body.velocity.x = -400 * this._level;
        house.body.gravity.y = 0;

        house.checkWorldBounds = true;
    }

    _addCloud() {

        var cloud = this._game.add.sprite((1000 + Math.floor(Math.random() * 400 / (this._level - 1))), 50 + (120 * Math.floor(Math.random() * 3)), 'cloud');
        this._clouds.add(cloud);
        cloud.scale.x = 0.15;
        cloud.scale.y = 0.15;

        // Enable physics on the pipe
        this._game.physics.arcade.enable(cloud);

        // Add velocity to the pipe to make it move left
        cloud.body.velocity.x = (-500 - Math.floor(Math.random() * 200)) * this._level;
        cloud.body.gravity.y = 0;

        cloud.checkWorldBounds = true;
    }
}

function loadMedia(game) {
    game.load.image(AssetsConstants.santaImg.name, `${MediaConstants.assetsRoute}/${AssetsConstants.santaImg.file}`);
    game.load.image(AssetsConstants.giftImg.name, `${MediaConstants.assetsRoute}/${AssetsConstants.giftImg.file}`);
    game.load.image(AssetsConstants.houseImg.name, `${MediaConstants.assetsRoute}/${AssetsConstants.houseImg.file}`);
    game.load.image(AssetsConstants.cloudImg.name, `${MediaConstants.assetsRoute}/${AssetsConstants.cloudImg.file}`);

    game.load.audio(AssetsConstants.droppedSnd.name, `${MediaConstants.assetsRoute}/${AssetsConstants.droppedSnd.file}`);
    game.load.audio(AssetsConstants.deliveredSnd.name, `${MediaConstants.assetsRoute}/${AssetsConstants.deliveredSnd.file}`);
    game.load.audio(AssetsConstants.crashSnd.name, `${MediaConstants.assetsRoute}/${AssetsConstants.crashSnd.file}`);
    game.load.audio(AssetsConstants.santaMoveSnd.name, `${MediaConstants.assetsRoute}/${AssetsConstants.santaMoveSnd.file}`);
}

function setupStage(game) {
    game.stage.backgroundColor = ColorConstants.nightSky;
    game.physics.startSystem(Phaser.Physics.ARCADE);
}

function setupSanta(game) {
    const santa = game.add.sprite(150, 50, AssetsConstants.santaImg.name);

    santa.scale.x = 0.15;
    santa.scale.y = 0.15;

    game.physics.arcade.enable(santa);
    return santa;
}

function setupControls(game) {
    //main keys
    const wKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
    wKey.onDown.add(this._moveUp, this);
    const sKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
    sKey.onDown.add(this._moveDown, this);
    const spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(this._dropGift, this);

    //alternative keys
    const upKey = game.input.keyboard.addKey(Phaser.KeyCode.UP);
    upKey.onDown.add(this._moveUp, this);
    const downKey = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
    downKey.onDown.add(this._moveDown, this);
    const zeroNumKey = game.input.keyboard.addKey(Phaser.KeyCode.NUMPAD_0);
    zeroNumKey.onDown.add(this._dropGift, this);
}

function setupAudio(game) {
    //add soundss
    this._dropped = game.add.audio(AssetsConstants.droppedSnd.name);
    this._delivered = game.add.audio(AssetsConstants.deliveredSnd.name);
    this._crash = game.add.audio(AssetsConstants.crashSnd.name);
    this._santamove = game.add.audio(AssetsConstants.santaMoveSnd.name);
}