// Create our 'main' state that will contain the game
var mainState = {
    coef: 2,

    preload: function() {
        game.load.image('santa', 'assets/santa.png');
        game.load.image('gift', 'assets/gift.png');
        game.load.image('house', 'assets/house.png');

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

        this.houses = game.add.group();
        this.gifts = game.add.group();

        this.timer = game.time.events.loop(1500/this.coef, this.addHouse, this);
        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ffffff" });

    },
    update: function() {
        game.physics.arcade.overlap(this.gifts, this.houses, this.increaseScore, null, this);

    },
    increaseScore: function(){
        //console.log(this.gifts);
        for(var i=0;i < this.gifts.children.length; i++)
            this.gifts.remove(this.gifts.children[i]);
        this.score++;
        this.labelScore.text = this.score;
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
        var gift = game.add.sprite(this.santa.x + this.santa.width / 6, this.santa.y + this.santa.height, 'gift');
        this.gifts.add(gift);
        game.physics.arcade.enable(gift);
        gift.scale.x = 0.1;
        gift.scale.y = 0.1;

        gift.body.gravity.y = 2000*this.coef;
        gift.checkWorldBounds = true;
        gift.outOfBoundsKill = true;
    },
    addHouse: function(){

        var house = game.add.sprite(1000, 500, 'house');
        this.houses.add(house);
        house.scale.x = 0.35;
        house.scale.y = 0.35;

        // Enable physics on the pipe
        game.physics.arcade.enable(house);

        // Add velocity to the pipe to make it move left
        house.body.velocity.x = -400*this.coef;
        house.body.gravity.y = 0;

        // Automatically kill the pipe when it's no longer visible
        house.checkWorldBounds = true;
        house.outOfBoundsKill = true;
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1000, 600);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);