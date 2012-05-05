class PowerUp extends GameEntity {
  String type;
  num creationTime = 0;
  
  PowerUp(Game game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    PongGame g = game;
    
    num rType = Math.random();
    creationTime = g.timer.gameTime;
    
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
    
    if (creationTime + 10 <= g.timer.gameTime)
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
  
  
  void draw(html.CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    
    ctx.fillStyle = "rgba(0, 0, 0, .5)";
    ctx.font = "24px Verdana";
    
    switch (type) {
      case 'reflector':      
        ctx.fillText("R", x - 8, y + 8);
        break;
      case 'extendor':
        ctx.fillText("E", x - 8, y + 8);
        break;
    }
  }
  
  void reflectorUpdate() {
    PongGame g = game;
    
    if (Math.random() > .5)
      g.ball.momentum.yVel = Math.random() * 300;
    else
      g.ball.momentum.yVel = Math.random() * -300;
  }
  
  void extendUpdate() {
    PongGame g = game;
    
    if (g.ball.momentum.xVel > 0)
      g.player1.height += 50;
    else if (g.ball.momentum.xVel < 0)
      g.player2.height += 50;
  }
}
