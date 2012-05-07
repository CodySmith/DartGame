#import('dart:io');
#import('dart:json');
#source('StaticFileHandler.dart');
#source('NotFoundHandler.dart');

void main() {
  Map clients = new Map<double, WebSocketConnection>();
  int ballX = 0, ballY = 0;
  
  HttpServer httpServer = new HttpServer();
  WebSocketHandler webSocketHandler = new WebSocketHandler();
  StaticFileHandler fileHandler = new StaticFileHandler("../content");
  httpServer.addRequestHandler((HttpRequest req) => req.path == "/ws", webSocketHandler.onRequest);
  httpServer.addRequestHandler((req) => true, (req,res) => fileHandler.onRequest(req, res));
  
  webSocketHandler.onOpen = (WebSocketConnection connection) {
    int killed = 0;
    double identifier = Math.random();
    print('player connected: $identifier');
    clients.forEach((k, v) => v.send('hello'));
    clients[identifier] = connection;
    
    connection.onMessage = (message) {
      clients.forEach((k, v) => v.send(message));
    };
    
    connection.onClosed = (int status, String reason) {
      print('closed with $status for $reason');
      if (killed != 1){
        clients.remove(identifier);
        clients.forEach((k, v) => v.send('bye'));
        killed = 1;
      }
    };
    
    connection.onError = (e) {
      print('Error was $e');
      if(killed != 1){
        clients.remove(identifier);
        clients.forEach((k, v) => v.send('error'));
        killed = 1;
      }
    };
  };
  
  new Timer.repeating(50, (t) => clients.forEach((k, v) => v.send('ping')));
  
  httpServer.listen('127.0.0.1', 8000);
  print('listening on: http://127.0.0.1:8000');
}
