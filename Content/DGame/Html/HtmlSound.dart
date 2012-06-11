class HtmlSound implements Sound {
  bool enabled = true;
  String _rootDirectory = "Sounds/";
  String get rootDirectory() => _rootDirectory;
  set rootDirectory(String value) {
    if (!value.endsWith("/"))
      value += "/";
    _rootDirectory = value;
  }
  
  void play(String sound, [double volume]) {
    if (!enabled)
      return;
    
    String id = "sound_" + sound;
    html.AudioElement audio = html.document.query(id);
    if (audio == null)
      audio = html.document.query(sound);
    
    var sources = [null, null];
    html.AudioElement element;
    
    if (audio == null) {
      audio = new html.Element.tag("audio");
      audio.id = sound;
      
      sources[0] = new html.Element.tag("source");
      sources[0].attributes["src"] = rootDirectory + sound + ".mp3";
      sources[0].attributes["type"] = "audio/mp3";
      
      sources[1] = new html.Element.tag("source");
      sources[1].attributes["src"] = rootDirectory + sound + ".ogg";
      sources[1].attributes["type"] = "audio/ogg";
      
      audio.nodes.add(sources[0]);
      audio.nodes.add(sources[1]);
      
      html.document.body.nodes.add(audio);
      element = audio;
    } else {
      element = audio.clone(true);
    }
    element.$dom_addEventListener('ended', (e) => element.remove());
    if (volume != null)
      audio.volume = Utils.round(volume, 3);
    audio.play();
    audio.id = "";
    audio.classes.add("oldAudio");
    html.document.body.nodes.add(element);
    element.id = id;    
  }
}
