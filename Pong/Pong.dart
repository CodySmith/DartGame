class Pong extends Game {
  
  num score = 10;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  Pong(AssetManager assetManager) : super(assetManager);
  
  void start() {
    player1 = new Paddle(this, -360, 10);
    player2 = new Paddle(this, 350, 10);
    ball = new Ball(this, 0, 0, 5, 0);
    addEntity(ball);
    addEntity(player1);
    addEntity(player2);
    super.start();
  }
  
  void update() {
    super.update();
  }
  
  void drawBeforeCtxRestore() {
    drawScore();
    drawMiddleLine();
  }
  
  void drawScore() {
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("Score:   $score", -ctx.canvas.width/2 + 50, ctx.canvas.height/2 - 50);
  }
  
  void drawMiddleLine() {
    ctx.fillRect(0, -300, 8, 1000);
  }
}
