class Ball extends GameEntity {
  num startVel = 400;
  double angle;
  
  Ball(Game game, num x, num y) : super.withPosition(game, x, y, 8, 8) {
    momentum.xMax = 1400;
    momentum.xAccel = 50;
  }
  
  void update() {
    Pong g = game;
    
    
    angle = Math.atan2(momentum.xVel.abs(), momentum.yVel.abs()) / (Math.PI/180);
    // check to see if the ball hit the top or bottom.
    if (y > game.halfSurfaceHeight - 4 || y < -(game.halfSurfaceHeight - 4)) {
      momentum.yVel *= -1;
      print(angle);
      double volume = (90 - angle) / 50;
      game.playSound("sounds/hit3.ogg", volume);
      
    }
    
    if (collidesWith(g.player1)) {
      g.ballHit();
      ballHit(g.player1);
      game.playSound("sounds/hit1.ogg");
    } else if (collidesWith(g.player2)) {
      g.ballHit();
      ballHit(g.player2);
      game.playSound("sounds/hit2.ogg");
    } else if (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth)) {
      if (x > 0)
        g.player1.score++;
      else
        g.player2.score++;
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