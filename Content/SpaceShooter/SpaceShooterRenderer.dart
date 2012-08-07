class SpaceShooterRenderer extends CanvasGameRenderer<SpaceShooterGame> {
  PowerUpRenderer powerUpRenderer;
  EnemyRenderer enemyRenderer;
  
  SpaceShooterRenderer(String targetId) : super(targetId) {
    powerUpRenderer = new PowerUpRenderer(this);
    enemyRenderer = new EnemyRenderer(this);
  }
  
  GameEntityRenderer getRenderer(GameEntity e) {
    if (e is PowerUp)
      return powerUpRenderer;
    if (e is Enemy)
      return enemyRenderer;
    
    return defaultRenderer;
  }
  
  void drawBeforeCtxRestore() {
    drawPaused();
    drawScore();
    super.drawBeforeCtxRestore();
  }
  
  void drawPaused() {
    if (!game.paused)
      return;
    
    ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
    ctx.font = "72px Verdana";
    ctx.fillText("PAUSED", 0, 0);
  }
  
  void drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "12px cinnamoncake, Verdana";
    ctx.fillText("${game.score} ", -150, -(game.rect.halfHeight - 30));
  }
}
