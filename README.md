# 🎮 Tic Tac Toe — A 2-Player Web Game

A sleek, interactive Tic Tac Toe game built with **HTML**, **CSS**, and **JavaScript**. This project combines modular JavaScript logic with responsive DOM manipulation to create an engaging, user-friendly experience for two players.

👉 **Live Preview**: [Play the game](https://cffampo.github.io/tic-tac-toe/)  
🔗 **Connect with me**: [LinkedIn – Carl Fampo](https://www.linkedin.com/in/carl-fampo/)

## 🚀 Features

- 🔢 **Two-player support**: Enter custom player names before starting the game.
- ❌⭕ **Dynamic game board**: Click-based interaction with visual X and O markers.
- 🧠 **Smart game logic**:
  - Win condition detection
  - Tie condition detection
  - Turn switching and input validation
- 🔁 **Game controls**:
  - Restart the board without resetting scores
  - Reset scores and start fresh
- 📱 **Responsive layout** with hover effects and clear color distinction between players.

## 🧠 How It Works

- Game state is stored in a `gameBoard` object, with a 1D array representing the board.
- The `game` object manages players, turn logic, win conditions, and scoring.
- DOM elements are updated live based on user input.
- A form collects player names and initializes the game.

## 🛠️ Built With

- **HTML5** – Semantic layout and form handling  
- **CSS3** – Clean, responsive grid and interactive styling  
- **Vanilla JavaScript (ES6+)** – Modular structure using objects and event listeners

## 🧪 Example Logic Snippet

```js
playRound(index) {
  if (this.isGameOver) return;
  const moveSuccessful = gameBoard.setSquare(index, this.currentPlayer.marker);
  if (!moveSuccessful) return;

  if (this.checkWinner(this.currentPlayer.marker)) {
    this.isGameOver = true;
    alert(this.currentPlayer.name + " wins!");
    // Update scores
  } else if (this.checkTie()) {
    this.isGameOver = true;
    alert("It's a tie!");
  }

  // Switch turns
  if (!this.isGameOver) {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
}
