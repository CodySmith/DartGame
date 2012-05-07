#import('ponggame.dart');
#import('dart:html', prefix:"html");
#import('../dgame/game.dart');

void main() {
  var canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  num msgCount = 0;
  
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

//  html.WebSocket ws = new html.WebSocket("ws://localhost:8000/ws");
//  ws.on.open.add((e) {
//    bool ret = ws.send("Hello");
//    print("sent: $ret");
//  });
//  
//  ws.on.message.add((e) {
//    msgCount++;
//    if (e.data == "ping") {
//      ws.send("pong");
//    }
//  });
//  
//  ws.on.error.add((e) {
//    print("Error was : $e");
//  });
//  
//  ws.on.close.add((e) {
//    print("Closed: $e");
//  });
  
  //new Timer.repeating(1000, (t) => print('$msgCount');
  
  var game = new PongGame(assetManager, ctx);
  game.enableSound = true;
  game.debugMode = false;
  
  assetManager.downloadAll(() {
    game.init();
    game.start();
  });
}

