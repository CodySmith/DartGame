class GameEntity {
  Game game;
  num _x = 0;
  num _y = 0;
  num _width = 1;
  num _height = 1;
  Rectangle box;
  Rectangle previousBox;
  
  bool _removeFromGame = false;
  var sprite;
  num radius;
  Momentum momentum;
  
  num opacity = 1;
  String color = "255, 255, 255";
  bool fill = true;
  
  GameEntity(Game this.game) {
    momentum = new Momentum();
  }
  
  GameEntity.withPosition(Game this.game, num x, num y, [num width = 1, num height = 1]) {
    momentum = new Momentum();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  
  void update() {
    if (previousBox == null)
      previousBox = new Rectangle.clone(box);
    else
      previousBox.updateFrom(box);
    
    momentum.update(game.clockTick);
    x += momentum.xVel * game.clockTick;
    y += momentum.yVel * game.clockTick;
    updateBox();
  }
  
  num get x() => _x;
  void set x(num value) {
    _x = value;
    updateBox();
  }
  
  num get y() => _y;
  void set y(num value) {
    _y = value;
    updateBox();
  }
  
  num get width() => _width;
  void set width(num value) {
    _width = value;
    updateBox();
  }
  
  num get height() => _height;
  void set height(num value) {
    _height = value;
    updateBox();
  }
  
  void updateBox() {
    if (sprite != null)
      return;
    
    if (box == null)
      box = new Rectangle(0, 0, 0, 0);
    
    box.left = x - (width / 2);
    box.top = y - (height / 2);
    box.right = box.left + width;
    box.bottom = box.top + height;
  }
  
  void draw(CanvasRenderingContext2D ctx) {
    if (color != null) {
      if (fill) {
        ctx.fillStyle = "rgba($color, $opacity)";
        ctx.fillRect(box.left, box.top, box.width, box.height);
      } else {
        ctx.strokeStyle = "rgba($color, $opacity)";
        ctx.strokeRect(box.left, box.top, box.width, box.height);
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
  
  void drawSpriteCentered(CanvasRenderingContext2D ctx) {
    num cx = x - sprite.width / 2;
    num cy = y - sprite.height / 2;
    ctx.drawImage(sprite, cx, cy);
  }
  
  void removeFromGame() {
    _removeFromGame = true;
    
  }
  
  bool outsideScreen() {
    return (x > game.halfSurfaceWidth || x < -(game.halfSurfaceWidth) ||
        y > game.halfSurfaceHeight || y < -(game.halfSurfaceHeight));
  }
  
  bool collidesWith(GameEntity entity) {
    // TODO: Check for radius to see if collision should be circular
    return entity.box.intersectsWith(box);
  }
  
  CanvasElement rotateAndCache(image, angle) {
    CanvasElement offscreenCanvas = new Element.tag("canvas");
    var size = Math.max(image.width, image.height);
    offscreenCanvas.width = size;
    offscreenCanvas.height = size;
    CanvasRenderingContext2D offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.save();
    offscreenCtx.translate(size / 2, size / 2);
    offscreenCtx.rotate(angle + Math.PI / 2);
    offscreenCtx.translate(0,0);
    offscreenCtx.drawImage(image, -(image.width / 2), -(image.height / 2));
    offscreenCtx.restore();
    
    return offscreenCanvas;
  }
}