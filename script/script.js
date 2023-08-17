const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const resetBtn = document.querySelector("#restart");
const sound = new Audio();
sound.src = "../assets/background.flac";

// canvas.width = 1440;
// canvas.height = 815;

function resizeCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
let camera = {
  position: {
    x: 0,
    y: -2176 + canvas.height,
  },
};

const velocityX = 5;
const velocityY = 5;

let keys = {
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
  l: {
    pressed: false,
  },
  j: {
    pressed: false,
  },
};

const soundStatus = {
  d: false,
  a: false,
};

let background = new Sprite({
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

let player = new Player({
  position: {
    x: 700,
    y: 1612,
  },
  CollisionBlockArr,
  platformCollisionBlocksArr,
  imgSrc: "../assets/flying.png",
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

const wormAnimation = {
  wormLeft: {
    imgSrc: "../assets/wormLeft.png",
    frameBuffer: 5,
  },
  wormRight: {
    imgSrc: "../assets/wormRight.png",
    frameBuffer: 5,
  },
};

const enemyAnimation = {
  enemyLeft: {
    imgSrc: "../assets/enemyLeft.png",
    frameBuffer: 8,
  },
  enemyRight: {
    imgSrc: "../assets/enemyRight.png",
    frameBuffer: 8,
  },
};

let spawnedEnemies = [];
setInterval(() => {
  Enemy.spawnRandomEnemy(
    platformCollisionBlocksArr,
    "../assets/enemyLeft.png",
    8,
    enemyAnimation
  );
}, 3000);

let spawnWorms = [];
setInterval(() => {
  Worm.spawnWorms(
    platformCollisionBlocksArr,
    "../assets/wormLeft.png",
    5,
    wormAnimation
  );
}, 3000);

const switchSound = (src, volume = 1) => {
  const sound = new Audio();
  sound.src = src;
  sound.volume = volume;
  sound.play();
};

const animate = () => {
  sound.play();
  if (!player.gameOver) {
    window.requestAnimationFrame(animate);
  }
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.translate(camera.position.x, camera.position.y);

  background.update();
  player.checkHealth();
  //player.checkHighScore();
  CollisionBlockArr.forEach((collisionBlock) => collisionBlock.update());
  platformCollisionBlocksArr.forEach((collisionBlock) =>
    collisionBlock.update()
  );
  player.update();

  //Spawning a new worm on the screen.
  spawnWorms.forEach((worm, i) => {
    worm.update();

    if (worm.checkCollision(player.hitBox)) {
      worm.incrementWormCount();
      player.score += 1;
      updateScore(player.score);
      console.log("worm eaten");
      spawnWorms.splice(i, 1);
    }
  });

  spawnedEnemies.forEach((enemy, i) => {
    enemy.update();
    const playerHitEnemy = collision(player.hitBox, enemy);

    if (playerHitEnemy) {
      switchSound("../assets/attack.mp3", 0.5);
      if (
        player.image.getAttribute("src") == "../assets/attacking.png" &&
        collisionRight(player.hitBox, enemy)
      ) {
        //console.log("collide right");
        player.score += 5;
        updateScore(player.score);
        //console.log("score-" + player.score);
      } else if (
        player.image.getAttribute("src") == "../assets/attackingLeft.png" &&
        collisionLeft(player.hitBox, enemy)
      ) {
        // console.log("collide left");
        player.score += 5;
        updateScore(player.score);
        //console.log("score-" + player.score);
      } else {
        player.health -= 10;
        updateHealth(player.health);

        //console.log("health-" + player.health);
      }

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
  } else if (keys.l.pressed) {
    player.switchAnimation("attacking");
    player.lastDirection = "right";
    player.panCameraRight();
  } else if (keys.j.pressed) {
    player.switchAnimation("attackingLeft");
    player.lastDirection = "left";
    player.panCameraLeft();
  } else {
    if (player.lastDirection === "left") {
      player.switchAnimation("flyingLeft");
    } else {
      player.switchAnimation("flying");
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
function updateHealth(health) {
  health += "%";
  document.querySelector(".health-bar-fill").style.width = health;
  document.querySelector(".health-bar-text").innerHTML = health;
}
function updateScore(score) {
  document.querySelector("#score").innerHTML = score;
}

window.addEventListener("keydown", (e) => {
  const key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = true;
      if (!soundStatus.a) {
        switchSound("../assets/whoosh.flac", 0.2);
        soundStatus.a = true;
      }
      break;
    case "d":
      keys.d.pressed = true;
      if (!soundStatus.d) {
        switchSound("../assets/whoosh.flac", 0.2);
        soundStatus.d = true;
      }
      break;
    case "s":
      keys.s.pressed = true;
      break;
    case "w":
      keys.w.pressed = true;
      break;
    case "l":
      keys.l.pressed = true;
      break;
    case "j":
      keys.j.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (e) => {
  const key = e.key;

  switch (key) {
    case "a":
      keys.a.pressed = false;
      soundStatus.a = false;
      break;
    case "d":
      keys.d.pressed = false;
      soundStatus.d = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;
    case "l":
      keys.l.pressed = false;
      break;
    case "j":
      keys.j.pressed = false;
      break;
  }
});

resetBtn.addEventListener("click", () => {
  //console.log('test')
  init(player.highScore);
  animate();
});
