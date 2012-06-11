interface GameRenderer default _NullGameRenderer {
  Game game;
  Rectangle rect;
  GameRenderer();
  Renderer getRenderer(GameEntity e);
  void render();
}

class _NullGameRenderer implements GameRenderer {
  Game game;
  Rectangle rect;
  _NullGameRenderer();
  
  Renderer getRenderer(GameEntity e) {
    return null;
  }
  
  void render() {}
}
