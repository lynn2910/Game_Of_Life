var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Each cell will have a size of 4px in the canvas,
 * but, inside the backend, x and y aren't multiples of 4.
 *
 * @example
 * let board = [{ x: 1, y: 2}, { x: 2, y: 2 }];
 * // They are neighbors, but in the canvas, each cell will have a size of 4
 */
const CELL_SIZE = 8;
/**
 * The size of the grid
 */
const GRID_SIZE = 30;
class ConwayGame {
    constructor() {
        this.board = document.querySelector("#board");
        this.board.width = this.board.height = GRID_SIZE * CELL_SIZE + GRID_SIZE;
        this.ctx = this.board.getContext("2d");
        // we fill the board with black color
        this.clear_canvas();
        // we define useful resources
        this.run = true;
        this.generation = 0;
        this.generate_grid();
        this.update_interval = 50;
        this.was_reset = false;
    }
    clear_canvas() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.board.width, this.board.height);
    }
    /**
     * Generate the grid of the game
     *
     * The grid will have the size indicated in the constant `GRID_SIZE`
     * @private
     */
    generate_grid() {
        this.grid = [];
        for (let x = 0; x < GRID_SIZE; x++) {
            let row = [];
            for (let y = 0; y < GRID_SIZE; y++) {
                row.push({ x, y, alive: Math.random() < 0.5 });
            }
            this.grid.push(row);
        }
    }
    clear_grid() {
        this.grid.forEach((row) => {
            row.forEach((cell) => {
                cell.alive = false;
            });
        });
    }
    /**
     * Update every cell in the game
     * @private
     */
    update() {
        let new_grid = [];
        this.grid.forEach(row => {
            let new_row = [];
            row.forEach(cell => {
                const new_cell = Object.assign({}, cell); // Create a copy of the cell
                let neightbors = this.get_alive_neightbors_number(cell.x, cell.y);
                if (cell.alive) {
                    if (neightbors < 2 || neightbors > 3) {
                        new_cell.alive = false;
                    }
                }
                else {
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
    get_alive_neightbors_number(x, y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        let neightbors = 0;
        // horizontal && vertical
        if (x > 0 && ((_a = this.grid[x - 1][y]) === null || _a === void 0 ? void 0 : _a.alive)) {
            neightbors++;
        }
        if (y > 0 && ((_b = this.grid[x][y - 1]) === null || _b === void 0 ? void 0 : _b.alive)) {
            neightbors++;
        }
        if ((x < GRID_SIZE - 1) && ((_c = this.grid[x + 1][y]) === null || _c === void 0 ? void 0 : _c.alive)) {
            neightbors++;
        }
        if ((y < GRID_SIZE - 1) && ((_d = this.grid[x][y + 1]) === null || _d === void 0 ? void 0 : _d.alive)) {
            neightbors++;
        }
        if (neightbors > 3)
            return neightbors;
        // diagonals
        if ((x > 0) && (y < GRID_SIZE - 1) && ((_e = this.grid[x - 1][y + 1]) === null || _e === void 0 ? void 0 : _e.alive)) {
            neightbors++;
        }
        if ((x < GRID_SIZE - 1) && (y < GRID_SIZE - 1) && ((_f = this.grid[x + 1][y + 1]) === null || _f === void 0 ? void 0 : _f.alive)) {
            neightbors++;
        }
        if ((x > 0) && (y < GRID_SIZE - 1) && ((_g = this.grid[x - 1][y - 1]) === null || _g === void 0 ? void 0 : _g.alive)) {
            neightbors++;
        }
        if ((x < GRID_SIZE - 1) && (y < GRID_SIZE - 1) && ((_h = this.grid[x + 1][y - 1]) === null || _h === void 0 ? void 0 : _h.alive)) {
            neightbors++;
        }
        return neightbors;
    }
    update_canvas() {
        this.clear_canvas();
        this.grid.forEach(row => {
            row.forEach(cell => {
                if (cell.alive) {
                    // we draw it :)
                    this.ctx.fillStyle = "#fff";
                    this.ctx.fillRect(cell.x * CELL_SIZE + cell.x, cell.y * CELL_SIZE + cell.y, CELL_SIZE, CELL_SIZE);
                }
            });
        });
        this.update_generation_indicator();
    }
    update_generation_indicator() {
        document.querySelector("#generation_counter").textContent = `Generation n°${this.generation}`;
    }
    /**
     * Run the game inside a while loop
     */
    run_game() {
        return __awaiter(this, void 0, void 0, function* () {
            while (this.run) {
                this.update();
                this.update_canvas();
                // we update the game every 500ms
                yield wait(this.update_interval);
            }
        });
    }
}
const wait = (ms) => new Promise((r, _) => setTimeout(() => r(true), ms));
//# sourceMappingURL=conway.js.map