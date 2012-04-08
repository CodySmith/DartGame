class Ball extends GameEntity {
  num opacity = 1;
  
  num xVel;
  num yVel;
  
  Ball(Game game, num x, num y, num this.xVel, num this.yVel) : super.withPosition(game, x, y);
  
  void update() {
    Pong g = game;
    
    if (xVel < 0 && collidesWith(g.player1)) {
      g.ballHit();
      ballHit(g.player1);
      game.assetManager.playSound("sounds/hit1.ogg");
    } else if (xVel > 0 && collidesWith(g.player2)) {
      g.ballHit();
      ballHit(g.player2);
      game.assetManager.playSound("sounds/hit2.ogg");
    }
    
    if (y > 296 || y < -296) {
      yVel = yVel * -1;
      game.assetManager.playSound("sounds/hit3.ogg");
    }
    
    if (outsideScreen())
      g.gameOver();
    
    x += xVel;
    y += yVel;
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, $opacity)";
    ctx.fillRect(x - 4, y - 4, 8, 8);
    
    super.draw(ctx);
  }
  
  Rectangle getCollisionRectangle() {
    return new Rectangle(x - 4, y - 4, 8, 8);
  }
  
  void ballHit(Paddle paddle) {
    paddle.fade();
    var hitPlace = (paddle.y - y) + 60;
    var hitPlaceP = 100 - ((hitPlace / 120 * 100));
    yVel = ((8 * (hitPlaceP / 100)) - 4) + 0.5;
    xVel = xVel * -1;
    
    // increase speed
    xVel = xVel + .1;
  }
}
