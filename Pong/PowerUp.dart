class PowerUp extends GameEntity {
  PowerUp(Game game, num x, num y) : super.withPosition(game, x, y, 16, 64) {
    
  }
  
  void update() {
    PongGame g = game;
    
    if (collidesWith(g.ball)) {
      if (Math.random() > .5)
        g.ball.momentum.yVel = Math.random() * 200;
      else
        g.ball.momentum.yVel = Math.random() * -200;
      
      removeFromWorld = true;
    }
  }
}
