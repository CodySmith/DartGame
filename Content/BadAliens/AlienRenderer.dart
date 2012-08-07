class AlienRenderer extends DefaultCanvasEntityRenderer {
  AlienRenderer(EvilAliensRenderer gr) : super(gr);
  
  void render(GameEntity e) {
    super.render(e);
    drawSpriteCentered(ctx);
  }
}
