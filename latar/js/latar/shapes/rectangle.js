class Rectangle extends Shape {
  path () {
    const halfW = Latar.resolveUnit(this.size.x) / 2
    const halfH = Latar.resolveUnit(this.size.y) / 2
    Latar.context.rect(-halfW, -halfH, halfW * 2, halfH * 2)
  }
}
