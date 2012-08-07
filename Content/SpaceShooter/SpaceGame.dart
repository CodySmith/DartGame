#library("SpaceShooter");
#import('dart:html');
#import('../DGame/Game.dart');
#source('Ship.dart');
#source('Enemy.dart');
#source('PowerUp.dart');
#source('Bullet.dart');
#source('Stars.dart');

class SpaceGame extends Game {
  num score = 0;
  num highscore = 0;
  num lastPowerUp = 5;
  num lastEnemy = 5;
  num lastStar = 0;
  num w = 0;
  bool paused = false;
  bool p1Dead, p2Dead;
  
  Ship player1;
  
  SpaceGame(AssetManager assetManager, html.CanvasRenderingContext2D ctx) : super(assetManager, ctx);
  
  void start() {
    newGame();
    super.start();
  }
  
  void update() {
   
    onKeyboardEvent(html.KeyboardEvent e) {
      switch(e.keyCode) {
        
      case 80:
        if (paused == true)
          paused = false;
        else
          paused = true;
        break;
        
      default:
        print('${e.keyCode}');
        break;
      }
    }
    
    html.document.window.on.keyDown.add(onKeyboardEvent, false);
    
    if (paused == true)
      return;
      
    newPowerUp();
    newEnemy();
    newStar();
    
    super.update();
  }
  
  void drawBeforeCtxRestore() {
    pauseUpdate();
    drawScore();
    super.drawBeforeCtxRestore();
  }
  
  void startStars() {
    w = Utils.random(.5, 3.5);
    Stars star = new Stars(this, 0, 0, w, w);
    
    do {
      star.x = Utils.random(-halfSurfaceWidth, halfSurfaceWidth);
      star.y = Utils.random(-halfSurfaceHeight, halfSurfaceHeight);
      
    } while(entities.filter((e) => e is Stars).some((e) => star.collidesWith(e)));
    
    addEntity(star);
  }
  
  void newStar() {
    if (Math.random() <= .1)
      return;
    
    if (lastStar + Utils.random(.1, .2) >= timer.gameTime)
      return;
    
    w = Utils.random(.5, 3.5);
    
    Stars star = new Stars(this, 0, 0, w, w);
    
    do {
      star.x = Utils.random(halfSurfaceWidth, halfSurfaceWidth);
      star.y = Utils.random(-halfSurfaceHeight, halfSurfaceHeight);
      
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
      enemy.x = Utils.random(halfSurfaceWidth, halfSurfaceWidth);
      enemy.y = Utils.random(-halfSurfaceHeight + 50, halfSurfaceHeight - 50);
      
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
      powerUp.x = Utils.random(halfSurfaceWidth, halfSurfaceWidth);
      powerUp.y = Utils.random(-halfSurfaceHeight + 50, halfSurfaceHeight - 50);
      
    } while(entities.filter((e) => e is PowerUp).some((e) => powerUp.collidesWith(e)));
    
    lastPowerUp = timer.gameTime;
    addEntity(powerUp);
  }
  
  void newBullet(num x, num y, num dir, num height, num width, bool p1) { 
    
    Bullet bullet = new Bullet(this, x, y, dir, height, width, p1);
    addEntity(bullet);
  }
  
  void pauseUpdate() {
    if (paused == true) {
      ctx.fillStyle = "rgba(255, 255, 255, .8)";
      ctx.font = "144px Verdana";
      ctx.fillText("PAUSED", -275, 0);
    }
  }
  
  void drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "12px cinnamoncake, Verdana";
    ctx.fillText("${player1.score} ", -150, -(halfSurfaceHeight - 30));
  }
  
  void newGame() {
    for (int i = 0; i < 60; i++)
      startStars();
    
    score = 0;
    
    entities.filter((e) => e is PowerUp).forEach((e) => e.removeFromGame());
    entities.filter((e) => e is Bullet).forEach((e) => e.removeFromGame());
    
    if (p1Dead == true || player1 == null) {
      player1 = new Ship(this, -(halfSurfaceWidth - 10), 10);
      addEntity(player1);
      p1Dead = false;
    }
    
    timer.gameTime = 0;
  }
  
  void gameOver() {
    playSound("Sounds/sweep");
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
