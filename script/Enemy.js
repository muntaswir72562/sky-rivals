class Enemy {
  constructor({ platformCollisionBlocksArr, position }) {
    this.width = 50;
    this.height = 50;
    this.platformCollisionBlocksArr = platformCollisionBlocksArr;
    this.position = {
      x: position.x,
      y: position.y,
    };
    this.isChasing = false;
    this.speed = 2;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.initialChaseVelocity = {
      x: 0,
      y: 0,
    };
    this.randomOffsetApplied = false;
  }

  draw() {
    c.fillStyle = "blue";
    c.fillRect(
      this.position.x,
      this.position.y - this.height,
      this.width,
      this.height
    );
  }

  updateAreaDetection() {
    this.areaDetection = {
      x: this.position.x - 80,
      y: this.position.y - 100,
      width: 200,
      height: 200,
    };
  }

  update() {
    this.draw();
    this.updateAreaDetection();
    //this.checkCollision();

    c.fillStyle = "rgba(0,255, 0, 0.2)";
    c.fillRect(
      this.areaDetection.x,
      this.areaDetection.y,
      this.areaDetection.width,
      this.areaDetection.height
    );
    this.checkDetectionArea();
    if (this.isChasing) {
      this.chasePlayer();
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  static spawnRandomEnemy(platformCollisionBlocksArr) {
    const idx = Math.floor(Math.random() * platformCollisionBlocksArr.length);
    const { position } = platformCollisionBlocksArr[idx];
    const newEnemy = new Enemy({
      platformCollisionBlocksArr,
      position: {
        x: position.x,
        y: position.y,
      },
    });
    spawnedEnemies.push(newEnemy);
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
