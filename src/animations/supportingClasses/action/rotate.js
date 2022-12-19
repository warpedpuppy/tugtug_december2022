import Utils from '../../utils/utils'
import Config from '../../animations-config'

export default function () {
  return {
    utils: Utils,
    config: Config,
    movementQ: 0.1,
    init () {
    },
    rotate (str, activeAction) {
      // leaving this here for now because this really relates to the background current
      let returnObj = {}

      if (str === 'right') {
        this.idle = false
        activeAction.radius += this.movementQ
        this.velocity = this.config[`swimVelocity`]
        this.vx = this.velocity * Math.sin(activeAction.radius)
        this.vy = -this.velocity * Math.cos(activeAction.radius)
        activeAction.storeRadius = activeAction.radius
        returnObj = { vx: -this.vx, vy: -this.vy }
      } else if (str === 'left') {
        this.idle = false
        activeAction.radius -= this.movementQ
        this.velocity = this.config[`swimVelocity`]
        this.vx = this.velocity * Math.sin(activeAction.radius)
        this.vy = -this.velocity * Math.cos(activeAction.radius)
        activeAction.storeRadius = activeAction.radius
        returnObj = { vx: -this.vx, vy: -this.vy }
      }
      // // console(activeAction.radius)

      // // console(returnObj)
      return returnObj
    },
    addToStage () {

    },
    removeFromStage () {

    },
    resize () {

    },
    animate () {

    }
  }
}
