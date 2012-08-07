class PongGameClient extends PongGame {
  WebSocket _ws;
  bool _isConnected = false;
  String _serverUrl = "ws://localhost:8000/ws";
  List<String> _messages;
  
  PongGameClient([String serverUrl = "ws://localhost:8000/ws"]) 
    : super.withServices(new HtmlGameSound(), new HtmlGameInput(), new PongGameRenderer("surface"), new HtmlGameLoop()) {
    
    _messages = new List<String>();
    _serverUrl = serverUrl;
  }
  
  void start() {
    if(!connect()){
      // unable to connect to server... run local game??
    }
    
    super.start();
  }
  
  void update() {
    for (String message in _messages)
      _print(message);
    
    
        
    super.update();
  }
  
  void handleMessage(MessageEvent e){
    _messages.add(e.data);
  }
  
  void sendMessage(String message) {
    if(_ws == null || !_isConnected) {
      throw new Exception("You must be connected to the server before sending a message.");
    }
    
    _ws.send(message);
  }
  
  bool connect() {
    if(_ws != null && _isConnected) {
      return true;
    }
    
    try {
      _ws = new WebSocket(_serverUrl);
    } catch(Exception e){
      _print(e.toString());
      
       return false;
    }
    
    _ws.on.open.add((c) {
      _print("Connected to $c");
      _isConnected = true;
    });
    
    _ws.on.close.add((c) {
      _print("Disconnected from $c");
      _isConnected = false;
    });
    
    _ws.on.message.add((MessageEvent e) {
      handleMessage(e);
    });
    
    _ws.on.error.add((e) {
      _print("An error occurred: $e");
    });
    
    return true;
  }
  
  bool disconnect() {
    if(_ws == null) {
      return true;
    }
    
    try {
      if(_isConnected){
        _ws.close(0, "Client disconnected");
        _ws = null;
        _messages.clear();
      }
    } catch(Exception e){
      _print(e.toString());
      return false;
    }
    
    return true;
  }
  
  _print(String message){
    print("[Client] $message");
  }
}
