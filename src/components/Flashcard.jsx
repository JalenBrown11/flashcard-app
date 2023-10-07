import { useState } from "react";

const Flashcard = ({ animal_pic, answer, flipState}) => {
  return (
    <div className="flashcard" onClick={() => flipState.setFlip(!flipState.flip)}>
      {flipState.flip ? (
        <div className="flashcard-content">
          <img src={animal_pic} alt="animal picture" />
        </div>
      ) : (
        <div className="flashcard-content">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default Flashcard;
