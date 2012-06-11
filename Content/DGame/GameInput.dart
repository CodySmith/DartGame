interface GameInput default _NullGameInput {
  Point click;
  Point mouse;
  Game game;
  void start();
  void reset();
}

class _NullGameInput implements GameInput {
  Point click;
  Point mouse;
  Game game;
  void start() {}
  void reset() {}
}
