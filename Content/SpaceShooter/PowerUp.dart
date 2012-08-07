class PowerUp extends GameEntity<SpaceShooterGame> {
  String type;
  num creationTime = 0;
  
  PowerUp(SpaceShooterGame game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    num rType = Math.random();
    creationTime = game.timer.gameTime;
    
    if (rType < 1) {
      color = "0, 255, 255";
      type = 'SpreadShot';
    }
    
    momentum.xVel = -50;
  }
  
  void update() {
    if (creationTime + 10 <= game.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(game.ship)) {
      switch (type) {
        case 'SpreadShot':
          SpreadUpdate();
          break;
      }
      
      game.sound.play("sweep", .1);
      removeFromGame();
    }
   
    super.update();
  }
  
  void SpreadUpdate() {
    game.ship.spreadShot = true;
  }
  
}
