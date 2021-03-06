#import('dart:io');
#import('dart:isolate');
#import('dart:json');
#import('../Content/Pong/PongGame.dart');
#import('../Content/DGame/Game.dart');

#source('StaticFileHandler.dart');
#source('NotFoundHandler.dart');

void main() {
  var game = new PongGame(new Rectangle(0, 0, 960, 600));
  game.debugMode = false;
  game.start();
  
  Map clients = new Map<double, WebSocketConnection>();
  int ballX = 0, ballY = 0;
  
  HttpServer httpServer = new HttpServer();
  WebSocketHandler webSocketHandler = new WebSocketHandler();
  StaticFileHandler fileHandler = new StaticFileHandler("${new Directory.current().path}/content");
  httpServer.addRequestHandler((HttpRequest req) => req.path == "/ws", webSocketHandler.onRequest);
  httpServer.addRequestHandler((req) => true, (req,res) => fileHandler.onRequest(req, res));
  
  webSocketHandler.onOpen = (WebSocketConnection connection) {
    int killed = 0;
    double identifier = Math.random();
    print('player connected: $identifier');
    clients.forEach((k, v) => v.send('hello'));
    clients[identifier] = connection;
    
    connection.onMessage = (message) {
      print(message);
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
  
  new Timer.repeating(50, (t) => clients.forEach((k, v) {
    var msgs = [
        {
          'n': 1,
          'd': {
            'bx' : game.ball.x,
            'by' : game.ball.y,
            'bxv' : game.ball.momentum.xVel,
            'byv' : game.ball.momentum.yVel,
            'bxa' : game.ball.momentum.xAccel,
            'bya' : game.ball.momentum.yAccel
          }
        }
      ];
    v.send(JSON.stringify(msgs));
  }));
  
  httpServer.listen('127.0.0.1', 8000);
  print('listening on: http://127.0.0.1:8000');
}
