class HtmlGameInput implements GameInput {
  Point click;
  Point mouse;
  Game game;
  
  HtmlGameInput();
  
  void start() {
    print('Starting input');
    
    Point getXandY(e) {
      num x =  e.clientX - game.rect.x - game.rect.halfWidth;
      num y = e.clientY - game.rect.y - game.rect.halfHeight;
      return new Point(x, y);
    }
    
    html.document.on.click.add((e) {
      click = getXandY(e);
    });
    
    html.document.on.mouseMove.add((e) {
      mouse = getXandY(e);
    });
    
    html.document.on.touchMove.add((e) {
      e.preventDefault();
      mouse = getXandY(e.touches[0]);
      return false;
    });
    
    html.document.on.touchStart.add((e) {
      e.preventDefault();
      return false;
    });
    
    print('Input started');
  }
  
  void reset() {
    click = null;
  }
}
