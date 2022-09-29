import { FaWindowClose } from "react-icons/fa";
const InfoModal = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div
      className={isModalOpen ? "modal-container show-modal" : "modal-container"}
    >
      <div className="modal-content">
        <div className="close-btn-container">
          <FaWindowClose
            onClick={() => setIsModalOpen(false)}
            className="close-btn"
          />
        </div>
        <h1>Gameplay</h1>
        <div className="description">
          <p>You have six attempts at guessing a five-letter word</p>
          <p>
            After each guess, you will see that a letter is either{" "}
            <span className="bg-green">green</span>,{" "}
            <span className="bg-yellow">yellow</span>, or{" "}
            <span className="bg-grey">grey</span>.
          </p>
          <p>
            <span className="bg-green">Green</span> indicates that the letter is
            in the word and it is in the correct position.{" "}
            <span className="bg-yellow">Yellow</span> indicates that it's in the
            word but the position's incorrect.{" "}
            <span className="bg-grey">Grey</span>. indicates that the letter is
            not in the word.
          </p>
        </div>
        <img src="/assets/rules.png" alt="Wordle Rules" className="rules-img" />
        <p>The game Wordle was created by Josh Wardle.</p>
        <p>
          <strong>Wordle Maker</strong> was developed by{" "}
          <a href="https://www.scottsdev.net/" className="link" target="_blank">
            Scott Mitchell
          </a>{" "}
          for people to make and share their own Wordles for others to play.
        </p>
      </div>
    </div>
  );
};

export default InfoModal;
