import Utils from './utils'
import Config from '../animations-config'

export default {
  utils: Utils,
  opQ: 0,
  op: [],
  rings: [],
  lines: [],
  coins: [],
  opCounter: 0,
  init () {
    // this.ringQ = (this.utils.app.renderer instanceof PIXI.WebGLRenderer) ? Config.bounceTotalPoints : 100
    // for (let i = 0; i < this.ringQ; i++) {
    //   this.lines.push(this.Graphics())
    //   this.rings.push(this.Sprite('transparentRing.png'))
    // }

    // this.coinQ = (this.utils.app.renderer instanceof PIXI.WebGLRenderer) ? Config.flyCoinsPerTreasureChest : 10
    // for (let i = 0; i < this.coinQ; i++) {
    //   const num = Math.ceil(Math.random() * 11)
    //   // // console(num)
    //   this.coins.push(this.Sprite(`jewel${num}.png`))
    // }

    // this.opQ = (this.utils.app.renderer instanceof PIXI.WebGLRenderer) ? 300 : 50
    // for (let i = 0; i < this.opQ; i++) {
    //   this.op.push(this.Sprite())
    // }
  },
  Point (x, y) {
    return new PIXI.Point(x, y)
  },
  Container () {
    return new PIXI.Container()
  },
  Loader () {
    return PIXI.Assets;
  },
  Application (obj) {
    return new PIXI.Application(obj)
  },
  quadrupleSpriteSize (texture) {
    // texture should be 1000x500
    const arr = [
      [0, 0, 1, 1],
      [2000, 0, -1, 1],
      [0, 1000, 1, -1],
      [2000, 1000, -1, -1]
    ]; let s; const
      cont = this.Container()
    for (let i = 0; i < 4; i++) {
      s = this.Sprite(texture)
      s.x = arr[i][0]
      s.y = arr[i][1]
      s.scale.x = arr[i][2]
      s.scale.y = arr[i][3]
      cont.addChild(s)
    }
    return cont
  },
  webgl () {
    return this.utils.app.renderer instanceof PIXI.WebGLRenderer
  },
  ParticleContainer (q) {
    return new PIXI.ParticleContainer(q, {
      scale: true,
      position: true,
      rotation: true,
      uvs: true,
      alpha: true
    })
  },
  ColorFilter () {
    return new PIXI.filters.ColorMatrixFilter()
  },
  BitmapText (str) {
    return new PIXI.extras.BitmapText(str, { font: '21px Hiragino Sans' })
  },
  Rope (texture, points) {
    return new PIXI.RopeGeometry(texture, points)
  },
  Texture (str) {
    return PIXI.Texture.fromFrame(str)
  },
  AnimatedSprite (array) {
    return new PIXI.extras.AnimatedSprite(array)
  },
  returnObjectPool (str) {
    for (let i = 0; i < this.opQ; i++) {
      this.op[i].texture = this.utils.spritesheet.textures[str]
    }
    return this.op
  },
  returnFirstHalfObjectPool (str) {
    const stopVal = this.opQ / 2
    const returnArr = []
    for (let i = 0; i < stopVal; i++) {
      this.op[i].texture = this.utils.spritesheet.textures[str]
      returnArr.push(this.op[i])
    }
    return returnArr
  },
  returnSecondHalfObjectPool (str) {
    const startVal = this.opQ / 2
    const returnArr = []
    for (let i = startVal; i < this.opQ; i++) {
      this.op[i].texture = this.utils.spritesheet.textures[str]
      returnArr.push(this.op[i])
    }
    return returnArr
  },
  Sprite (str) {
    if (!str) {
      return new PIXI.Sprite()
    }
    if (this.utils.spritesheet && this.utils.spritesheet.textures[str]) {
      // if(test)// console('from spritesheet', str)
      return new PIXI.Sprite(this.utils.spritesheet.textures[str])
    }
    // if(test)// console('from directory', str, this.utils.spritesheet)
    return PIXI.Sprite.from(`/bmps/${str}`)
  },
  Graphics () {
    return new PIXI.Graphics()
  },
  createPool (cont, str, colors, scaleArray) {
    const flameArray = this.returnObjectPool(str)
    const flameQ = flameArray.length
    let colorCounter = 0
    let item
    for (let i = 0; i < flameQ; i++) {
      item = flameArray[i]
      const scale = this.utils.randomNumberBetween(scaleArray[0], scaleArray[0])
      item.scale.set(scale)
      item.anchor.set(0.5)
      item.angle = this.utils.deg2rad(this.utils.randomNumberBetween(-110, -70))
      item.fade = this.utils.randomNumberBetween(0.001, 0.01)
      item.maxDistance = this.utils.randomNumberBetween(100, 1000)
      const hypotenuse = this.utils.randomNumberBetween(10, 100)
      item.vx = Math.cos(item.angle) * hypotenuse
      item.vy = Math.sin(item.angle) * hypotenuse

      item.tint = colors[colorCounter]
      colorCounter++
      if (colorCounter > colors.length - 1) {
        colorCounter = 0
      }
      cont.addChild(item)
    }
    return { flameArray, flameQ }
  }

}
