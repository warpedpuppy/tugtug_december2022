import Utils from './utils/utils'
import Assets from './utils/assetCreation'
import Tweens from './utils/Tweens'
import Clock from './supportingClasses/universal/clock'
import Swim from './supportingClasses/maze'
import Gears from './supportingClasses/universal/gears'
import Hero from './supportingClasses/maze/hero'
import Config from './animations-config'
import KeyHandler from './supportingClasses/universal/keyHandler'
import Grid from './supportingClasses/grid/gridIndex'
import Resize from './supportingClasses/maze/resize'
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
	rotateLeftBoolean: false, 
	rotateRightBoolean: false,
	mazeCanvas: undefined,
    init (activeMaze) {

			this.activeMaze = activeMaze;
			this.utils.root = this
			this.utils.getWidthAndHeight();

		
			let { canvasHeight: height, canvasWidth: width } = this.utils;
			this.app = Assets.Application({width, height, backgroundAlpha: 1})
			this.mazeCanvas = document.getElementById('maze-canvas');
			this.mazeCanvas.width = this.utils.canvasWidth;
			this.mazeCanvas.height = this.utils.canvasHeight;
			this.mazeCanvas.appendChild(this.app.view)
			this.stage = this.app.stage
			this.stage.addChild(this.kingCont)
		





		const load = async () => {
			this.loaded = true;
			try {
				this.assets = await PIXI.Assets.loader.load('/ss/ss.json');
				if (this.assets) this.buildGame()
			} catch (e) {
				
			}
			
		}
		if (!this.loaded) {load();} else this.resetGame();
		

    },
    buildGame () {
		console.log("BUILD GAME", this.activeMaze, this.assets)
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

      this.hero.init(this.kingCont)
      this.utils.setHero(this.hero)
      this.swim.init(this.kingCont)
      this.keyHandler = KeyHandler
      this.activeAction = this.swim.addToStage()
	  this.keyHandler.init(this)
      window.onresize = this.resize.resizeHandler.bind(this.resize)
      this.startGame()
    },
	resetGame () {

		this.grid.boards = [this.activeMaze];

		this.stage.addChild(this.kingCont)
		this.gears.addToStage();
		this.clock.init().addToStage();
		this.activeAction = this.swim.addToStage()
		this.keyHandler.init(this);
		this.hero.init(this.kingCont)
		this.utils.setHero(this.hero)
		this.grid.init(this.activeMaze)
		this.startGame()
	},
    startGame () {
   
		this.app.ticker.add(this.animate)
		this.keyHandler.addToStage()
		this.hero.addToStage();
    },
    stop () {
      window.onresize = undefined
	  this.stage.removeChildren();
	  this.kingCont.removeChildren();
	  this.gears.removeFromStage();
	  this.hero.removeFromStage();
		this.swim.removeFromStage();
	this.grid.removeFromStage();
	this.keyHandler.removeFromStage();
      this.clock.removeFromStage()
      this.app.destroy();
      Tweens.killAll()
    },
    reset () {


      // this[this.activeMode].removeFromStage();

      this.grid.nextBoard()
      this.keyHandler.addToStage()

      this.fullStop = false
    },
    animate () {
		Tweens.animate()
		if (MazeAnimation.rotateLeftBoolean) {
			MazeAnimation.activeAction.rotate('left')
		} else if (MazeAnimation.rotateRightBoolean) {
			MazeAnimation.activeAction.rotate('right')
		}
		MazeAnimation.clock.animate()
		MazeAnimation.gears.animate()
		MazeAnimation.swim.animate();
		MazeAnimation.grid.animate(MazeAnimation.activeAction.vx, MazeAnimation.activeAction.vy)
    }
}
export default MazeAnimation;