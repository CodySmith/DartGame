class PowerUp extends GameEntity {
  String type;
  num creationTime = 0;
  
  PowerUp(Game game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    PongGame g = game;
    
    num rType = Math.random();
    creationTime = g.timer.gameTime;
    
    if (rType < .2) {
      color = "255, 255, 255";
      type = 'reflector';
    } else if (rType < .4) {
      color = "255, 255, 0";
      type = 'extendor';
    } else if (rType < .6) {
      color = "255, 0, 255";
      type = 'shrink';
    } else if (rType < 1.0) {
      color = "0, 255, 255";
      type = 'bullet';
    } else {
      
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
        case 'shrink':
          shrinkUpdate();
          break;
        case 'bullet':
          if (g.ball.momentum.xVel > 0)
            g.player1.bullet == true;
          else if (g.ball.momentum.xVel < 0)
            g.player2.bullet == true;
          
      }
      
      game.playSound("sounds/sweep", .1);
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
      case 'shrink':
        ctx.fillText("S", x - 8, y + 8);
        break;
      case 'bullet':
        ctx.fillText("B", x - 8, y + 8);
        break;  
    }
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
  
  void shrinkUpdate() {
    PongGame g = game;
    
    if (g.ball.momentum.xVel > 0)
      g.player1.height -= 50;
    else if (g.ball.momentum.xVel < 0)
      g.player2.height -= 50;
  }
}
