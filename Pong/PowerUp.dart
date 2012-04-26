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
  // Overide draw method to add a letter to the power up box.
  
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
