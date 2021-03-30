const build_board = () => {
  const chessboard = $(".chessboard");

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const cell = $(document.createElement("div"));
      cell.addClass("cell");
      cell.attr({
        "data-row": row,
        "data-col": col,
        "data-color": "black",
      });
      let background = colors.light_bg;
      if ((row + col) % 2 !== 0) {
        background = colors.dark_bg;
      }
      cell.css("background-image", `url(${background})`);
      chessboard.append(cell);

    }
  }
  board_state.update_turn();
    
};

const align_pieces = () => {

  const key_to_piece = (key) => ({
    name: key.toLowerCase(),
    item: pieces.names[pieces.names_map[key.toLowerCase()]],
    color: key === key.toUpperCase() ? "white" : "black",
    is_draggable: key !== "_",
  });

  board_state.state.forEach((row, row_num) => {
    [...row].forEach((key, col_num) => {
      const cell = $(`.cell[data-row='${row_num}'][data-col='${col_num}']`);
      const piece_data = key_to_piece(key);
      utils.update_all(cell, {
        name: piece_data.name,
        html: piece_data.item,
        draggable: piece_data.is_draggable,
        color: piece_data.color,
        cursor: (piece_data.is_draggable) ? "move" : "default",
      });
    });
  });
};

const initialize = () => {
  $("body").css("background-image", `url(${colors.bg_image})`);

  build_board();
  $(".start").on("click", () => {
    align_pieces();
    board_state.update_turn();
    utils.post_data("modify.cgi");
  });
  $(".undo").on("click", () => {
    utils.undo();
    align_pieces();
    board_state.update_turn();
  });

  const preventDefault = (e) => (e.preventDefault());

  $("body").on("dragstart", ".cell", drag_drop.drag_start);
  $("body").on("dragenter", ".cell", preventDefault);
  $("body").on("dragover", ".cell", preventDefault);
  $("body").on("drop", ".cell", drag_drop.drop);
  $("body").on("dragend", ".cell", drag_drop.drag_end);
}

const dependencies = ["jquery", "app/config", "app/is_valid", "app/utils", "app/drag_drop"];
requirejs(dependencies, function (util) {
  initialize();
});
