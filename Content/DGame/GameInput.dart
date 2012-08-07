class GameInput {
  Vector click;
  Vector mouse;
  int keyCode;
  Game game;
  void start() {}
  void reset() {
    click = null;
    keyCode = -1;
  }
}
