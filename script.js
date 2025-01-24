// 2D-array for game board
let board;

// Determines which player's turn
let redTurn = true;
let gamePlaying = true;

// For reset button to 
document.getElementById('reset').addEventListener('click', setup);

// Setup the game
function setup() {
  redTurn = true;
  gamePlaying = true;
  board = Array(7).fill(null).map(() => Array(6).fill(null));
  displayBoard();
}

// Genereate 7 columns with 6 rows to be displayed. Number each column. Display after.
function displayBoard() {
  let boardDisplay = ''; // To contain HTML for board

  for (let i = 0; i < board.length; i++) {
    let columnContent = '';
    for( let j = 0; j < board[i].length; j++) {
      let cellContent = '';
      if (board[i][j] !== null) {
        cellContent = `<div class=${board[i][j]}></div>`;
      }
      columnContent += `<div class="cell">${cellContent}</div>`;
    }
    boardDisplay += `<div class="column" id="${i}">${columnContent}</div>`;
  }

  // Display on DOM
  document.getElementById('board-container').innerHTML = boardDisplay;

  // Each column needs a click action listener for a move
  const allColumns = document.getElementsByClassName('column');

  for(let i = 0; i < allColumns.length; i++) {
    allColumns[i].addEventListener('click', makeMove);
  }
}
  
function makeMove(event) {
  // Determines what color to place
  const coin = redTurn ? 'red' : 'yellow';
  // Get id of column clicked on; causes problems if not converted to number
  const columnID = Number(event.currentTarget.id);
  let rowID;
  
  // Return if column is full
  if (board[columnID][0] !== null) {
    return;
  }

  for (let i = board[columnID].length - 1; i >= 0; i--) {
    if (board[columnID][i] === null) {
      board[columnID][i] = coin;
      rowID = i;
      redTurn = !redTurn;
      break;
    }
  }

  // Now check if there are four in a line
  if (gamePlaying) {
    checkWin(columnID, rowID, coin);
  }
};

// checks if there are four in a line
function checkWin(column, row, color) {
  displayBoard();
  console.log(`${column} ${row} ${color}`);

  let x = column - 1;
  let y = row;
  // For checking how many of the same color are in a line
  let lineCount = 1;
/* The while loop below checks each direction, first left then right for a
  horizontal win. Then down for a verticle win, then top-left to bottom-right,
  then bottom-left to top-right for a diagonal. I will likely use switch statement
  in place of if statements but I'm looking for a way to simplify and refactor the
  code.
*/  
  let checking = 'left';
  while (checking !== null) { 
    console.log(`line count: ${lineCount}`);
    if (checking === 'left') {
      console.log(`now checking: ${x}, ${y}`)
      if (x < 0 || board[x][y] !== color) {
        // Start checking right
        console.log('checking left and no');
        x = column + 1;
        checking = 'right';
      } else {
        console.log('checking left and yes');
        x--;
        lineCount++;
      }
    }
    
    if (checking === 'right') {
      console.log(`now checking: ${x}, ${y}`)
      if (x > 6 || board[x][y] !== color) {
        // Start checking up and reset lineCount
        console.log('checking right and no');
        x = column;
        y = row + 1;
        checking = 'down';
        lineCount = 1;
      } else {
        console.log('checking right and yes');
        x++;
        lineCount++;
      }
    }

    if (checking === 'down') {
      console.log(`now checking: ${x}, ${y}`)
      if (y > 5 || board[x][y] !== color) {
        // Start checking top-left and reset lineCount
        console.log('checking down and no');
        x = column - 1;
        y = row - 1;
        checking = 'top-left';
        lineCount = 1;
      } else {
        console.log('checking down and yes');
        y++;
        lineCount++;
      }
    }

    if (checking === 'top-left') {
      console.log(`now checking: ${x}, ${y}`)
      if (x < 0 || y < 0 || board[x][y] !== color) {
        // Start checking bottom-right
        console.log('checking top-left and no');
        x = column + 1;
        y = row + 1;
        checking = 'bottom-right';
      } else {
        console.log('checking top-left and yes');
        x--;
        y--;
        lineCount++;
      }
    }

    if (checking === 'bottom-right') {
      console.log(`now checking: ${x}, ${y}`)
      if (x > 6 || y > 5 || board[x][y] !== color) {
        // Start checking bottom-left and reset lineCount
        console.log('checking bottom-right and no');
        x = column - 1;
        y = row + 1;
        checking = 'bottom-left';
        lineCount = 1;
      } else {
        console.log('checking bottom-right and yes');
        x++;
        y++;
        lineCount++;
      }
    }

    if (checking === 'bottom-left') {
      console.log(`now checking: ${x}, ${y}`)
      if (x < 0 || y > 5 || board[x][y] !== color) {
        // Start checking top-right
        console.log('checking bottom-left and no');
        x = column + 1;
        y = row - 1;
        checking = 'top-right';
      } else {
        console.log('checking bottom-left and yes');
        x--;
        y++;
        lineCount++;
      }
    }

    if (checking === 'top-right') {
      console.log(`now checking: ${x}, ${y}`)
      if (x > 6 || y < 0 || board[x][y] !== color) {
        // Stop checking
        console.log('checking top-right and no');
        checking = null;
      } else {
        console.log('checking top-right and yes');
        x++;
        y--;
        lineCount++;
      }
    }

    if (lineCount === 4) {
      console.log(`line count: ${lineCount}`)
      alert('win');
      gamePlaying = false;
      checking = null;
    }
  }
}