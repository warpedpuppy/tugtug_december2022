import Utils from '../../utils/utils'
import Config from '../../animations-config'

const KeyHandler =  {
    utils: Utils,
    init (parent) {
      KeyHandler.parent = parent
      KeyHandler.upHit = KeyHandler.upHit.bind(KeyHandler)
      KeyHandler.downHit = KeyHandler.downHit.bind(KeyHandler)
    //   KeyHandler.rightHit = KeyHandler.rightHit.bind(KeyHandler)
      KeyHandler.leftHit = KeyHandler.leftHit.bind(KeyHandler)
      KeyHandler.spaceHit = KeyHandler.spaceHit.bind(KeyHandler)
      KeyHandler.keyRelease = this.keyRelease.bind(KeyHandler)
      KeyHandler.keyDown = KeyHandler.keyDown.bind(KeyHandler)
      KeyHandler.keyUp = KeyHandler.keyUp.bind(KeyHandler)
	  // console(KeyHandler, parent, parent.activeAction)
    },
    addToStage () {
      window.addEventListener('keydown', KeyHandler.keyDown)
      window.addEventListener('keyup', KeyHandler.keyUp)
    },
    removeFromStage () {
      window.removeEventListener('keydown', KeyHandler.keyDown.bind(KeyHandler))
      window.removeEventListener('keyup', KeyHandler.keyUp.bind(KeyHandler))
    },
    onOff (boolean) {
      if (boolean) {
        KeyHandler.addToStage()
      } else {
        KeyHandler.removeFromStage()
      }
    },
    spaceHit () {
      if (KeyHandler.parent.activeAction.jump) {
        KeyHandler.parent.activeAction.jump()
      }

      if (
        (KeyHandler.parent.activeMode === 'fly' || KeyHandler.parent.activeMode === 'swim') &&
                KeyHandler.parent.activeAction.fire) {
        KeyHandler.parent.activeAction.fire(true)
      }
    },
    upHit () {
      // KeyHandler.parent.hero.heroJump.look('up');
      KeyHandler.parent.activeAction.vx = KeyHandler.parent.activeAction.vy = 0
    },
    downHit () {
      // KeyHandler.vy = 0;
    },
    leftHit () {
      KeyHandler.parent.activeAction.spinning = true
      KeyHandler.parent.rotateLeftBoolean = true
    },
    rightHit: () => {

      KeyHandler.parent.activeAction.spinning = true
      KeyHandler.parent.rotateRightBoolean = true
    },
    keyRelease: () => {
		
      KeyHandler.parent.activeAction.spinning = false
      KeyHandler.parent.rotateLeftBoolean = false
      KeyHandler.parent.rotateRightBoolean = false
      KeyHandler.parent.idle = true

      if (
        (KeyHandler.parent.activeMode === 'fly' || KeyHandler.parent.activeMode === 'swim') &&
                KeyHandler.parent.activeAction.fire) {
        if (KeyHandler.parent.swim) KeyHandler.parent.swim.swimAction.fire(true)
        KeyHandler.parent.activeAction.fire(false)
      }
    },
    keyDown: (e) => {
      e.preventDefault()
      // // console(e.keyCode)
      switch (e.keyCode) {
        case 84:
          // the letter t
          if (Config.testing) KeyHandler.utils.root.levelCompleteHandler()
          break
        case 32:
          // space
          KeyHandler.spaceHit()
          break
        case 37:
          // left
          KeyHandler.leftHit()
          break
        case 38:
          // up
          KeyHandler.upHit()
          break
        case 39:
          // right
          KeyHandler.rightHit()
          break
        case 67:
          // the letter c for switch player
          if (Utils.root.activeMode !== 'jump' && Config.testing) KeyHandler.parent.switchPlayerWithAnimation()
          break
        case 83:
          // letter s
          if (!Config.testing) return
          if (Utils.root.activeMode === 'jump') {
            KeyHandler.utils.root.grid.gridBuild.spaceShip.classRef.blastOff()
          } else if (Utils.root.activeMode === 'bounce') {
            KeyHandler.utils.root.bounce.tokenEarn()
          }
          break
        case 40:
          break
        default:
          KeyHandler.downHit()
      }
    },
    keyUp: (e) => {
      e.preventDefault()
      KeyHandler.keyRelease();
    },
    resize () {

    },
    animate () {

    }
  
}
export default KeyHandler;