import Action from './action'
import Background from './background'
import Utils from '../../utils/utils'

export default function () {
  return {
    action: Action(),
    background: Background(),
    utils: Utils,
    init (cont) {
      this.background = this.background
      this.background.init(cont)
      this.action.init(cont)
    },
    addToStage () {
      this.utils.root.grid.changeGridSize()
      const index = this.utils.root.kingCont.getChildIndex(this.utils.root.clock.cont) + 1
      this.utils.root.grid.addToStage(index)
      this.background.addToStage()
      this.action.start()
      this.action.vx = this.action.vy = 0
      return this.action
    },
    removeFromStage () {
      this.background.removeFromStage();
      this.utils.root.grid.clearGrid();
      this.utils.root.grid.removeFromStage();
    },
    resize () {
      this.action.resize()
      this.background.resize()
    },
    addCoinToGrid () {

    },
    animate () {

      this.background.animate()
      this.action.animate()
    }
  }
}
