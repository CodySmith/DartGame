class Paddle extends GameEntity {
  num score = 0;
  
  Paddle(PongGame game, num x, num y) : super.withPosition(game, x, y, 8, 120) {
    opacity = 0.2;
  }
  
  void update() {
    move();
    super.update();
  }
  
  void move() {
    if (game.input.mouse != null)
      y = game.input.mouse.y;
  }
  
  void fade() {
//    opacity = 0.5;
//    html.window.setTimeout(() { opacity = 0.4;}, 50);
//    html.window.setTimeout(() { opacity = 0.3;}, 100);
//    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
