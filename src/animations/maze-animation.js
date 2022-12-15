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
	loaded: false,
	activeMaze: undefined,
	assets: undefined,
    init (parent, activeMaze) {
   
      this.activeMaze = activeMaze;
      this.utils.root = this
	this.utils.getWidthAndHeight();

	  let { canvasHeight: height, canvasWidth: width } = this.utils;
      const app = this.app = Assets.Application({width, height, backgroundAlpha: 0.5})


      let mazeCanvas = document.getElementById('maze-canvas');
	  mazeCanvas.width = this.utils.canvasWidth;
	  mazeCanvas.height = this.utils.canvasHeight;
	  mazeCanvas.appendChild(app.view)

      this.stage = app.stage
      this.stage.addChild(this.kingCont)

   
		const load = async () => {
			if (this.loaded) return;
			this.loaded = true;
			this.assets = await PIXI.Assets.loader.load('/ss/ss.json');
			if (this.assets) this.buildGame()
		}
		load();
		
    },
    buildGame () {

	this.grid.boards = [this.activeMaze];

      this.utils.setProperties({
        spritesheet: this.assets,
        canvasWidth: this.utils.canvasWidth,
        canvasHeight: this.utils.canvasHeight,
        app: this.app,
        root: this
      })

      Assets.init()

      this.gears.init().addToStage()

      this.clock.init().addToStage()

      this.grid.init(this.activeMaze)

    //   this.hero.init(this.kingCont)

    //   this.utils.setHero(this.hero)

      this.swim.init(this.kingCont)

    //   this.keyHandler = KeyHandler()

    //   this.keyHandler.init(this)

      this.activeAction = this.swim.addToStage()

   
    //   window.onresize = this.resize.resizeHandler.bind(this.resize)
 

      this.startGame()
	//   this.kingCont.scale.set(0.05)
    },
    startGame () {
   
        this.app.ticker.add(this.animate)
        // this.keyHandler.addToStage()
     

    //   this.hero.addToStage()
    //   LoadingAnimation.stop(this.kingCont)
    },
    stop () {
      window.onresize = undefined

      if (this.app) this.app.destroy(true)

      if (!this.isMobile && this.keyHandler) {
        this.keyHandler.removeFromStage()
      }

      Tweens.killAll()
    },
    reset () {
      this.tokens.reset()

      // this[this.activeMode].removeFromStage();

      this.grid.nextBoard()
      this.keyHandler.addToStage()

      this.fullStop = false
    },
    animate () {
    //   Tweens.animate()

    //   if (this.fullStop) return

    //   if (this.action) {
    //     if (this.rotateLeftBoolean) {
    //       this.activeAction.rotate('left')
    //     } else if (this.rotateRightBoolean) {
    //       this.activeAction.rotate('right')
    //     }
	MazeAnimation.clock.animate()
    //     this.filterAnimation.animate()
	MazeAnimation.gears.animate()
	MazeAnimation.activeAction.animate();
    //     this[this.activeMode].animate()
    //     if (this.activeMode === 'swim' || this.activeMode === 'fly') {
    //       this.grid.animate(this.activeAction.vx, this.activeAction.vy)
    //     }
    //   }
    }
}
export default MazeAnimation;