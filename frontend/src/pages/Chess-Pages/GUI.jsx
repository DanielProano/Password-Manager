import ChessBoard from "../../assets/chessboard.svg";
import { Pieces } from "./Pieces.jsx";
import { useState } from "react";
import "./GUI.css";

function Chess() {
   const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  return (
    <div className="chess-page">
      <img className="chess-board" src={ChessBoard} />
      <input className="chess-fen" placeholder={fen}/>

      {Pieces.map((piece, index) => (
         <img
            key={index}
            src={piece}
            className="chess-piece"
         />
      ))}
    </div>
  );
}

export default Chess;
