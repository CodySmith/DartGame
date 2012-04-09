class Ball extends GameEntity {
  Ball(Game game, num x, num y) : super.withPosition(game, x, y, 8, 8);
  
  void update() {
    Pong g = game;
    
    if (collidesWith(g.player1)) {
      g.ballHit();
      ballHit(g.player1);
      game.assetManager.playSound("sounds/hit1.ogg");
    } else if (collidesWith(g.player2)) {
      g.ballHit();
      ballHit(g.player2);
      game.assetManager.playSound("sounds/hit2.ogg");
    } else if (outsideScreen()) {
      g.gameOver();
    }
    
    // check to see if the ball hit the top or bottom.
    if (y > game.halfSurfaceHeight - 4 || y < -(game.halfSurfaceHeight - 4)) {
      momentum.yVel *= -1;
      double volume = momentum.yVel.abs() * .05;
      game.assetManager.playSound("sounds/hit3.ogg", volume);
    }
    
    super.update();
  }
  
  void ballHit(Paddle paddle) {
    paddle.fade();
    var hitPlace = (paddle.y - y) + 60;
    var hitPlaceP = 100 - ((hitPlace / 120 * 100));
    momentum.yVel = ((8 * (hitPlaceP / 100)) - 4) + 0.5;
    momentum.xVel *= -1;
    
    // increase speed
    if (momentum.xVel < 10)
      momentum.xVel *= 1.05;
    else
      momentum.xVel *= 1.015;
  }
}
