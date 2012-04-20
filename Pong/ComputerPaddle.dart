class ComputerPaddle extends Paddle {
  ComputerPaddle(Game game, num x, num y) : super(game, x, y);
  
  void move()
  {
    Pong g = game;
    
    if (g.ball.momentum.xVel < 0) {
      if (y < 5 && y > -5)
        y += 0;
      else if (y > 0)
        y -= 3;
      else if (y < 0)
        y += 3;
    } else {
      if (g.ball.y < (y + 10) && g.ball.y > (y - 10) || g.ball.y == y)
        y += 0;
      if (g.ball.y > y)
        y += 3;
      else if (g.ball.y < y)
        y -= 3;
    }
  }  
}
