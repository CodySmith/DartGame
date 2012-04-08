class Pong extends Game {
  
  num score = 0;
  num highscore = 0; //Math.parseInt(html.window.localStorage.getItem("highscore"));
  num hitPlace;
  num hitPlaceP;
  
  Paddle player1;
  Paddle player2;
  Ball ball;
  
  Pong(AssetManager assetManager) : super(assetManager);
  
  void start() {
    player1 = new Paddle(this, -380, 10);
    player2 = new Paddle(this, 380, 10);
    ball = new Ball(this, 0, 0, 5, 0);
    addEntity(ball);
    addEntity(player1);
    addEntity(player2);
    super.start();
  }
  
  void drawBeforeCtxRestore() {
    drawScore();
    drawHighScore();
    drawMiddleLine();
  }
  
  void drawScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "26px cinnamoncake, Verdana";
    ctx.fillText("Score:   $score", -60, -270);
  }
  
  void drawHighScore() {
    ctx.fillStyle = "rgba(255, 255, 255, 1)";
    ctx.font = "16px cinnamoncake, Verdana";
    ctx.fillText("Your highest score:   $highscore", -75, -250);
  }
  
  void drawMiddleLine() {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    dashedLine(0, -240, 0, 300);
    ctx.stroke();
  }
  
  void ballHit(){
    score++;
    subtleBgFade();
  }
  
  void gameOver() {
    bgFade();
    ball.xVel = 5;
    ball.x = 0;
    ball.y = 0;
    if (score > highscore){
      highscore = score;
      //html.window.localStorage.setItem(highscore.toString(), score.toString());
    }
    score = 0;
  }
  
  void subtleBgFade(){
    bgStyle = "rgba(0, 0, 0, 0.84)";
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 25);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 50);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.81)"; }, 75);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.82)"; }, 100);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.83)"; }, 125);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.84)"; }, 150);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 175);
  }
  
  void bgFade(){
    bgStyle = "rgba(0, 0, 0, 0.8)";
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 25);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 50);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 75);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 100);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.55)"; }, 125);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.60)"; }, 150);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.65)"; }, 175);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.70)"; }, 200);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.75)"; }, 225);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.80)"; }, 250);
    html.window.setTimeout(function() { bgStyle = "rgba(0, 0, 0, 0.85)"; }, 275);
  }
  
  void dashedLine(x, y, x2, y2, [da]) { 
    if (da == null)
      da=[10,5];
    
    var dashCount = da.length;
    ctx.moveTo(x, y);
    var dx = (x2-x), dy = (y2-y);
    var slope = dy;
    if (dx != 0)
      slope = dy/dx;
    var distRemaining = Math.sqrt( dx*dx + dy*dy );
    var dashIndex=0, drawLine=true;
    while (distRemaining>=0.1 && dashIndex<10000){
      var dashLength = da[dashIndex++%dashCount];
      if (dashLength > distRemaining) dashLength = distRemaining;
      var xStep = Math.sqrt( dashLength*dashLength / (1 + slope*slope) );
      x += xStep;
      y += slope*xStep;
      if (drawLine){
        ctx.lineTo(x,y);
      } else {
        ctx.moveTo(x,y);
      }
      distRemaining -= dashLength;
      drawLine = !drawLine;
    }
    
    ctx.moveTo(0,0);
  }
}
