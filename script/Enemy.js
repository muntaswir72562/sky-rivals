class Enemy extends Sprite {
  constructor({
    platformCollisionBlocksArr,
    position,
    imgSrc,
    frameRate,
    scale = 0.18,
    animations,
  }) {
    super({ imgSrc, frameRate, scale });
    this.width = 50;
    this.height = 50;
    this.platformCollisionBlocksArr = platformCollisionBlocksArr;
    this.position = {
      x: position.x,
      y: position.y - this.image.height * scale,
    };
    this.isChasing = false;
    this.speed = 2.2;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.initialChaseVelocity = {
      x: 0,
      y: 0,
    };
    this.randomOffsetApplied = false;
    this.imgSrc = imgSrc;
    this.frameRate;
    this.direction = "left";
    this.animations = animations;
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imgSrc;
      this.animations[key].image = image;
    }
  }

  updateAreaDetection() {
    this.areaDetection = {
      x: this.position.x - 80,
      y: this.position.y - 100,
      width: 300,
      height: 300,
    };
  }

  update() {
    // c.fillStyle = "rgba(255, 0,0, 0.2)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.updateFrame();
    this.draw();
    this.updateAreaDetection();
    //this.checkCollision();

    // c.fillStyle = "rgba(0,255, 0, 0.2)";
    // c.fillRect(
    //   this.areaDetection.x,
    //   this.areaDetection.y,
    //   this.areaDetection.width,
    //   this.areaDetection.height
    // );
    this.checkDetectionArea();
    if (this.isChasing) {
      this.chasePlayer();

      if (this.velocity.x > 0) {
        this.switchAnimation("enemyRight");
      } else if (this.velocity.x < 0) {
        this.switchAnimation("enemyLeft");
      }
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  static spawnRandomEnemy(
    platformCollisionBlocksArr,
    imgSrc,
    frameRate,
    animations
  ) {
    const idx = Math.floor(Math.random() * platformCollisionBlocksArr.length);
    const { position } = platformCollisionBlocksArr[idx];
    const newEnemy = new Enemy({
      platformCollisionBlocksArr,
      position: {
        x: position.x,
        y: position.y,
      },
      imgSrc,
      frameRate,
      animations,
    });
    spawnedEnemies.push(newEnemy);
    // console.log(newEnemy);
    // console.log("enemy drawned!");
    // console.log("position: ", position.x, position.y);
  }

  checkDetectionArea() {
    if (
      player.position.y + player.height > this.areaDetection.y && // check if bottom of player collides
      player.position.y < this.areaDetection.y + this.areaDetection.height && // check if top of player collides
      player.position.x + player.width > this.areaDetection.x && // check if right of player collides
      player.position.x < this.areaDetection.x + this.areaDetection.width
    ) {
      this.isChasing = true;
    } else {
      this.randomOffsetApplied = false;
    }
  }

  switchAnimation(key) {
    console.log(this.animations);
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
  }

  chasePlayer() {
    if (!this.randomOffsetApplied) {
      // Calculate the direction vector from the enemy to the player
      const dx = player.position.x - this.position.x;
      const dy = player.position.y - this.position.y;

      // Calculate the distance between the enemy and the player
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Normalize the direction vector
      const normalizedDx = dx / distance;
      const normalizedDy = dy / distance;

      const randomOffset = 0.2;
      const offsetX = (Math.random() * 2 - 1) * randomOffset;
      const offsetY = (Math.random() * 2 - 1) * randomOffset;

      // Save the initial chase velocity with offset
      this.initialChaseVelocity.x = (normalizedDx + offsetX) * this.speed;
      this.initialChaseVelocity.y = (normalizedDy + offsetY) * this.speed;

      this.randomOffsetApplied = true;
      this.direction = this.velocity.x > 0 ? "right" : "left";
    }
    // Update the velocity to move towards the player
    this.velocity.x = this.initialChaseVelocity.x;
    this.velocity.y = this.initialChaseVelocity.y;
  }

  // checkCollision() {
  //   if (collision(this, player)) {
  //     console.log("enemy collided with player first");
  //     player.takeHit()
  //     console.log("health-"+player.health)
  //   }
  // }
}
