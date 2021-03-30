class Utils {
  replaceAt(s, index, character) {
    return s.substring(0, index) + character + s.substring(index + 1);
  }

  update_atrr(cell, data) {
    // data keys = name, draggable, color
    cell.attr({
      draggable: data.draggable,
      "data-color": data.color,
      "data-name": data.name,
    });
  }

  update_css(cell, data) {
    // data keys = cursor, color
    const shadow = (data.color === "black") ? "white" : "black";
    cell.css({
      cursor: data.cursor,
      color: data.color,
      "text-shadow": `0 0 2px ${shadow}`,
    });
  }

  update_html(cell, html) {
    cell.html(html);
  }

  update_all(cell, data) {
    // data keys = cursor, color, name, draggable, html
    this.update_html(cell, data.html);
    this.update_css(cell, {
      cursor: data.cursor,
      color: data.color,
    });
    this.update_atrr(cell, {
      draggable: data.draggable,
      color: data.color,
      name: data.name,
    })
  }

  update_turn(old_color, new_color) {
    // empty cells should always be updated at the end.
    // as empty cells have color asigned to them.
    const empty_cells = $(".cell[data-name='_']");
    const inactive_cells = $(`.cell[data-color=${old_color}]`);
    const active_cells = $(`.cell[data-color=${new_color}]`);

    inactive_cells.attr("draggable", false);
    active_cells.attr("draggable", true);
    empty_cells.attr("draggable", false);

    inactive_cells.css("cursor", "default");
    active_cells.css("cursor", "move");
    empty_cells.css("cursor", "default");
  }

  move_piece(source, destination) {
    const html = source.html();
    const name = source.attr("data-name");
    const color = source.attr("data-color");

    this.update_html(source, pieces.names.empty);
    this.update_css(source, {
      cursor: "default",
      color: "none",
    });
    this.update_atrr(source, {
      draggable: false,
      color: "black",
      name: "_",
    });

    this.update_html(destination, html);
    this.update_css(destination, {
      cursor: "move",
      color: color,
    });
    this.update_atrr(destination, {
      draggable: true,
      color: color,
      name: name,
    });
  }

  move(source, destination) {
    const key = source.attr("data-name");
    const piece_name = pieces.names_map[key];

    if (!is_valid.precheck(source, destination)) {
      return false;
    }
    if (is_valid[piece_name]()) {
      const dest_piece = destination.attr("data-name");
      const dest_piece_name = pieces.names_map[dest_piece];

      this.move_piece(source, destination);
      board_state.update_turn();

      if (dest_piece_name === "king") {
        this.win(destination.attr("data-color"));
      }
      return true;
    }

    return false;
  }

  win(color) {
    this.update_all($(".cell"), {
      name: undefined,
      html: undefined,
      draggable: false,
      color: color,
      cursor: "default",
    });
    $(".info").html(`WINNER: ${color} !!!`);
  }

  post_data(url) {
    url = "../" + url;
    const noop = () => { };
    const data = {
      r: JSON.stringify(board_state.state)
    };
    $.ajax({
      type: 'POST',
      url,
      data,
      dataType: 'xml',
      success: noop,
      error: noop,
    });
  }

  undo() {
    $.ajax({
      type: 'GET',
      url: '../write.cgi',
      dataType: 'json',
      success: (res) => {
        board_state.state = res;
        align_pieces();
        board_state.update_turn();
      },
      error: () => {
        alert("Reached the Start");
      }
    });
  }
}

utils = new Utils();