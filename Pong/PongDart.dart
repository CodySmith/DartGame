#import('dart:html', prefix:"html");
#source('../AssetManager.dart');
#source('../Animation.dart');
#source('../Timer.dart');
#source('../GameEntity.dart');
#source('../Game.dart');
#source('../Point.dart');
#source('Paddle.dart');
#source('Pong.dart');
#source('Ball.dart');


void main() {
  var canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  
  AssetManager assetManager = new AssetManager();
  
  var game = new Pong(assetManager);
  
  assetManager.downloadAll(() {
    game.init(ctx);
    game.start();
  });
}

