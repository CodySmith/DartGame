class ComputerPaddle extends Paddle {
  ComputerPaddle(Game game, num x, num y) : super(game, x, y);
  
  void move()
  {
    Pong g = game;
    
    if (g.ball.momentum.xVel < 0) {
      if (y > 0)
        y -= 4;
      else if (y < 0)
        y += 4;
    } else {
      if (g.ball.y > y)
        y += 4;
      else if (g.ball.y < y)
        y -= 4;
    }
  }  
}
