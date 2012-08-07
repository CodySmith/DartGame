class Bullet extends GameEntity<SpaceGame> {
  bool isP1;
  num dir;
  
  Bullet(Game game, num x, num y, num direction, num height, num width, bool p1) : super.withPosition(game, x, y, height, width) {
    opacity = 1;
    color = "255, 0, 0";
    isP1 = p1;
    dir = direction;
  }
  
  void update() {
    SpaceGame g = game;
    
    move();
    
    if (x > g.rect.halfWidth)
      removeFromGame();
    
    g.entities.filter((e) => e is Enemy && collidesWith(e)).forEach((e) => removeThem(e));
    
    super.update();
  }
 
  void move() {
      x += 4;
      y += dir;
  }
  
  void removeThem(e) {
    SpaceGame g = game;
    
    g.player1.score += 1;
    
    e.removeFromGame();
    removeFromGame();
  }
}
