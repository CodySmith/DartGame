#import('dart:html', prefix:"html");
#import('../dgame/game.dart');
#source('Paddle.dart');
#source('ComputerPaddle.dart');
#source('PongGame.dart');
#source('Ball.dart');
#source('PowerUp.dart');

void main() {
  var canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  
  AssetManager assetManager = new AssetManager();
  assetManager.queueDownload("sounds/hit1.ogg");
  assetManager.queueDownload("sounds/hit2.ogg");
  assetManager.queueDownload("sounds/hit3.ogg");
  assetManager.queueDownload("sounds/sweep.ogg");
  // for browsers that don't support ogg
  assetManager.queueDownload("sounds/hit1.mp3");
  assetManager.queueDownload("sounds/hit2.mp3");
  assetManager.queueDownload("sounds/hit3.mp3");
  assetManager.queueDownload("sounds/sweep.mp3");

  html.WebSocket ws = new html.WebSocket("ws://localhost:8000/ws");
  ws.on.open.add((e) {
    bool ret = ws.send("Hello");
    print("sent: $ret");
  });
  
  ws.on.message.add((e) {
    print("msg: " + e.data);
    if (e.data == "ping") {
      print("got ping");
      ws.send("pong");
    }
  });
  
  ws.on.error.add((e) {
    print("whoa: $e");
  });
  
  ws.on.close.add((e) {
    print("whoa: $e");
  });
  
  var game = new PongGame(assetManager);
  game.enableSound = false;
  game.debugMode = true;
  
  assetManager.downloadAll(() {
    game.init(ctx);
    game.start();
  });
}

