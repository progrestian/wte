class Ellipse extends Shape {
  path () {
    Latar.context.ellipse(
      0, 0,
      Latar.resolveUnit(this.size.x),
      Latar.resolveUnit(this.size.y),
      0, 0 * Math.PI, 2 * Math.PI
    )
  }
}
