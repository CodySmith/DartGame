#library("pong");
#import('../DGame/Game.dart');
#import('../DGame/Utils.dart');
#source('Paddle.dart');
#source('ComputerPaddle.dart');
#source('Ball.dart');
#source('PowerUp.dart');
#source('Bullet.dart');

class PongGame extends Game {
  num score = 0;
  num highscore = 0;
  num lastPowerUp = 5;
  bool paused = false;
  bool p1Dead, p2Dead;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  PongGame(Rectangle rect) : super(rect);
  PongGame.withServices(GameSound sound, GameInput input, GameRenderer renderer, GameLoop loop) : super.withServices(sound, input, renderer, loop);
  
  void start() {
    ball = new Ball(this, 0, 0);
    addEntity(ball);
    newGame();
    super.start();
  }
  
  void update() {
    //run();
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
    
    var powerUp = new PowerUp(this, 0, 0);
    
    do {
      powerUp.x = Utils.random(-rect.halfWidth + 100, rect.halfWidth - 100);
      powerUp.y = Utils.random(-rect.halfHeight + 50, rect.halfHeight - 50);
      
    } while (entities.filter((e) => e is PowerUp).some((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void newBullet(num x, num y, bool p1) {
    if (p1 == true)
      player1.bullet--;
    else
      player2.bullet--;
    
    var bullet = new Bullet(this, x, y, p1);
    addEntity(bullet);
  }
  
  void run() {    
    if (input.keyCode > 0) {
      switch(input.keyCode) {
        case 27:
          if (paused == true)
            paused = false;
          else
            paused = true;
          break;
        default:
          print('${input.keyCode}');
          break;
      }
    }
  }
  
  void ballHit() {
    score++;
    subtleBgFade();
  }
  
  void newGame() {
    ball.y = 0;
    score = 0;
    
    entities.filter((e) => e is PowerUp).forEach((e) => e.removeFromGame());
    entities.filter((e) => e is Bullet).forEach((e) => e.removeFromGame());
    
    if (Math.random() > .5)
      ball.momentum.yVel = Utils.random(0, 200);
    else
      ball.momentum.yVel = Utils.random(-200, 0);
    
    if (p1Dead == true || player1 == null) {
      player1 = new Paddle(this, -(rect.halfWidth - 10), 10);
      addEntity(player1);
      p1Dead = false;
    }

    if (p2Dead == true || player2 == null) {
      player2 = new ComputerPaddle(this, rect.halfWidth - 10, 10, 3);
      addEntity(player2);
      p2Dead = false;
    }
    
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
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 25);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 50);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.81)"; }, 75);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 100);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 125);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.84)"; }, 150);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 175);
  }
  
  void bgFade(){
//    bgStyle = "rgba(0, 0, 0, 0.8)";
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 25);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 50);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 75);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 100);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.55)"; }, 125);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 150);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 175);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 200);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 225);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.80)"; }, 250);
//    window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 275);
  }
}
