const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1440;
canvas.height = 815;

const camera = {
  position: {
    x: 0,
    y: -2176 + canvas.height,
  },
};

const velocityX = 5;
const velocityY = 5;

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "../assets/background.png",
});

const CollisionBlockArr = [];

const floorCollision2D = [];
for (let i = 0; i < floorCollision.length; i += 30) {
  floorCollision2D.push(floorCollision.slice(i, i + 30));
}

floorCollision2D.forEach((row, y) => {
  row.forEach((elem, x) => {
    if (elem === 497) {
      CollisionBlockArr.push(
        new CollisionBlock({
          position: {
            x: x * 128,
            y: y * 128,
          },
        })
      );
    }
  });
});

const platformCollision2D = [];
for (let i = 0; i < platformCollision.length; i += 30) {
  platformCollision2D.push(platformCollision.slice(i, i + 30));
}

const platformCollisionBlocksArr = [];
platformCollision2D.forEach((row, y) => {
  row.forEach((elem, x) => {
    if (elem === 497) {
      platformCollisionBlocksArr.push(
        new CollisionBlock({
          position: {
            x: x * 128,
            y: y * 128,
          },
        })
      );
    }
  });
});

const player = new Player({
  position: {
    x: 700,
    y: 1400,
  },
  CollisionBlockArr,
  platformCollisionBlocksArr,
  imgSrc: "../assets/takeoff.png",
  frameRate: 7.98,
  animations: {
    takeoff: {
      imgSrc: "../assets/takeoff.png",
      frameRate: 7.98,
      frameBuffer: 7,
    },
    flying: {
      imgSrc: "../assets/flying.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    walking: {
      imgSrc: "../assets/walking.png",
      frameRate: 5,
      frameBuffer: 7,
    },
    landing: {
      imgSrc: "../assets/landing.png",
      frameRate: 4,
      frameBuffer: 7,
    },
    down: {
      imgSrc: "../assets/landing.png",
      frameRate: 4,
      frameBuffer: 7,
    },
    attacking: {
      imgSrc: "../assets/attacking.png",
      frameRate: 5,
      frameBuffer: 7,
    },
    takeoffLeft: {
      imgSrc: "../assets/takeoffLeft.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    flyingLeft: {
      imgSrc: "../assets/flyingLeft.png",
      frameRate: 8,
      frameBuffer: 7,
    },
    walkingLeft: {
      imgSrc: "../assets/walkingLeft.png",
      frameRate: 5,
      frameBuffer: 7,
    },
    landingLeft: {
      imgSrc: "../assets/landingLeft.png",
      frameRate: 6,
      frameBuffer: 7,
    },
    attackingLeft: {
      imgSrc: "../assets/attackingLeft.png",
      frameRate: 5,
      frameBuffer: 7,
    },
    downLeft: {
      imgSrc: "../assets/landingLeft.png",
      frameRate: 4,
      frameBuffer: 7,
    },
  },
});

const spawnedEnemies = [];
setInterval(() => {
  Enemy.spawnRandomEnemy(platformCollisionBlocksArr);
}, 3000);

const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(camera.position.x, camera.position.y);

  background.update();
  CollisionBlockArr.forEach((collisionBlock) => collisionBlock.update());
  platformCollisionBlocksArr.forEach((collisionBlock) =>
    collisionBlock.update()
  );
  player.update();

  spawnedEnemies.forEach((enemy, i) => {
    enemy.update();
    const playerHitEnemy = collision(player.hitBox, enemy);

    if (playerHitEnemy) {
      // Player's hitbox collided first
      console.log("Player's hitbox collided with the enemy first!");
      // Implement logic for player's hitbox colliding first here, e.g., reduce player health
      spawnedEnemies.splice(i, 1); // Remove the enemy from the array
    }
  });

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.switchAnimation("flying");
    player.velocity.x = velocityX;
    player.lastDirection = "right";
    player.panCameraLeft();
  } else if (keys.a.pressed) {
    player.switchAnimation("flyingLeft");
    player.velocity.x = -velocityX;
    player.lastDirection = "left";
    player.panCameraRight();
  } else {
    if (player.lastDirection === "left") {
      player.switchAnimation("takeoffLeft");
    } else {
      player.switchAnimation("takeoff");
    }
  }

  player.velocity.y = 0;
  if (keys.w.pressed) {
    player.velocity.y = -velocityY;
    player.panCameraDown();
  } else if (keys.s.pressed) {
    player.switchAnimation("down");
    player.velocity.y = velocityY;
    player.panCameraUp();
  }

  if (player.velocity.y < 0) {
    player.switchAnimation("flying");
  }

  c.restore();
};

animate();

window.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = true;
      break;
    case "d":
      keys.d.pressed = true;
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "w":
      keys.w.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
  }
});
