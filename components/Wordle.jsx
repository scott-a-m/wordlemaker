import Link from "next/link";
import { useEffect, useState } from "react";
import { useWordle } from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import { useSiteContext } from "./SiteContext";

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
  const { setIsModalOpen, isModalOpen } = useSiteContext();

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn, handleClick]);

  return (
    <div>
      <h2 className="play-text">Play time!</h2>
      <h3 className="learn-more">
        New to the game?{" "}
        <button className="learn-more-btn" onClick={() => setIsModalOpen(true)}>
          Learn More
        </button>
      </h3>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} handleClick={handleClick} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
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
