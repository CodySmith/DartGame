class Ball extends GameEntity {
  num opacity = 1;
  
  num xVel;
  num yVel;
  
  Ball(Game game, num x, num y, num this.xVel, num this.yVel) : super.withPosition(game, x, y);
  
  void update() {
    x += xVel;
    y += yVel;
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, $opacity)";
    ctx.fillRect((18 + x), y, 8, 8);
    
    super.draw(ctx);
  }
}
