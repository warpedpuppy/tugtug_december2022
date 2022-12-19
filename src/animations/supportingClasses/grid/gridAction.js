import Utils from '../../utils/utils'
import Tweens from '../../utils/Tweens'
import Config from '../../animations-config'

export default function () {
  return {
    utils: Utils,
    colQ: 4,
    rowQ: 10,
    buffer: 30,
    pause: false,
    wallHit: 0,
    itemLoopingQ: 0,
    init () {
      this.blockWidth = Config[`blockSize`][0]
      this.blockHeight = Config[`blockSize`][1]

      this.magicPillsArray = this.utils.root.grid.magicPillsArray
      this.transitionItemsArray = this.utils.root.grid.transitionItemsArray
      this.flyTreasureChests = this.utils.root.grid.flyTreasureChests
      this.swimTreasureChests = this.utils.root.grid.swimTreasureChests
      this.treasure = this.utils.root.grid.treasure
      this.swimBaddies = this.utils.root.grid.gridBuild.swimBaddies
      this.flyBaddies = this.utils.root.grid.gridBuild.flyBaddies
      this.blocks = this.utils.root.grid.gridBuild.blocks
      this.gridBuild = this.utils.root.grid.gridBuild
      this.spaceShip = this.gridBuild.spaceShip
      this.microscope = this.gridBuild.microscope

      // this.omnibusArray = this.gridBuild.omnibusArray;

      this.itemLoopingQ = 0;//Math.max(
    //     this.magicPillsArray.length,
    //     this.transitionItemsArray.length,
    //     this.flyTreasureChests.length,
    //     this.swimTreasureChests.length
    //   )

      this.heroCollisionDetector = {
        x: this.utils.canvasWidth / 2,
        y: this.utils.canvasHeight / 2,
        radius: 10
      }

      this.setLimits()
    },
    currentSquare () {
      const halfCanvasWidth = (this.utils.canvasWidth / 2)
      const halfCanvasHeight = (this.utils.canvasHeight / 2)
      const iVal = Math.floor((halfCanvasHeight - this.gridBuild.cont.y) / this.blockHeight)
      const jVal = Math.floor((halfCanvasWidth - this.gridBuild.cont.x) / this.blockWidth)
      const { blocks } = this.utils.root.grid.gridBuild
      return { block: blocks[iVal][jVal], i: iVal, j: jVal }
    },
    glow (i, j) {
    //   if (this.glow.obj === undefined) {
    //     this.glow.obj = { i: 1, j: 1 }
    //   }
    //   if (i !== this.glow.obj.i || j !== this.glow.obj.j) {
        const { blocks } = this.utils.root.grid.gridBuild
        const currentBlock = blocks[this.glow.obj.i][this.glow.obj.j]
        Tweens.tween(currentBlock, 0.15, { alpha: [0.75, 0.25] })
        const ninetyDegrees = this.utils.deg2rad(90)
        Tweens.tween(currentBlock.gridCircle, 3, { rotation: [ninetyDegrees, 0] },
          undefined, 'easeOutBounce')

        const newBlock = blocks[i][j]
        Tweens.tween(newBlock, 0.15, { alpha: [0.25, 0.75] })
        Tweens.tween(newBlock.gridCircle, 3, { rotation: [0, ninetyDegrees] },
          undefined, 'easeOutElastic')
        this.glow.obj = { i, j }
    //   }
    },
    createBoundaries (currentSquare) {
      const { i } = currentSquare
      const { j } = currentSquare

      const { above } = currentSquare.block
      const { right } = currentSquare.block
      const { below } = currentSquare.block
      const { left } = currentSquare.block

      // // console(above.covered, right.covered, left.covered, below.covered)

      if (!above || above.covered) {
        this.topBorder = this.topEdge - (this.blockHeight * i)
      } else {
        this.topBorder = this.topEdge;
      }
      if (!below || below.covered) {
        this.bottomBorder = ((i + 1) * this.blockHeight) - this.topEdge
      } else {
        this.bottomBorder = this.bottomEdge
      }
      if (!right || right.covered) {
        this.rightBorder = ((j + 1) * this.blockWidth) - this.leftEdge
      } else {
        this.rightBorder = this.rightEdge
      }
      if (!left || left.covered) {
        this.leftBorder = this.leftEdge - (j * this.blockWidth)
      } else {
        this.leftBorder = this.leftEdge
      }
	
    },
    setLimits () {
     
      this.blockWidth = Config[`blockSize`][0]
      this.blockHeight = Config[`blockSize`][1]

      this.colQ = this.utils.root.grid.boards[this.utils.root.grid.gridBuild.currentBoard].c
      this.rowQ = this.utils.root.grid.boards[this.utils.root.grid.gridBuild.currentBoard].r

      this.boardWidth = this.colQ * this.blockWidth
      this.boardHeight = this.rowQ * this.blockHeight
      this.leftBorder = this.leftEdge = (this.utils.canvasWidth / 2)
      this.topBorder = this.topEdge = (this.utils.canvasHeight / 2)

      this.rightBorder = this.rightEdge = this.boardWidth - this.leftEdge

      this.bottomBorder = this.bottomEdge = this.boardHeight - this.topBorder

      this.heroCollisionDetector = {
        x: this.utils.canvasWidth / 2,
        y: this.utils.canvasHeight / 2,
        radius: 10
      }
    },
    itemHitDetect (item) {
      const globalPoint = this.gridBuild.cont.toGlobal(item)
      const ballB = {
        x: globalPoint.x,
        y: globalPoint.y,
        radius: 30
      }
      const x = this.utils.circleToCircleCollisionDetection(this.heroCollisionDetector, ballB)
      return x[0]
    },
    animate (vx, vy) {

      if (this.pause) return

     
    
      this.storeCurrent = this.currentSquare()
      this.createBoundaries(this.storeCurrent)

      this.gridBuild.cont.x -= vx; 
      if (this.gridBuild.cont.x > this.leftBorder - 35) {
        this.gridBuild.cont.x -= 35
        this.utils.root.activeAction.vx *= this.gridBuild.wallHit
      }
      if (this.gridBuild.cont.x < -this.rightBorder + 35) {
        this.gridBuild.cont.x += 35
        this.utils.root.activeAction.vx *= this.gridBuild.wallHit
      }

      this.gridBuild.cont.y -= vy
      if (this.gridBuild.cont.y > (this.topBorder - 35)) {
	
        this.gridBuild.cont.y = this.topBorder - 35;
        this.utils.root.activeAction.vy *= this.gridBuild.wallHit
      }

      if (this.gridBuild.cont.y < -this.bottomBorder + this.buffer) {

        this.gridBuild.cont.y = -this.bottomBorder + 35
        this.utils.root.activeAction.vy *= this.gridBuild.wallHit
      }
    }
  }
}
