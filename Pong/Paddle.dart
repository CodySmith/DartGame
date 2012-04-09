class Paddle extends GameEntity {
  num realY = 0;
  bool isAi = false;
  num score = 0;
  
  Paddle(Game game, num x, num y) : super.withPosition(game, x, y, 8, 120) {
    opacity = 0.2;
  }
  
  void update() {
    if (game.mouse != null && isAi == false)
      y = game.mouse.y;
    else if (isAi == true)
      move();
    
    super.update();
  }
  
  void fade() {
    opacity = 0.5;
    html.window.setTimeout(() { opacity = 0.4;}, 50);
    html.window.setTimeout(() { opacity = 0.3;}, 100);
    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
  
  void move()
  {
    Pong g = game;
    
    num ballY = g.ball.y;
    num ballX = g.ball.x;
    
    if (g.ball.momentum.xVel < 0)
    {
      if (y > 0)
        y -= 4;
      else if (y < 0)
        y += 4;
    }
    else if (g.ball.momentum.xVel > 0)
    {
      if (ballY > y + 60)
        y += 4;
      else if (ballY < y)
        y -= 4;
    }
  }
}
