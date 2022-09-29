import Link from "next/link";
import { useEffect, useState } from "react";
import { useWordle } from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";

const Wordle = ({ solution }) => {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys,
    handleClick,
  } = useWordle(solution);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setShowModal(false), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(false), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn, handleClick]);

  return (
    <div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleClick={handleClick} />
      {showModal && (
        <Modal
          isCorrect={isCorrect}
          turn={turn}
          solution={solution}
          setShowModal={setShowModal}
        />
      )}
      <p>
        Want to create your own Wordle?{" "}
        <Link href="/">
          <a className="link">Let's do it!</a>
        </Link>
      </p>
      <p className="developer">
        developed by{" "}
        <a href="https://www.scottsdev.net/" className="link" target="_blank">
          Scott Mitchell
        </a>
      </p>
    </div>
  );
};

export default Wordle;
