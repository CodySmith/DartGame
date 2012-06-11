interface Renderer default _NullRenderer {
  GameRenderer gr;
  Renderer(GameRenderer this.gr);
  void render(GameEntity e);
}

class _NullRenderer implements Renderer {
  GameRenderer gr;
  _NullRenderer(GameRenderer this.gr);
  void render(GameEntity e) {}
}
