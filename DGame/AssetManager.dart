class AssetManager {
  num _successCount = 0;
  num _errorCount = 0;
  Map _cache;
  List _downloadQueue;
  
  AssetManager() {
    _downloadQueue = [];
    _cache = {};
  }
    
  void queueDownload(String path) {
    _downloadQueue.add(path);
  }
  
  void downloadAll(downloadCallback) {
    if (_downloadQueue.length == 0) {
      downloadCallback();
    }
    
    for (final String path in _downloadQueue) {
      bool isImg = isImage(path);
      var el = new html.Element.tag(isImg ? "img" : "audio");
      if (isImg) {
        el.on.load.add((event) {
          print(el.src + ' is loaded');
          _successCount += 1;
          if (isDone()) {
              downloadCallback();
          }
        });
        el.on.error.add((event) {
          _errorCount += 1;
          if (isDone()) {
              downloadCallback();
          }
        });
      } else {
        print(path + ' is loaded');
        el.attributes["preload"] = "auto";
        el.load();
        _successCount += 1;
        if (isDone()) {
          downloadCallback();
        }
      }
      el.src = path;
      _cache[path] = el;
    }
  }

  getAsset(String path) {
    return _cache[path];
  }
  
  playSound(String path, [double volume = 1.0]) {
    var s = getAsset(path);
    if (s == null)
      return;
    
    html.AudioElement c = s.clone(true);
    c.volume = round(volume, 3);
    c.play();
  }
  
  double round(double value, [int decimals = 2]) { 
    int o = Math.pow(10, decimals); 
    return (value * o).round() / o;
  }
  
  bool isDone() {
    return (_downloadQueue.length == _successCount + _errorCount);
  }
  
  bool isImage(String path) {
    if (path.endsWith(".png")
        || path.endsWith(".jpg")
        || path.endsWith(".gif"))
      return true;
    
    return false;
  }
    
}
