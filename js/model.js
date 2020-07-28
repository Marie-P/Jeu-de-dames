class Model {
  constructor() {
    this.pieces = [];
    this.canvasSize;
    this.draughtBoardSize = 10;
  }

/** Méthode permettant d'initialiser le jeu
 */
 initPieces(draughtboardSize, height, width) {
        // for (let line = 0, compartmentSize = draughtboardSize / 10;line < height; ++line)
  for (let line = 0, compartmentSize = draughtboardSize / 10, y = compartmentSize / 2; line < height; ++line, y += compartmentSize) {
    for (let col = 0, x = compartmentSize / 2 ; col < width; ++col, x += compartmentSize) {
      let piece = new Piece();
      if ((!(col & 1) && !(line & 1)) || (col & 1 && line & 1)) {
        piece.player = -1;  // Cases interdites
      } else {
          if (line < 4) {
            piece.player = 1; // Cases des pions du haut
          } else if (line > 5) {
            piece.player = 2; // Cases des pions du bas
          } else {
            piece.player = 0; // Cases jouable
          }
        }
        piece.x = x;
        piece.y = y;
        piece.isPiece = 1; // Ils sont tous des simples pions à l'initialisation
        this.pieces.push(piece);

        // console.log('x : ' + x + ' || y : ' + y);
      }
    }
  }
}

