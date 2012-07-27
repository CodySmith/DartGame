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
      var el = new Element.tag(isImg ? "img" : "audio");
      if (isImg) {
        var img = el as ImageElement;
        el.on.load.add((event) {
          print('${img.src} is loaded');
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
        img.src = path;
      } else {
        var audio = el as AudioElement;
        print('$path is loaded');
        el.attributes["preload"] = "auto";
        _successCount += 1;
        if (isDone()) {
          downloadCallback();
        }
        audio.src = path;
      }
      _cache[path] = el;
    }
  }

  getAsset(String path) {
    return _cache[path];
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
