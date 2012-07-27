class Bullet extends GameEntity {
  bool isP1;
  
  Bullet(Game game, num x, num y, num height, num width, bool p1) : super.withPosition(game, x, y, height, width) {
    opacity = 1;
    color = "255, 0, 0";
    isP1 = p1;
  }
  
  void update() {
    SpaceGame g = game;
    
    move();
    
    if (x > g.halfSurfaceWidth)
      removeFromGame();
    
    g.entities.filter((e) => e is Enemy && collidesWith(e)).forEach((e) => removeThem(e));
    
    super.update();
  }
 
  void move() {
    if (isP1 == true)
      x += 4;
    else
      x -= 4;
  }
  
  void removeThem(e) {
    e.removeFromGame();
    removeFromGame();
  }
}
