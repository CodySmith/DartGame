class GameEntity {
  Game game;
  num x;
  num y;
  bool removeFromWorld = false;
  var sprite;
  num radius;
  
  GameEntity(Game this.game);
  
  GameEntity.withPosition(Game this.game, num this.x, num this.y);
  
  void update() { }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    if (game.showOutlines) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.arc(x, y, radius, 0, Math.PI*2, false);
      ctx.stroke();
      ctx.closePath();
    }
  }
  
  void drawSpriteCentered(html.CanvasRenderingContext2D ctx) {
    num cx = x - sprite.width/2;
    num cy = y - sprite.height/2;
    ctx.drawImage(sprite, cx, cy);
  }
  
  bool outsideScreen() {
    return (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth) ||
        y > game.halfSurfaceHeight || y < -(game.halfSurfaceHeight));
  }
  
  Rectangle getCollisionRectangle() {
    return new Rectangle(x, y, 1, 1);
  }
  
  bool collidesWith(GameEntity entity) {
    var a = getCollisionRectangle();
    var b = entity.getCollisionRectangle();
    
    return !(
        ((a.y + a.height) < (b.y)) ||
        (a.y > (b.y + b.height)) ||
        ((a.x + a.width) < b.x) ||
        (a.x > (b.x + b.width))
    );
  }
  
  html.CanvasElement rotateAndCache(image, angle) {
    var offscreenCanvas = new html.Element.tag("canvas");
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size/2, size/2);
    offscreenCtx.rotate(angle + Math.PI/2);
    offscreenCtx.translate(0,0);
    offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2));
    offscreenCtx.restore();
    return offscreenCanvas;
  }
}