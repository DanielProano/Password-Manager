import ChessBoard from "../../assets/chessboard.svg";
import { Pieces } from "./Pieces.jsx";
import { useState, useEffect } from "react";
import "./GUI.css";

function Chess() {
   const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
   const [matrix, setMatrix] = useState([]);

   const fenToMatrix = (fenString) => {
      const rows = fenString.split(" ")[0].split("/");
      let newMatrix = [];

      for (let i = 0; i < rows.length; i++) {
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

   const MatrixToFen = () => {

   }

   const displayMatrix = () => {
      return matrix.map((rows, r) =>
         rows.map((piece, p) =>
            piece ? ( 
               <img
                  src={piece}
                  className="chess-piece"
                  style={{
                     gridRow: r + 1,
                     gridColumn: p + 1,
                  }}
               />
            ) : null
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
