#library("SpaceShooterGame");
#import('../DGame/Game.dart');
#import('../DGame/Utils.dart');
#source('Ship.dart');
#source('Enemy.dart');
#source('PowerUp.dart');
#source('Bullet.dart');
#source('Stars.dart');

class SpaceShooterGame extends Game {
  num score = 0;
  num highscore = 0;
  num lastPowerUp = 5;
  num lastEnemy = 5;
  num lastStar = 0;
  num w = 0;
  bool paused = false;
  bool p1Dead, p2Dead;
  
  Ship ship;
  
  SpaceShooterGame(Rectangle rect) : super(rect);
  SpaceShooterGame.withServices(GameSound sound, GameInput input, GameRenderer renderer, GameLoop loop) : super.withServices(sound, input, renderer, loop);
  
  void start() {
    newGame();
    super.start();
  }
  
  void update() {
    if (input.keyCode == 80)
      paused != paused;
    
    if (paused)
      return;
    
    newPowerUp();
    newEnemy();
    newStar();
    
    super.update();
  }
  
  void startStars() {
    w = random(.5, 3.5);
    Stars star = new Stars(this, 0, 0, w, w);
    
    do {
      star.x = random(-rect.halfWidth, rect.halfWidth);
      star.y = random(-rect.halfHeight, rect.halfHeight);
      
    } while(entities.filter((e) => e is Stars).some((e) => star.collidesWith(e)));
    
    addEntity(star);
  }
  
  void newStar() {
    if (Math.random() <= .1)
      return;
    
    if (lastStar + random(.1, .2) >= timer.gameTime)
      return;
    
    w = random(.5, 3.5);
    
    Stars star = new Stars(this, 0, 0, w, w);
    
    do {
      star.x = rect.halfWidth;
      star.y = random(-rect.halfHeight, rect.halfHeight);
      
    } while(entities.filter((e) => e is Stars).some((e) => star.collidesWith(e)));
    
    lastStar = timer.gameTime;
    addEntity(star);
  }
  
  void newEnemy() {
    if (Math.random() <= .1)
      return;
    
    if (entities.filter((e) => e is Enemy).length >= 10)
      return;
    
    if (timer.gameTime < 3)
      return;
    
    if (lastEnemy + 2 >= timer.gameTime)
      return;
    
    Enemy enemy = new Enemy(this, 0, 0);
    
    do {
      enemy.x = rect.halfWidth;
      enemy.y = random(-rect.halfHeight + 50, rect.halfHeight - 50);
      
    } while(entities.filter((e) => e is Enemy).some((e) => enemy.collidesWith(e)));
    
    lastEnemy = timer.gameTime;
    addEntity(enemy);
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
      powerUp.x = rect.halfWidth;
      powerUp.y = random(-rect.halfHeight + 50, rect.halfHeight - 50);
      
    } while(entities.filter((e) => e is PowerUp).some((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void newGame() {
    for (int i = 0; i < 100; i++)
      startStars();
    
    score = 0;
    
    entities.filter((e) => e is PowerUp).forEach((e) => e.removeFromGame());
    entities.filter((e) => e is Bullet).forEach((e) => e.removeFromGame());
    
    if (p1Dead == true || ship == null) {
      ship = new Ship(this, -(rect.halfWidth - 10), 10);
      addEntity(ship);
      p1Dead = false;
    }
    
    timer.gameTime = 0;
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
