class NotFoundHandler {
  List<int> _notFoundPage;
  static final String notFoundPageHtml = """
<html><head>
<title>404 Not Found</title>
</head><body>
<h1>Not Found</h1>
<p>The requested URL was not found on this server.</p>
</body></html>""";
  void onRequest(HttpRequest req, HttpResponse res){

    if (_notFoundPage == null)
      _notFoundPage = notFoundPageHtml.charCodes();
    
    res.statusCode = HttpStatus.NOT_FOUND;
    res.headers.set("Content-Type", "text/html; charset=UTF-8");
    res.contentLength = _notFoundPage.length;
    res.outputStream.write(_notFoundPage);
    res.outputStream.close();
  }
}