class ComputerPaddle extends Paddle {
  // target the top, middle or bottom of the paddle
  int targetOffset = 0;
  int amountToMove = 3;
  bool ballComing;
  // Computer skill level between 1 and 3;
  int _skillLevel;
  
  ComputerPaddle(Game game, num x, num y, [int skillLevel = 1]) : super(game, x, y) {
    _skillLevel = Math.max(Math.min(skillLevel, 3), 1);
  }
  
  int get skillLevel() => _skillLevel;
  
  void move()
  {
    PongGame g = game;
    if (g.ball == null)
      return;
    
    // detect if the ball is coming towards us or away from us
    bool newBallComing = (x > 0 && g.ball.momentum.xVel > 0) || (x < 0 && g.ball.momentum.xVel < 0);
    // if the direction changed, then set a new random target
    if (ballComing == null || newBallComing != ballComing) {
      targetOffset = Utils.random(-1, 1, true);
      amountToMove = getAmountToMove();
    }
    ballComing = newBallComing;
    
    num targetPosition = ballComing ?
        g.ball.y + (targetOffset * 50)
        : 0;
    
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
}
