#import('dart:html');
#import('EvilAliens.dart');
#import('EvilAliensHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  var assetManager = new AssetManager();
  
  assetManager.queueDownload('img/alien-explosion.png');
  assetManager.queueDownload('img/alien.png');
  assetManager.queueDownload('img/bullet.png');
  assetManager.queueDownload('img/earth.png');
  assetManager.queueDownload('img/sentry.png');
  assetManager.queueDownload('img/explosion.png');
  
  var game = new EvilAliens();
  
  assetManager.downloadAll(() {
    game.start();
  });
}
