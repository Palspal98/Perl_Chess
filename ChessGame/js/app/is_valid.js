class IsValid {
  constructor() {
    /*
    Always call precheck before calling other methods.
    */
    this.src_row = undefined;
    this.src_col = undefined;
    this.src_color = undefined;
    this.src_name = undefined;
    this.dest_row = undefined;
    this.dest_col = undefined;
    this.dest_color = undefined;
    this.dest_name = undefined;
  }

  get_cell_attributes(cell) {
    return {
      row: Number.parseInt(cell.attr("data-row"), 10),
      col: Number.parseInt(cell.attr("data-col"), 10),
      color: cell.attr("data-color"),
      name: pieces.names_map[cell.attr("data-name")],
    };
  }

  update_cells(src_cell, dest_cell) {
    const { row: src_row, col: src_col, color: src_color, name: src_name } = this.get_cell_attributes(src_cell);
    const { row: dest_row, col: dest_col, color: dest_color, name: dest_name } = this.get_cell_attributes(dest_cell);

    this.src_row = src_row;
    this.src_col = src_col;
    this.src_color = src_color;
    this.src_name = src_name;
    this.dest_row = dest_row;
    this.dest_col = dest_col;
    this.dest_color = dest_color;
    this.dest_name = dest_name;
  }

  precheck(src_cell, dest_cell) {
    // TODO: check for obstacles in path
    this.update_cells(src_cell, dest_cell);
    if (this.dest_name == "empty") {
      return true;
    }
    return (this.src_color !== this.dest_color);
  }

  pawn() {
    const col_diff = Math.abs(this.dest_col - this.src_col);
    let row_diff = this.dest_row - this.src_row;
    if (this.src_color === "white") {
      row_diff *= -1;
    }

    if (
      (row_diff === 1) &&
      (col_diff === 1) &&
      (this.dest_name !== "empty") &&
      (this.dest_color !== this.src_color)
    ) {
      return true;
    }
    return (
      (col_diff === 0) &&
      (1 <= row_diff) &&
      (row_diff <= 2) &&
      (this.dest_name === "empty")
    )
  }

  knight() {
    const row_diff = Math.abs(this.dest_row - this.src_row);
    const col_diff = Math.abs(this.dest_col - this.src_col);

    return (
      (row_diff == 2 && col_diff === 1) ||
      (row_diff == 1 && col_diff === 2)
    );
  }

  bishop(){
    const row_diff = Math.abs(this.dest_row - this.src_row);
    const col_diff = Math.abs(this.dest_col - this.src_col);
    return row_diff === col_diff;
  }

  rook() {
    const row_diff = this.dest_row - this.src_row;
    const col_diff = this.dest_col - this.src_col;
    return row_diff === 0 || col_diff === 0;
  }

  queen() {
    const rook_move = this.rook();
    const bishop_move = this.bishop();
    return rook_move || bishop_move;
  }

  king() {
    const row_diff = Math.abs(this.dest_row - this.src_row);
    const col_diff = Math.abs(this.dest_col - this.src_col);
    return row_diff <= 1 && col_diff <= 1;
  }
}

const is_valid = new IsValid();