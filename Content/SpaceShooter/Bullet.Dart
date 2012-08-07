class Bullet extends GameEntity<SpaceShooterGame> {
  Bullet(SpaceShooterGame game, num x, num y, num xVel, num yVel, num size) : super.withPosition(game, x, y, size, size) {
    color = "255, 0, 0";
    momentum.xVel = xVel;
    momentum.yVel = yVel;
  }
  
  void update() {
    super.update();
    
    if (x > game.rect.halfWidth)
      removeFromGame();
    
    game.entities.filter((e) => e is Enemy && collidesWith(e)).forEach((e) => hitEnemy(e));
  }
  
  void hitEnemy(Enemy e) {
    game.score += 1;
    
    e.removeFromGame();
    removeFromGame();
  }
}
