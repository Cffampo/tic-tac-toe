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

    player1: null,
    player2: null,
    currentPlayer: null,
    isGameOver: false,

    start(name1, name2){
        gameBoard.resetBoard();

        this.player1 = createPlayers(name1, "X");
        this.player2 = createPlayers(name2, "O");

        this.currentPlayer = this.player1

        let isGameOver = false;
    }

};