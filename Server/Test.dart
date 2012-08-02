#import("TestLib1.dart");
#import("TestLib2.dart");

main() {
  var d = new Dog();
  var p = new Person(d);
  p.play();
}
