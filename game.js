import { SNAKE_SPEED, update as updateSnake, draw as drawSnake } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { getSnakeHead, snakeIntersection } from './snake.js'

let lastRender = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime)
{
    if (gameOver)
    {
        if (confirm('You lost. Press OK to restart.'))
        {
            window.location = '/'
        }
        return
    }
    window.requestAnimationFrame(main)
    if ((currentTime - lastRender) / 1000 < 1 / SNAKE_SPEED) return
    lastRender = currentTime
    draw()
    update()
    

}

window.requestAnimationFrame(main)

function update()
{
    updateSnake()
    updateFood()
    checkDeath()
}

function draw()
{
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath()
{
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}