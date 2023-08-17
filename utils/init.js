const init=(highScore)=>{
        camera = {
          position: {
            x: 0,
            y: -2176 + canvas.height,
          },
        };
      
         keys = {
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
          j: {
            pressed: false,
          },
          l: {
            pressed: false,
          },
        };
      
         background = new Sprite({
          position: {
            x: 0,
            y: 0,
          },
          imgSrc: "../assets/background.png",
        });
         player = new Player({
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
      
         spawnedEnemies = [];
        player.highScore=highScore
        document.querySelector('.game-over-wrapper').style.display = "none"
        document.querySelector('.health-bar-fill').style.width="100%"
        document.querySelector('.health-bar-text').innerHTML="100%"
        document.querySelector('#score').innerHTML=0
}
