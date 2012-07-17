class Bullet extends GameEntity {
  bool isP1;
  Bullet(Game game, num x, num y, bool p1) : super.withPosition(game, x, y, 8, 8) {
    opacity = 1;
    color = "255, 0, 0";
    isP1 = p1;
  }
  
  void update() {
    PongGame g = game;
    
    move();
    
    if (collidesWith(g.player1)) {
      g.player1.x -= 100;
      g.player1.removeFromGame();
      removeFromGame();
    } else if (collidesWith(g.player2)) {
      g.player2.x += 100;
      g.player2.removeFromGame();
      removeFromGame();
    }
    
    super.update();
  }
  
  void move() {
    if (isP1 == true)
      x += 4;
    else
      x -= 4;
  }
}
