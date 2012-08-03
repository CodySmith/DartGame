class Ship extends GameEntity {
  num score = 0;
  num bulletTime = 0;
  num h = 8;
  num w = 8;
  bool isHeld = false;
  bool wasHeld = false;
  bool spreadShot = false;
  
  Ship(Game game, num x, num y) : super.withPosition(game, x, y, 24, 24) {
    opacity = 0.2;
  }
  
  void update() {
    move();
    super.update();
  }
  
  void move() {
    SpaceGame g = game;
    
    if (game.mouse != null)
    {
      x = game.mouse.x;
      y = game.mouse.y;
    }

    html.document.on.mouseDown.add((e) {
      isHeld = true;
      wasHeld = true;
    });
    
    html.document.on.mouseUp.add((e) {
      isHeld = false;      
    });
   
    if (isHeld) {
      g.player1.h += .25;
      g.player1.w += .25;
    } else if (!isHeld && wasHeld && spreadShot == true) {
      g.newBullet(x + 10, y, 0, g.player1.h, g.player1.w, true);
      g.newBullet(x + 10, y, 1, g.player1.h, g.player1.w, true);
      g.newBullet(x + 10, y, -1, g.player1.h, g.player1.w, true);
      
      g.player1.h = 8;
      g.player1.w = 8;
      
      wasHeld = false;
    } else if (!isHeld && wasHeld && spreadShot != true) {
      g.newBullet(x + 10, y, 0, g.player1.h, g.player1.w, true);
      
      g.player1.h = 8;
      g.player1.w = 8;
      
      wasHeld = false;
    }
      
  }
  
  void fade() {
    opacity = 0.5;
    html.window.setTimeout(() { opacity = 0.4;}, 50);
    html.window.setTimeout(() { opacity = 0.3;}, 100);
    html.window.setTimeout(() { opacity = 0.2;}, 150);
  }
}
