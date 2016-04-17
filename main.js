// Create our 'main' state that will contain the game
var mainState = {

    preload: function () {
        game.load.image('santa', 'assets/santa.png');
        game.load.image('gift', 'assets/gift.png');
        game.load.image('house', 'assets/house.png');
        game.load.image('cloud', 'assets/cloud.png');

        game.load.audio('dropped', 'assets/dropped.mp3');
        game.load.audio('delivered', 'assets/delivered.mp3');
        game.load.audio('crash', 'assets/crash.mp3');
        game.load.audio('santamove', 'assets/santamove.mp3');

    },

    create: function () {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.backgroundColor = '#38699e';
        this.level = 2;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.santa = game.add.sprite(150, 50, 'santa');

        this.santa.scale.x = 0.15;
        this.santa.scale.y = 0.15;

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.santa);

        // Add gravity to the bird to make it fall
        //this.santa.body.gravity.y = 1000;


        //main keys
        var wKey = game.input.keyboard.addKey(Phaser.KeyCode.W);
        wKey.onDown.add(this.moveUp, this);
        var sKey = game.input.keyboard.addKey(Phaser.KeyCode.S);
        sKey.onDown.add(this.moveDown, this);
        var spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        spaceKey.onDown.add(this.dropGift, this);

        //alternative keys
        var upKey = game.input.keyboard.addKey(Phaser.KeyCode.UP);
        upKey.onDown.add(this.moveUp, this);
        var downKey = game.input.keyboard.addKey(Phaser.KeyCode.DOWN);
        downKey.onDown.add(this.moveDown, this);
        var zeroNumKey = game.input.keyboard.addKey(Phaser.KeyCode.NUMPAD_0);
        zeroNumKey.onDown.add(this.dropGift, this);

        //add groups for interaction
        this.houses = game.add.group();
        this.clouds = game.add.group();
        this.gifts = game.add.group();

        //random adding houses
        this.timer = game.time.events.loop(1500 / this.level, this.addHouse, this);
        //random adding clouds
        this.timer = game.time.events.loop(1500 / this.level * 2, this.addCloud, this);
        //constantly increase level
        this.timer = game.time.events.loop(1500, this.increaseLevel, this);
        //constantly increase time
        this.timer = game.time.events.loop(1000, this.increaseTime, this);

        //default score
        this.score = 0;
        this.labelScore = game.add.text(420, 10, "score : 0",
            { font: "30px Arial", fill: "#ffffff" });
        //default time
        this.time = 0;
        this.labelTime = game.add.text(20, 10, "time : 0",
            { font: "30px Arial", fill: "#ffffff" });

        //add soundss
        this.dropped = game.add.audio('dropped');
        this.delivered = game.add.audio('delivered');
        this.crash = game.add.audio('crash');
        this.santamove = game.add.audio('santamove');
    },
    update: function () {
        //if gift dropped down and hitted on the house
        game.physics.arcade.overlap(this.gifts, this.houses, this.increaseScore, null, this);
        //if santa crash with cloud
        game.physics.arcade.overlap(this.santa, this.clouds, this.clash, null, this);

    },
    
    increaseScore: function () {
        //console.log(this.gifts);
        for (var i = 0; i < this.gifts.children.length; i++)
            this.gifts.remove(this.gifts.children[i]);

        this.delivered.play();

        this.score++;
        this.labelScore.text = "score : " + this.score;
    },
    increaseTime: function () {
        this.time++;
        this.labelTime.text = "time : " + this.time;
    },
    increaseLevel: function () {
        this.level += 0.1;
    },
    clash: function() {
        this.crash.play();
        this.restartGame();

    },
    restartGame: function () {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
    moveUp: function () {
        // fly up
        if (this.santa.y > 50){
            this.santamove.play();
            this.santa.y -= 120;
        }

    },
    moveDown: function () {
        // fly down
        if (this.santa.y < 290){
            this.santamove.play();
            this.santa.y += 120;
        }

    },
    dropGift: function () {
        //drop the gift
        var gift = game.add.sprite(this.santa.x + this.santa.width / 6, this.santa.y + this.santa.height, 'gift');
        this.gifts.add(gift);
        game.physics.arcade.enable(gift);
        gift.scale.x = 0.1;
        gift.scale.y = 0.1;

        this.dropped.play();

        gift.body.gravity.y = 2000 * this.level;
        gift.checkWorldBounds = true;
        gift.outOfBoundsKill = true;
    },
    addHouse: function () {

        var house = game.add.sprite((1000 + Math.floor(Math.random() * 600)), 500, 'house');
        this.houses.add(house);
        house.scale.x = 0.35;
        house.scale.y = 0.35;

        // Enable physics on the pipe
        game.physics.arcade.enable(house);

        // Add velocity to the pipe to make it move left
        house.body.velocity.x = -400 * this.level;
        house.body.gravity.y = 0;

        house.checkWorldBounds = true;
    },

    addCloud: function () {

        var cloud = game.add.sprite((1000 + Math.floor(Math.random() * 300 * this.level)), 50 + (120 * Math.floor(Math.random() * 3)), 'cloud');
        this.clouds.add(cloud);
        cloud.scale.x = 0.15;
        cloud.scale.y = 0.15;

        // Enable physics on the pipe
        game.physics.arcade.enable(cloud);

        // Add velocity to the pipe to make it move left
        cloud.body.velocity.x = (-400 - Math.floor(Math.random()*200))* this.level;
        cloud.body.gravity.y = 0;

        cloud.checkWorldBounds = true;
    },
};

// Initialize Phaser, and create a 400px by 490px game
var game = new Phaser.Game(1000, 600);

// Add and start the 'main' state to start the game
game.state.add('main', mainState, true);