interface IPoint default Point {
  final num x;
  final num y;
}

class Point {
  final num x;
  final num y;
  
  Point(this.x, this.y);
  Point.clone(Point p) : this(p.x, p.y);
}
