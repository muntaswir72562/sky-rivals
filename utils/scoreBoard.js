const scoreBoard = (score, highScore) => {
document.querySelector('.game-over-wrapper').style.display = "block"
document.querySelector('#totalScore').innerHTML=score
document.querySelector('#hScore').innerHTML=highScore

}