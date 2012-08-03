class Bullet extends GameEntity {
  
  num angle;
  Vector explodesAt;
  static final num speed = 250;
  num radialDistance = 95;
  SpriteAnimation animation;
  
  Bullet(Game game, num x, num y, num this.angle, Point this.explodesAt) : super.withPosition(game, x, y) {
    sprite = game.assetManager.getAsset('img/bullet.png');
    animation = new SpriteAnimation(sprite, 7, 0.05, true);
  }
  
  void update() {
    if (outsideScreen()) {
      removeFromGame();
    } else if (x.abs() >= explodesAt.x.abs() || y.abs() >= explodesAt.y.abs()) {
      // TODO play sound
      game.addEntity(new BulletExplosion(game, explodesAt.x, explodesAt.y));
      removeFromGame();
    } else {
      x = radialDistance * Math.cos(angle);
      y = radialDistance * Math.sin(angle);
      radialDistance += speed * game.clockTick;
    }
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle + Math.PI/2);
    ctx.translate(-x, -y);
    animation.drawFrame(game.clockTick, ctx, x, y);
    ctx.restore();
    
    super.draw(ctx);
  }

}
