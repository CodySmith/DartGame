#library("dgame");
#import('dart:isolate');
#import('Utils.dart');

#source('GameTimer.dart');
#source('GameEntity.dart');
#source('Vector.dart');
#source('Rectangle.dart');
#source('Momentum.dart');
#source('GameSound.dart');
#source('GameInput.dart');
#source('GameRenderer.dart');
#source('GameEntityRenderer.dart');
#source('GameLoop.dart');

class Game {
  List<GameEntity> entities;
  GameTimer timer;
  num clockTick;
  Rectangle rect;
  bool debugMode = false;
  String bgStyle = "rgba(0, 0, 0, 0.85)";
  bool showOutlines = false;
  GameSound sound;
  GameInput input;
  GameRenderer renderer;
  GameLoop loop;
  
  Game(Rectangle this.rect) {
    timer = new GameTimer();
    sound = new GameSound();
    input = new GameInput();
    renderer = new GameRenderer();
    loop = new GameLoop();
    entities = [];
  }
  
  Game.withServices(GameSound this.sound, GameInput this.input, GameRenderer this.renderer, GameLoop this.loop) {
    timer = new GameTimer();
    entities = new List<GameEntity>();
    rect = renderer.rect;

    input.game = this;
    renderer.game = this;
  }
  
  void start() {
    print("starting game");
    input.start();
    loop.start(() {
      clockTick = this.timer.tick();
      update();
      renderer.render();
      input.reset();
    });
  }
  
  void addEntity(GameEntity entity) {
    entities.add(entity);
  }
  
  void update() {
    num entitiesCount = entities.length;
    
    for (GameEntity entity in entities.filter((e) => !e._removeFromGame))
      entity.update();
    
    for (int i = entities.length - 1; i >= 0; --i) {
      if (entities[i]._removeFromGame) {
        entities.removeRange(i, 1);
      }
    }
  }
}
