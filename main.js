// Create our 'main' state that will contain the game
var mainState = {
    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.image('santa', 'assets/santa.png');
        game.load.image('gift', 'assets/gift.png');

    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#38699e';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.santa = game.add.sprite(150, 50, 'santa');

        this.santa.scale.x = 0.15;
        this.santa.scale.y = 0.15;

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.santa);

        // Add gravity to the bird to make it fall
        //this.santa.body.gravity.y = 1000;

        var upKey = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        upKey.onDown.add(this.moveUp, this);
        var downKey = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        downKey.onDown.add(this.moveDown, this);
        var spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        spaceKey.onDown.add(this.dropGift, this);

    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic
    },
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    moveUp: function() {
        // fly up
        this.santa.y -= 120;
    },
    moveDown: function() {
        // fly down
        this.santa.y += 120;
    },
    dropGift: function() {
        //drop the gift
        console.log("drop");
        this.gift = game.add.sprite(this.santa.x, this.santa.y+ this.santa.height, 'gift');
        game.physics.arcade.enable(this.gift);
        this.gift.scale.x = 0.15;
        this.gift.scale.y = 0.15;

        this.gift.body.gravity.y = 1000;
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1000, 600);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);