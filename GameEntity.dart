class GameEntity {
  Game game;
  num x = 0;
  num y = 0;
  num width = 1;
  num height = 1;
  Rectangle box;
  
  bool removeFromWorld = false;
  var sprite;
  num radius;
  Momentum momentum;
  
  num opacity = 1;
  String color = "255, 255, 255";
  bool fill = true;
  
  GameEntity(Game this.game) {
    momentum = new Momentum();
    box = new Rectangle(x, y, width, height);
  }
  
  GameEntity.withPosition(Game game, num x, num y, [num width = 1, num height = 1]) : this(game) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    box = new Rectangle(x, y, width, height);
    updateBox();
  }
  
  void update() {
    momentum.update();
    x += momentum.xVel;
    y += momentum.yVel;
    updateBox();
  }
  
  void updateBox() {
    if (sprite != null)
      return;
    
    box.x = x - (width / 2);
    box.y = y - (height / 2);
    box.height = height;
    box.width = width;
  }
  
  void draw(html.CanvasRenderingContext2D ctx) {
    if (color != null) {
      if (fill) {
        ctx.fillStyle = "rgba($color, $opacity)";
        ctx.fillRect(box.x, box.y, box.width, box.height);
      } else {
        ctx.strokeStyle = "rgba($color, $opacity)";
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      }
    }
    
    if (game.showOutlines) {
      ctx.beginPath();
      ctx.strokeStyle = "green";
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.stroke();
      ctx.closePath();
    }
  }
  
  void drawSpriteCentered(html.CanvasRenderingContext2D ctx) {
    num cx = x - sprite.width / 2;
    num cy = y - sprite.height / 2;
    ctx.drawImage(sprite, cx, cy);
  }
  
  bool outsideScreen() {
    return (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth) ||
        y > game.halfSurfaceHeight || y < -(game.halfSurfaceHeight));
  }
  
  bool collidesWith(GameEntity entity) {
    // TODO: Check for radius to see if collision should be circular
    return !(
        ((box.y + box.height) < (entity.box.y)) ||
        (box.y > (entity.box.y + entity.box.height)) ||
        ((box.x + box.width) < entity.box.x) ||
        (box.x > (entity.box.x + entity.box.width))
    );
  }
  
  html.CanvasElement rotateAndCache(image, angle) {
    var offscreenCanvas = new html.Element.tag("canvas");
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    var offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle + Math.PI / 2);
    offscreenCtx.translate(0,0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    
    return offscreenCanvas;
  }
}