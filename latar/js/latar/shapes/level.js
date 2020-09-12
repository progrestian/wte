class Level extends Shape {
  constructor (params) {
    super(params)

    this.speed = params.speed || '0p'
    this.points = []

    this.size.x = {
      limit: params.size.x.limit || '0p',
      max: params.size.x.max || '0p',
      min: params.size.x.min || '0p',
      real: 0
    }

    this.size.y = {
      limit: params.size.y.limit || '0p',
      max: params.size.y.max || '0p',
      min: params.size.y.min || '0p',
      real: 0
    }

    this.extend()

    const delta = this.points[0].x - Latar.resolveUnit(this.position.x)
    this.points = this.points.map(point => { return { x: point.x - delta, y: point.y } })
  }

  extend () {
    function rng (size) { return Math.floor(Math.random() * (Latar.resolveUnit(size.max) - Latar.resolveUnit(size.min) + 1)) + Latar.resolveUnit(size.min) }

    while (this.size.x.real < Latar.resolveUnit(this.size.x.limit)) {
      const x = this.size.x.real + rng(this.size.x)
      let y = this.size.y.real
      y += (Math.random() < 0.5) ? rng(this.size.y) : -rng(this.size.y)

      if (Math.abs(y) <= Latar.resolveUnit(this.size.y.limit)) {
        this.size.x.real = x
        this.size.y.real = y
        this.points.push({ x: x, y: y })
      }
    }
  }

  path () {
    Latar.context.moveTo(this.points[0].x, this.points[0].y)

    this.points.forEach(point => {
      Latar.context.lineTo(point.x, point.y)
      point.x -= Latar.resolveUnit(this.speed)
    })

    Latar.context.lineTo(this.size.x.real, Latar.size.y.real - Latar.resolveUnit(this.position.y) + Latar.resolveUnit(this.size.y.limit))
    Latar.context.lineTo(0, Latar.size.y.real - Latar.resolveUnit(this.position.y) + Latar.resolveUnit(this.size.y.limit))

    this.size.x.real -= Latar.resolveUnit(this.speed)

    if (this.points[1].x < 0) {
      this.points.splice(0, 1)
      this.extend()
    }
  }
}
