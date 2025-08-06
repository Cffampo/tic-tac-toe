
const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],

    getBoard(){
        return this.board;
    },

    setSquare(index, marker){
        if(this.board[index] == ""){
            this.board[index] = marker;
            return true;
        }
        return false;

    },
    resetBoard(){
        for(let i = 0; i < this.board.length; i++){
            this.board[i] = "";
        }
    }
};

function createPlayers(name, marker){
    return {name, marker};
}

const scoreboard = document.querySelector(".scoreboard")

const game = {

    winCombos: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    player1: null,
    player2: null,
    player1Score: 0,
    player2Score: 0,
    currentPlayer: null,
    isGameOver: false,

    start(name1, name2){

        
        gameBoard.resetBoard();

        this.player1 = createPlayers(name1, "X");
        this.player2 = createPlayers(name2, "O");

        this.currentPlayer = this.player1
        this.isGameOver = false;

    
        scoreboard.textContent = `${this.player1.name}: 0 | ${this.player2.name}: 0`;
    },

    checkWinner(marker){
        for(let i = 0; i < this.winCombos.length; i++){
            const [a, b, c] = this.winCombos[i];
            const board = gameBoard.getBoard();
            if(board[a] == marker && board[b] == marker && board[c] == marker){
                return true
            }
        }
        return false;
    },

    checkTie(){
        const board = gameBoard.getBoard();
        const isFull = board.every(square => square != "");

        if(isFull && this.checkWinner("X") == false && this.checkWinner("O") == false){
            return true;
        }
        return false;
    },

    playRound(index){
        
        if(this.isGameOver == true){
            return;
        }

        const moveSuccessful = gameBoard.setSquare(index, this.currentPlayer.marker);
        if(!moveSuccessful){
            return;
        }
        
        if(this.checkWinner(this.currentPlayer.marker)){
            this.isGameOver = true;
            alert(this.currentPlayer.name + " wins!");
            if(this.currentPlayer == this.player1){
                this.player1Score++;
            } else {
                this.player2Score++;
            }
            scoreboard.textContent = `${this.player1.name}: ${this.player1Score} | ${this.player2.name}: ${this.player2Score}`;
        } else {
            if(this.checkTie()){
                this.isGameOver = true;
                alert("It's a tie!")
            }
        }

        const marker = this.currentPlayer.marker;
        //switches players
        if (!this.isGameOver) {
            this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
        }

        return marker;

    }
};


// Grabs the different parts of the HTML
const gameboard = document.querySelector(".gameboard");
const startForm = document.getElementById("start-form");
const button_row = document.querySelector(".button_row");


// Logic to grab the players name and starts the game once the 'Start' button is clicked
startForm.addEventListener("submit", function(e){
    e.preventDefault();
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();
    game.start(player1, player2);
    startForm.style.display = "none";
    gameboard.style.display = "grid";
    button_row.style.display = "flex";
    scoreboard.style.display = "flex";
})

const cells = document.querySelectorAll(".cell");

// Logic to add a marker to a cell once a user clicks on it
cells.forEach((cell, index) =>{
    cell.dataset.index = index;
    cell.addEventListener("click", function(e){
        const index = e.target.dataset.index;
        const marker = game.playRound(index);
        if(marker){
            cell.textContent = marker;
        }
    })
})

// Logic to reset the game board
const restartBoardButton = document.getElementById("restartBoardButton");
restartBoardButton.addEventListener("click", function(){
    gameBoard.resetBoard()
    game.isGameOver = false;
    cells.forEach((cell, index) =>{
        cell.textContent = "";
    })
})


// Logic to reset the score
const resetScoreButton = document.getElementById("resetScoreButton");
resetScoreButton.addEventListener("click", function(){
    game.player1Score = 0;
    game.player2Score = 0;
    scoreboard.textContent = `${game.player1.name}: ${game.player1Score} | ${game.player2.name}: ${game.player2Score}`;

})

