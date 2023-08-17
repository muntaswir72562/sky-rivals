class Worm extends Sprite {
  constructor({
    platformCollisionBlocksArr,
    position,
    imgSrc,
    frameRate,
    scale = 0.12,
    velocity = 0.5,
    animations,
  }) {
    super({ imgSrc, frameRate, scale });
    this.platformCollisionBlocksArr = platformCollisionBlocksArr;
    this.position = {
      x: position.x,
      y: position.y - this.image.height * scale,
    };
    this.startX = this.position.x;
    this.velocity = velocity;
    this.moveLeft = true;
    this.animations = animations;
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imgSrc;
      this.animations[key].image = image;
    }
  }

  update() {
    this.updateFrame();
    this.wormMovement();
    // c.fillStyle = "rgba(0, 255, 0, 0.2)";
    // c.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.draw();
  }

  wormMovement() {
    if (this.moveLeft) {
      this.position.x -= this.velocity;
    } else {
      this.position.x += this.velocity;
    }

    // Check if the worm has reached the left or right boundary
    if (this.position.x <= this.startX - 20) {
      this.moveLeft = false; // Change direction to move right
      this.switchAnimation("wormRight");
    } else if (this.position.x >= this.startX + 20) {
      this.moveLeft = true; // Change direction to move left
      this.switchAnimation("wormLeft");
    }
  }

  switchAnimation(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
  }
  checkCollision(player) {
    return (
      player.position.y + player.height > this.position.y - this.height &&
      player.position.y < this.position.y + this.height &&
      player.position.x + player.width > this.position.x &&
      player.position.x < this.position.x + this.width
    );
  }

  //TODO: Darell -- To complete collision detection between player and worm;
  incrementWormCount() {
    //TODO: call the collision function - passed player object and worm object into the function; -- refer to player class line 165;
    //TODO: once player collides with the worm, increment worm count that is to be displayed on screen
    //TODO: get div in the dom -- tip: querySelector
    let countElement = document.querySelector(".worm-score > span");
    //TODO: display the new count value inside of the div -- tip: innerText;
    let count = Number(countElement.innerText);
    count++;
    countElement.innerText = count;
  }

  static spawnWorms(platformCollisionBlocksArr, imgSrc, frameRate, animations) {
    const idx = Math.floor(Math.random() * platformCollisionBlocksArr.length);
    const { position } = platformCollisionBlocksArr[idx];
    const newWorm = new Worm({
      platformCollisionBlocksArr,
      position: {
        x: position.x,
        y: position.y,
      },
      imgSrc,
      frameRate,
      animations,
    });
    spawnWorms.push(newWorm);

    // console.log("position: ", position.x, position.y);
  }
}
