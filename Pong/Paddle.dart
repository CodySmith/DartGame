class Paddle extends GameEntity {
  num opacity = 0.2;
  
  Paddle(Game game, num x, num y) : super.withPosition(game, x, y);
  
  void update() {
    if (game.mouse != null)
      y = game.mouse.y;
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.fillStyle = "rgba(255, 255, 255, $opacity)";
    ctx.fillRect(x, (y - 60), 8, 120);
    
    super.draw(ctx);
  }
  
  void fade() {
    opacity = 0.5;
    html.window.setTimeout(() { opacity = 0.4;}, 50);
    html.window.setTimeout(() { opacity = 0.3;}, 100);
    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
