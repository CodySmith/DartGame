class HtmlGameSound extends GameSound {
  void play(String sound, [double volume = 1.0]) {
    if (!enabled)
      return;
    
    print("Playing: $sound");
    AudioElement sourceAudio = query("#sound_$sound");
    if (sourceAudio == null)
      sourceAudio = query("#$sound");
    
    AudioElement audioCopy;
    
    if (sourceAudio == null) {
      sourceAudio = new AudioElement();
      sourceAudio.id = "sound_$sound";
      sourceAudio.preload = "auto";
      
      var s = new SourceElement();
      s.src = "$rootDirectory$sound.mp3";
      s.type = "audio/mp3";
      sourceAudio.nodes.add(s);
      
      s = new SourceElement();
      s.src = "$rootDirectory$sound.ogg";
      s.type = "audio/ogg";
      sourceAudio.nodes.add(s);
      
      document.body.nodes.add(sourceAudio);
    }
    
    audioCopy = sourceAudio.clone(true);
    audioCopy.id = "";
    document.body.nodes.add(audioCopy);
    
    audioCopy.on.sourceEnded.add((e) {
      print("removed");
      audioCopy.remove();
    });
    
    if (volume != null)
      audioCopy.volume = round(volume, 3);
    
    audioCopy.play();
    audioCopy.classes.add("sound-clone");
  }
}
