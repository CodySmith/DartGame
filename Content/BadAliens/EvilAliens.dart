#library("EvilAliensGame");
#import('../DGame/Game.dart');
#source('Alien.dart');
#source('AlienExplosion.dart');
#source('Sentry.dart');
#source('Bullet.dart');
#source('BulletExplosion.dart');
#source('Earth.dart');

class EvilAliens extends Game {
  num lives = 10;
  num score = 0;
  
  Sentry sentry;
  Earth earth;
  num lastAlienAddedAt;

  EvilAliens(Rectangle rect) : super(rect);
  EvilAliens.withServices(GameSound sound, GameInput input, GameRenderer renderer, GameLoop loop) : super.withServices(sound, input, renderer, loop);
  
  void start() {
    sentry = new Sentry(this);
    earth = new Earth(this);
    addEntity(earth);
    addEntity(sentry);
    super.start();
  }
  
  void update() {
    if (lastAlienAddedAt == null || (timer.gameTime - lastAlienAddedAt) > 1) {
      addEntity(new Alien(this, rect.width, Math.random() * Math.PI * 180));
      lastAlienAddedAt = timer.gameTime;
    }
  
    if (this.score <= 0) {
      // show game over screen
    }
  
    super.update();
  }
}
