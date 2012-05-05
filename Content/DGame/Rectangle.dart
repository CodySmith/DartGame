class Rectangle {
  num top;
  num left;
  num right;
  num bottom;
  
  Rectangle(this.top, this.left, this.right, this.bottom);
  Rectangle.clone(Rectangle rect) : this(rect.top, rect.left, rect.right, rect.bottom);
  
  void updateFrom(Rectangle rect) {
    top = rect.top;
    left = rect.left;
    right = rect.right;
    bottom = rect.bottom;
  }
  
  bool intersectsWith(Rectangle other) {
    return Rectangle.intersect(this, other);
  }
  
  num get width() => right - left;
  num get height() => bottom - top;
  
  static bool intersect(Rectangle r1, Rectangle r2) {
    return !(r1.left > r2.right || 
        r1.right < r2.left || 
        r1.top > r2.bottom ||
        r1.bottom < r2.top);
  }
}
