let gameState = {
    board: defaultBoard(),
    apple: [7, 8],
    snake: {
      body: [ [10, 4], [10, 5], [10, 6], [10, 7] ],
      nextDirection: [-1, 0] 
    },
intervalID : 0,
}
let appleY = gameState.apple[0];
let appleX = gameState.apple[1];

function defaultBoard(){
    return [
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
  
  ]
};

function hideStart(){
    if (gameState.intervalID !== null){
    $('.start-button').css('display', 'none')
    }
}
function startGame(){
    gameState.intervalID = setInterval(tick, 1000/2); 
    hideStart()    
}

$('.start-button').click(startGame)

function reStart(){
    location.reload()
    
}
$('.restart-button').click(reStart)

function score(){
    const score = gameState.snake.body.length
    console.log(gameState.snake.body.length)
    $("#score").append(score)
}

function endGame(){
    score()
    $('#messages').append('Game Over!!')
    clearInterval(gameState.intervalID)     
};

function renderBoard() {
const board = $('#board');
    board.empty();
    gameState.board.forEach(function(row, y){
      row.forEach(function(cell, x){
        const cellElement = $(`<div class="cell" data-y= "${y}" data-x= "${x}"></div>`);
        if(cell === 'snake'){
        cellElement.css('background-color', '#00cc99')
    } else if(cell === 'apple'){
        cellElement.css('background-color', '#cc6699')
        } 
        board.append(cellElement)
        })
    })
}

function addSnakeToBoard() {
    gameState.board= defaultBoard()
        for(let i=0; i< gameState.snake.body.length; ++i){
        let segment = gameState.snake.body[i];   
        const y = segment[0];
        const x = segment[1];
        if (gameState.board[y]){
        gameState.board[y][x] = 'snake';
        }
    }
}
function addAppleToBoard() {
    gameState.board[appleY][appleX]= 'apple';
}
function moveApple (){
    if (gameState.snake.body !== 'apple'){
    appleY = Math.floor(Math.random() * 20);
    appleX= Math.floor(Math.random() * 20);
    }
}
function boardCollision(){
    const head = gameState.snake.body[0];
    const headY = head[0];
    const headX = head[1];
    const dY = headY + gameState.snake.nextDirection[0];
    const dX = headX + gameState.snake.nextDirection[1];
    if(gameState.board[dY] && gameState.board[dY][dX] === 'snake'){
        endGame();
    }
  else if ((gameState.board[dY] && gameState.board[dY][dX])=== undefined){
        endGame()}
  }
function moveSnake(){
    const head = gameState.snake.body[0];
    const headY = head[0];
    const headX = head[1];
    const dY = headY + gameState.snake.nextDirection[0];
    const dX = headX + gameState.snake.nextDirection[1];
    boardCollision()
   if (gameState.board[dY] && gameState.board[dY][dX] === 'apple'){
        gameState.snake.body.unshift([dY, dX])
        moveApple()
    } else {
        gameState.snake.body.pop()
        gameState.snake.body.unshift([dY, dX])
    }
}
      
function changeDirection(event){
    
    let key = event.key;
    if (key === 'ArrowLeft' && gameState.snake.nextDirection[1] !== 1) {
        gameState.snake.nextDirection = [0, -1]
    }
    if (key === 'ArrowDown' && gameState.snake.nextDirection[0] !== -1){
        gameState.snake.nextDirection = [1, 0]
    }
    if (key === 'ArrowRight' && gameState.snake.nextDirection[1] !== -1) { 
        gameState.snake.nextDirection = [0, 1]
    }
    if (key === 'ArrowUp' && gameState.snake.nextDirection[0] !== 1){ 
        gameState.snake.nextDirection = [-1, 0]
    }
}
  
$('body').keydown(changeDirection);  

function tick(){
    addSnakeToBoard()
    addAppleToBoard()
    moveSnake()
    renderBoard()     
}


addSnakeToBoard();
addAppleToBoard()
renderBoard();