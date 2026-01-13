import ChessBoard from "../../assets/chessboard.svg";
import { Pieces } from "./Pieces.jsx";
import { useState, useEffect } from "react";
import "./GUI.css";

function Chess() {
   const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
   const [matrix, setMatrix] = useState([]);
   const [whitePOV, setWhitePOV] = useState(true);

   function fenToMatrix(fenString) {
      const rows = fenString.split(" ")[0].split("/");
      let newMatrix = [];

      for (let i = 0; i < 8; i++) {
         const row = [];
         for (let piece of rows[i]) {
            const piece_num = Number(piece);
            if (!isNaN(piece_num)) {
               for (let j = 0; j < piece_num; j++) {
                  row.push(null);
               }
            } else {
               row.push(Pieces[piece]);
            }
         }
         newMatrix.push(row);
      }
      setMatrix(newMatrix);
   }

   function MatrixToFen() {
      let fen = "";

      const fenKey = { [Pieces.p]: 'p', [Pieces.n]: 'n', [Pieces.b]: 'b', [Pieces.r]: 'r', [Pieces.k]: 'k', [Pieces.q]: 'q', [Pieces.P]: 'P', [Pieces.N]: 'N', [Pieces.R]: 'R', [Pieces.B]: 'B', [Pieces.K]: 'K', [Pieces.Q]: 'Q' };

      for (let i = 0; i < 8; i++) {
         let num = 1;
         for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == null) {
               fen.append(num);
               num = 1;
            }
            else {
               fen.append(fenKey[matrix[i][j]]);
               num += 1;
            }
         }
         fen.append('/');
      }
      setFen(fen);
   }

   function displayMatrix() {
      let renderMatrix = whitePOV ? matrix.slice().reverse() : matrix.map(row => row.slice().reverse());

      return renderMatrix.map((row, r) =>
         row.map((piece, c) =>
            <div key={`${r}-${c}`} className="chess-square">
               {piece && (
                  <img src={piece} className="chess-piece" />
               )}
            </div>
         )
      )
   }

   useEffect(() => {
      fenToMatrix(fen);
   }, [fen]);

  return (
    <div className="chess-page">
      <div className="chess-container">
         <img 
            className="chess-board" 
            src={ChessBoard}
         />
         <div className="chess-pieces">
            {displayMatrix()}
         </div>
      </div>
      <input className="chess-fen" 
         value={fen} 
         onChange={(e) => setFen(e.target.value)} 
      />
    </div>
  );
}

export default Chess;
