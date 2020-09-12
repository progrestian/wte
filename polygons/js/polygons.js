const pg = {}

pg.e = document.createElement('canvas')
pg.c = pg.e.getContext('2d')
pg.n = []

pg.g = {
  COLOR_BG: '15,15,16',
  COLOR_LINE: '150,150,150',
  COLOR_NODE: '100,100,100',
  MAX_DISTANCE: 250,
  MAX_NODES: 50,
  MAX_SPEED: 1,
  SIZE_LINE: 0.5,
  SIZE_NODE: 1
}

pg.e.style.cssText = `
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`

pg.resize = function () {
  pg.e.setAttribute('width', document.documentElement.clientWidth)
  pg.e.setAttribute('height', document.documentElement.clientHeight)
  pg.w = parseInt(pg.e.getAttribute('width'))
  pg.h = parseInt(pg.e.getAttribute('height'))
}

pg.fill = function (empty) {
  function random () {
    while (true) {
      const result = (Math.random() * 2) - 1
      if (result !== 0) { return result * pg.g.MAX_SPEED }
    }
  }

  while (pg.n.length < pg.g.MAX_NODES) {
    const node = {
      x: Math.floor(Math.random() * pg.w),
      y: Math.floor(Math.random() * pg.h),
      vx: random(),
      vy: random()
    }

    if (!empty) {
      if (Math.random() < 0.5) {
        Math.random() < 0.5
          ? node.x = -(pg.g.MAX_DISTANCE)
          : node.x = pg.w + pg.g.MAX_DISTANCE
      } else {
        Math.random() < 0.5
          ? node.y = -(pg.g.MAX_DISTANCE)
          : node.y = pg.h + pg.g.MAX_DISTANCE
      }
    }

    pg.n.push(node)
  }
}

pg.render = function () {
  pg.c.clearRect(0, 0, pg.w, pg.h)

  const maxn = pg.n.length
  const next = []

  for (let ii = 0; ii < maxn; ii++) {
    let posx = pg.n[ii].x
    let posy = pg.n[ii].y

    pg.c.beginPath()
    pg.c.arc(posx, posy, pg.g.SIZE_NODE, 0, Math.PI * 2)
    pg.c.closePath()
    pg.c.fill()

    for (let jj = ii + 1; jj < maxn; jj++) {
      const farx = pg.n[jj].x
      const fary = pg.n[jj].y

      const fraction = Math.hypot(posx - farx, posy - fary) / pg.g.MAX_DISTANCE

      if (fraction < 1) {
        pg.c.strokeStyle = `rgba(${pg.g.COLOR_LINE}, ${1 - fraction} `
        pg.c.beginPath()
        pg.c.moveTo(posx, posy)
        pg.c.lineTo(farx, fary)
        pg.c.stroke()
        pg.c.closePath()
      }
    }

    posx += pg.n[ii].vx
    posy += pg.n[ii].vy

    if (
      posx > -(pg.g.MAX_DISTANCE) &&
      posy > -(pg.g.MAX_DISTANCE) &&
      posx < pg.w + pg.g.MAX_DISTANCE &&
      posy < pg.h + pg.g.MAX_DISTANCE
    ) {
      pg.n[ii].x = posx
      pg.n[ii].y = posy
      next.push(pg.n[ii])
    }
  }

  pg.n = next

  pg.fill(false)
  window.requestAnimationFrame(pg.render)
}

window.addEventListener('resize', event => pg.resize())
window.addEventListener('DOMContentLoaded', event => {
  document.body.style.background = `rgba(${pg.g.COLOR_BG}, 1)`
  document.body.appendChild(pg.e)

  pg.resize()
  pg.fill(true)

  pg.c.fillStyle = `rgba(${pg.g.COLOR_NODE},1)`
  pg.c.lineWidth = pg.g.SIZE_LINE

  pg.render()
})
