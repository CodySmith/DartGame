class Stars extends GameEntity {
  
  Stars(Game game, num x, num y) : super.withPosition(game, x, y, 2, 2) {
    opacity = Utils.random(.5, 1);
    color = "255, 255, 255";
  }
  
  void update() {
    SpaceGame g = game;
    
    move();
    
    if (x < -g.halfSurfaceWidth)
      removeFromGame();
    
    super.update();
  }
 
  void move() {
    x -= 1;
  }
}