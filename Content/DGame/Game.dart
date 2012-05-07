#library("dgame");
#import('dart:html', prefix:"html");

#source('AssetManager.dart');
#source('Animation.dart');
#source('Timer.dart');
#source('GameEntity.dart');
#source('Point.dart');
#source('Rectangle.dart');
#source('Momentum.dart');
#source('Utils.dart');

class Game {
  List<GameEntity> entities;
  html.CanvasRenderingContext2D ctx;
  Point click;
  Point mouse;
  Timer timer;
  num clockTick;
  num surfaceWidth;
  num surfaceHeight;
  Point clientPoint;
  AssetManager assetManager;
  bool debugMode = false;
  bool enableSound = true;
  String bgStyle = "rgba(0, 0, 0, 0.85)";
  bool _supportsMp3 = null;
  bool showOutlines = false;
  bool includeUI = true;
  
  Game(AssetManager this.assetManager, html.CanvasRenderingContext2D this.ctx) {
    timer = new Timer();
    entities = [];
  }
  
  Game.withoutUI() {
    timer = new Timer();
    entities = [];
    includeUI = false;
  }
  
  void init() {
    surfaceWidth = ctx.canvas.width;
    surfaceHeight = ctx.canvas.height;
    
    Future<html.ElementRect> futureRect = ctx.canvas.rect;
    futureRect.then((html.ElementRect rect) {
      clientPoint = new Point(rect.bounding.left, rect.bounding.top);
    });
    
    startInput();
    print('game initialized');
  }
  
  num get halfSurfaceWidth() => surfaceWidth / 2;
  num get halfSurfaceHeight() => surfaceHeight / 2;
  
  void start() {
    print("starting game");
    html.window.requestAnimationFrame(loop);
  }
  
  bool loop(int time) {
    clockTick = this.timer.tick();
    update();
    draw();
    click = null;
    html.window.requestAnimationFrame(loop);
  }
  
  void startInput() {
    print('Starting input');
    
    Point getXandY(e) {
      num x =  e.clientX - clientPoint.x - (ctx.canvas.width / 2);
      num y = e.clientY - clientPoint.y - (ctx.canvas.height / 2);
      return new Point(x, y);
    }
    
    html.document.on.click.add((e) {
      click = getXandY(e);
    });
    
    html.document.on.mouseMove.add((e) {
      mouse = getXandY(e);
    });
    
    html.document.on.touchMove.add((e) {
      print("touchMove");
      mouse = getXandY(e.touches[0]);
      e.preventDefault();
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
      html.AudioElement audio = new html.Element.tag("audio");
      _supportsMp3 = audio.canPlayType('audio/mpeg', '') != '';
    }
    
    if (_supportsMp3 == true)
      path += ".mp3";
    else
      path += ".ogg";
    
    var s = assetManager.getAsset(path);
    if (s == null)
      return;
    
    html.AudioElement c = s.clone(true);
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