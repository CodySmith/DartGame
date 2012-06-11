interface Sound default _NullSound {
  bool enabled;
  String get rootDirectory();
  set rootDirectory(String value);
  void play(String sound, [double volume]);
}

class _NullSound {
  bool enabled = true;
  String _rootDirectory = "Sounds/";
  String get rootDirectory() => _rootDirectory;
  set rootDirectory(String value) {
    if (!value.endsWith("/"))
      value += "/";
    _rootDirectory = value;
  }
  
  static void play(String sound, [double volume = 1.0]) {}
}
