class Ball extends GameEntity {
  num playerBatOpacity = 1;
  
  num xVel;
  num yVel;
  
  Ball(Game game, num x, num y, num xVelocity, num yVelocity) : super.withPosition(game, x, y) {
    xVel = xVelocity;
    yVel = yVelocity;
  }
  
  void update() {
    x += xVel;
    y += yVel;
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, "+playerBatOpacity+")";
    ctx.fillRect((18 + x), y, 8, 8);
    
    super.draw(ctx);
  }
}
