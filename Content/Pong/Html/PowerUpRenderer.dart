class PowerUpRenderer extends DefaultCanvasRenderer {
  PowerUpRenderer(PongGameRenderer gr) : super(gr);
  
  void render(GameEntity e) {
    super.render(e);
    
    gr.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    gr.ctx.font = "24px Verdana";
    
    switch (e.type) {
      case 'reflector':      
        gr.ctx.fillText("R", e.x - 8, e.y + 8);
        break;
      case 'extendor':
        gr.ctx.fillText("E", e.x - 8, e.y + 8);
        break;
    }
  }
}
