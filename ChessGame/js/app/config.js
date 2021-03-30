const colors = {
  dark_bg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyqYRNAKIu65bzeJjwG7yEE473SACJ88mmxw&usqp=CAU",
  light_bg: "https://media.istockphoto.com/photos/brown-wood-texture-light-wooden-abstract-background-picture-id1153244990",
  bg_image: "https://c.wallhere.com/photos/d2/a1/wood_blackandwhite_bw_stilllife_white_black_game_monochrome-851346.jpg!d",
};

class Pieces {
  constructor() {
    this.names = {
      pawn: "&#9823;",
      knight: "&#9822;",
      bishop: "&#9821;",
      rook: "&#9820;",
      queen: "&#9819;",
      king: "&#9818;",
      empty: "",
    };

    this.names_map = {
      p: "pawn",
      n: "knight",
      b: "bishop",
      r: "rook",
      q: "queen",
      k: "king",
      _: "empty",
    };
  }
}

const pieces = new Pieces();

class BoardState {
  constructor() {
    this.current_player = "white";
    /*
    Lower case denotes black and upper case denotes white.
    And characters denotion can be found in `pieces_map`.
    */
    this.state = [
      "rnbqkbnr",
      "pppppppp",
      "________",
      "________",
      "________",
      "________",
      "PPPPPPPP",
      "RNBQKBNR",
    ];
  }

  update_turn() {
    const prev_color = this.current_player;
    this.current_player = (prev_color === "black") ? "white" : "black";

    utils.update_turn(prev_color, this.current_player);
    $(".info").html(`current turn: ${this.current_player}`);
  }

  update_board(src_row, src_col, dest_row, dest_col) {
    const piece = board_state.state[src_row][src_col];
      board_state.state[src_row] = utils.replaceAt(
        board_state.state[src_row],
        Number.parseInt(src_col, 10),
        "_",
      );
      board_state.state[dest_row] = utils.replaceAt(
        board_state.state[dest_row],
        Number.parseInt(dest_col, 10),
        piece,
      );
  }
}

const board_state = new BoardState();