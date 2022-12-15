import Utils from '../../utils/utils'
import Config from '../../animations-config'
import GridBuild from './gridBuild'
import GridAction from './gridAction'

export default function () {
  return {
    blocks: {},
    utils: Utils,
    boards: [],
    currentBoard: 0,
    transitionItemsArray: [],
    gridAction: GridAction(),
    gridBuild: GridBuild(),
	activeMaze: undefined,
    init (activeMaze) {

	this.activeMaze = activeMaze;
      this.parent = this.utils.root

      this.parentCont = this.parent.kingCont


      this.gridBuild.init(this.activeMaze)

      this.gridAction.init()
		this.changeGridSize ();
      // this.gridComplete = GridComplete.init();

      this.nextBoard = this.nextBoard.bind(this)
    },
    clearGrid () {
    //   this.gridBuild[`${this.utils.root.activeMode}Baddies`].removeCastlesAndSoldiers()
    },
    changeGridSize () {
      const w = Config[`blockSize`][0]
      const h = Config[`blockSize`][1]

      this.gridBuild.blockWidth = w
      this.gridBuild.blockHeight = h

      // console.log(this.boards[this.gridBuild.currentBoard])
	  console.log(this.boards)
      this.gridBuild.buildGrid(this.activeMaze)

      this.gridAction.setLimits()
    },
    nextBoard (id) {
      this.gridBuild.tokens.forEach((item) => {
        item.placed = false
      })

      if (!id) {
        this.gridBuild.currentBoard = this.activeMaze
      } else {
        this.gridBuild.currentBoard = this.activeMaze
      }
      this.gridBuild.cont.removeChildren()
      this.gridBuild.blocks = {}
      this.gridBuild.buildGrid(this.gridBuild.currentBoard)
      this.gridBuild.resetBaddies()
      this.gridAction.setLimits()

      this.utils.root.activeAction.vx = this.utils.root.activeAction.vy = 0
    },
    addToStage (index) {
      this.gridAction.pause = false
      this.parentCont.addChildAt(this.gridBuild.cont, index)
      if (this.utils.root.all) {
        this.gridBuild.vortexes.addRemoveVortexes(true)
      }
    },
    removeFromStage () {
      this.gridAction.pause = true
      this.parentCont.removeChild(this.gridBuild.cont)
      if (this.utils.root.all) {
        this.gridBuild.vortexes.addRemoveVortexes(false)
      }
    },
    resize () {
      this.gridBuild.gridResizeHandler.resize()
      this.gridAction.setLimits()
    },
    animate () {
		console.log(this.utils.root.activeAction.vx, this.utils.root.activeAction.vy)
      this.gridAction.animate(this.utils.root.activeAction.vx, this.utils.root.activeAction.vy)
    }
  }
}
