class HtmlGameLoop extends GameLoop {
  LoopCallback _callback;
  start(LoopCallback callback) {
    _callback = callback;
    window.requestAnimationFrame(loop);
  }
  
  bool loop(int time) {
    _callback();
    window.requestAnimationFrame(loop);
  }
}
