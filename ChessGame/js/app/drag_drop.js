class DragNDrop {
  drag_start(e) {
    e.stopPropagation();

    const row = $(e.target).attr("data-row");
    const col = $(e.target).attr("data-col");
    e.originalEvent.dataTransfer.setData("text/plain", `${row}_${col}`);
    $(e.target).addClass("dragging");
  }

  drag_end(e) {
    e.stopPropagation();

    $(e.target).removeClass("dragging");
  }

  drop(e) {
    e.stopPropagation();

    const src = e.originalEvent.dataTransfer.getData("text/plain");
    const [src_row, src_col] = src.split("_");
    const source = $(`.cell[data-row='${src_row}'][data-col='${src_col}']`);

    const dest_row = $(e.target).attr("data-row");
    const dest_col = $(e.target).attr("data-col");
    const destination = $(`.cell[data-row='${dest_row}'][data-col='${dest_col}']`);

    if (utils.move(source, destination)) {   
      board_state.update_board(src_row, src_col, dest_row, dest_col);
      utils.post_data("read.cgi");
    }
    $(".cell").removeClass("dragging");
    e.originalEvent.dataTransfer.clearData("text/plain");
  }
}

drag_drop = new DragNDrop();