#library("pong");
#import('dart:html', prefix:"html");
#import('../dgame/game.dart');
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
  
  PongGame(AssetManager assetManager, html.CanvasRenderingContext2D ctx) : super(assetManager, ctx);
  
  void start() {
    player1 = new Paddle(this, -(halfSurfaceWidth - 10), 10);
    player2 = new ComputerPaddle(this, halfSurfaceWidth - 10, 10);
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
  
  void drawBeforeCtxRestore() {
    drawMiddleLine();
    drawScore();
    super.drawBeforeCtxRestore();
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
      powerUp.x = Utils.random(-halfSurfaceWidth + 100, halfSurfaceWidth - 100);
      powerUp.y = Utils.random(-halfSurfaceHeight + 50, halfSurfaceHeight - 50);
      
    } while(entities.filter((e) => e is PowerUp).some((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void drawDebugInfo() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("V: ${ball.momentum.xVel.toStringAsFixed(0)}", -(halfSurfaceWidth - 20), -(halfSurfaceHeight - 30));
    super.drawDebugInfo();
  }
  
  void drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("${player1.score}              ${player2.score}", -60, -(halfSurfaceHeight - 30));
  }
  
  void drawMiddleLine() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    Utils.drawDashedLine(ctx, 0, -(halfSurfaceHeight), 0, halfSurfaceHeight);
    ctx.stroke();
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
    playSound("sounds/sweep.ogg");
    bgFade();
    newGame();
  }
  
  void subtleBgFade(){
    bgStyle = "rgba(0, 0, 0, 0.84)";
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 25);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 50);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.81)"; }, 75);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 100);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 125);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.84)"; }, 150);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 175);
  }
  
  void bgFade(){
    bgStyle = "rgba(0, 0, 0, 0.8)";
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 25);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 50);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 75);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 100);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.55)"; }, 125);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 150);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 175);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 200);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 225);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.80)"; }, 250);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 275);
  }
}
