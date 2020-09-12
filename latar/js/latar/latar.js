'use strict'

const Latar = {

  createShape (shape) { this.shapes.push(shape) },

  getShape (id) {
    return (function traverse (composite) {
      let result = composite.shapes.find(shape => shape.name === id)
      if (result === undefined) for (const shape of composite.shapes.filter(shape => shape.shapes !== undefined)) result = traverse(shape)
      return result
    })(this)
  },

  initScene (params) {
    this.background = params.background || '#000'
    this.size = params.size || { x: '99x', y: '99y' }

    this.responsive = (params.responsive !== undefined) ? params.responsive : true
    this.canvas = document.createElement('canvas')

    this.context = this.canvas.getContext('2d')
    this.shapes = []

    this.canvas.style.cssText = `
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: ${this.background};
      z-index: -1;
    `

    document.body.appendChild(this.canvas)

    for (const axis of ['x', 'y']) {
      this.size[axis] = { real: this.resolveWindow(this.size[axis]), limit: this.size[axis] }
      this.setSize(axis, this.size[axis].limit)
    }

    if (this.responsive) {
      window.addEventListener('resize', () => {
        for (const axis of ['x', 'y']) this.setSize(axis, this.size[axis].limit)
      })
    }
  },

  resolveUnit (str) { return this.resolveValue(str, { x: this.size.x.real, y: this.size.y.real }) },

  resolveValue (str, size) {
    const val = parseFloat(str.slice(0, str.length - 1), 10)
    switch (str[str.length - 1]) {
      case 'd': return (val / 180) * Math.PI
      case 'r': return val * Math.PI
      case 'x': return (val / 100) * size.x
      case 'y': return (val / 100) * size.y
      case 'c': return val / 100
      case 'p': return val
      default : return val
    }
  },

  resolveWindow (str) { return this.resolveValue(str, { x: window.innerWidth, y: window.innerHeight }) },

  setSize (axis, str) {
    const val = this.resolveWindow(str)
    this.size[axis].limit = str
    this.size[axis].real = val
    axis = (axis === 'x') ? 'width' : 'height'
    this.canvas.setAttribute(axis, val)
  },

  startLoop () {
    this.context.clearRect(0, 0, this.size.x.real, this.size.y.real)
    for (const shape of Object.keys(this.shapes)) this.shapes[shape].main()
    window.requestAnimationFrame(this.startLoop.bind(this))
  }

}
