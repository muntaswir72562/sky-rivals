const collision = (player, block) => {
  return (
    player.position.y + player.height > block.position.y && // check if bottom of player collides
    player.position.y < block.position.y + block.height && // check if top of player collides
    player.position.x + player.width > block.position.x && // check if right of player collides
    player.position.x < block.position.x + block.width
  ); // check if left of player collides)
};
