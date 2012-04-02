class Pong extends Game {
  
  num score = 0;
  num highscore = 0;
  num hitPlace;
  num hitPlaceP;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  Pong(AssetManager assetManager) : super(assetManager);
  
  void start() {
    player1 = new Paddle(this, -360, 10);
    player2 = new Paddle(this, 350, 10);
    ball = new Ball(this, 0, 0, 5, 0);
    addEntity(ball);
    addEntity(player1);
    addEntity(player2);
    super.start();
  }
  
  void update() {
    checkCollision();
    super.update();
  }
  
  void drawBeforeCtxRestore() {
    drawScore();
    drawHighScore();
    drawMiddleLine();
  }
  
  void drawScore() {
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("Score:   $score", -ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 50);
  }
  
  void drawHighScore() {
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("High Score:   $highscore", -ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 25);
  }
  void drawMiddleLine() {
    ctx.fillRect(0, -300, 8, 1000);
  }
  
  void checkCollision() {
    if (ball.x < player1.x) {
      if((player1.y - 60) < ball.y && (player1.y + 60) > ball.y){
      hitPlace = (player1.y - ball.y) + 60;
      hitPlaceP = 100 - ((hitPlace / 120 * 100));
      ball.yVel = ((8 * (hitPlaceP / 100)) - 4)+0.5;
      score++;
      ball.xVel -= .5;
      ball.xVel = ball.xVel * -1;
      player1.fade();
      bgFade();
      }
      else {
        ball.xVel = 5;
        ball.x = 0;
        ball.y = 0;
        if (score > highscore){
          highscore = score;
        }
        score = 0;
      }
    }
    if (ball.x > player2.x - 30) {
      if((player2.y - 60) < ball.y && (player2.y + 60) > ball.y){
      hitPlace = (player2.y - ball.y) + 60;
      hitPlaceP = 100 - ((hitPlace / 120 * 100));
      ball.yVel = ((8 * (hitPlaceP / 100)) - 4)+0.5;
      score++;
      ball.xVel += .5;
      ball.xVel = ball.xVel * -1;
      player2.fade();
      bgFade();
      }
      else {
        ball.xVel = 5;
        ball.x = 0;
        ball.y = 0;
        if (score > highscore){
          highscore = score;
        }
        score = 0;
      }
    }
    if(ball.y > 300){
      ball.yVel = ball.yVel * -1;
    }
    if(ball.y < -295){
      ball.yVel = ball.yVel * -1;
    }
  }
  
  void bgFade() {
    bgStyle = "rgba(0, 0, 0, 0.79)";
    html.window.setTimeout(() { bgStyle = "rgba(0, 0, 0, 0.81)";}, 50);
    html.window.setTimeout(() { bgStyle = "rgba(0, 0, 0, 0.83)";}, 100);
    html.window.setTimeout(() { bgStyle = "rgba(0, 0, 0, 0.85)";}, 150);
  }
}
