import { useWordle } from "../hooks/useWordle";
import { keypadArray1, keypadArray2, keypadArray3 } from "../data/keypadData";

const Keypad = ({ usedKeys, handleClick }) => {
  return (
    <div className="keypad">
      <div className="keypad-row row-1">
        {keypadArray1.map((l) => {
          const color = usedKeys[l.key.toLocaleLowerCase()];
          return (
            <div
              key={l.key}
              className={color}
              onClick={() => handleClick(l.key)}
            >
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="keypad-row row-2">
        {keypadArray2.map((l) => {
          const color = usedKeys[l.key.toLocaleLowerCase()];
          return (
            <div
              key={l.key}
              className={color}
              onClick={() => handleClick(l.key)}
            >
              {l.key}
            </div>
          );
        })}
      </div>
      <div className="keypad-row row-3">
        {keypadArray3.map((l) => {
          const color = usedKeys[l.key.toLocaleLowerCase()];
          return (
            <div
              key={l.key}
              className={
                l.key === "⏎"
                  ? "enter-key"
                  : l.key === "⌫"
                  ? "delete-key"
                  : color
              }
              onClick={() => handleClick(l.key)}
            >
              {l.key}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Keypad;
