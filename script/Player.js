class Player extends Sprite {
  constructor({
    position,
    CollisionBlockArr,
    platformCollisionBlocksArr,
    imgSrc,
    frameRate,
    scale = 0.25,
    animations,
  }) {
    super({ imgSrc, frameRate, scale });
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.CollisionBlocks = CollisionBlockArr;
    this.platformCollisionBlocks = platformCollisionBlocksArr;
    this.animations = animations;
    this.lastDirection = "right";
    this.health = 100;
    this.score = 0;
    for (let key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imgSrc;
      this.animations[key].image = image;
    }
  }

  switchAnimation(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  update() {
    this.updateFrame();
    this.updateHitBox();
    this.updateCameraBox();
    this.horizontalCanvasCollision();
    this.verticalCanvasCollision();
    // this.checkCollision();

    c.fillStyle = "rgba(0, 255, 0, 0.5)";
    c.fillRect(
      this.cameraBox.position.x,
      this.cameraBox.position.y,
      this.cameraBox.width,
      this.cameraBox.height
    );

    c.fillStyle = "rgba(0, 0, 255, 0.2)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);

    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.updateHitBox();
    this.horizontalCollision(this.CollisionBlocks);
    this.horizontalCollision(this.platformCollisionBlocks);
    this.updateHitBox();
    this.verticalCollision(this.CollisionBlocks);
    this.verticalCollision(this.platformCollisionBlocks);
  }

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 3,
        y: this.position.y + 30,
      },
      width: 175,
      height: 150,
    };
  }

  updateCameraBox() {
    this.cameraBox = {
      position: {
        x: this.position.x - 150,
        y: this.position.y - 150,
      },
      width: 500,
      height: 500,
    };
  }

  panCameraRight() {
    if (this.cameraBox.position.x <= 0) return;

    if (this.cameraBox.position.x <= Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  panCameraLeft() {
    const cameraBoxRight = this.cameraBox.position.x + this.cameraBox.width;

    if (cameraBoxRight >= 3840) return;
    if (cameraBoxRight >= canvas.width + Math.abs(camera.position.x)) {
      camera.position.x -= this.velocity.x;
    }
  }

  panCameraDown() {
    if (this.cameraBox.position.y <= 0) return;
    if (this.cameraBox.position.y <= Math.abs(camera.position.y)) {
      camera.position.y -= this.velocity.y;
    }
  }

  panCameraUp() {
    if (this.cameraBox.position.y + this.cameraBox.height >= 2176) return;
    if (
      this.cameraBox.position.y + this.cameraBox.height >=
      Math.abs(camera.position.y) + canvas.height
    ) {
      camera.position.y -= this.velocity.y;
    }
  }

  horizontalCollision(collisionBlocks) {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];
      if (collision(this.hitBox, collisionBlock)) {
        if (this.velocity.x < 0) {
          this.velocity.x = 0;
          const offset = this.hitBox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          this.velocity.x = 0;
          const offset =
            this.hitBox.position.x - this.position.x + this.hitBox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }

  horizontalCanvasCollision() {
    if (
      this.hitBox.position.x + this.hitBox.width + this.velocity.x >= 3840 ||
      this.hitBox.position.x + this.velocity.x <= 0
    ) {
      this.velocity.x = 0;
    }
  }

  verticalCollision(collisionBlocks) {
    for (let i = 0; i < collisionBlocks.length; i++) {
      const collisionBlock = collisionBlocks[i];
      if (collision(this.hitBox, collisionBlock)) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset =
            this.hitBox.position.y - this.position.y + this.hitBox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitBox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }
      }
    }
  }

  verticalCanvasCollision() {
    if (this.hitBox.position.y + 30 + this.velocity.y <= 0) {
      this.velocity.y = 0;
    }
  }

  takeHit() {
    this.health -= 20;

    // if (this.health <= 0) {
    //   this.switchSprite('death')
    // } else this.switchSprite('takeHit')
  }
}
