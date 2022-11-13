class Cell {
	constructor(x, y, dist, path) {
		this.x = x;
		this.y = y;
		this.dist = dist;
		this.path = path;
	}
}

const knightOffsets = [
	[-1, 2],
	[-2, 1],
	[-1, -2],
	[-2, -1],
	[1, 2],
	[1, -2],
	[2, 1],
	[2, -1],
];

function createBoard() {
	const board = [];
	for (let i = 0; i < 8; i++) {
		board.push(new Array(8).fill(false));
	}
	return board;
}

function inBoard(x, y) {
	return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function generatePossibleMoves(position) {
	const possibleMoves = [];
	knightOffsets.forEach((offset) => {
		if (inBoard(position[0] + offset[0], position[1] + offset[1])) {
			possibleMoves.push([
				position[0] + offset[0],
				position[1] + offset[1],
			]);
		}
	});
	return possibleMoves;
}

function show(moves, path) {
	console.log(`You made it in ${moves} moves!  Here's your path:`);
	path.forEach((pos) => {
		console.log(pos);
	});
}

function bst(start, end, board) {
	const queue = [];
	queue.push(new Cell(start[0], start[1], 0, [start]));

	while (queue.length !== 0) {
		const currentNode = queue.shift();
		board[currentNode.x][currentNode.y] = true;

		if (end[0] === currentNode.x && end[1] === currentNode.y)
			return currentNode;

		const possibleMoves = generatePossibleMoves([
			currentNode.x,
			currentNode.y,
		]);
		possibleMoves.forEach((move) => {
			if (board[move[0]][move[1]] === false) {
				queue.push(
					new Cell(move[0], move[1], currentNode.dist + 1, [
						...currentNode.path,
						[move[0], move[1]],
					])
				);
			}
		});
	}
}
const start = [3, 3];
const end = [4, 3];
const board = createBoard();
const moves = bst(start, end, board);
show(moves.dist, moves.path);
