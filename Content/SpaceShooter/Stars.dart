class Stars extends GameEntity {
  Stars(Game game, num x, num y, num h, num w) : super.withPosition(game, x, y, h, w) {
    opacity = Utils.random(.5, 1);
    color = "255, 255, 255";
    momentum.xVel = Utils.random(-20, -50);
  }
  
  void update() {
    if (x < -game.halfSurfaceWidth)
      removeFromGame();
    
    super.update();
  }
}