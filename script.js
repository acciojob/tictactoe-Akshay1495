//your JS code here. If required.
const playerInput = document.getElementById('player-input');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const gameBoard = document.getElementById('game-board');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer;
    let player1;
    let player2;
    let gameOver = false;

    // Start the game when submit button is clicked
    submitButton.addEventListener('click', startGame);

    function startGame() {
      player1 = player1Input.value;
      player2 = player2Input.value;
      currentPlayer = player1;
      playerInput.style.display = 'none';
      gameBoard.style.display = 'block';
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }

    // Handle cell clicks
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    function handleCellClick(e) {
      if (gameOver || e.target.textContent !== '\xa0') return;

      e.target.textContent = currentPlayer === player1 ? 'x' : 'o';
      checkWinner();
      if (!gameOver) {
        togglePlayer();
      }
    }

    // Toggle between players
    function togglePlayer() {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }

    // Check for a winner
    function checkWinner() {
      const winningCombos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7]              // Diagonals
      ];

      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        const cellA = document.getElementById(a).textContent;
        const cellB = document.getElementById(b).textContent;
        const cellC = document.getElementById(c).textContent;

        if (cellA !== '\xa0' && cellA === cellB && cellB === cellC) {
          messageDiv.textContent = `${currentPlayer} congratulations you won!`;
          highlightCells(combo);
          gameOver = true;
          return;
        }
      }

      if ([...cells].every(cell => cell.textContent !== '\xa0')) {
        messageDiv.textContent = "It's a draw!";
        gameOver = true;
      }
    }

    // Highlight winning cells
    function highlightCells(combo) {
      combo.forEach(cellId => {
        document.getElementById(cellId).classList.add('highlight');
      });
    }