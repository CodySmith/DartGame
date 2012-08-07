#import('dart:html');
#import('SpaceShooterGame.dart');
#import('SpaceShooterHtml.dart');
#import('../DGame/Game.dart');
#import('../DGame/Html/HtmlGame.dart');

void main() {
  var sound = new HtmlGameSound();
  var input = new HtmlGameInput();
  var renderer = new SpaceShooterRenderer("surface");
  var loop  = new HtmlGameLoop();

  var game = new SpaceShooterGame.withServices(sound, input, renderer, loop);
  //game.sound.enabled = false;
  game.debugMode = false;
  game.start();  
}

