import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Tweens from '../../utils/Tweens'

import LilypadsLotuses from './lilypadsLotuses'

export default function () {
  return {
    texture: 'waterSmall.png',
    sprite1: undefined,
    sprite2: undefined,
    speed1: 0.5,
    speed2: 0.75,
    sizeIncrement: 2,
    utils: Utils,
    gridIndex: 5,
    lilypadLotuses: LilypadsLotuses(),

    init () {
      this.parentCont = this.utils.root.kingCont
      this.wh = this.utils.wh
      this.lilypadLotuses.init(this.parentCont)
    //   this.fishSchool.init(this.parentCont)

      this.cont = Assets.quadrupleSpriteSize(this.texture)// this.build(arr);
      this.cont2 = Assets.quadrupleSpriteSize(this.texture)// this.build(arr);

      this.cont.width = this.wh.canvasWidth * this.sizeIncrement
      this.cont.height = this.wh.canvasHeight * this.sizeIncrement

      this.cont.vx = this.speed1
      this.cont.vy = this.speed1
      this.cont.alpha = 0.15

      this.cont2.width = this.wh.canvasWidth * this.sizeIncrement
      this.cont2.height = this.wh.canvasHeight * this.sizeIncrement
      this.cont2.x = -this.wh.canvasWidth / this.sizeIncrement
      this.cont2.y = -this.wh.canvasHeight / this.sizeIncrement
      this.cont2.alpha = 0.5
      this.cont2.vx = this.speed2
      this.cont2.vy = this.speed2

      this.background = Assets.Graphics()
      this.background.beginFill(0x3399ff).drawRect(0, 0, this.utils.canvasWidth, this.utils.canvasHeight).endFill()
    },
    resize () {
      this.cont.width = this.utils.canvasWidth * this.sizeIncrement
      this.cont.height = this.utils.canvasHeight * this.sizeIncrement
      this.cont2.width = this.utils.canvasWidth * this.sizeIncrement
      this.cont2.height = this.utils.canvasHeight * this.sizeIncrement
      this.cont.x = this.cont.y = 0
      this.cont2.x = -this.utils.canvasWidth / this.sizeIncrement
      this.cont2.y = -this.utils.canvasHeight / this.sizeIncrement

      this.background.clear()
      this.background.beginFill(0x3399ff).drawRect(0, 0, this.utils.canvasWidth, this.utils.canvasHeight).endFill()
    },
    addToStage () {

      this.parentCont.addChildAt(this.background, 0)
      // THIS IS HACKY AND SHOULD BE FIXED
      if (!this.utils.root.all) {
        this.parentCont.addChildAt(this.cont2, 2)
        const index = 0// this.utils.root.kingCont.getChildIndex(this.utils.root.score.topBanner) - 1;
        this.parentCont.addChildAt(this.cont, index)
      }
      this.lilypadLotuses.addToStage()
    },
    removeFromStage () {
      this.fishSchool.removeFromStage()
      this.lilypadLotuses.removeFromStage()
      this.parentCont.removeChild(this.background)
      this.parentCont.removeChild(this.cont2)
      this.parentCont.removeChild(this.cont)
    },
    animate () {

      this.cont2.x += this.cont2.vx
      this.cont2.y += this.cont2.vy

      if (this.cont2.x > 0) {
        this.cont2.x = 0
        this.cont2.vx *= -1
      } else if (this.cont2.x < -this.wh.canvasWidth / this.sizeIncrement) {
        this.cont2.x = -this.wh.canvasWidth / this.sizeIncrement
        this.cont2.vx *= -1
      }

      if (this.cont2.y > 0) {
        this.cont2.y = 0
        this.cont2.vy *= -1
      } else if (this.cont2.y < -this.wh.canvasHeight / this.sizeIncrement) {
        this.cont2.y = -this.wh.canvasHeight / this.sizeIncrement
        this.cont2.vy *= -1
      }

      this.cont.x += this.cont.vx
      this.cont.y += this.cont.vy

      if (this.cont.x > 0) {
        this.cont.x = 0
        this.cont.vx *= -1
      } else if (this.cont.x < -this.wh.canvasWidth / this.sizeIncrement) {
        this.cont.x = -this.wh.canvasWidth / this.sizeIncrement
        this.cont.vx *= -1
      }

      if (this.cont.y > 0) {
        this.cont.y = 0
        this.cont.vy *= -1
      } else if (this.cont.y < -this.wh.canvasHeight / this.sizeIncrement) {
        this.cont.y = -this.wh.canvasHeight / this.sizeIncrement
        this.cont.vy *= -1
      }
    }

  }
}
