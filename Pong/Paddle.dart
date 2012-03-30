class Paddle extends GameEntity {
  num playerBatOpacity = 0.2;
  
  Paddle(Game game, num x, num y) : super.withPosition(game, x, y);
  
  void update() {
    
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, "+playerBatOpacity+")";
    ctx.fillRect(x, (y - 60), 8, 120);
    
    super.draw(ctx);
  }
  
  bool collidePaddle() {
    
  }
}
