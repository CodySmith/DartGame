class StaticFileHandler {
  String basePath;
  
  StaticFileHandler(String this.basePath);
  
  void onRequest(HttpRequest req, HttpResponse res){
    String path = req.path;
    if (path.endsWith('/'))
      path = path.concat("index.html");
    String fileName = "$basePath$path";
    
    File file = new File(fileName);
    if (file.existsSync()) {
      String mimeType = "text/html; charset=UTF-8";
      int lastDot = fileName.lastIndexOf(".", fileName.length);
      if (lastDot != -1) {
        String extension = fileName.substring(lastDot).toLowerCase();
        if (extension == ".css")
          mimeType = "text/css";
        else if (extension == ".js")
          mimeType = "application/javascript";
        else if (extension == ".dart")
          mimeType = "application/dart";
        else if (extension == ".ico")
          mimeType = "image/vnd.microsoft.icon";
        else if (extension == ".png")
          mimeType = "image/png";
        else if (extension == ".gif")
          mimeType = "image/gif";
        else if (extension == ".mp3")
          mimeType = "audio/mpeg";
        else if (extension == ".ogg")
          mimeType = "audio/ogg";
        else if (extension == ".ttf")
          mimeType = "application/x-font-ttf";
      }
      res.headers.set("Content-Type", mimeType);
      // Get the length of the file for setting the Content-Length header.
      RandomAccessFile openedFile = file.openSync();
      res.contentLength = openedFile.lengthSync();
      openedFile.closeSync();
      // Pipe the file content into the response.
      file.openInputStream().pipe(res.outputStream);
    } else {
      print("File not found: $fileName");
      new NotFoundHandler().onRequest(req, res);
    }
  }
}