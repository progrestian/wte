class Triangle extends Shape {
  path () {
    const halfW = Latar.resolveUnit(this.size.x) / 2
    const halfH = Latar.resolveUnit(this.size.y) / 2
    Latar.context.moveTo(-halfW, -halfH)
    Latar.context.lineTo(halfW, -halfH)
    Latar.context.lineTo(halfW, halfH)
  }
}
