class View {
	constructor() {
		this.canvas = document.createElement("canvas");
	}

		drawGame (model) {
			this.setDraughtBoardSize(model, this.canvas);
			model.initPieces(this.canvas.width, model.draughtBoardSize, model.draughtBoardSize);
			this.drawDraughtBoard(this.canvas, model.draughtBoardSize);
			this.drawPieces(this.canvas, model.draughtBoardSize, model);	
			document.body.appendChild(this.canvas);
		}

		/** Permet d'adapter la taille du damier en fonction de la taille de la fenêtre
	 */
	setDraughtBoardSize(model, canvas) {
		if(window.innerWidth < 600 || window.innerHeight < 600) {
			this.setSize(model, canvas, 250);
		} else {
			this.setSize(model, canvas, 500);
		}
	}

	/** Pour créer le damier 
	 */
	drawDraughtBoard(canvas, draughtBoardSize) {
		let blackPart = canvas.getContext("2d");
		this.colorRect(0, 0, canvas.width, canvas.height, blackPart, "#000000"); // Dessin du carré noir

		this.drawWhitePart(canvas, draughtBoardSize); // Dessin des carrés blancs
	}

	/** Méthode permettant d'initialiser la taille du canvas en fonction de la fenêtre
	 */
	setSize(model, canvas, size) {
		model.canvasSize = canvas.height = canvas.width = size;
	}

	/** Permet de colorer un rectangle
	 */
	colorRect (x, y, width, height, rect, color) {
		rect.fillStyle = color;
		rect.fillRect(x, y, width, height);
	}

	/** Pour dessiner les parties blanches du damier
	 */
	drawWhitePart(canvas, draughtBoardSize) {
		for (let line = 0, col = 0, heightCompartment = canvas.height/draughtBoardSize; line < draughtBoardSize; line++) {
			if(!(line & 1)) { // Ligne impaire
				col = 0;
			} else { // Ligne paire
				col = 1;
			}
			
			for (let widthCompartment = canvas.width/draughtBoardSize; col < draughtBoardSize; col += 2) {
				let whitePart = canvas.getContext("2d");
				this.colorRect(widthCompartment * col, heightCompartment * line, canvas.height/draughtBoardSize, canvas.width/draughtBoardSize, whitePart, "#FFFFFF");
			}
		}
	}

	/** Permet de dessiner les pions du jeu
	 */
	drawPieces(canvas, draughtBoardSize, model) {
		for (let line = 0; line < draughtBoardSize; line++) {
			for (let col = 0; col < draughtBoardSize; col++) {
				if(model.pieces[line * draughtBoardSize + col].player == 1) {
					this.drawOnePiece(canvas, model.pieces[line * draughtBoardSize + col].x, model.pieces[line * draughtBoardSize + col].y, "#FF8C00");
				} else if(model.pieces[line * draughtBoardSize + col].player == 2) {
					this.drawOnePiece(canvas, model.pieces[line * draughtBoardSize + col].x, model.pieces[line * draughtBoardSize + col].y, "#FFE4B5");
				}
			}
		}
	}

	/** Pour dessiner un pion (cercle)
	 */
	drawOnePiece(canvas, x, y, color) {
		let piece = canvas.getContext("2d");
		piece.beginPath();
		piece.arc(x, y, canvas.width/20, 0, 2 * Math.PI);
		piece.fillStyle = color;
		piece.fill();
		piece.stroke();
	}

	/** Methode permettant d'effacer ce qu'il y a sur le canvas
	 */
	clear(canvas) {
		let context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	/** Colore le jeton choisi par l'utilisateur
	 */
	colorOnePiece(canvas, x, y, color) {
		this.drawOnePiece(canvas, x, y, color);
	}

	/** Pour l'animation du déplacement 
	 */
	move(canvas, draughtBoardSize, piece, newPlace, newX, newY, model, leftOrRight, upOrDown) {
		this.clear(canvas);
		this.drawDraughtBoard(canvas, draughtBoardSize);
		this.drawPieces(canvas, draughtBoardSize, model);

		if(piece.x != newX) {
			piece.x += leftOrRight;
			newPlace.x -= leftOrRight;
		}

		if(piece.y != newY) {
			piece.y += upOrDown;
			newPlace.y -= upOrDown;
		}

		if(piece.x != newX || piece.y != newY) {
			window.requestAnimationFrame(() => this.move(canvas, draughtBoardSize, piece, newPlace, newX, newY, model, leftOrRight, upOrDown));
		}
		else {
			permutation(piece, newPlace);
			this.clear(canvas);
			this.drawDraughtBoard(canvas, draughtBoardSize);
			this.drawPieces(canvas, draughtBoardSize, model);
		}
	}
}