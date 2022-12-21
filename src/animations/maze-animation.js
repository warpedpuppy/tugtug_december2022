import Utils from './utils/utils';
import Assets from './utils/assetCreation';
import Tweens from './utils/Tweens';
import Clock from './supportingClasses/universal/clock';
import Maze from './supportingClasses/maze';
import Gears from './supportingClasses/universal/gears';
import Hero from './supportingClasses/maze/hero';
import KeyHandler from './supportingClasses/universal/keyHandler';
import Grid from './supportingClasses/grid/gridIndex';
import Resize from './supportingClasses/maze/resize';

const MazeAnimation = {
    gears: Gears(),
    clock: Clock(),
    hero: Hero(),
	maze: Maze(),
    grid: Grid(),
    utils: Utils,
    loader: Assets.Loader(),
    activeAction: undefined,
    kingCont: Assets.Container(),
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
			try {
				this.assets = await PIXI.Assets.loader.load('/ss/ss.json');
				if (this.assets) {this.loaded = true; this.buildGame(); }
			} catch (e) {
				// do something here 
			}
		}
		if (!this.loaded) { load(); } else { this.resetGame(); }
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

      this.gears.init().addToStage();
      this.clock.init().addToStage();
      this.grid.init(this.activeMaze);
      this.hero.init(this.kingCont);
      this.utils.setHero(this.hero);
      this.maze.init(this.kingCont);
      this.keyHandler = KeyHandler;
      this.activeAction = this.maze.addToStage();
	  this.keyHandler.init(this);
     
      this.startGame();

	  window.onresize = this.resize.resizeHandler.bind(this.resize)
    },
	resetGame () {
		this.grid.boards = [this.activeMaze];
		this.stage.addChild(this.kingCont)
		this.gears.addToStage();
		this.clock.init().addToStage();
		this.activeAction = this.maze.addToStage()
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
		this.maze.removeFromStage();
		this.grid.removeFromStage();
		this.keyHandler.removeFromStage();
		this.clock.removeFromStage()
		this.app.destroy();
		Tweens.killAll()
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
		MazeAnimation.maze.animate();
		MazeAnimation.grid.animate(MazeAnimation.activeAction.vx, MazeAnimation.activeAction.vy)
    }
}
export default MazeAnimation;