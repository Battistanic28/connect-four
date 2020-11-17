/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// Global variables
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1;
let board = [];

// STEP 3
/** makeBoard: dynamically generate a JS model of the game board in play */
function makeBoard() {
	for (let i = 0; i < HEIGHT; i++) {
		board.push([]);
	}
	for (let i = 0; i < board.length; i++) {
		for (let j = 0; j < WIDTH; j++) {
			board[i].push(null);
		}
	}
}

// STEP 4
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
	const htmlBoard = document.getElementById('board');
	// Dynamically generate top row of game board with click event listener
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// Dynamically generate table rows consisting of data cells
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (var x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

// STEP 7
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
	for (let y = 5; y >= 0; y--) {
		if (!document.getElementById(`${y}-${x}`).hasChildNodes()) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const newDiv = document.createElement('div');
	newDiv.setAttribute('class', 'piece');
	newDiv.classList.add(`P${currPlayer}`);
	const place = document.getElementById(`${y}-${x}`);
	place.appendChild(newDiv);
}

/** endGame: announce game end */
function endGame(msg) {
	return setTimeout(function() {
		alert(msg);
	}, 100);
}

// STEP 6
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
	// get x from ID of clicked cell
	const x = +evt.target.id;
	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// STEP 5
	// place piece in board and add to HTML table
	placeInTable(y, x);
	board[y][x] = currPlayer;

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// switch players
	currPlayer = togglePlayers(currPlayer);

	// check for tie
	let isTie = board[0].every(function(val) {
		return val !== null;
	});

	if (isTie) {
		return endGame('Tie!!!');
	}
}

function togglePlayers(player) {
	if (player === 1) {
		return player + 1;
	} else {
		return (player = 1);
	}
}

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer
		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
