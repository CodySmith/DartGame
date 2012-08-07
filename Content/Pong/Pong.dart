#import('dart:html');
#import('PongGame.dart');
#import('PongHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  num msgCount = 0;

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
  
  //window.setInterval(() => print(msgCount), 1000);
  
  var sound = new HtmlGameSound();
  var input = new HtmlGameInput();
  var renderer = new PongGameRenderer("surface");
  var loop  = new HtmlGameLoop();

  var game = new PongGame.withServices(sound, input, renderer, loop);
  //game.sound.enabled = false;
  game.debugMode = false;
  game.start();  
}

