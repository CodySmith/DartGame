class PowerUpRenderer extends DefaultCanvasEntityRenderer<PowerUp> {
  PowerUpRenderer(SpaceShooterRenderer gr) : super(gr);
  
  void render(PowerUp e) {
    super.render(e);
    
    gr.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    gr.ctx.font = "24px Verdana";
    
    switch (e.type) {
      case 'SpreadShot':      
        gr.ctx.fillText("S", e.x - 8, e.y + 8);
        break;
    }
  }
}
