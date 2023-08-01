class Background {
  constructor({ position, imgSrc }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imgSrc;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y);
  }

  update() {
    this.draw();
  }
}
