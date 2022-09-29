import { useRouter } from "next/router";
import React from "react";
import { FaWindowClose } from "react-icons/fa";

const Modal = ({ isCorrect, turn, solution, setShowModal }) => {
  const router = useRouter();
  const forceReload = () => {
    router.reload();
  };

  const closeModal = () => {
    router.push("/");
  };
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <FaWindowClose onClick={closeModal} className="close-btn absolute" />
          <h2>Congrats 😀</h2>
          <h3>
            You found <span className="solution">{solution}</span> in {turn}{" "}
            {turn === 1 ? "guess" : "guesses"}.
          </h3>
        </div>
      )}
      {!isCorrect && (
        <div>
          <FaWindowClose onClick={closeModal} className="close-btn absolute" />
          <h3>Oops, you've run out of guesses 😔</h3>
          <h3 className="learn-more">
            <span style={{ color: "white" }}>Want to</span>
            <button className="learn-more-btn" onClick={forceReload}>
              try again?
            </button>
          </h3>
        </div>
      )}
    </div>
  );
};

export default Modal;
