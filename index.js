/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = dodgerLeftEdge+40

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge+20

    return (
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge) || (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge) || (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge )
      )  
      }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  // Hmmm, why would we have used `var` here?
  var top = 0
    rock.style.top = `${top}px`
    GAME.appendChild(rock)
  /**
   * Now that we have a rock, we'll need to append
   * it to GAME and move it downwards.
   */


  /**
   * This function moves the rock. (2 pixels at a time
   * seems like a good pace.)
   */
  function moveRock() {
    if (checkCollision(rock) === true){
      endGame()
    }
    else if (
      top < GAME_HEIGHT-20){
      top += 4
      rock.style.top = `${top}px`
      window.requestAnimationFrame(moveRock)
    }
    else if (
      top >= GAME_HEIGHT-20){
        GAME.removeChild(rock)
        ROCKS.shift()
      }
  }
      moveRock()
      ROCKS.push(rock)
      return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)
  for (var i = 0; i < ROCKS.length; i++){
    ROCKS[i].remove()
  }
    window.removeEventListener('keydown', moveDodger)
    window.alert('You Lose!')
}
function moveDodger(e) {
  if (e.which === LEFT_ARROW){
    e.stopPropagation()
    e.preventDefault()
    moveDodgerLeft()
  }
  else if (
    e.which === RIGHT_ARROW){
      e.stopPropagation()
      e.preventDefault()
      moveDodgerRight()
    }
  
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
}

function moveDodgerLeft() {
window.requestAnimationFrame(function(){
var leftNumbers = DODGER.style.left.replace('px','') 
var left = parseInt(leftNumbers, 10)
if (left > 0){
  DODGER.style.left = `${left - 4}px`
}
})
}

function moveDodgerRight() {
window.requestAnimationFrame(function(){
  var rightNumbers = DODGER.style.left.replace('px','')
  var left = parseInt(rightNumbers, 10)
if (left < GAME_WIDTH-40){
  DODGER.style.left = `${left + 4}px`
}
})
  /**
   * This function should move DODGER to the right
   * (mabye 4 pixels?). Use window.requestAnimationFrame()!
   */
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
