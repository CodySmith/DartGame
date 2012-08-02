#library("lib1");

class Animal {
  speak() {
    print("??");
  }
}

class Person {
  Animal pet;
  Person(Animal this.pet);
  play() {
    pet.speak();
  }
}