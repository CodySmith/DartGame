class Enemy extends GameEntity<SpaceShooterGame> {
  String type;
  num creationTime = 0;
  
  Enemy(SpaceShooterGame game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    num rType = Math.random();
    creationTime = game.timer.gameTime;
    
    if (rType < 1) {
      color = "255, 0, 255";
      type = "Normal";
    }
    
    momentum.xVel = -50;
  }
  
  void update() {
    if (creationTime + 10 <= game.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(game.ship)) {
      game.ship.removeFromGame();
    }
    
    super.update();
  }
}