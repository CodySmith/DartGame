#library("dgame");
#import('dart:html', prefix:"html");

#source('AssetManager.dart');
#source('Animation.dart');
#source('Timer.dart');
#source('GameEntity.dart');
#source('Point.dart');
#source('Rectangle.dart');
#source('Momentum.dart');

class Game {
  
  List entities;
  html.CanvasRenderingContext2D ctx;
  Point click;
  Point mouse;
  Timer timer;
  num clockTick;
  num surfaceWidth;
  num surfaceHeight;
  num halfSurfaceWidth;
  num halfSurfaceHeight;
  Point clientBoundingRect;
  AssetManager assetManager;
  bool debugMode = false;
  bool enableSound = true;
  String bgStyle = "rgba(0, 0, 0, 0.85)";
  bool _supportsMp3 = null;
  bool showOutlines = false;
  
  Game(AssetManager this.assetManager) {
    timer = new Timer();
    entities = [];
  }

  void init(html.CanvasRenderingContext2D context) {
    ctx = context;
    surfaceWidth = ctx.canvas.width;
    surfaceHeight = ctx.canvas.height;
    halfSurfaceWidth = surfaceWidth / 2;
    halfSurfaceHeight = surfaceHeight / 2;
    
    Future<html.ElementRect> futureRect = ctx.canvas.rect;
    futureRect.then((html.ElementRect rect) {
      clientBoundingRect = new Point(rect.bounding.left, rect.bounding.top);
    });
    
    startInput();
    print('game initialized');
  }
  
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
        num x =  e.clientX - clientBoundingRect.x - (ctx.canvas.width / 2);
        num y = e.clientY - clientBoundingRect.y - (ctx.canvas.height / 2);
        return new Point(x, y);
    }
    
    html.document.on.click.add((e) {
        click = getXandY(e);
    });
    
    html.document.on.mouseMove.add((e) {
        mouse = getXandY(e);
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
    c.volume = round(volume, 3);
    c.play();
  }
  
  double round(double value, [int decimals = 2]) { 
    int o = Math.pow(10, decimals); 
    return (value * o).round() / o;
  }
  
  void update() {
    num entitiesCount = entities.length;
    
    for (var i = 0; i < entitiesCount; i++) {
        var entity = entities[i];
        
        if (!entity.removeFromWorld) {
            entity.update();
        }
    }
    
    for (var i = entities.length-1; i >= 0; --i) {
        if (entities[i].removeFromWorld) {
            entities.removeRange(i, 1);
        }
    }
  }
}