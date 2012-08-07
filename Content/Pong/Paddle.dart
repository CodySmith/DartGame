class Paddle extends GameEntity<PongGame> {
  num score = 0;
  num bullet = 0;
  num bulletTime = 0;
  
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
    
    if (game.input.click != null) {
      if (bulletTime + .1 <= game.timer.gameTime)
      {
        if (game.player1.bullet >= 1)
        {
          bulletTime = game.timer.gameTime;
          game.newBullet(x + 10, y, true);
        }
      }
    }
  }
  
  void fade() {
//    opacity = 0.5;
//    window.setTimeout(() { opacity = 0.4;}, 50);
//    window.setTimeout(() { opacity = 0.3;}, 100);
//    window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
