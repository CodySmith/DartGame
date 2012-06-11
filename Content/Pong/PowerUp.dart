class PowerUp extends GameEntity {
  String type;
  num creationTime = 0;
  
  PowerUp(PongGame game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    num rType = Math.random();
    creationTime = game.timer.gameTime;
    
    if (rType > .5) {
      color = "255, 255, 255";
      type = 'reflector';
    } else {
      color = "255, 255, 0";
      type = 'extendor';
    }
  }
  
  void update() {
    PongGame g = game;
    if (creationTime + 10 <= game.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(g.ball)) {
      switch (type) {
        case 'reflector':
          reflectorUpdate();
          break;
        case 'extendor':
          extendUpdate();
          break;
      }
      
      removeFromGame();
    }
    
    super.update();
  }
  
  void reflectorUpdate() {
    PongGame g = game;
    if (Math.random() > .5)
      g.ball.momentum.yVel = Utils.random(200, 600);
    else
      g.ball.momentum.yVel = Utils.random(-200, -600);
  }
  
  void extendUpdate() {
    PongGame g = game;
    if (g.ball.momentum.xVel > 0)
      g.player1.height += 50;
    else if (g.ball.momentum.xVel < 0)
      g.player2.height += 50;
  }
}
