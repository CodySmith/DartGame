class GameRenderer<G extends Game> {
  G game;
  Rectangle rect;
  GameRenderer();
  
  GameEntityRenderer getRenderer(GameEntity e) {
    return null;
  }
  
  void render() {}
}
