import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const buttons = [
  ["C", "⌫", "÷", "×"],
  ["7", "8", "9", "-"],
  ["4", "5", "6", "+"],
  ["1", "2", "3", "="],
  ["0", ".", "±", "%"]
];

const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "×": (a, b) => a * b,
  "÷": (a, b) => {
    if (b === 0) {
      throw new Error("Division por cero");
    }
    return a / b;
  }
};

function formatNumber(value) {
  return Number.isInteger(value)
    ? String(value)
    : Number(value.toFixed(8)).toString();
}

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNextValue, setWaitingForNextValue] = useState(false);
  const [history, setHistory] = useState("Lista para calcular");

  const expression = useMemo(() => {
    if (!operator || storedValue === null) {
      return history;
    }

    return `${storedValue} ${operator} ${waitingForNextValue ? "" : display}`;
  }, [display, history, operator, storedValue, waitingForNextValue]);

  const clear = () => {
    setDisplay("0");
    setStoredValue(null);
    setOperator(null);
    setWaitingForNextValue(false);
    setHistory("Lista para calcular");
  };

  const inputDigit = (digit) => {
    setDisplay((current) => {
      if (waitingForNextValue) {
        setWaitingForNextValue(false);
        return digit;
      }

      return current === "0" ? digit : `${current}${digit}`;
    });
  };

  const inputDecimal = () => {
    if (waitingForNextValue) {
      setWaitingForNextValue(false);
      setDisplay("0.");
      return;
    }

    setDisplay((current) => (current.includes(".") ? current : `${current}.`));
  };

  const backspace = () => {
    if (waitingForNextValue) {
      return;
    }

    setDisplay((current) => (current.length > 1 ? current.slice(0, -1) : "0"));
  };

  const toggleSign = () => {
    setDisplay((current) => {
      if (current === "0" || current === "Error") {
        return current;
      }

      return current.startsWith("-") ? current.slice(1) : `-${current}`;
    });
  };

  const percent = () => {
    setDisplay((current) => {
      if (current === "Error") {
        return current;
      }

      return formatNumber(Number(current) / 100);
    });
  };

  const calculate = (nextOperator = null) => {
    const inputValue = Number(display);

    if (operator && storedValue !== null) {
      try {
        const result = operators[operator](storedValue, inputValue);
        const formatted = formatNumber(result);

        setDisplay(formatted);
        setStoredValue(nextOperator ? result : null);
        setOperator(nextOperator);
        setWaitingForNextValue(Boolean(nextOperator));
        setHistory(`${storedValue} ${operator} ${inputValue} = ${formatted}`);
      } catch (error) {
        setDisplay("Error");
        setStoredValue(null);
        setOperator(null);
        setWaitingForNextValue(true);
        setHistory(error.message);
      }

      return;
    }

    setStoredValue(inputValue);
    setOperator(nextOperator);
    setWaitingForNextValue(true);
    setHistory(nextOperator ? `${inputValue} ${nextOperator}` : history);
  };

  const handlePress = (value) => {
    if (/^\d$/.test(value)) {
      inputDigit(value);
      return;
    }

    if (value === ".") {
      inputDecimal();
      return;
    }

    if (value === "C") {
      clear();
      return;
    }

    if (value === "⌫") {
      backspace();
      return;
    }

    if (value === "±") {
      toggleSign();
      return;
    }

    if (value === "%") {
      percent();
      return;
    }

    if (value === "=") {
      calculate();
      return;
    }

    calculate(value);
  };

  return (
    <main className="shell">
      <section className="calculator" aria-label="Calculadora React">
        <div className="brand-row">
          <span className="brand-mark">L7</span>
          <span>Calculadora React</span>
        </div>

        <div className="screen">
          <p>{expression}</p>
          <output>{display}</output>
        </div>

        <div className="keypad">
          {buttons.flat().map((button) => (
            <button
              key={button}
              className={[
                "key",
                operators[button] ? "operator" : "",
                button === "=" ? "equals" : "",
                button === "C" || button === "⌫" ? "utility" : ""
              ].join(" ")}
              type="button"
              onClick={() => handlePress(button)}
            >
              {button}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Calculator />
  </React.StrictMode>
);
