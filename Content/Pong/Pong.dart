#import('PongGame.dart');
#import('Html/PongHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  var sound = new HtmlSound();
  var input = new HtmlGameInput();
  var renderer = new PongGameRenderer("surface");
  PongGame game = new PongGame.withServices(sound, input, renderer);
  sound.enabled = true;
  game.debugMode = false;
}
