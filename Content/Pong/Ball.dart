class Ball extends GameEntity<PongGame> {
  num startVel = 400;
  
  Ball(PongGame game, num x, num y) : super.withPosition(game, x, y, 8, 8) {
    momentum.xMax = 1400;
    momentum.xAccel = 15;
  }
  
  void update() {
    super.update();
    
    // if the ball gets to either side of the board, make sure it doesn't go through the paddle before we check for collision
    if (momentum.xVel > 0 && box.right > game.player2.box.left
        && game.player2.box.top < box.bottom && game.player2.box.bottom > box.top)
      x = game.player2.box.left - (width / 2);
    if (momentum.xVel < 0 && box.left < game.player1.box.right
        && game.player1.box.top < box.bottom && game.player1.box.bottom > box.top)
      x = game.player1.box.right + (width / 2);

    // if the ball gets to the top or bottom, make sure it doesn't go through them before we check for collision
    if (momentum.yVel > 0 && box.bottom > game.rect.halfHeight)
      y = game.rect.halfHeight - (height / 2);
    if (momentum.yVel < 0 && box.top < -game.rect.halfHeight)
      y = -game.rect.halfHeight + (height / 2);
    
    // check to see if the ball hit the top or bottom.
    if (box.bottom >= game.rect.halfHeight || box.top <= -game.rect.halfHeight) {
      momentum.yVel *= -1;
      double angle = Math.atan2(momentum.xVel.abs(), momentum.yVel.abs()) / (Math.PI/180);
      double volume = (90 - angle) / 50;
      volume = Math.min(volume, 1);
      game.sound.play("hit3", volume);
    }
    
    if (collidesWith(game.player1)) {
      game.ballHit();
      ballHit(game.player1);
      game.sound.play("hit1");
    } else if (collidesWith(game.player2)) {
      game.ballHit();
      ballHit(game.player2);
      game.sound.play("hit2");
    }
    
    if (x > game.rect.halfWidth || x < -game.rect.halfWidth) {
      if (x > 0) {
        x = -400;
        startVel = 400;
        game.player1.score++;
        game.sound.play("sweep");
      } else {
        x = 400;
        startVel = -400;
        game.player2.score++;
        game.sound.play("sweep");
      }
      game.gameOver();
    }
  }
  
  void ballHit(Paddle paddle) {
    paddle.fade();
    var hitPlace = -(paddle.y - y);
    momentum.yVel = hitPlace * 5;
    momentum.xVel *= -1;
    
    // slow the acceleration after 600
    if (momentum.xVel > 600)
      momentum.xAccel = 5;
  }
}