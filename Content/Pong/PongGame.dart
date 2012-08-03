#library("pong");
#import('../DGame/Game.dart');
#import('../DGame/Utils.dart');
#source('Paddle.dart');
#source('ComputerPaddle.dart');
#source('Ball.dart');
#source('PowerUp.dart');

class PongGame extends Game {
  num score = 0;
  num highscore = 0;
  num lastPowerUp = 5;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  PongGame(Rectangle rect) : super(rect);
  PongGame.withServices(GameSound sound, GameInput input, GameRenderer renderer, GameLoop loop) : super.withServices(sound, input, renderer, loop);
  
  void start() {
    player1 = new Paddle(this, -(rect.halfWidth - 10), 10);
    player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, 3);
    ball = new Ball(this, 0, 0);
    addEntity(ball);
    addEntity(player1);
    addEntity(player2);
    newGame();
    super.start();
  }
  
  void update() {
    newPowerUp();
    
    super.update();
  }
  
  void newPowerUp() {
    if (Math.random() >= .1)
      return;
    
    if (entities.filter((e) => e is PowerUp).length >= 5)
      return;
    
    if (timer.gameTime < 5)
      return;
    
    if (lastPowerUp + 5 >= timer.gameTime)
      return;
    
    PowerUp powerUp = new PowerUp(this, 0, 0);
    
    do {
      powerUp.x = Utils.random(-rect.halfWidth + 100, rect.halfWidth - 100);
      powerUp.y = Utils.random(-rect.halfHeight + 50, rect.halfHeight - 50);
      
    } while(entities.filter((e) => e is PowerUp).some((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void ballHit(){
    score++;
    subtleBgFade();
  }
  
  void newGame() {
    ball.y = 0;
    
    entities.filter((e) => e is PowerUp).forEach((e) => e.removeFromGame());
    
    if (Math.random() > .5)
      ball.momentum.yVel = Utils.random(0, 200);
    else
      ball.momentum.yVel = Utils.random(-200, 0);
    
    player1.height = 120;
    player2.height = 120;
    timer.gameTime = 0;
    ball.momentum.xVel = ball.startVel;
  }
  
  void gameOver() {
    sound.play("sweep");
    bgFade();
    newGame();
  }
  
  void subtleBgFade(){
//    bgStyle = "rgba(0, 0, 0, 0.84)";
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 25);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 50);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.81)"; }, 75);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 100);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 125);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.84)"; }, 150);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 175);
  }
  
  void bgFade(){
//    bgStyle = "rgba(0, 0, 0, 0.8)";
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 25);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 50);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 75);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 100);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.55)"; }, 125);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 150);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 175);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 200);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 225);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.80)"; }, 250);
//    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 275);
  }
}