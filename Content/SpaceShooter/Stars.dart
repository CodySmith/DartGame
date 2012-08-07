class Stars extends GameEntity {
  num xVel;
  
  Stars(Game game, num x, num y, num h, num w) : super.withPosition(game, x, y, h, w) {
    opacity = random(.5, 1);
    color = "255, 255, 255";
    xVel = random(.5, 1.5);
  }
  
  void update() {
    x -= xVel;
    
    if (x < -game.rect.halfWidth)
      removeFromGame();
    
    super.update();
  }
}