import React, { useState, useEffect } from "react";
import "./JogoDaVelha.css";

function JogoDaVelha() {
  const tabuleirovazio = Array(9).fill("");
  const [Tabuleiro, setTabuleiro] = useState(tabuleirovazio);

  const [jogadorAtual, setjogadorAtual] = useState("O");
  const [ganhador, setganhador] = useState(null);

  const clicarcelula = (index) => {
    if (ganhador) {
      console.log("Jogo Finalizado");
      return null;
    }

    if (Tabuleiro[index] !== "") {
      console.log("posição marcada");
      return null;
    }
    setTabuleiro(
      Tabuleiro.map((item, itemindex) =>
        itemindex === index ? jogadorAtual : item
      )
    );

    setjogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };

  const verificarGanhador = () => {
    const maneirasdeGanhar = [
      [Tabuleiro[0], Tabuleiro[1], Tabuleiro[2]],
      [Tabuleiro[3], Tabuleiro[4], Tabuleiro[5]],
      [Tabuleiro[6], Tabuleiro[7], Tabuleiro[8]],

      [Tabuleiro[0], Tabuleiro[3], Tabuleiro[6]],
      [Tabuleiro[1], Tabuleiro[4], Tabuleiro[7]],
      [Tabuleiro[2], Tabuleiro[5], Tabuleiro[8]],

      [Tabuleiro[0], Tabuleiro[4], Tabuleiro[8]],
      [Tabuleiro[6], Tabuleiro[4], Tabuleiro[2]],
    ];

    maneirasdeGanhar.forEach((Celulas) => {
      if (Celulas.every((Celula) => Celula === "O")) setganhador("O");
      if (Celulas.every((Celula) => Celula === "X")) setganhador("X");
    });
    checkempate();
  };
  const checkempate = () => {
    if (Tabuleiro.every((item) => item !== "")) {
      setganhador("E");
    }
  };

  useEffect(verificarGanhador, [Tabuleiro]);

  const reiniciar = () => {
    setjogadorAtual("O");
    setTabuleiro(tabuleirovazio);
    setganhador(null);
  };

  return (
    <main>
      <h1 className="title">Jogo Da Velha </h1>
      <div className={`Tabuleiro ${ganhador ? "acabou-o-jogo" : ""}`}>
        {Tabuleiro.map((item, index) => (
          <div
            key={index}
            className={`Celula ${item}`}
            onClick={() => clicarcelula(index)}
          >
            {item}
          </div>
        ))}
      </div>
      {ganhador && (
        <footer>
          {ganhador === "E" ? (
            <h2 className="ganhador-mensagem">
              <span className={ganhador}>Empatou!</span>
            </h2>
          ) : (
            <h2 className="ganhador-mensagem">
              <span className={ganhador}>{ganhador} venceu! </span>
            </h2>
          )}
          <button onClick={reiniciar}>Reiniciar Jogo</button>
        </footer>
      )}
    </main>
  );
}

export default JogoDaVelha;
