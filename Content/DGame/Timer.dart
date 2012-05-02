class Timer {
  num gameTime = 0;
  static final num MAX_STEP = 0.05;
  num wallLastTimestamp = 0;
  num fps = 0;
  
  num tick() {
    num wallCurrent = new Date.now().value;
    num wallDelta = (wallCurrent - wallLastTimestamp) / 1000;
    wallLastTimestamp = wallCurrent;
    fps = 1 / wallDelta;
    
    num gameDelta = Math.min(wallDelta, MAX_STEP);
    gameTime += gameDelta;
    return gameDelta;
  }
}