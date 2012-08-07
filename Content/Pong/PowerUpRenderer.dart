class PowerUpRenderer extends DefaultCanvasEntityRenderer {
  PowerUpRenderer(PongGameRenderer gr) : super(gr);
  
  void render(GameEntity e) {
    super.render(e);
    var powerUp = e as PowerUp; 
    
    gr.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    gr.ctx.font = "24px Verdana";
    
    switch (powerUp.type) {
      case 'reflector':      
        gr.ctx.fillText("R", e.x - 8, e.y + 8);
        break;
      case 'extendor':
        gr.ctx.fillText("E", e.x - 8, e.y + 8);
        break;
      case 'shrink':
        gr.ctx.fillText("S", e.x - 8, e.y + 8);
        break;
      case 'bullet':
        gr.ctx.fillText("B", e.x - 8, e.y + 8);
        break;  
    }
  }
}
