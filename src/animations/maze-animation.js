import Utils from './utils/utils'
import Assets from './utils/assetCreation'
import Tweens from './utils/Tweens'
import Clock from './supportingClasses/universal/clock'
import Swim from './supportingClasses/swim/indexSwim'
import Gears from './supportingClasses/universal/gears'
import Hero from './supportingClasses/swim/heroSwim'
import Config from './animations-config'
import KeyHandler from './supportingClasses/universal/keyHandler'
import Grid from './supportingClasses/grid/gridIndex'
import Resize from './supportingClasses/swim/swimResize'
import MazeServices from '../services/maze-service'
import DefaultMaze from '../defaults/DefaultMaze'

const MazeAnimation = {
    activeModeIndex: 0,
    activeMode: undefined,
    action: true,
    gears: Gears(),
    clock: Clock(),
    hero: Hero(),
    utils: Utils,
    loader: Assets.Loader(),
    activeAction: undefined,
    swim: Swim(),
    grid: Grid(),
    dbData: {},
    storeAction: true,
    timeOut: undefined,
    fullStop: false,
    kingCont: Assets.Container(),
    frame: Assets.Graphics(),
    kingContBackground: Assets.Graphics(),
    resize: Resize(),
    init (parent) {
   
      
      this.utils.root = this

      const app = this.app = Assets.Application(
        this.utils.canvasWidth,
        this.utils.canvasHeight,
        true
      )
      document.getElementById('maze-canvas').appendChild(app.view)
      this.stage = app.stage
      this.stage.addChild(this.kingCont)

    //   if (!this.loader.resources['/ss/ss.json']) {
	async function load(){
		// console.log(PIXI)
			const asset = await PIXI.Assets.loader.load('/ss/ss.json');
			console.log(asset);
		}
	load();
		// console.log(this.loader)
        // this.loader.load(['/ss/ss.json'])
		// this.loader.onProgress()
		// .then(() => console.log('load complete'))
    //   } else {
        // this.loadDB()
    //   }
    },
    async loadDB () {
      try {
        const res = await MazeServices.getOneMaze(this.id)
        if (res.result && res.result === "none") {
          this.grid.boards = [...this.grid.boards, ...DefaultMaze]
        } else {
           this.grid.boards = [...this.grid.boards, ...res]
        }
      } catch (e) {
        this.grid.boards = [...this.grid.boards, ...DefaultMaze]
      }
      this.buildGame()
    },
    buildGame () {
      const { spritesheet } = this.loader.resources['/ss/ss.json']

      this.utils.setProperties({
        spritesheet,
        canvasWidth: this.utils.canvasWidth,
        canvasHeight: this.utils.canvasHeight,
        app: this.app,
        root: this
      })

      Assets.init()

      this.gears.init().addToStage()

      this.clock.init().addToStage()

      this.tokens.init()

      this.grid.init()

      this.hero.init(this.kingCont)

      if (this.isMobileOnly) {
        this.hero.cont.scale.set(Config.mobileOnlyScalingSwim)
      }

      this.utils.setHero(this.hero)

      this.filterAnimation.init(this.filterContainer)

      this.swim.init(this.kingCont)

      this.keyHandler = KeyHandler()

      this.keyHandler.init(this)

      this.activeAction = this[this.activeMode].addToStage()

      if (this.isMobile) {
        this.controlPanel.init(this)
        this.controlPanel.addToStage()
      }

      if (this.isMobile) {
        // mobile
        this.orientationChange.init(this)
      } else {
        window.onresize = this.resize.resizeHandler.bind(this.resize)
      }

      this.startGame()
    },
    startGame () {
      if (!this.isMobile) {
        this.app.ticker.add(this.animateDesktopIpad)
        this.keyHandler.addToStage()
      } else {
        this.app.ticker.add(this.animateMobile)
      }

      if (Config.testingJump) {
        this.makeJumpActive()
      }
      if (this.showFPS) this.app.stage.addChild(this.fpsCounter)
      // this.animations.circles({start: true, expand: true});

      this.hero.addToStage()
      LoadingAnimation.stop(this.kingCont)
    },
    stop () {
      window.onresize = undefined

      if (this.app) this.app.destroy(true)

      if (!this.isMobile && this.keyHandler) {
        this.keyHandler.removeFromStage()
      }

      Tweens.killAll()
    },
    earnToken (t) {
      this.action = false
      this.tokens.fillSlot(t)
      setTimeout(this.resumePlayAfterEarnToken.bind(this), 2000)
    },
    resumePlayAfterEarnToken () {
      // this.tokens.clearText();
      this.action = true
    },
    startSpaceShipJourney () {
      this.storeActiveMode = this.activeMode
      this.hero.cont.visible = false
      this.activeAction.vx = this.activeAction.vy = 0
      this.grid.gridAction.pause = true
      this[this.activeMode].startSpaceShipJourney()
    },
    endSpaceShipJourney () {
      this.jump.removeFromStage()

      this.switchPlayer(this.storeActiveMode)

      this.grid.gridBuild.placeHero()

      this.grid.gridBuild.cont.addChild(this.grid.gridBuild.spaceShip)

      this.grid.gridAction.pause = false

      this.activeAction.vx = this.activeAction.vy = 0

      this.activeAction.radius = this.activeAction.storeRadius = 0

      this[this.activeMode].endSpaceShipJourney()
    },
    makeJumpActive () {
      this.jump.jumpBackground.pause = false
      this.jump.jumpAction.pause = false
      this.hero.cont.visible = true
      // this.ship.parent.removeChild(this.ship);

      this.switchPlayer('jump')
      this.jump.jumpBackground.setUp()

      if (Config.testingJump) {
        const background = this.utils.root.jump.jumpBackground.orbsCont
        background.scale.set(1)
        this.jump.addToStage()
      }
    },
    reset () {
      this.tokens.reset()

      // this[this.activeMode].removeFromStage();

      this.grid.nextBoard()
      this.keyHandler.addToStage()

      this.fullStop = false
    },
    filterTest () {
      this.filterAnimation.filterToggle()
    },
    animateMobile () {
      this.orientationChange.animate()
      this.animate()
    },
    animateDesktopIpad () {
      this.animate()
    },
    levelCompleteHandler () {
      this.levelComplete.boardComplete()
    },
    animate () {
      Tweens.animate()

      if (this.fullStop) return

      if (this.action) {
        if (this.rotateLeftBoolean) {
          this.activeAction.rotate('left')
        } else if (this.rotateRightBoolean) {
          this.activeAction.rotate('right')
        }
        this.clock.animate()
        this.filterAnimation.animate()
        this.gears.animate()
        // this.activeAction.animate();
        this[this.activeMode].animate()
        if (this.activeMode === 'swim' || this.activeMode === 'fly') {
          this.grid.animate(this.activeAction.vx, this.activeAction.vy)
        }
      }
    }
}
export default MazeAnimation;