class Ship extends GameEntity<SpaceShooterGame> {
  num bulletPower = 8;
  bool isPoweringUp = false;
  bool spreadShot = false;
  
  Ship(Game game, num x, num y) : super.withPosition(game, x, y, 24, 24) {
    opacity = 0.2;
  }
  
  void update() {
    if (game.input.mouse != null) {
      x = game.input.mouse.x;
      y = game.input.mouse.y;
    }
    
    if (game.input.mouseDown)
      isPoweringUp = true;
    
    if (game.input.click != null)
      fire();
    
    if (isPoweringUp)
      bulletPower += .25;
    
    super.update();
  }
  
  void fire() {
    if (spreadShot) {
      game.addEntity(new Bullet(game, x + 10, y, 140, 0, bulletPower));
      game.addEntity(new Bullet(game, x + 10, y, 140, 40, bulletPower));
      game.addEntity(new Bullet(game, x + 10, y, 140, -40, bulletPower));
    } else {
      game.addEntity(new Bullet(game, x + 10, y, 140, 0, bulletPower));
    }
    
    isPoweringUp = false;
    bulletPower = 8;
  }
  
  void fade() {
//    opacity = 0.5;
//    html.window.setTimeout(() { opacity = 0.4;}, 50);
//    html.window.setTimeout(() { opacity = 0.3;}, 100);
//    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
