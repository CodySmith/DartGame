class Stars extends GameEntity {
  num xVel;
  
  Stars(Game game, num x, num y, num h, num w) : super.withPosition(game, x, y, h, w) {
    opacity = Utils.random(.5, 1);
    color = "255, 255, 255";
    xVel = Utils.random(.5, 1.5);
  }
  
  void update() {
    SpaceGame g = game;
    
    x -= xVel;
    
    if (x < -g.halfSurfaceWidth)
      removeFromGame();
    
    super.update();
  }
}