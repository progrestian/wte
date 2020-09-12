Latar.initScene({
  background: '#102',
  size: { x: '100x', y: '100y' }
})

Latar.createShape(new Ellipse({
  position: { x: '16x', y: '32y' },
  size: { x: '8x', y: '8x' },
  color: '#faa',
}))

Latar.createShape(new Composite({
  position: { x: '40x', y: '0p' },
  size: { x: '100x', y: '100y' },
  shapes: [
    new Composite({
      position: { x: '100p', y: '-200p' },
      color: '#cad',
      rotation: '1r',
      shapes: [
        new Triangle({
          size: { x: '250p', y: '250p' }
        }),
        new Ellipse({
          position: { x: '-10p', y: '10p' },
          size: { x: '50p', y: '184p'},
          rotation: '-0.25r'
        })
      ]
    }),
    new Rectangle({
      size: { x: '302p', y: '100p' },
      name: 'square',
      color: '#212'
    }),
    new Triangle({
      position: { x: '200p', y: '0p' },
      size: { x: '100p', y: '100p' },
      color: '#212',
      rotation: '270d'
    })
  ],
  effects: {
    translate: function() {
      let wave   = Latar.getShape('wave')
      let square = Latar.getShape('square')

      let posX   = Latar.resolveUnit(this.position.x) + Latar.resolveUnit(square.position.x) + Latar.resolveUnit(square.size.x) / 2
      let pointR = wave.points.find(point => point.x > posX)
      let posY   = Latar.resolveUnit(wave.position.y) + pointR.y

      this.position = { x: this.position.x, y: `${posY}p` }
    },
    rotation: function() {
      let wave   = Latar.getShape('wave')
      let square = Latar.getShape('square')

      let posX  = Latar.resolveUnit(this.position.x) + Latar.resolveUnit(square.position.x)
      let halfW = Latar.resolveUnit(square.size.x) / 2

      let pointL = wave.points.find(point => point.x > (posX - halfW))
      let pointR = wave.points.find(point => point.x > (posX + halfW))

      let axisY = pointL.y - pointR.y
      let rotation = Math.abs(axisY) / Math.abs(pointL.x - pointR.x)

      rotation *= (axisY < 0) ? 0.15 : -0.15
      if (!isNaN(rotation)) this.rotation = `${rotation}r`
    }
  }
}))

Latar.createShape(new Level({
  name     : 'wave',
  color    : '#28005a',
  opacity  : '50c',
  speed    : '16p',
  position : { x: '0p', y: '85y' },
  size     : {
    x: { limit: '200x', max: '256p', min: '128p' },
    y: { limit:  '64p', max:  '32p', min: '8p' }
  }
}))

Latar.createShape(new Level({
  color    : '#140032',
  opacity  : '50c',
  speed    : '16p',
  position : { x: '0p', y: '85y' },
  size     : {
    x : { limit: '200x', max: '128p', min: '64p' },
    y : { limit:  '64p', max:  '32p', min: '16p' }
  }
}))

Latar.createShape(new Level({
  color    : '#0a001e',
  opacity  : '50c',
  speed    : '32p',
  position : { x: '0p', y: '90y' },
  size     : {
    x : { limit: '200x', max: '256p', min: '128p' },
    y : { limit:  '64p', max:  '64p', min: '8p' }
  }
}))

Latar.startLoop()