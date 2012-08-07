class PowerUp extends GameEntity<PongGame> {
  String type;
  num creationTime = 0;
  
  PowerUp(PongGame game, num x, num y) : super.withPosition(game, x, y, 36, 36) {
    num rType = Math.random();
    creationTime = game.timer.gameTime;
    
    if (rType < .2) {
      color = "255, 255, 255";
      type = 'reflector';
    } else if (rType < .4) {
      color = "255, 255, 0";
      type = 'extendor';
    } else if (rType < .6) {
      color = "255, 0, 255";
      type = 'shrink';
    } else if (rType < 1.0) {
      color = "0, 255, 255";
      type = 'bullet';
    } else {
      
    }
  }
  
  void update() {
    if (creationTime + 10 <= game.timer.gameTime)
      removeFromGame();
    
    if (collidesWith(game.ball)) {
      switch (type) {
        case 'reflector':
          reflectorUpdate();
          break;
        case 'extendor':
          extendUpdate();
          break;
        case 'shrink':
          shrinkUpdate();
          break;
        case 'bullet':
          if (game.ball.momentum.xVel > 0)
            game.player1.bullet += 2;
          else if (game.ball.momentum.xVel < 0)
            game.player2.bullet += 2;
          break;
      }
      
      game.sound.play("sounds/sweep", .1);
      removeFromGame();
    }
   
    super.update();
  }
  
  
  void reflectorUpdate() {
    if (Math.random() > .5)
      game.ball.momentum.yVel = Utils.random(200, 600);
    else
      game.ball.momentum.yVel = Utils.random(-200, -600);
  }
  
  void extendUpdate() {
    if (game.ball.momentum.xVel > 0)
      game.player1.height += 50;
    else if (game.ball.momentum.xVel < 0)
      game.player2.height += 50;
  }
  
  void shrinkUpdate() {
    if (game.ball.momentum.xVel > 0)
      game.player1.height -= 50;
    else if (game.ball.momentum.xVel < 0)
      game.player2.height -= 50;
  }
}
