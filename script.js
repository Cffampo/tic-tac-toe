
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
        return this.board;
    }
};

function createPlayers(name, marker){
    return {name, marker};
}

const game = {

    winCombos: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
    player1: null,
    player2: null,
    currentPlayer: null,
    isGameOver: false,

    start(name1, name2){
        gameBoard.resetBoard();

        this.player1 = createPlayers(name1, "X");
        this.player2 = createPlayers(name2, "O");

        this.currentPlayer = this.player1
        this.isGameOver = false;
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
        } else {
            if(this.checkTie()){
                this.isGameOver = true;
                alert("It's a tie!")
            }
        }

        //switches players
        if (!this.isGameOver) {
            this.currentPlayer = (this.currentPlayer === this.player1) ? this.player2 : this.player1;
        }
    }
};

const gameboard = document.querySelector(".gameboard");
const startForm = document.getElementById("start-form");
startForm.addEventListener("submit", function(e){
    e.preventDefault();
    const player1 = document.getElementById("player1").value.trim();
    const player2 = document.getElementById("player2").value.trim();
    game.start(player1, player2);
    startForm.style.display = "none";
    gameboard.style.display = "grid";
})

