class Ball extends GameEntity {
  num startVel = 400;
  num reflectX = 1;
  
  Ball(Game game, num x, num y) : super.withPosition(game, x, y, 8, 8) {
    momentum.xMax = 1400;
    momentum.xAccel = 15;
  }
  
  void update() {
    PongGame g = game;
    
    double angle = Math.atan2(momentum.xVel.abs(), momentum.yVel.abs()) / (Math.PI/180);
    // check to see if the ball hit the top or bottom.
    if (y > game.halfSurfaceHeight - 4 || y < -(game.halfSurfaceHeight)) {
      momentum.yVel *= -1;
      double volume = (90 - angle) / 50;
      volume = Math.min(volume, 1);
      game.playSound("sounds/hit3", volume);
    }
  
    if (collidesWith(g.player1) && reflectX < 0) {
      g.ballHit();
      ballHit(g.player1);
      reflectX = 1;
      game.playSound("sounds/hit1");
    } else if (collidesWith(g.player2) && reflectX > 0) {
      g.ballHit();
      ballHit(g.player2);
      reflectX = -1;
      game.playSound("sounds/hit2");
    } 
    if (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth)) {
        if (x > 0) {
          x = -400;
          startVel = 400;
          reflectX = 1;
          g.player1.score++;
        }
        else {
          x = 400;
          startVel = -400;
          reflectX = -1;
          g.player2.score++;
        }
        g.gameOver();
      }
    
    super.update();
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