#import('dart:html', prefix:"html");
#source('../AssetManager.dart');
#source('../Animation.dart');
#source('../Timer.dart');
#source('../GameEntity.dart');
#source('../Game.dart');
#source('../Point.dart');
#source('../Rectangle.dart');
#source('Paddle.dart');
#source('Pong.dart');
#source('Ball.dart');

void main() {
  var canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  
  AssetManager assetManager = new AssetManager();
  
  assetManager.queueDownload('sounds/hit1.mp3');
  assetManager.queueDownload('sounds/hit2.mp3');
  assetManager.queueDownload('sounds/hit3.mp3');
  assetManager.queueDownload('sounds/sweep.mp3');
  
  var game = new Pong(assetManager);
  
  assetManager.downloadAll(() {
    game.init(ctx);
    game.start();
  });
}

