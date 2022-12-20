import SwimAction from './swimAction'
import SwimBackground from './swimBackground'
import Utils from '../../utils/utils'

export default function () {
  return {
    swimAction: SwimAction(),
    swimBackground: SwimBackground(),
    onGridCoins: [],
    utils: Utils,
    init (cont) {
      this.background = this.swimBackground
      this.swimBackground.init(cont)
      this.swimAction.init(cont)
    },
    addToStage () {
      this.utils.root.grid.changeGridSize()
      const index = this.utils.root.kingCont.getChildIndex(this.utils.root.clock.cont) + 1
      this.utils.root.grid.addToStage(index)
      this.swimBackground.addToStage()
      this.swimAction.start()

      this.swimAction.vx = this.swimAction.vy = 0

      return this.swimAction
    },
    removeFromStage () {
      this.swimBackground.removeFromStage();
      this.utils.root.grid.clearGrid();
      this.utils.root.grid.removeFromStage();
    },
    resize () {
      this.swimAction.resize()
      this.swimBackground.resize()
    },
    addCoinToGrid () {

    },
    animate () {

      this.swimBackground.animate()
      this.swimAction.animate()
    }
  }
}
