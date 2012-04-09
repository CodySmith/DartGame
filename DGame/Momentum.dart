class Momentum {
  num xVel;
  num yVel;
  num xAccel;
  num yAccel;
  num xMax;
  num yMax;
  
  Momentum([num this.xVel = 0, num this.yVel = 0, num this.xAccel, num this.yAccel, num this.xMax, num this.yMax]);
  
  void update() {
    if (xAccel != null && xAccel != 0 && xVel < xMax)
      xVel += xAccel;
    if (yAccel != null && yAccel != 0 && yVel < yMax)
      yVel += yAccel;
  }
}
