class Composite extends Shape {
  constructor (params) {
    super(params)
    this.shapes = params.shapes || []

    this.shapes.forEach(shape => {
      shape.color = params.color || shape.color
    })
  }

  draw () {
    this.shapes.forEach(shape => shape.main())
  }
}
