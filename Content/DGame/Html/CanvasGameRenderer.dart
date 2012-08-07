class CanvasGameRenderer<G extends Game> implements GameRenderer<G> {
  String targetId;
  G game;
  CanvasRenderingContext2D ctx;
  GameEntityRenderer defaultRenderer;
  AssetManager assetManager;
  Rectangle rect;
  
  CanvasGameRenderer(String this.targetId) {
    CanvasElement canvas = query('#$targetId');
    ctx = canvas.getContext('2d');
    rect = new Rectangle(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.canvas.rect.then((r) {
      rect.top = r.bounding.top;
      rect.left = r.bounding.left;
      rect.right = r.bounding.right;
      rect.bottom = r.bounding.bottom;
    });
    
    defaultRenderer = new DefaultCanvasEntityRenderer(this);
  }
  
  GameEntityRenderer getRenderer(GameEntity e) {
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
