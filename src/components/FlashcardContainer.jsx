import { useState } from "react";
import Flashcard from "./Flashcard";
import rightArrow from "../assets/right-arrow.png";
import leftArrow from "../assets/left-arrow.png";
import flashcardsData from "../data/flashcardData.json";

const FlashcardContainer = () => {
  const [flashcard, setFlashcard] = useState(0); // index of flashcard
  const [flip, setFlip] = useState(true); // true = animal pic, false = answer
  const [userInput, setUserInput] = useState(""); // user input
  const [checkAnswer, setCheckAnswer] = useState(false); // check if user input is correct

  const handlePrev = () => {
    console.log(flashcard);
    setFlip(true);
    setFlashcard((prevState) =>
      prevState === 0 ? flashcardsData.flashcards.length - 1 : prevState - 1
    );
    setUserInput("");
    setCheckAnswer(false);
  };

  const handleNext = () => {
    console.log(flashcard);
    setFlip(true);
    setFlashcard(
      (prevState) => (prevState + 1) % flashcardsData.flashcards.length
    );
    setUserInput("");
    setCheckAnswer(false);
  };

  const handleRandom = () => {
    let rndNum = Math.floor(Math.random() * flashcardsData.flashcards.length);
    setFlashcard((prevState) =>
      prevState !== rndNum
        ? rndNum
        : (rndNum + 1) % flashcardsData.flashcards.length
    );
    setFlip(true);
    setUserInput("");
    setCheckAnswer(false);
  };

  const handleChange = (event) => {
    event.preventDefault();

    if (
      userInput.toLowerCase() ===
      flashcardsData.flashcards[flashcard].answer.toLowerCase()
    ) {
      setCheckAnswer(true);
    } else {
      setCheckAnswer(false);
      alert("Incorrect answer. Try again!");
    }
  };

  return (
    <div className="flashcard-container">
      <h3 className="flashcard-header">Guess that Animal!</h3>
      <div className="flashcard-box">
        <img src={leftArrow} alt="left-arrow" onClick={handlePrev} />

        <Flashcard
          animal_pic={flashcardsData.flashcards[flashcard].animal_pic}
          answer={flashcardsData.flashcards[flashcard].answer}
          flipState={{ flip, setFlip }}
        />

        <img src={rightArrow} alt="right-arrow" onClick={handleNext} />
      </div>
      <form className="input-form" onSubmit={handleChange}>
        <input
          className="user-input"
          type="text"
          value={userInput}
          placeholder="Enter answer here"
          onChange={(event) => setUserInput(event.target.value)}
          style={{ border: checkAnswer ? "1px solid green" : "0px solid white" }}
        />
        <button type="submit">Enter</button>
      </form>
      <button className="randomize-btn" onClick={handleRandom}>
        Randomize
      </button>
    </div>
  );
};

export default FlashcardContainer;
