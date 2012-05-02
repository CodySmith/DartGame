class StaticFileHandler {
  String basePath;
  
  StaticFileHandler(String this.basePath);
  
  void onRequest(HttpRequest req, HttpResponse res){
    String path = req.path;
    if (path.endsWith('/'))
      path += "index.html";
    String fileName = "$basePath$path";
    
    File file = new File(fileName);
    if (file.existsSync()) {
      String mimeType = "text/html; charset=UTF-8";
      int lastDot = fileName.lastIndexOf(".", fileName.length);
      if (lastDot != -1) {
        String extension = fileName.substring(lastDot);
        if (extension == ".css") { mimeType = "text/css"; }
        if (extension == ".js") { mimeType = "application/javascript"; }
        if (extension == ".dart") { mimeType = "application/dart"; }
        if (extension == ".ico") { mimeType = "image/vnd.microsoft.icon"; }
        if (extension == ".png") { mimeType = "image/png"; }
        if (extension == ".gif") { mimeType = "image/gif"; }
        if (extension == ".mp3") { mimeType = "audio/mpeg"; }
        if (extension == ".ogg") { mimeType = "audio/ogg"; }
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