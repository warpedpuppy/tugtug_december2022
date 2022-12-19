import Assets from '../../utils/assetCreation'
import Utils from '../../utils/utils'

export default function () {
  return {
    cont: Assets.Container(),
    dists: [0, 40, 35, 30, 23],
    airBubbles: [],
    fish: [],
    pos: [],
    utils: Utils,
    init (parentCont) {
      this.parentCont = parentCont;
	  let circle = Assets.Graphics();
	  circle.beginFill(0xDE3249, 1);
	  circle.drawCircle(0, 0, 50);
	  circle.endFill();
	  this.cont.addChild(circle);

	  let circle2 = Assets.Graphics();
	  circle2.beginFill(0x000000, 1);
	  circle2.drawCircle(0, -30, 10);
	  circle2.endFill();
	  this.cont.addChild(circle2);

      this.activeHero = this
    },
    addToStage () {
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
      this.parentCont.addChild(this.cont)
    },
    removeFromStage () {
      this.parentCont.removeChild(this.cont)
    },
    resize () {
      this.cont.x = this.utils.canvasWidth / 2
      this.cont.y = this.utils.canvasHeight / 2
    },
    animate () {

    }
  }
}
