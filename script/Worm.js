class Worm {
  constructor({ platformCollisionBlocksArr, position }) {
    this.width = 20;
    this.height = 20;
    this.platformCollisionBlocksArr = platformCollisionBlocksArr;
    this.position = {
      x: position.x,
      y: position.y,
    };
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(
      this.position.x,
      this.position.y - this.height,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.checkCollision();
  }

  //TODO: Darell -- To complete collision detection between player and worm;
  checkCollision(player, worm) {
    let count = 0;

    for (let i = 0; i < player.CollisionBlocks.length; i++) {
      const collisionBlock = player.CollisionBlocks[i];
      if (collision(this.hitBox, collisionBlock)) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y + this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y + offset + 0.01;
          break;
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y + this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }

    // Increment and display
    const wormCountElement = document.querySelector("worm-count");
    if (wormCountElement) {
      let currentCount = parseInt(wormCountElement.innerText);
      currentCount++;
      wormCountElement.innerText = currentCount; // Update displayed count
    }
  }
  //TODO: call the collision function - passed player object and worm object into the function; -- refer to player class line 165;
  //TODO: once player collides with the worm, increment worm count that is to be displayed on screen
  //TODO: get div in the dom -- tip: querySelector
  //TODO: display the new count value inside of the div -- tip: innerText;

  static spawnWorms(platformCollisionBlocksArr) {
    const idx = Math.floor(Math.random() * platformCollisionBlocksArr.length);
    const { position } = platformCollisionBlocksArr[idx];
    const newWorm = new Worm({
      platformCollisionBlocksArr,
      position: {
        x: position.x,
        y: position.y,
      },
    });
    spawnWorms.push(newWorm);
    console.log("worm drawned!");
    // console.log("position: ", position.x, position.y);
  }
}
