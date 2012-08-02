class CanvasGameRenderer implements GameRenderer {
  String targetId;
  Game game;
  CanvasRenderingContext2D ctx;
  Renderer defaultRenderer;
  AssetManager assetManager;
  Rectangle rect;
  
  CanvasGameRenderer(String this.targetId) {
    CanvasElement canvas = query('#$targetId');
    CanvasRenderingContext2D ctx = canvas.getContext('2d');
    
    Future<ElementRect> futureRect = ctx.canvas.rect;
    futureRect.then((ElementRect r) {
      rect = new Rectangle(r.bounding.top, r.bounding.left, r.bounding.right, r.bounding.bottom);
    });
    
    defaultRenderer = new DefaultCanvasRenderer(this);
  }
  
  Renderer getRenderer(GameEntity e) {
    return defaultRenderer;
  }
  
  void render() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = game.bgStyle;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    for (final GameEntity e in game.entities) {
      getRenderer(e).render(e);
    }
    drawBeforeCtxRestore();
    ctx.restore();
  }
  
  void drawBeforeCtxRestore() {
    if (game.debugMode)
      drawDebugInfo();
  }
  
  void drawDebugInfo() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("FPS: ${game.timer.fps.toStringAsFixed(1)}", (rect.halfWidth - 120), -(rect.halfHeight - 30));
  }
}
