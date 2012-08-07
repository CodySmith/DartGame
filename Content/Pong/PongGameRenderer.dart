class PongGameRenderer extends CanvasGameRenderer<PongGame> {
  PowerUpRenderer powerUpRenderer;
  
  PongGameRenderer(String targetId) : super(targetId) {
    powerUpRenderer = new PowerUpRenderer(this);
  }
  
  GameEntityRenderer getRenderer(GameEntity e) {
    if (e is PowerUp)
      return powerUpRenderer;
    
    return defaultRenderer;
  }
  
  void drawBeforeCtxRestore() {
    drawMiddleLine();
    //pauseUpdate();
    drawScore();
    super.drawBeforeCtxRestore();
  }
  
  void drawDebugInfo() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "16px Verdana";
    ctx.fillText("V: ${game.ball.momentum.xVel.toStringAsFixed(0)}", -(game.rect.halfWidth - 20), -(game.rect.halfHeight - 30));
    super.drawDebugInfo();
  }
  
  void drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("${game.player1.score}              ${game.player2.score}", -60, -(game.rect.halfHeight - 30));
  }
  
  void drawMiddleLine() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    RenderUtils.drawDashedLine(ctx, 0, -(game.rect.halfHeight), 0, game.rect.halfHeight);
    ctx.stroke();
  }
  
  void pauseUpdate() {
    if (!game.paused)
      return;
    
    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
    ctx.font = "72px Verdana";
    ctx.fillText("PAUSED", 0, 0);
  }
}
