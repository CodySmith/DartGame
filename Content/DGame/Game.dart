#library("dgame");
#import('dart:html');

#source('AssetManager.dart');
#source('SpriteAnimation.dart');
#source('GameTimer.dart');
#source('GameEntity.dart');
#source('Rectangle.dart');
#source('Momentum.dart');
#source('Utils.dart');
#source('Vector.dart');

class Game {
  List<GameEntity> entities;
  CanvasRenderingContext2D ctx;
  Vector click;
  Vector mouse;
  GameTimer timer;
  num clockTick;
  num surfaceWidth;
  num surfaceHeight;
  Vector clientPoint;
  AssetManager assetManager;
  bool debugMode = false;
  bool enableSound = true;
  String bgStyle = "rgba(0, 0, 0, 0.85)";
  bool _supportsMp3 = null;
  bool showOutlines = false;
  bool includeUI = true;
  
  Game(AssetManager this.assetManager, CanvasRenderingContext2D this.ctx) {
    timer = new GameTimer();
    entities = [];
  }
  
  Game.withoutUI() {
    timer = new GameTimer();
    entities = [];
    includeUI = false;
  }
  
  void init() {
    surfaceWidth = ctx.canvas.width;
    surfaceHeight = ctx.canvas.height;
    
    Future<ElementRect> futureRect = ctx.canvas.rect;
    futureRect.then((ElementRect rect) {
      clientPoint = new Vector(rect.bounding.left, rect.bounding.top);
    });
    
    startInput();
    print('game initialized');
  }
  
  num get halfSurfaceWidth() => surfaceWidth / 2;
  num get halfSurfaceHeight() => surfaceHeight / 2;
  
  void start() {
    print("starting game");
    window.requestAnimationFrame(loop);
  }
  
  bool loop(int time) {
    clockTick = this.timer.tick();
    update();
    draw();
    click = null;
    window.requestAnimationFrame(loop);
  }
  
  void startInput() {
    print('Starting input');
    
    Vector getXandY(e) {
      num x =  e.clientX - clientPoint.x - (ctx.canvas.width / 2);
      num y = e.clientY - clientPoint.y - (ctx.canvas.height / 2);
      return new Vector(x, y);
    }
    
    document.on.click.add((e) {
      click = getXandY(e);
    });
    
    document.on.mouseMove.add((e) {
      mouse = getXandY(e);
    });
    
    document.on.touchMove.add((e) {
      e.preventDefault();
      var te = e as TouchEvent;
      mouse = getXandY(te.touches[0]);
      return false;
    });
    
    document.on.touchStart.add((e) {
      e.preventDefault();
      return false;
    });
    
    print('Input started');
  }
  
  void addEntity(GameEntity entity) {
    entities.add(entity);
  }
  
  void draw() {
    ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    ctx.fillStyle = bgStyle;
    ctx.fillRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    for (final GameEntity entity in entities) {
      entity.draw(ctx);
    }
    drawBeforeCtxRestore();
    ctx.restore();
  }
  
  void drawBeforeCtxRestore() {
    if (debugMode)
      drawDebugInfo();
  }
  
  void drawDebugInfo() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("FPS: ${timer.fps.toStringAsFixed(1)}", (halfSurfaceWidth - 120), -(halfSurfaceHeight - 30));
  }
  
  void playSound(String path, [double volume = 1.0]) {
    if (!enableSound)
      return;
    
    if (_supportsMp3 == null) {
      AudioElement audio = new Element.tag("audio");
      _supportsMp3 = audio.canPlayType('audio/mpeg', '') != '';
    }
    
    if (_supportsMp3 == true)
      path = path.concat(".mp3");
    else
      path = path.concat(".ogg");
    
    var s = assetManager.getAsset(path);
    if (s == null)
      return;
    
    AudioElement c = s.clone(true);
    c.volume = Utils.round(volume, 3);
    c.play();
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