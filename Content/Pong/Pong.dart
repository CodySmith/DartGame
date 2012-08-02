#import('./PongGame.dart');
//#import('Html/PongHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  var sound = new GameSound();
  var input = new HtmlGameInput();
  var renderer = new CanvasGameRenderer("surface");
  var loop  = new HtmlGameLoop();
  PongGame game = new PongGame.withServices(sound, input, renderer, loop);
  sound.enabled = true;
  game.debugMode = false;
}
