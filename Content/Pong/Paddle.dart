class Paddle extends GameEntity {
  num score = 0;
  num bullet = 10;
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
    

    html.document.on.click.add((e) {
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
    html.window.setTimeout(() { opacity = 0.4;}, 50);
    html.window.setTimeout(() { opacity = 0.3;}, 100);
    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
