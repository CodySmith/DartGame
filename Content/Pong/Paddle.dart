class Paddle extends GameEntity {
  num score = 0;
  num bullet = 0;
  num bulletTime = 0;
  
  Paddle(Game game, num x, num y) : super.withPosition(game, x, y, 8, 120) {
    opacity = 0.2;
  }
  
  void update() {
    move();
    super.update();
  }
  
  void move() {
    PongGame g = game;
    
    if (game.mouse != null)
      y = game.mouse.y;
    

    document.on.click.add((e) {
      if (bulletTime + .1 <= g.timer.gameTime)
      {
        if (g.player1.bullet >= 1)
        {
          bulletTime = g.timer.gameTime;
          g.newBullet(x + 10, y, true);
        }
      }
    });
  }

  
  void fade() {
    opacity = 0.5;
    window.setTimeout(() { opacity = 0.4;}, 50);
    window.setTimeout(() { opacity = 0.3;}, 100);
    window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
