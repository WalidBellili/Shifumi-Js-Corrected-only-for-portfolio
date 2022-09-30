// ------------- Variables/Constantes
let round = 0
let playerScore = 0
let aiScore = 0
let playerSign
let aiSign
const signs = ["rock", "paper", "scissors"]
const animationTime = 1500

// ------------- Elements
const rockButton = document.getElementById("rock")
const paperButton = document.getElementById("paper")
const scissorsButton = document.getElementById("scissors")
const player = document.getElementById("player")
const ai = document.getElementById("ai")
const playerScoreDOM = document.getElementById("player-score")
const aiScoreDOM = document.getElementById("ai-score")
const gameHistory = document.getElementById("game-history")
const empty = document.getElementById("empty")
const score = document.getElementById("score")
const gameButtons = document.getElementsByClassName("game-buttons")
const game = document.getElementById("game")

// ------------- Events
rockButton.addEventListener("click", () => {
  handleClick("rock")
})

paperButton.addEventListener("click", () => {
  handleClick("paper")
})

scissorsButton.addEventListener("click", () => {
  handleClick("scissors")
})

// ------------- Functions
const handleClick = sign => {
  animate()

  setTimeout(() => {
    doRound(sign)
  }, animationTime - 100)
}

const doRound = sign => {
  playerSign = sign
  aiSign = chooseAiSign()
  
  displayImages()
  round = round + 1
  
  if (playerSign === "rock") {
    if (aiSign === "scissors") {
      handlePlayerWin()
    } else if (aiSign === "paper") {
      handleAiWin()
    } else {
      handleDraw()
    }
  } else if (playerSign === 'paper') {
    if (aiSign === "scissors") {
      handleAiWin()
    } else if (aiSign === "rock") {
      handlePlayerWin()
    } else {
      handleDraw()
    }
  } else if (playerSign === 'scissors') {
    if (aiSign === "rock") {
      handleAiWin()
    } else if (aiSign === "paper") {
      handlePlayerWin()
    } else {
      handleDraw()
    }
  }

  updateScore()
}

const chooseAiSign = () => {
  const index = Math.floor(Math.random() * 3)
  const sign = signs[index]
  return sign
}

const handlePlayerWin = () => {
  playerScore = playerScore + 1
  createHistoryRound("Gandalf l'emporte", "player")
}

const handleAiWin = () => {
  aiScore = aiScore + 1
  createHistoryRound("Le robot l'emporte", "ai")
}

const handleDraw = () => {
  createHistoryRound("Match vraiment nul!")
}

const createHistoryRound = (message) => {
  if (empty) {
    empty.remove()
  }

  gameHistory.innerHTML = gameHistory.innerHTML + `
    <div class="round">
      <h4>Round ${round}</h4>
      <div class="round-history">
        <div class="gandalf round-dude">
          <div class="avatar small"></div>
          <img class="sign-history" src="./images/${playerSign}-player.png" />
        </div>
        <div class="trump round-dude">
          <img class="sign-history" src="./images/${aiSign}-ai.png" />
          <div class="avatar small"></div>
        </div>
      </div>
      <h5>${message}</h5>
    <div>
  `
}

const updateScore = () => {
  playerScoreDOM.innerHTML = playerScore
  aiScoreDOM.innerHTML = aiScore

  // scroller l'historique en bas a chaque fois que l'on rajoute
  // un round
  gameHistory.scrollTop = 100000

  if (playerScore === 3) {
    game.innerHTML = `
      <h1>Shifumi</h1>

      <div class="ring">
        <div class="side gandalf">
          <div class="player">
            <div class="avatar"></div>
            <h4>Gandalf le man</h4>
          </div>
        </div>
      </div>

      <h2>Bien joué, vous avez gagné!</h2>
      <button class="game-buttons" onclick="location.reload()">Retry ?</button>
    `
  }

  if (aiScore === 3) {
    game.innerHTML = `
      <h1>Shifumi</h1>

      <div class="ring">
        <div class="side trump">
          <div class="player">
            <h4>Un robot idiot</h4>
            <div class="avatar"></div>
          </div>
        </div>
      </div>

      <h2>Le robot idiot a gagné...</h2>
      <button class="game-buttons" onclick="location.reload()">Retry ?</button>
    `
  }
}

const displayImages = () => {
  player.setAttribute("src", `./images/${playerSign}-player.png`)
  ai.setAttribute("src", `./images/${aiSign}-ai.png`)
}

const animate = () => {
  player.classList.add("sign-image-animated")
  ai.classList.add("sign-image-animated")
  disableButtons()

  setTimeout(() => {
    player.classList.remove("sign-image-animated")
    ai.classList.remove("sign-image-animated")
    enableButtons()
  }, animationTime)
}

const disableButtons = () => {
  const gamesButtonsArray = Array.from(gameButtons)

  gamesButtonsArray.forEach(button => {
    button.setAttribute("disabled", true)
  })
}

const enableButtons = () => {
  const gamesButtonsArray = Array.from(gameButtons)

  gamesButtonsArray.forEach(button => {
    button.removeAttribute("disabled")
  })
}