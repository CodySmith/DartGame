class PowerUp extends GameEntity {
  String type;
  
  PowerUp(Game game, num x, num y, num rand) : super.withPosition(game, x, y, 36, 36) {
    if (rand > .5) {
      color = "255, 255, 255";
      type = 'reflector';
    } else {
      color = "255, 255, 0";
      type = 'extendor';
    }
  }
  
  void update() {
    PongGame g = game;
    
    if (collidesWith(g.ball)) {
      switch (type) {
        case 'reflector':
          reflectorUpdate();
          break;
        case 'extendor':
          extendUpdate();
          break;
      }
      
      removeFromWorld = true;
    }
    
  }
  
  void reflectorUpdate() {
    PongGame g = game;
    
    if (Math.random() > .5)
      g.ball.momentum.yVel = Math.random() * 200;
    else
      g.ball.momentum.yVel = Math.random() * -200;
  }
  
  void extendUpdate() {
    PongGame g = game;
    
    if (g.ball.momentum.xVel > 0)
      g.player1.height += 50;
    else if (g.ball.momentum.xVel < 0)
      g.player2.height += 50;
  }
}
