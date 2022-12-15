import Utils from '../../utils/utils'
import Assets from '../../utils/assetCreation'

import Rotate from '../action/rotate'


export default function () {
  return {
    radius: 0,
    storeRadius: 0,
    spinning: false,
    utils: Utils,
    vx: 0,
    vy: 0,
    airBubbleCounter: 0,
    airBubbleStart: 0,
    countAllow: true,
    expand: [],
    percApply: true,

    increment: 5,

    flameOn: false,
    rotateFunction: Rotate(),
    init (stage) {
      this.hero = this.utils.hero
      this.wh = this.utils.wh
      this.stage = stage
      this.vx = this.utils.randomNumberBetween(1,2);
	  this.vy = this.utils.randomNumberBetween(1,2);

    },
    start () {
      
    },
    rotate (str) {
      const obj = this.rotateFunction.rotate(str, this)
      this.vx = -obj.vx
      this.vy = -obj.vy
    },
    resize () {
      this.airBubbles.resize()
    },
    fire (boolean) {
      this.flameOn = this.flames.visible = boolean
    },
    animate () {
   
    }
  }
}
