const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

const background = new Background({
  position: {
    x: 0,
    y: 0,
  },
  imgSrc: "../assets/background.jpg",
});

const animate = () => {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(1.2, 1.2);
  background.update();
  c.restore();
};

animate();
