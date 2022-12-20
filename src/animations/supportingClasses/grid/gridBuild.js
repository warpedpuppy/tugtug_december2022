import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'
import Config from '../../animations-config'
import GridResizeHandler from './gridResizeHandler'
import GridItems from './items/gridItems'
import SetTileLimits from './tiles/setTileLimits'

export default function () {
  return {
    cont: Assets.ParticleContainer(10000),
    blockWidth: 0,
    blockHeight: 0,
    blocks: {},
    utils: Utils,
    colQ: 4,
    rowQ: 10,
    buffer: 10,
    tokens: [],
    tokenData: {},
    freeSpaces: [],
    coveredSpaces: [],
    currentBoard: 0,
    blockPool: [],
    gridCirclePool: [],
    spaceShip: {},
    wallHit: 0,
    transitionItemsArray: [],
    treasureChests: [],
    magicPillsArray: [],
    itemLoopingQ: 0,
    omnibusArray: [],
    flyColors: [0x5713B8, 0xFF0F59, 0x4A34FF, 0x60B800, 0x0122FA],
    shipSpace: [],
    gridResizeHandler: GridResizeHandler(),
    gridItems: GridItems(),
	activeMaze: undefined,
    init (activeMaze) {

		this.activeMaze = activeMaze;
      this.flyTexture = this.utils.spritesheet.textures['grassSquareSmall.png']
      this.whiteSquare = this.utils.spritesheet.textures['whiteTile.png']

		// this.cont = this.utils.root.kingCont;th
      return this
    },

    createObj (board) {
      const obj = {}
      for (const arr of board.walls) {
        obj[`${arr[0]}_${arr[1]}`] = 'covered'
      }
      return obj
    },
    buildGrid (data) {
      this.cont.removeChildren()
      const mode = this.utils.root.activeMode
      const obj = this.createObj(this.activeMaze)
      let counter = 0
      let b
      let gridCircle
      this.cont.scale.set(1)
      this.cont.pivot = Assets.Point(0, 0)
      this.wallHit = Config[`swimWallHit`]
      this.buffer = 200;//Config[`swimBuffer`]
      this.blockWidth = Config[`blockSize`][0]
      this.blockHeight = Config[`blockSize`][1]
      this.rowQ = data.r
      this.colQ = data.c
      this.freeSpaces = []
      this.coveredSpaces = []
      this.coinSpaces = []
      this.blocks = {}

      this.omnibusArray = []

      if (this.utils.root.all) {
        this.omnibusArray = []
      }
      for (let i = 0; i < data.r; i++) {
        this.blocks[i] = []
        for (let j = 0; j < data.c; j++) {
          if (i === 0 || j === 0 || i === data.r - 1 || j === data.c - 1) {
            obj[`${i}_${j}`] = 'covered';
          }

          const bool = obj[`${i}_${j}`] === 'covered';

          if (!this.blockPool[counter]) {

            b = Assets.Sprite()
            gridCircle = Assets.Sprite('gridCircle600.png')
            gridCircle.anchor.set(0.5)

            this.blockPool.push(b)
            this.gridCirclePool.push(gridCircle)
          } else {
            // // console("use old")
            b = this.blockPool[counter]
            gridCircle = this.gridCirclePool[counter]
          }

          b.width = this.blockWidth
          b.height = this.blockHeight
          b.covered = bool
          b.x = j * this.blockWidth
          b.y = i * this.blockHeight

          this.cont.addChild(b)

          gridCircle.width = this.blockWidth
          gridCircle.height = this.blockHeight
          gridCircle.x = j * this.blockWidth + (this.blockWidth / 2)
          gridCircle.y = i * this.blockHeight + (this.blockHeight / 2)

          let token = false
        //   if (obj[`${i}_${j}`] && obj[`${i}_${j}`].includes('token')) {
        //     const num = obj[`${i}_${j}`].slice(-1)
        //     token = true
        //     this.tokenData[num] = { x: b.x, y: b.y }
        //   }

          // store free ones
          const heroSpace = !!((String(i) === data.hero[0] && String(j) === data.hero[1]))

          if (!bool && !token && !heroSpace) {
            this.freeSpaces.push([b.x, b.y, b, i, j, gridCircle])
          }

          if (bool) {
            b.texture = this.whiteSquare
            b.alpha = 1
            this.coveredSpaces.push(b)
          } else {
            b.texture = this.whiteSquare
            b.alpha = 0.25
            b.gridCircle = gridCircle
            gridCircle.alpha = 0.25
            this.cont.addChild(gridCircle)
          }

          this.blocks[i][j] = b
          counter++
        }
      }

      if (this.utils.root.all) {
        this.spaceShip.classRef.placeShip()
        this.microscopeClass.place()
      }


      SetTileLimits.assignAboveBelowRightLeftCovered()

      this.heroJ = data.hero[0]
      this.heroI = data.hero[1]
      this.placeHero()

      this.initialPoint = { x: this.cont.x, y: this.cont.y }

      this.cont.calculatedWidth = data.cols * this.blockWidth
      this.cont.calculatedHeight = data.rows * this.blockHeight
	  this.utils.root.kingCont.addChild(this.cont)
      // this.changeBackground(this.utils.root.activeMode)
    },
    placeHero () {
      let i = this.heroJ
      let j = this.heroI
      // we know 1,1 is free, so place that beneath the hero
      i++
      j++
      const halfWidth = this.utils.canvasWidth / 2
      const halfHeight = this.utils.canvasHeight / 2
      this.cont.x = halfWidth - (j * this.blockWidth) + (this.blockWidth / 2)
      this.cont.y = halfHeight - (i * this.blockHeight) + (this.blockHeight / 2)
    }
  }
}
