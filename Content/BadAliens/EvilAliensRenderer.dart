class EvilAliensRenderer extends CanvasGameRenderer<EvilAlens> {
  AlienRenderer alienRenderer;
  
  EvilAliensRenderer(String targetId) : super(targetId) {
    alienRenderer = new AlienRenderer(this);
  }
  
  GameEntityRenderer getRenderer(GameEntity e) {
    if (e is Alien)
      return alienRenderer;
    
    return defaultRenderer;
  }

  void drawBeforeCtxRestore() {
    drawScore();
    drawLives();
    super.drawBeforeCtxRestore();
  }
  
  void drawLives() {
    ctx.fillStyle = "red";
    ctx.font = "bold 2em Arial";
    ctx.fillText("Lives: $lives", -ctx.canvas.width / 2 + 50, ctx.canvas.height/2 - 80);
  }
  
  void drawScore() {
    ctx.fillStyle = "red";
    ctx.font = "bold 2em Arial";
    ctx.fillText("Score: $score", -ctx.canvas.width / 2 + 50, ctx.canvas.height/2 - 50);
  }
}
