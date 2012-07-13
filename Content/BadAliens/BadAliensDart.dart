#import('dart:html', prefix:"html");
#import('../dgame/game.dart');
#source('Alien.dart');
#source('AlienExplosion.dart');
#source('Sentry.dart');
#source('Bullet.dart');
#source('BulletExplosion.dart');
#source('Earth.dart');
#source('EvilAliens.dart');

void main() {
  html.CanvasElement canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  
  AssetManager assetManager = new AssetManager();
  
  assetManager.queueDownload('img/alien-explosion.png');
  assetManager.queueDownload('img/alien.png');
  assetManager.queueDownload('img/bullet.png');
  assetManager.queueDownload('img/earth.png');
  assetManager.queueDownload('img/sentry.png');
  assetManager.queueDownload('img/explosion.png');
  
  var game = new EvilAliens(assetManager, ctx);
  
  assetManager.downloadAll(() {
    game.init();
    game.start();
  });
}
