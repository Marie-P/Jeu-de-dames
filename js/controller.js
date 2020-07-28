class Controller {
	constructor() {
	}

	start() {
		let model = new Model();
		let view = new View();
		view.drawGame(model);
		var isPieceSelected = false;
		var pieceSelected = null;

		document.onclick = ('mousemove', function(e) {
			let posX = -1; // Position du pion sélectionné sur l'écran 
			let posY = -1;
			let line = -1;// Position du pion dans le tableau
			let col =  -1;

			// Recherche du pion sélectionné sur l'écran
			for (let y = 0; y < 10 && posY < 0; ++y) {
				 if(e.clientY > model.canvasSize/10 * y && e.clientY < model.canvasSize/10 * (y + 1)) { 
					for (let x = 0; x < 10 && posX < 0; ++x) {
						if(e.clientX > model.canvasSize/10 * x && e.clientX < model.canvasSize/10 * (x + 1)) {
							posY = model.pieces[y * model.draughtBoardSize + x].y;
							posX = model.pieces[y * model.draughtBoardSize + x].x;
							line = y;
							col = x;
						}
					}
				}
			}
			
			// Le pion choisi par le joueur est mis en vert et est enregistré 
			if(posX != -1 && posY != -1 && model.pieces[line * 10 + col].player != -1 && model.pieces[line * 10 + col].player != 0) {
				isPieceSelected = true;
				pieceSelected = line * 10 + col;
				view.clear(view.canvas); // Effacer avant de redessiner
				view.drawDraughtBoard(view.canvas, model.draughtBoardSize);
				view.drawPieces(view.canvas, model.draughtBoardSize, model);
				view.colorOnePiece(view.canvas, posX, posY, "#7FFF00"); // Le jeton séléctionné passe en vert
			}

			// Pour le cas où c'est une case vide qui est sélectionné
			else if(isPieceSelected == true && model.pieces[line * 10 + col].player == 0) { 
				isPieceSelected = false;

				if(model.pieces[line * 10 + col].y == model.pieces[pieceSelected].y + model.canvasSize/10) { // En bas
					if(model.pieces[line * 10 + col].x == model.pieces[pieceSelected].x + model.canvasSize/10) { // à gauche
						window.requestAnimationFrame(function() {view.move(view.canvas, model.draughtBoardSize, model.pieces[pieceSelected], model.pieces[line * 10 + col], model.pieces[pieceSelected].x + (model.canvasSize/10), model.pieces[pieceSelected].y + (model.canvasSize/10), model, + model.pieces[pieceSelected].vx, + model.pieces[pieceSelected].vx)});
						
					}

					else if(model.pieces[line * 10 + col].x == model.pieces[pieceSelected].x - model.canvasSize/10) { // à droite
						window.requestAnimationFrame(function() {view.move(view.canvas, model.draughtBoardSize, model.pieces[pieceSelected], model.pieces[line * 10 + col], model.pieces[pieceSelected].x - (model.canvasSize/10), model.pieces[pieceSelected].y + (model.canvasSize/10), model, - model.pieces[pieceSelected].vx, + model.pieces[pieceSelected].vx)});
					}
				}

				else if(model.pieces[line * 10 + col].y == model.pieces[pieceSelected].y - model.canvasSize/10) { // En haut
					if(model.pieces[line * 10 + col].x == model.pieces[pieceSelected].x + model.canvasSize/10) { // à gauche
						window.requestAnimationFrame(function() {view.move(view.canvas, model.draughtBoardSize, model.pieces[pieceSelected], model.pieces[line * 10 + col], model.pieces[pieceSelected].x + (model.canvasSize/10), model.pieces[pieceSelected].y - (model.canvasSize/10), model, + model.pieces[pieceSelected].vx, - model.pieces[pieceSelected].vy)});
					}

					else if(model.pieces[line * 10 + col].x == model.pieces[pieceSelected].x - model.canvasSize/10) { // à droite
						window.requestAnimationFrame(function() {view.move(view.canvas, model.draughtBoardSize, model.pieces[pieceSelected], model.pieces[line * 10 + col], model.pieces[pieceSelected].x - (model.canvasSize/10), model.pieces[pieceSelected].y - (model.canvasSize/10), model, - model.pieces[pieceSelected].vx, - model.pieces[pieceSelected].vy)});
					}
				}
			}
			document.body.appendChild(view.canvas);
		});
	}
}

/** Permet de permuter les caractéristiques entre le jeton et l'emplacement vide
 * @param piece
 			jeton à déplacer
 * @param compartment
 			endroit où va être placé le jeton
 */
function permutation(piece, compartment) {
	let temp = new Piece();

	temp.player = piece.player;
	piece.player = compartment.player;
	compartment.player = temp.player;

	temp.isPiece = piece.isPiece;
	piece.isPiece = compartment.isPiece;
	compartment.isPiece = temp.isPiece;	

	temp.x = piece.x;
	piece.x = compartment.x;
	compartment.x = temp.x;	

	temp.y = piece.y;
	piece.y = compartment.y;
	compartment.y = temp.y;	

}