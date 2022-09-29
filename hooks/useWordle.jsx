import { useState } from "react";

export const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray[i] === l.key) {
        l.color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l) => {
      if (solutionArray.includes(l.key) && l.color !== "green") {
        l.color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prev) => {
      let newKeys = { ...prev };
      formattedGuess.forEach((l) => {
        const currentColor = newKeys[l.key];

        if (l.color === "green") {
          newKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          newKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "grey" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          newKeys[l.key] = "grey";
          return;
        }
      });

      return newKeys;
    });
    setCurrentGuess("");
  };

  const handleClick = (key) => {
    if (key === "⏎") {
      if (turn > 5) {
        return;
      }
      if (history.includes(currentGuess)) {
        return;
      }
      if (currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "⌫") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    const lowerCaseKey = key.toLowerCase();

    if (/^[A-Za-z]$/.test(lowerCaseKey)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + lowerCaseKey;
        });
      }
    }
  };

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        return;
      }
      if (history.includes(currentGuess)) {
        return;
      }
      if (currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup,
    handleClick,
    usedKeys,
  };
};
