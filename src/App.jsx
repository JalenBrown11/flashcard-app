import { useState } from "react";
import FlashcardContainer from "./components/FlashcardContainer";
import flashcardsData from "./data/flashcardData.json";
import fs from "fs";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState({
    imageUrl: "",
    animalName: "",
  });

  const handleChange = (event) => {
    setInputs((prevState) => ({...prevState, [event.target.name]: event.target.value}));
    console.log(`imageUrl: ${inputs.imageUrl}`);
    console.log(`Animal Name: ${inputs.animalName}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent page refresh

    // Store data in JSON file (Form onSubmit() function)
    const data = {
      imageUrl,
      animalName,
    };

    // Add new card to flashcardData.json
    fs.readFile("./src/data/flashcardData.json", (data, err) => {
      // if error, log error
      if (err) { 
        console.log(err);
        return;
      }
      // else, log data and print success message
      console.log(data);
      console.log("Successfully read card!");
    });
  };

  return (
    <div className="app">
      {/* Header content */}
      <header className="app-header">
        {/* App title element */}
        <div className="app-title">
          <h1>Flash It</h1>
        </div>
        {/* Card count element */}
        <div className="card-count">Card Count: {flashcardsData.flashcards.length}</div>
        <div className="app-header-btns">
          {/* Popup component */}
          <Popup trigger={<button>Add Card</button>} contentStyle={{width: "364px", height: "412px"}} modal nested>
            {(close) => (
              <form className="add-card-form" onSubmit={handleSubmit}>
                <h2>Add Your Flashcard</h2>
                {/* Input image url */}
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Enter image url"
                  value={inputs.imageUrl}
                  onChange={handleChange}
                />
                {/* Input animal name  */}
                <input
                  type="text"
                  name="animalName"
                  placeholder="Enter animal name"
                  value={inputs.animalName}
                  onChange={handleChange}
                />
                {/* Submit button */}
                <button type="submit" onClick={() => close()}>
                  Add
                </button>
              </form>
            )}
          </Popup>
          {/* Close popup button */}
          <button onClick={() => alert("Delete Card!")}>Remove Card</button>
        </div>
      </header>
      {/* Main content */}
      <main className="app-body">
        <FlashcardContainer />
      </main>
    </div>
  );
}

export default App;
