class Shape {
  constructor (params) {
    this.position = params.position || { x: '0p', y: '0p' }
    this.size = params.size || { x: '0p', y: '0p' }

    this.color = params.color || '#fff'
    this.name = params.name || ''
    this.opacity = params.opacity || '100c'
    this.rotation = params.rotation || '0r'

    this.effects = params.effects || {}
  }

  draw () {
    Latar.context.globalAlpha = Latar.resolveValue(this.opacity)
    Latar.context.beginPath()
    this.path()
    Latar.context.closePath()
    Latar.context.fillStyle = this.color
    Latar.context.fill()
  }

  main () {
    Latar.context.save()
    this.transform()
    this.draw()
    Latar.context.restore()
  }

  path () {}

  transform () {
    if (this.effects.translate) this.effects.translate.call(this)
    Latar.context.translate(Latar.resolveUnit(this.position.x), Latar.resolveUnit(this.position.y))

    if (this.effects.rotation) this.effects.rotation.call(this)
    Latar.context.rotate(Latar.resolveValue(this.rotation))
  }
}
