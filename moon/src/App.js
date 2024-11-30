import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [person, setPerson] = useState({ name: "Joe" });
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) {
      setStep(step - 1);
      setPerson({ name: "joe" });
    }
  }
  function handleNext() {
    if (step < 3) {
      setStep(step + 1);
      setPerson({ name: "Fred" });
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>x</button>
      {isOpen ? (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            {step}: {messages[step - 1]}
            {person.name}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
