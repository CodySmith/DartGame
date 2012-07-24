class ComputerPaddle extends Paddle {
  // target the top, middle or bottom of the paddle
  num targetPaddleSide = 0;
  // used to introduce some variation to where the AI hits the ball or possibly even misses it.
  num targetOffset = 0;
  num amountToMove = 3;
  bool ballComing;
  // Computer skill level between 1 and 3;
  num _skillLevel;
  
  ComputerPaddle(Game game, num x, num y, [int skillLevel = 1]) : super(game, x, y) {
    _skillLevel = Math.max(Math.min(skillLevel, 3), 1);
  }
  
  int get skillLevel() => _skillLevel;
  
  void move()
  {
    PongGame g = game;
    if (g.ball == null)
      return;
    
    if (bulletTime + .25 <= g.timer.gameTime)
    {
      if (g.player2.bullet >= 1) {
        if (y + 60 >= g.player1.y && y - 60 <= g.player1.y)
        {
          g.newBullet(x - 10, y, false);
          bulletTime = g.timer.gameTime;
        }
      }
    }
    
    // detect if the ball is coming towards us or away from us
    bool newBallComing = (x > 0 && g.ball.momentum.xVel > 0) || (x < 0 && g.ball.momentum.xVel < 0);
    // if the direction changed, then set a new random target
    if (ballComing == null || newBallComing != ballComing) {
      // randomly pick if we should target the top, middle or bottom of the paddle
      targetPaddleSide = Utils.random(-1, 1, true);
      // introduce some target hit spot variation based on skill level
      targetOffset = getTargetOffset();
      // the amount to move based on skill level
      amountToMove = getAmountToMove();
    }
    ballComing = newBallComing;
    
    // either move toward the ball or toward the middle of the screen
    num targetPosition = ballComing ?
        g.ball.y + (targetPaddleSide * ((height / 2) - 5))
        : 0;
    
    // add random variation
    //targetPosition += targetOffset;
    
    // if we are within 1 of our targetPosition, just stay there.
    if ((y - targetPosition).abs() <= 1)
      return;
    
    // move toward targetPosition
    if (y > targetPosition)
      y -= amountToMove;
    else
      y += amountToMove;
  }
  
  num getAmountToMove() {
    num n = Utils.random(0, 100);
    switch (_skillLevel) {
      case 1: {
        if (n >= 40) // 60% chance for 3
          return 3;
        if (n >= 10) // 30% chance for 2
          return 2;
        else // 10% chance for 1
          return 1;
        break;
      }
      case 2: {
        if (n >= 40) // 60% chance for 4
          return 4;
        if (n >= 10) // 30% chance for 3
          return 3;
        else // 10% chance for 2
          return 2;
        break;
      }
      case 3: {
        if (n >= 40) // 60% chance for 4
          return 5;
        if (n >= 10) // 30% chance for 3
          return 4;
        else // 10% chance for 2
          return 3;
        break;
      }
    }
    
    return 3;
  }
  
  num getTargetOffset() {
    switch (_skillLevel) {
      case 1: {
        return Utils.random(-20, 20, true);
        break;
      }
      case 2: {
        return Utils.random(-10, 10, true);
        break;
      }
      case 3: {
        return Utils.random(-5, 5, true);
        break;
      }
    }
    
    return 0;
  }
}
