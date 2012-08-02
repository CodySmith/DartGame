class HtmlGameSound extends GameSound {
  void play(String sound, [double volume = 1.0]) {
    if (!enabled)
      return;
    
    String id = "sound_$sound";
    AudioElement audio = document.query(id);
    if (audio == null)
      audio = query(sound);
    
    var sources = [null, null];
    AudioElement element;
    
    if (audio == null) {
      audio = new Element.tag("audio");
      audio.id = sound;
      
      sources[0] = new Element.tag("source");
      sources[0].attributes["src"] = "$rootDirectory$sound.mp3";
      sources[0].attributes["type"] = "audio/mp3";
      
      sources[1] = new Element.tag("source");
      sources[1].attributes["src"] = "$rootDirectory$sound.ogg";
      sources[1].attributes["type"] = "audio/ogg";
      
      audio.nodes.add(sources[0]);
      audio.nodes.add(sources[1]);
      
      document.body.nodes.add(audio);
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
    document.body.nodes.add(element);
    element.id = id;    
  }
}
