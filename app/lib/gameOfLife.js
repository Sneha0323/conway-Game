export const createGrid = (rows, cols) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    grid.push(Array(cols).fill(0));
  }
  return grid;
};

export const cloneGrid = (grid) => {
  return grid.map(row => [...row]);
};

export const getNextState = (grid) => {
  const nextGrid = cloneGrid(grid);
  const rows = grid.length;
  const cols = grid[0].length;

  const getLiveNeighbors = (grid, x, y) => {
    const neighbors = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    return neighbors.reduce((acc, [dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        return acc + grid[newX][newY];
      }
      return acc;
    }, 0);
  };

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const liveNeighbors = getLiveNeighbors(grid, i, j);

      if (grid[i][j] === 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          nextGrid[i][j] = 0;
        }
      } else {
        if (liveNeighbors === 3) {
          nextGrid[i][j] = 1;
        }
      }
    }
  }

  return nextGrid;
};
