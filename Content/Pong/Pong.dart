#import('dart:html');
#import('PongGame.dart');
#import('PongHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  var game = new PongGameClient();
  game.sound.enabled = false;
  //game.debugMode = false;
  game.start();  
}

