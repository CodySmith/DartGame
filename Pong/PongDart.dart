#import('dart:html', prefix:"html");
#import('../dgame/game.dart');
#source('Paddle.dart');
#source('ComputerPaddle.dart');
#source('Pong.dart');
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
  
//  html.WebSocket ws = new html.WebSocket("ws://localhost:8080");
//  ws.on.open.add((event) {
//    bool ret = ws.send("Hello");
//    print("Sent: $ret");
//  });
//  
//  ws.on.message.add((event) {
//    print("Got an event: $event");
//    print("The data in the event is: " + event.data);
//  });
//  
//  ws.on.error.add((event) {
//    print("whoa: $event");
//  });
//  
//  ws.on.close.add((event) {
//    print("whoa: $event");
//  });
  
  var game = new Pong(assetManager);
  
  assetManager.downloadAll(() {
    game.init(ctx);
    game.start();
  });
}

