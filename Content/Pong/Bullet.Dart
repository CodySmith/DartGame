class Bullet extends GameEntity<PongGame> {
  bool isP1;
  
  Bullet(PongGame game, num x, num y, bool p1) : super.withPosition(game, x, y, 8, 8) {
    opacity = 1;
    color = "255, 0, 0";
    isP1 = p1;
  }
  
  void update() {
    move();
    
    if (collidesWith(game.player1)) {
      game.player1.x -= 100;
      game.player1.removeFromGame();
      removeFromGame();
      game.p1Dead = true;
    } else if (collidesWith(game.player2)) {
      game.player2.x += 100;
      game.player2.removeFromGame();
      removeFromGame();
      game.p2Dead = true;
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
