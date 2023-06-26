export default {
	// Negative.
	selfBite: new Error('Error: The snake has bitten itself.'),
	negativeScore: new Error('Error: Score cannot be negative.'),
	oppositeDirection: new Error('Error: You are trying to move in the opposite direction.'),
	gridFull: new Error('Error: No unoccupied cell is available to generate food for the snake.'),
	invalidDirection: new Error('Error: Invalid direction.'),
	ranIntoLeftWall: new Error("Error: You have hit the 'left' wall."),
	ranIntoRightWall: new Error("Error: You have hit the 'right' wall."),
	ranIntoTopWall: new Error("Error: You have hit the 'top' wall."),
	ranIntoBottomWall: new Error("Error: You have hit the 'bottom' wall."),
	corruptSnakeData: new Error('Error: Snake data is corrupt.'),
	snakeAlreadyInGameMode: new Error("Error: Snake already in 'game' mode."),
	invalidCoordinates: (i, j) => new Error(`Error: Invalid coordinates. i -> ${i}, j -> ${j}.`),
	invalidMode: (mode) => new Error(`Error: Invalid snakeSpinner mode '${mode}'.`),

	// Positive.
	foodEaten: 'Food eaten.',
};
