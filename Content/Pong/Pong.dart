#import('ponggame.dart');
#import('dart:html');
#import('dart:isolate');
#import('../dgame/game.dart');

void main() {
  CanvasElement canvas = document.query('#surface');
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

  var ws = new WebSocket("ws://localhost:8000/ws");
  ws.on.open.add((e) {
    bool ret = ws.send("Hello");
    print("sent: $ret");
  });
  
  ws.on.message.add((MessageEvent e) {
    msgCount++;
    if (e.data == "ping") {
      ws.send("pong: $msgCount");
    }
  });
  
  ws.on.error.add((e) {
    print("Error was : $e");
  });
  
  ws.on.close.add((e) {
    print("Closed: $e");
  });
  
  window.setInterval(() => print(msgCount), 1000);
  
  var game = new PongGame(assetManager, ctx);
  game.enableSound = false;
  game.debugMode = false;
  
  assetManager.downloadAll(() {
    game.init();
    game.start();
  });
}

