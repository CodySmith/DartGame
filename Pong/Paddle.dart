class Paddle extends GameEntity {
  num score = 0;
  
  Paddle(Game game, num x, num y) : super.withPosition(game, x, y, 8, 120) {
    opacity = 0.2;
  }
  
  void update() {
    move();
    super.update();
  }
  
  void move() {
    if (game.mouse != null)
      y = game.mouse.y;
  }
  
  void fade() {
    opacity = 0.5;
    html.window.setTimeout(() { opacity = 0.4;}, 50);
    html.window.setTimeout(() { opacity = 0.3;}, 100);
    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
