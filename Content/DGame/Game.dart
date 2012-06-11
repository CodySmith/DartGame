#library("dgame");
#import('Utils.dart');

#source('Timer.dart');
#source('GameEntity.dart');
#source('Point.dart');
#source('Rectangle.dart');
#source('Momentum.dart');
#source('Sound.dart');
#source('GameInput.dart');
#source('GameRenderer.dart');
#source('Renderer.dart');

typedef RenderFrameCallback(RenderFrame);
typedef bool RenderFrame(int highResTime);

class Game {
  List<GameEntity> entities;
  Timer timer;
  num clockTick;
  Rectangle _rect;
  bool debugMode = false;
  String bgStyle = "rgba(0, 0, 0, 0.85)";
  bool showOutlines = false;
  Sound sound;
  GameInput input;
  RenderFrameCallback renderCallback;
  GameRenderer renderer;
  
  Game(Rectangle this.rect) {
    timer = new Timer();
    sound = new Sound();
    input = new GameInput();
    renderer = new GameRenderer();
    entities = [];
  }
  
  Game.withServices(Sound this.sound, GameInput this.input, GameRenderer this.renderer) {
    this.input.game = this;
    this.renderer.game = this;
    timer = new Timer();
    entities = new List<GameEntity>();
  }
  
  Rectangle get rect() => _rect != null ? _rect : renderer.rect; 
  
  void start() {
    print("starting game");
    input.start();
    renderCallback(loop);
  }
  
  bool loop(int time) {
    clockTick = this.timer.tick();
    update();
    renderer.render();
    input.reset();
    renderCallback(loop);
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