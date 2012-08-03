class AlienExplosion extends GameEntity {
  
  SpriteAnimation animation;

  AlienExplosion(Game game, num x, num y) : super.withPosition(game, x, y) {
    animation = new SpriteAnimation(game.assetManager.getAsset('img/alien-explosion.png'), 69, 0.05);
    this.radius = this.animation.frameWidth / 2;
  }
  
  void update() {
    if (animation.isDone()) {
      removeFromGame();
    }
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    super.draw(ctx);
    animation.drawFrame(game.clockTick, ctx, x, y);
  }
}
