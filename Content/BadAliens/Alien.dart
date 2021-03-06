class Alien extends GameEntity {
  
  num radialDistance;
  num angle;
  num speed = 100;

  Alien(Game game, num this.radialDistance, num this.angle) : super(game) {
    sprite = rotateAndCache(game.assetManager.getAsset('img/alien.png'),
                            angle);
    radius = sprite.height / 2;
    setCoords();
  }
  
  void setCoords() {
    x = radialDistance * Math.cos(angle);
    y = radialDistance * Math.sin(angle);
  }
  
  void update() {
    setCoords();
    radialDistance -= speed * game.clockTick;

    if (hitPlanet()) {
        removeFromGame();
        EvilAliens eg = game;
        eg.lives -= 1;
    }
  }
  
  bool hitPlanet() {
    var distance_squared = ((x * x) + (y * y));
    var radii_squared = (radius + Earth.RADIUS) * (radius + Earth.RADIUS);
    return distance_squared < radii_squared;
  }
  
  void explode() {
    removeFromGame();
    game.addEntity(new AlienExplosion(game, x, y));
    // TODO play sound
  }
}
