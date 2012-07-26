class PowerUp extends GameEntity {
  String type;
  num creationTime = 0;
  
  PowerUp(Game game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    SpaceGame g = game;
    
    num rType = Math.random();
    creationTime = g.timer.gameTime;
    
    if (rType < 1) {
      color = "255, 255, 255";
      type = 'reflector';
    }
  }
  
  void update() {
    SpaceGame g = game;
    
    x -= 2;
    
    if (creationTime + 10 <= g.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(g.player1)) {
      switch (type) {
        case 'SpreadShot':
          SpreadUpdate();
          break;
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
      case 'SpreadShot':      
        ctx.fillText("S", x - 8, y + 8);
        break;

    }
  }
  
  void SpreadUpdate() {
    SpaceGame g = game;
    
  }
  
}
