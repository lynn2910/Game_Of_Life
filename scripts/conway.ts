/**
 * Represent a cell
 */
type Cell = {
    x:     number,
    y:     number,
    alive: boolean
};

/**
 * Each cell will have a size of 4px in the canvas,
 * but, inside the backend, x and y aren't multiples of 4.
 *
 * @example
 * let board = [{ x: 1, y: 2}, { x: 2, y: 2 }];
 * // They are neighbors, but in the canvas, each cell will have a size of 4
 */
const CELL_SIZE: number = 8;

/**
 * The size of the grid
 */
const GRID_SIZE: number = 30;

class ConwayGame {
    private   board:           HTMLCanvasElement;
    private   ctx:             CanvasRenderingContext2D;
    private   grid:            Cell[][];
    public    run:             boolean;
    public    generation:      number;
    public    update_interval: number
    private   was_reset:         boolean

    constructor() {
        this.board = document.querySelector("#board");
        this.board.width = this.board.height = GRID_SIZE * CELL_SIZE + GRID_SIZE;

        this.ctx = this.board.getContext("2d");

        // we fill the board with black color
        this.clear_canvas();

        // we define useful ressources
        this.run = true;
        this.generation = 0

        this.generate_grid();

        this.update_interval = 50
        this.was_reset = false
    }

    private clear_canvas() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.board.width, this.board.height)
    }

    /**
     * Generate the grid of the game
     *
     * The grid will have the size indicated in the constant `GRID_SIZE`
     * @private
     */
    public generate_grid(){
        this.grid = [];

        for (let x = 0; x < GRID_SIZE; x++) {
            let row: Cell[] = [];
            for (let y = 0; y < GRID_SIZE; y++) {
                row.push({ x, y, alive: Math.random() < 0.5 })
            }
            this.grid.push(row)
        }
    }

    public clear_grid() {
        this.grid.forEach((row) => {
            row.forEach((cell) => {
                cell.alive = false
            })
        })
    }

    /**
     * Update every cell in the game
     * @private
     */
    private update(){
        let new_grid: Cell[][] = [];

        this.grid.forEach(row => {
            let new_row: Cell[] = [];
            row.forEach(cell => {
                const new_cell: Cell = { ...cell }; // Create a copy of the cell
                let neightbors = this.get_alive_neightbors_number(cell.x, cell.y);
                if (cell.alive) {
                    if (neightbors < 2 || neightbors > 3) {
                        new_cell.alive = false
                    }
                } else {
                    if (neightbors === 3) {
                        new_cell.alive = true;
                    }
                }

                new_row.push(new_cell);
            });

            new_grid.push(new_row);
        });

        this.grid = new_grid;

        this.generation++;
    }

    /**
     * Find the number of neighbors around a coordinate
     * @param x {number}
     * @param y {number}
     * @return {number}
     *
     * @private
     */
    private get_alive_neightbors_number(x: number, y: number): number {
        let neightbors = 0;

        // horizontal && vertical
        if (x > 0 && this.grid[x - 1][y]?.alive) { neightbors++ }
        if (y > 0 && this.grid[x][y - 1]?.alive) { neightbors++ }
        if ((x < GRID_SIZE - 1) && this.grid[x + 1][y]?.alive) { neightbors++ }
        if ((y < GRID_SIZE - 1) && this.grid[x][y + 1]?.alive) { neightbors++ }

        if (neightbors > 3) return neightbors;

        // diagonals

        if ((x > 0) && (y < GRID_SIZE - 1) && this.grid[x - 1][y + 1]?.alive) { neightbors++ }
        if ((x < GRID_SIZE - 1) && (y < GRID_SIZE - 1) && this.grid[x + 1][y + 1]?.alive) { neightbors++ }
        if ((x > 0) && (y < GRID_SIZE - 1) && this.grid[x - 1][y - 1]?.alive) { neightbors++ }
        if ((x < GRID_SIZE - 1) && (y < GRID_SIZE - 1) && this.grid[x + 1][y - 1]?.alive) { neightbors++ }

        return neightbors
    }

    private update_canvas(){
        this.clear_canvas();

        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.alive) {
                    // we draw it :)
                    this.ctx.fillStyle = "#fff";
                    this.ctx.fillRect(
                        cell.x * CELL_SIZE + cell.x,
                        cell.y * CELL_SIZE + cell.y,
                        CELL_SIZE,
                        CELL_SIZE
                    )
                }
            })
        });

        this.update_generation_indicator()
    }

    public update_generation_indicator() {
        document.querySelector("#generation_counter").textContent = `Generation n°${this.generation}`;
    }

    /**
     * Run the game inside a while loop
     */
    async run_game() {
        while (this.run) {
            this.update();
            this.update_canvas();

            // we update the game every 500ms
            await wait(this.update_interval);
        }
    }
}


const wait = (ms) => new Promise((r, _) => setTimeout(() => r(true), ms));