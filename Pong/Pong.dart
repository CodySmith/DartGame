class Pong extends Game {
  
  num score = 0;
  num highscore = 0; //Math.parseInt(html.window.localStorage.getItem("highscore"));
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
      ball.xVel -= 1;
      ball.xVel = ball.xVel * -1;
      player1.fade();
      }
      else {
        ball.xVel = 5;
        ball.x = 0;
        ball.y = 0;
        if (score > highscore){
          highscore = score;
          html.window.localStorage.setItem(highscore.toString(), score.toString());
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
      ball.xVel += 1;
      ball.xVel = ball.xVel * -1;
      player2.fade();
      }
      else {
        ball.xVel = 5;
        ball.x = 0;
        ball.y = 0;
        if (score > highscore){
          highscore = score;
          html.window.localStorage.setItem(highscore.toString(), score.toString());
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
<<<<<<< HEAD
  
  void player1Fade() {
    player1.playerBatOpacity = 0.5;
    html.window.setTimeout(() { player1.playerBatOpacity = 0.4;}, 50);
    html.window.setTimeout(() { player1.playerBatOpacity = 0.3;}, 100);
    html.window.setTimeout(() { player1.playerBatOpacity = 0.2;}, 150);
  }
  void player2Fade() {
    player2.playerBatOpacity = 0.5;
    html.window.setTimeout(() { player2.playerBatOpacity = 0.4;}, 50);
    html.window.setTimeout(() { player2.playerBatOpacity = 0.3;}, 100);
    html.window.setTimeout(() { player2.playerBatOpacity = 0.2;}, 150);
  }
}
=======
}
>>>>>>> 0d1a116ab178d851e9ed4afc19c8e4c37a5d2dcf
