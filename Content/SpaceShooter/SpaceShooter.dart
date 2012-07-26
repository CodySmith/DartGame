#import('SpaceGame.dart');
#import('dart:html', prefix:"html");
#import('../dgame/game.dart');

void main() {
  html.CanvasElement canvas = html.document.query('#surface');
  var ctx = canvas.getContext('2d');
  num msgCount = 0;
  
  AssetManager assetManager = new AssetManager();
  assetManager.queueDownload("Sounds/hit1.ogg");
  assetManager.queueDownload("Sounds/hit2.ogg");
  assetManager.queueDownload("Sounds/hit3.ogg");
  assetManager.queueDownload("Sounds/sweep.ogg");
  // for browsers that don't support ogg
  assetManager.queueDownload("Sounds/hit1.mp3");
  assetManager.queueDownload("Sounds/hit2.mp3");
  assetManager.queueDownload("Sounds/hit3.mp3");
  assetManager.queueDownload("Sounds/sweep.mp3");

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
  
  //new Keycodes().run();
  
  var game = new SpaceGame(assetManager, ctx);
  game.enableSound = true;
  game.debugMode = false;
  
  assetManager.downloadAll(() {
    game.init();
    game.start();
  });
}

