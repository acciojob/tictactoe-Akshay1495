document.addEventListener("DOMContentLoaded", function() {
  const player1Input = document.getElementById("player-1");
  const player2Input = document.getElementById("player-2");
  const submitButton = document.getElementById("submit");
  const message = document.querySelector(".message");
  const board = document.getElementById("board"); // Select the board element

  let currentPlayer = 1;
  let player1Name, player2Name;
  let cells = document.querySelectorAll(".cell"); // Select all cells on the board
  let boardState = ["", "", "", "", "", "", "", "", ""]; // Track the state of the board

  submitButton.addEventListener("click", function() {
    player1Name = player1Input.value;
    player2Name = player2Input.value;
    
    if (player1Name && player2Name) { // Check if both players entered their names
      message.textContent = `${player1Name}, you're up`;
      document.getElementById("players").style.display = "none"; // Hide player inputs and start button
      board.style.display = "grid"; // Display the board
    } else {
      alert("Please enter names for both players.");
    }
  });

  cells.forEach(cell => {
    cell.addEventListener("click", function() {
      const index = parseInt(cell.id) - 1;
      if (boardState[index] === "" && player1Name && player2Name) {
        if (currentPlayer === 1) {
          cell.textContent = "X";
          boardState[index] = "X";
          message.textContent = `${player2Name}, you're up`;
          currentPlayer = 2;
        } else {
          cell.textContent = "O";
          boardState[index] = "O";
          message.textContent = `${player1Name}, you're up`;
          currentPlayer = 1;
        }
        checkWin();
      }
    });
  });

  function checkWin() {
    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
        if (boardState[a] === "X") {
          message.textContent = `${player1Name} congratulations, you won!`;
        } else {
          message.textContent = `${player2Name} congratulations, you won!`;
        }
        // Change color of winning cells
        cells[a].classList.add("winning-cell");
        cells[b].classList.add("winning-cell");
        cells[c].classList.add("winning-cell");
        disableClick(); // Disable further clicks after win
        return;
      }
    }

    if (!boardState.includes("")) {
      message.textContent = "It's a draw!";
    }
  }

  function disableClick() {
    cells.forEach(cell => {
      cell.removeEventListener("click", clickHandler);
    });
  }
});
