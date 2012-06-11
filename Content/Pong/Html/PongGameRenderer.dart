class PongGameRenderer extends CanvasGameRenderer {
  PowerUpRenderer powerUpRenderer;
  
  PongGameRenderer(String targetId) : super(targetId) {
    powerUpRenderer = new PowerUpRenderer(this);
  }
  
  Renderer getRenderer(GameEntity e) {
    if (e is PowerUp)
      return powerUpRenderer;
    
    return defaultRenderer;
  }
  
  void drawBeforeCtxRestore() {
    drawMiddleLine();
    drawScore();
    super.drawBeforeCtxRestore();
  }
  
  void drawDebugInfo() {
    PongGame g = game;
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("V: ${g.ball.momentum.xVel.toStringAsFixed(0)}", -(game.rect.halfWidth - 20), -(game.rect.halfHeight - 30));
    super.drawDebugInfo();
  }
  
  void drawScore() {
    PongGame g = game;
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("${g.player1.score}              ${g.player2.score}", -60, -(game.rect.halfHeight - 30));
  }
  
  void drawMiddleLine() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    RenderUtils.drawDashedLine(ctx, 0, -(game.rect.halfHeight), 0, game.rect.halfHeight);
    ctx.stroke();
  }
}
