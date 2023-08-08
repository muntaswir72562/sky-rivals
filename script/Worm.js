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
  checkCollision() {
    let count = 0;
    //TODO: call the collision function - passed player object and worm object into the function; -- refer to player class line 165;
    //TODO: once player collides with the worm, increment worm count that is to be displayed on screen
    //TODO: get div in the dom -- tip: querySelector
    //TODO: display the new count value inside of the div -- tip: innerText;
  }

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
